function AuthSelectionPageSubmitCallback()
{
    
    if (!document.getElementById("loadWheel"))
    {
        var divToAppendTo = document.getElementById("authArea");

        // Create the feedback loader
        var loader = document.createElement("loader");
        loader.innerHTML = "<style>#floatingCirclesG { position: relative; width: 125px; height: 125px; margin: auto; transform: scale(0.4); -o-transform: scale(0.4); -ms-transform: scale(0.4); -webkit-transform: scale(0.4); -moz-transform: scale(0.4); } .f_circleG { position: absolute; height: 22px; width: 22px; border-radius: 12px; -o-border-radius: 12px; -ms-border-radius: 12px; -webkit-border-radius: 12px; -moz-border-radius: 12px; animation-name: f_fadeG; -o-animation-name: f_fadeG; -ms-animation-name: f_fadeG; -webkit-animation-name: f_fadeG; -moz-animation-name: f_fadeG; animation-duration: 1.2s; -o-animation-duration: 1.2s; -ms-animation-duration: 1.2s; -webkit-animation-duration: 1.2s; -moz-animation-duration: 1.2s; animation-iteration-count: infinite; -o-animation-iteration-count: infinite; -ms-animation-iteration-count: infinite; -webkit-animation-iteration-count: infinite; -moz-animation-iteration-count: infinite; animation-direction: normal; -o-animation-direction: normal; -ms-animation-direction: normal; -webkit-animation-direction: normal; -moz-animation-direction: normal; } #frotateG_01 { left: 0; top: 51px; animation-delay: 0.45s; -o-animation-delay: 0.45s; -ms-animation-delay: 0.45s; -webkit-animation-delay: 0.45s; -moz-animation-delay: 0.45s; } #frotateG_02 { left: 15px; top: 15px; animation-delay: 0.6s; -o-animation-delay: 0.6s; -ms-animation-delay: 0.6s; -webkit-animation-delay: 0.6s; -moz-animation-delay: 0.6s; } #frotateG_03 { left: 51px; top: 0; animation-delay: 0.75s; -o-animation-delay: 0.75s; -ms-animation-delay: 0.75s; -webkit-animation-delay: 0.75s; -moz-animation-delay: 0.75s; } #frotateG_04 { right: 15px; top: 15px; animation-delay: 0.9s; -o-animation-delay: 0.9s; -ms-animation-delay: 0.9s; -webkit-animation-delay: 0.9s; -moz-animation-delay: 0.9s; } #frotateG_05 { right: 0; top: 51px; animation-delay: 1.05s; -o-animation-delay: 1.05s; -ms-animation-delay: 1.05s; -webkit-animation-delay: 1.05s; -moz-animation-delay: 1.05s; } #frotateG_06 { right: 15px; bottom: 15px; animation-delay: 1.2s; -o-animation-delay: 1.2s; -ms-animation-delay: 1.2s; -webkit-animation-delay: 1.2s; -moz-animation-delay: 1.2s; } #frotateG_07 { left: 51px; bottom: 0; animation-delay: 1.35s; -o-animation-delay: 1.35s; -ms-animation-delay: 1.35s; -webkit-animation-delay: 1.35s; -moz-animation-delay: 1.35s; } #frotateG_08 { left: 15px; bottom: 15px; animation-delay: 1.5s; -o-animation-delay: 1.5s; -ms-animation-delay: 1.5s; -webkit-animation-delay: 1.5s; -moz-animation-delay: 1.5s; } @keyframes f_fadeG { 0% { background-color: rgb(47, 146, 212); } 100% { background-color: rgb(255, 255, 255); } } @-o-keyframes f_fadeG { 0% { background-color: rgb(47, 146, 212); } 100% { background-color: rgb(255, 255, 255); } } @-ms-keyframes f_fadeG { 0% { background-color: rgb(47, 146, 212); } 100% { background-color: rgb(255, 255, 255); } } @-webkit-keyframes f_fadeG { 0% { background-color: rgb(47, 146, 212); } 100% { background-color: rgb(255, 255, 255); } } @-moz-keyframes f_fadeG { 0% { background-color: rgb(47, 146, 212); } 100% { background-color: rgb(255, 255, 255); } }</style><div id='floatingCirclesG'> <div class='f_circleG' id='frotateG_01'></div> <div class='f_circleG' id='frotateG_02'></div> <div class='f_circleG' id='frotateG_03'></div> <div class='f_circleG' id='frotateG_04'></div> <div class='f_circleG' id='frotateG_05'></div> <div class='f_circleG' id='frotateG_06'></div> <div class='f_circleG' id='frotateG_07'></div> <div class='f_circleG' id='frotateG_08'></div></div></div>"
        loader.id = "loadWheel";

        // Add the loader to the HTML page 
        if ( divToAppendTo && loader )
        {
            divToAppendTo.appendChild(loader);
        }
    }
}

