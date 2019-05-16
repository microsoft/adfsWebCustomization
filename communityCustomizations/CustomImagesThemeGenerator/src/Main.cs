using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Windows.Forms;

namespace Digitude.Adfs.CustomImagesThemeGenerator
{
    public partial class Main : Form
    {
        public Main()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            this.Text += $" [-v{Assembly.GetExecutingAssembly().GetName().Version}]";
            dataGridView.Columns[0].Width = 100;
            dataGridView.Columns[1].Width = 200;
            dataGridView.Columns[2].Width = 200;
            dataGridView.Columns[3].Width = 450;
            dataGridView.Columns[3].ReadOnly = true;
            var browseImageButtonColumn = new DataGridViewButtonColumn
            {
                Name = "BrowseImage",
                HeaderText = "...",
                Width = 30,
                Text = "...",
                UseColumnTextForButtonValue = true
            };
            browseImageButtonColumn.DefaultCellStyle.Padding = new Padding(2, 1, 2, 1);
            dataGridView.Columns.Add(browseImageButtonColumn);
        }

        private void saveToolStripButton_Click(object sender, EventArgs e)
        {
            try
            {
                if (string.IsNullOrEmpty(textBoxWebThemeName.Text))
                {
                    errorProvider.SetError(textBoxWebThemeName, "Please provide a name for the web theme.");
                    return;
                }
                else
                {
                    errorProvider.Clear();
                }

                if (webThemeInfo.IdentityProviderInfo.Rows.Count == 0)
                {
                    MessageBox.Show("Please add theme info.");
                    return;
                }

                if (saveFileDialog.ShowDialog() == DialogResult.OK)
                {
                    if (webThemeInfo.ThemeInfo.Rows.Count == 0)
                    {
                        var row = webThemeInfo.ThemeInfo.NewThemeInfoRow();
                        row.Name = textBoxWebThemeName.Text;
                        webThemeInfo.ThemeInfo.Rows.Add(row);
                    }
                    else
                    {
                        WebThemeInfo.ThemeInfoRow row = webThemeInfo.ThemeInfo.Rows[0] as WebThemeInfo.ThemeInfoRow;
                        row.Name = textBoxWebThemeName.Text;
                    }

                    webThemeInfo.WriteXml(saveFileDialog.FileName);
                }
            }
            catch (Exception exception)
            {
                MessageBox.Show(exception.Message);
            }            
        }

