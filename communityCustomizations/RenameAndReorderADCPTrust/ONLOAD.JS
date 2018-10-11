// Adjust The Display Name Of The Active Directory CP Trust And Reorder To Put Active Directory CP Trust Back At The Top (ADFS 2016)
// Works with IE, Edge, Chrome, Firefox, Safari
if (document.getElementById("hrdArea")) {
	if (document.getElementById("hrd")) {
		var strCPTrustADDisplayName = "IAM Technologies";
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
				var adAuthorityElementIDnr = i;
			}
		}

		if ((totalIdPElements > 1) && (adAuthorityElementIsPresent)) {
			idp[adAuthorityElementIDnr].parentNode.insertBefore(idp[adAuthorityElementIDnr], idp[0]);
		}
	}
}