var authOptions = document.getElementById('authOptions')
var progress = document.getElementById('Progress')
if (authOptions && !progress) {
    
    var azureOption = document.getElementById('WindowsAzureMultiFactorAuthentication');
    // var azureOption = document.getElementById('submitButton'); // use this option for MFA adapter, instead of AzureMFA

    if (azureOption) {
        azureOption.addEventListener("click", function() { AuthSelectionPageSubmitCallback(); }, false);
    }
}

// NOTE: If you wish to support the ADFS illustration (background image), you must use the following:
/*
function getStyle(element, styleProp) {
    var propStyle = null;

    if (element && element.currentStyle) {
        propStyle = element.currentStyle[styleProp];
    }
    else if (element && window.getComputedStyle) {
        propStyle = document.defaultView.getComputedStyle(element, null).getPropertyValue(styleProp);
    }

    return propStyle;
}

var computeLoadIllustration = function () {
    var branding = document.getElementById("branding");
    var brandingDisplay = getStyle(branding, "display");
    var brandingWrapperDisplay = getStyle(document.getElementById("brandingWrapper"), "display");

    if (brandingDisplay && brandingDisplay !== "none" &&
        brandingWrapperDisplay && brandingWrapperDisplay !== "none") {
        var newClass = "illustrationClass";

        if (branding.classList && branding.classList.add) {
            branding.classList.add(newClass);
        } else if (branding.className !== undefined) {
            branding.className += " " + newClass;
        }
        if (window.removeEventListener) {
            window.removeEventListener('load', computeLoadIllustration, false);
            window.removeEventListener('resize', computeLoadIllustration, false);
        }
        else if (window.detachEvent) {
            window.detachEvent('onload', computeLoadIllustration);
            window.detachEvent('onresize', computeLoadIllustration);
        }
    }
};

if (window.addEventListener) {
    window.addEventListener('resize', computeLoadIllustration, false);
    window.addEventListener('load', computeLoadIllustration, false);
}
else if (window.attachEvent) {
    window.attachEvent('onresize', computeLoadIllustration);
    window.attachEvent('onload', computeLoadIllustration);
}

function SetIllustrationImage(imageUri) {
    var illustrationImageClass = '.illustrationClass {background-image:url(' + imageUri + ');}';

    var css = document.createElement('style');
    css.type = 'text/css';

    if (css.styleSheet) css.styleSheet.cssText = illustrationImageClass;
    else css.appendChild(document.createTextNode(illustrationImageClass));

    document.getElementsByTagName("head")[0].appendChild(css);
}
*/
// NOTE: If you wish to support the ADFS illustration (background image), you must use the following:
// PSH> Set-AdfsWebTheme -TargetName <activeTheme> -AdditionalFileResource @{uri='/adfs/portal/images/illustration_mine.png';path='.\illustration_mine.jpg'}
// SetIllustrationImage('/adfs/portal/images/illustration_mine.png');