        private void openToolStripButton_Click(object sender, EventArgs e)
        {
            try
            {
                openFileDialog.Filter = "ADFS WebTheme Info | *.awi";

                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    webThemeInfo.Clear();
                    webThemeInfo.ReadXml(openFileDialog.FileName);
                    webThemeInfoBindingSource.ResetBindings(false);
                    identityProviderInfoBindingSource.ResetBindings(false);

                    if (webThemeInfo.ThemeInfo.Rows.Count > 0)
                    {
                        WebThemeInfo.ThemeInfoRow row = webThemeInfo.ThemeInfo.Rows[0] as WebThemeInfo.ThemeInfoRow;
                        textBoxWebThemeName.Text = row.Name;
                    }
                }
            }
            catch (Exception exception)
            {
                MessageBox.Show(exception.Message);
            }
        }

        private void dataGridView_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            var senderGrid = (DataGridView)sender;

            if (senderGrid.Columns[e.ColumnIndex] is DataGridViewButtonColumn && e.ColumnIndex == 4 && e.RowIndex >= 0)
            {
                if (senderGrid.Rows[e.RowIndex].IsNewRow == false)
                {
                    if (browseImageDialog.ShowDialog() == DialogResult.OK)
                    {
                        senderGrid.Rows[e.RowIndex].Cells[3].Value = browseImageDialog.FileName;
                    }
                }
            }
        }

        private void buttonGenerate_Click(object sender, EventArgs e)
        {
            try
            {
                if (string.IsNullOrEmpty(textBoxWebThemeName.Text))
                {
                    errorProvider.SetError(textBoxWebThemeName, "Please provide a name for the web theme.");
                    return;
                }
                else
                {
                    errorProvider.Clear();
                }

                var javascriptBuffer = new StringBuilder();
                var powerShellScriptBuffer = new StringBuilder();

                var customThemeFunctions =
                @"
// Added by the ADFS web theme generator (custom idp images).

var language = document.documentElement.lang;
var languageKey = 'en';

if (language.lastIndexOf('nl', 0) === 0) 
{
    languageKey = 'nl';
}
else if (language.lastIndexOf('fr', 0) === 0) 
{
    languageKey = 'fr';
}

function renameLabels(oldDisplayName, newDisplayNameFR, newDisplayNameNL) {
    var listAllSpanForIdp = document.getElementsByClassName('idpDescription float');
    var inc;
    for (inc = 0; inc < listAllSpanForIdp.length; inc++)
    {
        if (listAllSpanForIdp[inc].innerHTML.indexOf(oldDisplayName) !== -1)
        {
            switch (languageKey)
            {
                case 'fr':
                    if (newDisplayNameFR !== '')
                    {
                        listAllSpanForIdp[inc].innerHTML = listAllSpanForIdp[inc].innerHTML.replace(oldDisplayName, newDisplayNameFR);
                    }
                    break;
                case 'nl':
                    if (newDisplayNameNL !== '')
                    {
                        listAllSpanForIdp[inc].innerHTML = listAllSpanForIdp[inc].innerHTML.replace(oldDisplayName, newDisplayNameNL);
                    }
                    break;
                default:
                    break;
            }
        }
    }
}

function mapIdpImages()
{
    var listAllIdpImg = document.getElementsByTagName('img');
    var listAllIdpImg = document.getElementsByTagName('img');
    var inc;
    for (inc = 0; inc < listAllIdpImg.length; inc++) 
    {
        switch ( listAllIdpImg[inc].getAttribute('alt') ) 
        {
[SwitchStatements]
        }
    }
}

if (typeof HRD != 'undefined') 
{
    mapIdpImages();
[RenameLabels]
}";

                powerShellScriptBuffer.AppendLine($"$webThemeName = '{textBoxWebThemeName.Text}'");
                powerShellScriptBuffer.AppendLine("$webTheme = Get-AdfsWebTheme -Name $webThemeName");
                powerShellScriptBuffer.AppendLine("if (!$webTheme)");
                powerShellScriptBuffer.AppendLine("{");
                powerShellScriptBuffer.AppendLine($"New-AdfsWebTheme -Name {textBoxWebThemeName.Text} -SourceName default");
                powerShellScriptBuffer.AppendLine("}");

                var switchStatements = new StringBuilder();
                var renameLabelStatements = new StringBuilder();

                foreach (WebThemeInfo.IdentityProviderInfoRow providerInfoRow in webThemeInfo.Tables["IdentityProviderInfo"].Rows)
                {
                    var fileName = new FileInfo(providerInfoRow.ImageLocation).Name;                    

                    switchStatements.AppendLine($"\tcase '{providerInfoRow.DisplayName}':");
                    switchStatements.AppendLine($"\t\tlistAllIdpImg[inc].src = '/adfs/portal/images/idp/{fileName}';");
                    switchStatements.AppendLine("\t\tbreak");

                    if(!string.IsNullOrEmpty(providerInfoRow.DisplayNameFR) && !string.IsNullOrEmpty(providerInfoRow.DisplayNameNL))
                    {
                        renameLabelStatements.AppendLine($"\trenameLabels('{providerInfoRow.DisplayName}', '{providerInfoRow.DisplayNameFR}', '{providerInfoRow.DisplayNameNL}');");
                    }

                    powerShellScriptBuffer.AppendLine($"Set-AdfsWebTheme -TargetName {textBoxWebThemeName.Text} -AdditionalFileResource @{{Uri =\"/adfs/portal/images/idp/{fileName}\";path=\"{fileName}\"}}");
                }

                customThemeFunctions = customThemeFunctions.Replace("[SwitchStatements]", switchStatements.ToString());
                customThemeFunctions = customThemeFunctions.Replace("[RenameLabels]", renameLabelStatements.ToString());

                javascriptBuffer.Append(this.GetJavascriptFile());
                javascriptBuffer.AppendLine();
                javascriptBuffer.AppendLine();
                javascriptBuffer.AppendLine(customThemeFunctions);

                powerShellScriptBuffer.AppendLine();
                powerShellScriptBuffer.AppendLine($"Set-AdfsWebTheme -TargetName {textBoxWebThemeName.Text} -AdditionalFileResource @{{Uri =\"/adfs/portal/script/onload.js\";path=\"customOnload.js\"}}");
                powerShellScriptBuffer.AppendLine();
                powerShellScriptBuffer.AppendLine($"Set-AdfsWebTheme -TargetName {textBoxWebThemeName.Text} -StyleSheet @{{Path=\"customstyle.css\"}}");
                powerShellScriptBuffer.AppendLine();
                powerShellScriptBuffer.AppendLine($"Set-AdfsWebConfig -ActiveThemeName {textBoxWebThemeName.Text}");                

                using (var memoryStream = new MemoryStream())
                {
                    using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                    {
                        var powershellScriptFile = archive.CreateEntry("CreateOrUpdateAdfsWebTheme.ps1");

                        using (var entryStream = powershellScriptFile.Open())
                        using (var streamWriter = new StreamWriter(entryStream))
                        {
                            streamWriter.Write(powerShellScriptBuffer.ToString());
                        }

                        var javaScriptFile = archive.CreateEntry("customonload.js");

                        using (var entryStream = javaScriptFile.Open())
                        using (var streamWriter = new StreamWriter(entryStream))
                        {
                            streamWriter.Write(javascriptBuffer.ToString());
                        }

                        var styleFile = archive.CreateEntry("customstyle.css");

                        using (var entryStream = styleFile.Open())
                        using (var streamWriter = new StreamWriter(entryStream))
                        {
                            streamWriter.Write(this.GetStyleFile());
                        }

                        foreach (WebThemeInfo.IdentityProviderInfoRow providerInfoRow in webThemeInfo.Tables["IdentityProviderInfo"].Rows)
                        {
                            var fileName = new FileInfo(providerInfoRow.ImageLocation).Name;

                            archive.CreateEntryFromFile(providerInfoRow.ImageLocation, fileName);
                        }
                    }

                    if (saveZipDialog.ShowDialog() == DialogResult.OK)
                    {
                        using (var fileStream = new FileStream(saveZipDialog.FileName, FileMode.Create))
                        {
                            memoryStream.Seek(0, SeekOrigin.Begin);
                            memoryStream.CopyTo(fileStream);
                        }

                        MessageBox.Show("Zip archive has been created.");
                    }                    
                }
            }
            catch (Exception exception)
            {
                MessageBox.Show(exception.Message);
            }
        }

        private void toolStripButton1_Click(object sender, EventArgs e)
        {
            try
            {
                const string headerName = "CPT Name";

                Application.UseWaitCursor = true;

                openFileDialog.Filter = "Text files | *.txt";

                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    var fileContent = new List<string>(File.ReadLines(openFileDialog.FileName));

                    IEnumerable<string> claimProviderNames = fileContent.Select(s => s.Trim());

                    if (!claimProviderNames.Contains(headerName))
                    {
                        MessageBox.Show("Please use only files generated by using the PowerShell command: \nGet-AdfsClaimsProviderTrust | select @{Name=\"CPT Name\";Expression={$_.Name}} > [outputFile].txt");
                    }
                    else
                    {
                        webThemeInfo.IdentityProviderInfo.Clear();

                        foreach (var claimProviderName in claimProviderNames)
                        {
                            if (claimProviderName != headerName && !claimProviderName.Contains("------") && !string.IsNullOrEmpty(claimProviderName))
                            {
                                WebThemeInfo.IdentityProviderInfoRow row = webThemeInfo.IdentityProviderInfo.NewIdentityProviderInfoRow();
                                row.DisplayName = claimProviderName;
                                webThemeInfo.IdentityProviderInfo.AddIdentityProviderInfoRow(row);
                            }
                        }
                    }
                }                
            }
            catch (Exception exception)
            {
                MessageBox.Show(exception.Message);
            }
            finally
            {
                Application.UseWaitCursor = false;
            }
        }

        private void newToolStripButton_Click(object sender, EventArgs e)
        {
            webThemeInfo.ThemeInfo.Clear();
            webThemeInfo.IdentityProviderInfo.Clear();
            webThemeInfoBindingSource.ResetBindings(false);
            identityProviderInfoBindingSource.ResetBindings(false);

            textBoxWebThemeName.Text = string.Empty;
        }

        private void textBoxWebThemeName_TextChanged(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(textBoxWebThemeName.Text))
            {
                errorProvider.SetError(textBoxWebThemeName, "Please provide a name for the web theme.");
            }
            else
            {
                errorProvider.Clear();
            }
        }

        private string GetJavascriptFile()
        {
            if(string.IsNullOrEmpty(textBoxWebThemeScriptFile.Text))
            {
                return Properties.Resources.onload;
            }
            else
            {
                return File.ReadAllText(textBoxWebThemeScriptFile.Text);
            }
        }

        private string GetStyleFile()
        {
            if (string.IsNullOrEmpty(textBoxWebThemeStyleFile.Text))
            {
                return Properties.Resources.customstyle;
            }
            else
            {
                return File.ReadAllText(textBoxWebThemeStyleFile.Text);
            }
        }

        private void buttonBrowseJavascript_Click(object sender, EventArgs e)
        {
            try
            {
                openFileDialog.Filter = "ADFS WebTheme onload| *.js";

                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    textBoxWebThemeScriptFile.Text = openFileDialog.FileName;
                }
            }
            catch (Exception exception)
            {
                MessageBox.Show(exception.Message);
            }
        }

        private void buttonBrowsStyleFile_Click(object sender, EventArgs e)
        {
            try
            {
                openFileDialog.Filter = "ADFS WebTheme style sheet| *.css";

                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    textBoxWebThemeStyleFile.Text = openFileDialog.FileName;
                }
            }
            catch (Exception exception)
            {
                MessageBox.Show(exception.Message);
            }
        }
    }
}
