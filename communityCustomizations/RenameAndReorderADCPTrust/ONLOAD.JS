// Adjust The Display Name Of The Active Directory CP Trust And Reorder To Put Active Directory CP Trust Back At The Top (ADFS 2016)
// Works with IE, Edge, Chrome, Firefox, Safari
if (document.getElementById("hrdArea")) {
	if (document.getElementById("hrd")) {
		var strCPTrustADDisplayName = "<!!! REPLACE THIS WITH THE DISPLAY NAME OF YOUR CHOOSING !!!>";
		var idp = document.getElementsByClassName("idp");
		var totalIdPElements = idp.length;
		var listAllSpanForIdpIcon = document.getElementsByClassName("largeIcon float");
		var listAllSpanForIdpDescription = document.getElementsByClassName("idpDescription float");
		var adAuthorityElementIsPresent = false;

		var i;
		for (i = 0; i < listAllSpanForIdpDescription.length; i++) {
			if (listAllSpanForIdpDescription[i].innerText == "Active Directory") {
				listAllSpanForIdpIcon[i].alt = strCPTrustADDisplayName;
				listAllSpanForIdpDescription[i].innerHTML = "<span class=\"largeTextNoWrap indentNonCollapsible\">" + strCPTrustADDisplayName + "</span>";
				adAuthorityElementIsPresent = true;
			}
		}

		if ((totalIdPElements > 1) && (adAuthorityElementIsPresent)) {
			var lastIdPElementNr = totalIdPElements - 1;
			idp[lastIdPElementNr].parentNode.insertBefore(idp[lastIdPElementNr], idp[0]);
		}
	}
}
