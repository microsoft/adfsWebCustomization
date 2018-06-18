# AD FS Web Customizations 

## Overview 

This repository contains useful web customizations for AD FS. The following customizations are currently included: 

1. __[pageDetectionTelemetry](pageDetectionTelemetry)__ - JavaScript customization to detect AD FS pages and upload telemetry 
to your [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) datastore. 

2. __[centeredUi](centeredUi)__ - CSS customization to allow your on-prem AD FS to be consistent with the look-and-feel of the
[centered Azure AD Sign-in](https://cloudblogs.microsoft.com/enterprisemobility/2017/08/02/the-new-azure-ad-signin-experience-is-now-in-public-preview/)

    __![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Action Required__

    If you use the paginated onload.js web customization to create a paginated experience on your AD FS server, please update to the latest version. If you deployed the onload.js on or before __May 29, 2018__, please update your deployment. 

3. __[mfaLoadingWheel](mfaLoadingWheel)__ - JavaScript customization to add a loading wheel to the AD FS authentication options page.

4. __[communityCustomizations](communityCustomizations)__ - JavaScript customizations from community members.

## Usage 

If you use any of our open source tools or projects, please consider subscribing to our announcements newsletter. We use this list to provide updates on security bugs, new feature announcements, and other info directly relevant to our users.

[Sign up here](http://eepurl.com/dwF5gP)

## Contributing

This project welcomes contributions and suggestions. We encourage you to fork this project, include any web customizations
you find useful, and then do a pull request to master. If your customizations work, we'll include them so everyone can benefit. 

Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, 
grant us the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
