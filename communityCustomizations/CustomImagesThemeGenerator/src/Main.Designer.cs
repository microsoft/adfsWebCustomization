namespace Digitude.Adfs.CustomImagesThemeGenerator
{
    partial class Main
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Main));
            this.dataGridView = new System.Windows.Forms.DataGridView();
            this.displayNameDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.DisplayNameFR = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.DisplayNameNL = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.imageLocationDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.identityProviderInfoBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.webThemeInfoBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.webThemeInfo = new Digitude.Adfs.CustomImagesThemeGenerator.WebThemeInfo();
            this.textBoxWebThemeName = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.buttonGenerate = new System.Windows.Forms.Button();
            this.toolStrip1 = new System.Windows.Forms.ToolStrip();
            this.newToolStripButton = new System.Windows.Forms.ToolStripButton();
            this.openToolStripButton = new System.Windows.Forms.ToolStripButton();
            this.saveToolStripButton = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.toolStripButton1 = new System.Windows.Forms.ToolStripButton();
            this.openFileDialog = new System.Windows.Forms.OpenFileDialog();
            this.saveFileDialog = new System.Windows.Forms.SaveFileDialog();
            this.browseImageDialog = new System.Windows.Forms.OpenFileDialog();
            this.errorProvider = new System.Windows.Forms.ErrorProvider(this.components);
            this.saveZipDialog = new System.Windows.Forms.SaveFileDialog();
            this.label3 = new System.Windows.Forms.Label();
            this.textBoxWebThemeScriptFile = new System.Windows.Forms.TextBox();
            this.buttonBrowseJavascript = new System.Windows.Forms.Button();
            this.buttonBrowsStyleFile = new System.Windows.Forms.Button();
            this.label4 = new System.Windows.Forms.Label();
            this.textBoxWebThemeStyleFile = new System.Windows.Forms.TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.identityProviderInfoBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.webThemeInfoBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.webThemeInfo)).BeginInit();
            this.toolStrip1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.errorProvider)).BeginInit();
            this.SuspendLayout();
            // 
            // dataGridView
            // 
            this.dataGridView.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.dataGridView.AutoGenerateColumns = false;
            this.dataGridView.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.displayNameDataGridViewTextBoxColumn,
            this.DisplayNameFR,
            this.DisplayNameNL,
            this.imageLocationDataGridViewTextBoxColumn});
            this.dataGridView.DataSource = this.identityProviderInfoBindingSource;
            this.dataGridView.Location = new System.Drawing.Point(11, 138);
            this.dataGridView.Name = "dataGridView";
            this.dataGridView.Size = new System.Drawing.Size(1056, 253);
            this.dataGridView.TabIndex = 10;
            this.dataGridView.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView_CellContentClick);
            // 
            // displayNameDataGridViewTextBoxColumn
            // 
            this.displayNameDataGridViewTextBoxColumn.DataPropertyName = "DisplayName";
            this.displayNameDataGridViewTextBoxColumn.HeaderText = "DisplayName";
            this.displayNameDataGridViewTextBoxColumn.Name = "displayNameDataGridViewTextBoxColumn";
            // 
            // DisplayNameFR
            // 
            this.DisplayNameFR.DataPropertyName = "DisplayNameFR";
            this.DisplayNameFR.HeaderText = "DisplayNameFR";
            this.DisplayNameFR.Name = "DisplayNameFR";
            this.DisplayNameFR.Width = 200;
            // 
            // DisplayNameNL
            // 
            this.DisplayNameNL.DataPropertyName = "DisplayNameNL";
            this.DisplayNameNL.HeaderText = "DisplayNameNL";
            this.DisplayNameNL.Name = "DisplayNameNL";
            this.DisplayNameNL.Width = 200;
            // 
            // imageLocationDataGridViewTextBoxColumn
            // 
            this.imageLocationDataGridViewTextBoxColumn.DataPropertyName = "ImageLocation";
            this.imageLocationDataGridViewTextBoxColumn.HeaderText = "ImageLocation";
            this.imageLocationDataGridViewTextBoxColumn.Name = "imageLocationDataGridViewTextBoxColumn";
            this.imageLocationDataGridViewTextBoxColumn.Width = 200;
            // 
            // identityProviderInfoBindingSource
            // 
            this.identityProviderInfoBindingSource.DataMember = "IdentityProviderInfo";
            this.identityProviderInfoBindingSource.DataSource = this.webThemeInfoBindingSource;
            // 
            // webThemeInfoBindingSource
            // 
            this.webThemeInfoBindingSource.DataSource = this.webThemeInfo;
            this.webThemeInfoBindingSource.Position = 0;
            // 
            // webThemeInfo
            // 
            this.webThemeInfo.DataSetName = "WebThemeInfo";
            this.webThemeInfo.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // textBoxWebThemeName
            // 
            this.textBoxWebThemeName.Location = new System.Drawing.Point(151, 28);
            this.textBoxWebThemeName.Name = "textBoxWebThemeName";
            this.textBoxWebThemeName.Size = new System.Drawing.Size(151, 20);
            this.textBoxWebThemeName.TabIndex = 2;
            this.textBoxWebThemeName.TextChanged += new System.EventHandler(this.textBoxWebThemeName_TextChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(8, 31);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(122, 13);
            this.label1.TabIndex = 1;
            this.label1.Text = "ADFS web theme name:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(8, 112);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(169, 13);
            this.label2.TabIndex = 9;
            this.label2.Text = "ADFS Identity Provider Information";
            // 
            // buttonGenerate
            // 
            this.buttonGenerate.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonGenerate.Location = new System.Drawing.Point(992, 397);
            this.buttonGenerate.Name = "buttonGenerate";
            this.buttonGenerate.Size = new System.Drawing.Size(75, 23);
            this.buttonGenerate.TabIndex = 11;
            this.buttonGenerate.Text = "Generate";
            this.buttonGenerate.UseVisualStyleBackColor = true;
            this.buttonGenerate.Click += new System.EventHandler(this.buttonGenerate_Click);
            // 
            // toolStrip1
            // 
            this.toolStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.newToolStripButton,
            this.openToolStripButton,
            this.saveToolStripButton,
            this.toolStripSeparator1,
            this.toolStripButton1});
            this.toolStrip1.Location = new System.Drawing.Point(0, 0);
            this.toolStrip1.Name = "toolStrip1";
            this.toolStrip1.Size = new System.Drawing.Size(1079, 25);
            this.toolStrip1.TabIndex = 0;
            this.toolStrip1.Text = "toolStrip1";
            // 
            // newToolStripButton
            // 
            this.newToolStripButton.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.newToolStripButton.Image = ((System.Drawing.Image)(resources.GetObject("newToolStripButton.Image")));
            this.newToolStripButton.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.newToolStripButton.Name = "newToolStripButton";
            this.newToolStripButton.Size = new System.Drawing.Size(23, 22);
            this.newToolStripButton.Text = "&New";
            this.newToolStripButton.Click += new System.EventHandler(this.newToolStripButton_Click);
            // 
            // openToolStripButton
            // 
            this.openToolStripButton.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.openToolStripButton.Image = ((System.Drawing.Image)(resources.GetObject("openToolStripButton.Image")));
            this.openToolStripButton.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.openToolStripButton.Name = "openToolStripButton";
            this.openToolStripButton.Size = new System.Drawing.Size(23, 22);
            this.openToolStripButton.Text = "&Open";
            this.openToolStripButton.Click += new System.EventHandler(this.openToolStripButton_Click);
            // 
            // saveToolStripButton
            // 
            this.saveToolStripButton.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.saveToolStripButton.Image = ((System.Drawing.Image)(resources.GetObject("saveToolStripButton.Image")));
            this.saveToolStripButton.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.saveToolStripButton.Name = "saveToolStripButton";
            this.saveToolStripButton.Size = new System.Drawing.Size(23, 22);
            this.saveToolStripButton.Text = "&Save";
            this.saveToolStripButton.Click += new System.EventHandler(this.saveToolStripButton_Click);
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = new System.Drawing.Size(6, 25);
            // 
            // toolStripButton1
            // 
            this.toolStripButton1.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton1.Image = ((System.Drawing.Image)(resources.GetObject("toolStripButton1.Image")));
            this.toolStripButton1.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton1.Name = "toolStripButton1";
            this.toolStripButton1.Size = new System.Drawing.Size(23, 22);
            this.toolStripButton1.Text = "&Import list of IDP names";
            this.toolStripButton1.Click += new System.EventHandler(this.toolStripButton1_Click);
            // 
            // saveFileDialog
            // 
            this.saveFileDialog.Filter = "ADFS WebTheme Info|*.awi";
            // 
            // browseImageDialog
            // 
            this.browseImageDialog.Filter = "Png files|*.png|Jpg files|*.jpg";
            // 
            // errorProvider
            // 
            this.errorProvider.ContainerControl = this;
            // 
            // saveZipDialog
            // 
            this.saveZipDialog.Filter = "Zip files|*.zip";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(8, 58);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(137, 13);
            this.label3.TabIndex = 3;
            this.label3.Text = "ADFS web theme script file:";
            // 
            // textBoxWebThemeScriptFile
            // 
            this.textBoxWebThemeScriptFile.Location = new System.Drawing.Point(151, 55);
            this.textBoxWebThemeScriptFile.Name = "textBoxWebThemeScriptFile";
            this.textBoxWebThemeScriptFile.Size = new System.Drawing.Size(607, 20);
            this.textBoxWebThemeScriptFile.TabIndex = 4;
            // 
            // buttonBrowseJavascript
            // 
            this.buttonBrowseJavascript.Location = new System.Drawing.Point(760, 53);
            this.buttonBrowseJavascript.Name = "buttonBrowseJavascript";
            this.buttonBrowseJavascript.Size = new System.Drawing.Size(28, 22);
            this.buttonBrowseJavascript.TabIndex = 5;
            this.buttonBrowseJavascript.Text = "...";
            this.buttonBrowseJavascript.UseVisualStyleBackColor = true;
            this.buttonBrowseJavascript.Click += new System.EventHandler(this.buttonBrowseJavascript_Click);
            // 
            // buttonBrowsStyleFile
            // 
            this.buttonBrowsStyleFile.Location = new System.Drawing.Point(760, 81);
            this.buttonBrowsStyleFile.Name = "buttonBrowsStyleFile";
            this.buttonBrowsStyleFile.Size = new System.Drawing.Size(28, 22);
            this.buttonBrowsStyleFile.TabIndex = 8;
            this.buttonBrowsStyleFile.Text = "...";
            this.buttonBrowsStyleFile.UseVisualStyleBackColor = true;
            this.buttonBrowsStyleFile.Click += new System.EventHandler(this.buttonBrowsStyleFile_Click);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(8, 85);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(133, 13);
            this.label4.TabIndex = 6;
            this.label4.Text = "ADFS web theme style file:";
            // 
            // textBoxWebThemeStyleFile
            // 
            this.textBoxWebThemeStyleFile.Location = new System.Drawing.Point(151, 82);
            this.textBoxWebThemeStyleFile.Name = "textBoxWebThemeStyleFile";
            this.textBoxWebThemeStyleFile.Size = new System.Drawing.Size(607, 20);
            this.textBoxWebThemeStyleFile.TabIndex = 7;
            // 
            // Main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1079, 432);
            this.Controls.Add(this.buttonBrowsStyleFile);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.textBoxWebThemeStyleFile);
            this.Controls.Add(this.buttonBrowseJavascript);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.textBoxWebThemeScriptFile);
            this.Controls.Add(this.toolStrip1);
            this.Controls.Add(this.buttonGenerate);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.textBoxWebThemeName);
            this.Controls.Add(this.dataGridView);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Main";
            this.Text = "ADFS Generate theme script (IDP\'s with different images)";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.identityProviderInfoBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.webThemeInfoBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.webThemeInfo)).EndInit();
            this.toolStrip1.ResumeLayout(false);
            this.toolStrip1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.errorProvider)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.DataGridView dataGridView;
        private WebThemeInfo webThemeInfo;
        private System.Windows.Forms.BindingSource identityProviderInfoBindingSource;
        private System.Windows.Forms.BindingSource webThemeInfoBindingSource;
        private System.Windows.Forms.TextBox textBoxWebThemeName;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button buttonGenerate;
        private System.Windows.Forms.ToolStrip toolStrip1;
        private System.Windows.Forms.ToolStripButton newToolStripButton;
        private System.Windows.Forms.ToolStripButton openToolStripButton;
        private System.Windows.Forms.ToolStripButton saveToolStripButton;
        private System.Windows.Forms.OpenFileDialog openFileDialog;
        private System.Windows.Forms.SaveFileDialog saveFileDialog;
        private System.Windows.Forms.OpenFileDialog browseImageDialog;
        private System.Windows.Forms.ErrorProvider errorProvider;
        private System.Windows.Forms.SaveFileDialog saveZipDialog;
        private System.Windows.Forms.ToolStripSeparator toolStripSeparator1;
        private System.Windows.Forms.ToolStripButton toolStripButton1;
        private System.Windows.Forms.Button buttonBrowsStyleFile;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox textBoxWebThemeStyleFile;
        private System.Windows.Forms.Button buttonBrowseJavascript;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox textBoxWebThemeScriptFile;
        private System.Windows.Forms.DataGridViewTextBoxColumn displayNameDataGridViewTextBoxColumn;
        private System.Windows.Forms.DataGridViewTextBoxColumn DisplayNameFR;
        private System.Windows.Forms.DataGridViewTextBoxColumn DisplayNameNL;
        private System.Windows.Forms.DataGridViewTextBoxColumn imageLocationDataGridViewTextBoxColumn;
    }
}

