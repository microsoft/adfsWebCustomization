// Adjust The Display Name Of The Active Directory CP Trust And Reorder To Put Active Directory CP Trust Back At The Top (ADFS 2016)
// Works with IE, Edge, Chrome, Firefox, Safari
if (document.getElementById("hrdArea")) {
	if (document.getElementById("hrd")) {
		// THE NEXT LINE SHOULD BE UPDATED TO SPECIFY THE NAME DISPLAYED ON THE ADFS HED PAGE
		var strCPTrustADDisplayName = "<REPLACE THIS WITH THE NAME YOU WANT TO DISPLAY ON THE HRD PAGE>";
		// THE LINE ABOVE SHOULD BE UPDATED TO SPECIFY THE NAME DISPLAYED ON THE ADFS HED PAGE
		var idp = document.getElementsByClassName("idp");
		var totalIdPElements = idp.length;
		var listAllSpanForIdpIcon = document.getElementsByClassName("largeIcon float");
		var listAllSpanForIdpDescription = document.getElementsByClassName("idpDescription float");
		var adAuthorityElementIsPresent = false;

		var i;
		for (i = 0; i < listAllSpanForIdpDescription.length; i++) {
			// IN THE LINE BELOW, IF NEEDED, SPECIFY THE LOCALIZED NAME OF AD. TO BE CERTAIN CHECK THE NAME OF THE AD CP TRUST
			var languageBasedADname = "Active Directory";
			// IN THE LINE ABOVE, IF NEEDED, SPECIFY THE LOCALIZED NAME OF AD. TO BE CERTAIN CHECK THE NAME OF THE AD CP TRUST
			if (listAllSpanForIdpDescription[i].innerText == languageBasedADname) {
				listAllSpanForIdpIcon[i].alt = strCPTrustADDisplayName;
				listAllSpanForIdpDescription[i].innerHTML = "<span class=\"largeTextNoWrap indentNonCollapsible\">" + strCPTrustADDisplayName + "</span>";
				adAuthorityElementIsPresent = true;
				var adAuthorityElementIDnr = i;
			}
		}

		if ((totalIdPElements > 1) && (adAuthorityElementIsPresent)) {
			idp[adAuthorityElementIDnr].parentNode.insertBefore(idp[adAuthorityElementIDnr], idp[0]);
		}
	}
}
