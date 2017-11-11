function PaginatedNext()
{
    // NOTE: You can add any custom navigation logic you want here. 

    // Check that a username was entered correctly 
    var u = new InputUtil();
    var e = new LoginErrors();
    var usernameInput = document.getElementById('userNameInput');
    if (!usernameInput.value || !usernameInput.value.match('[@\\\\]')) {
        u.setError(usernameInput, e.userNameFormatError);
        return false;
    }
    
    ShowPasswordPage();
}

function PaginatedBack()
{
    // NOTE: You can add any custom navigation logic you want here. 
    
    ShowUsernamePage();
}

function AdjustElementDisplay(elementList, display)
{
    for ( var i = 0; i < elementList.length; i++ )
    {
        if ( elementList[i] && elementList[i].style )
        {
            elementList[i].style.display = display;
        }
    }
}

function GetLocalizedStringForElement(element)
{
    // LOCALIZATION NOTE: This text is un-localized, which means it will not be displayed in your browser's
    //  native language. Admins who wish this text to appear in different languages should add logic to set this 
    //  value dynamically based on the value returned in the language var below 
    var nextButtonText = { "en": "Next" };
    var loginMessageText = { "en": "Enter password" };
    var backButtonText = { "en": "Back" };

    var languageAndCountry = navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage; 
    var language = "en";
    if ( languageAndCountry && languageAndCountry.length >= 2 )
    {
        language = languageAndCountry.charAt(0) + languageAndCountry.charAt(1);
    }

    if ( !element || !element.id )
    {
        return; 
    }

    var returnText = "";

    switch(element.id)
    {
        case "nextButton":
            returnText = nextButtonText["en"];
            if ( nextButtonText[language] )
            {
                returnText = nextButtonText[language];
            }
            break;
        case "backButton":
            returnText = backButtonText["en"];
            if ( backButtonText[language] )
            {
                returnText = backButtonText[language];
            }
            break;
        case "loginMessage":
            returnText = loginMessageText["en"];
            if ( loginMessageText[language] )
            {
                returnText = loginMessageText[language];
            }
            break;
    }

    return returnText;    
}

function ShowUsernamePage(badUsernamePassword)
{
    var nextButton = document.getElementById('nextButton');
    var backButton = document.getElementById('backButton');
    var idBanner = document.getElementById('identityBanner');
    var idBannerImage = document.getElementById('identityBannerImage');

    var thingsToHide = [ passArea, submitButton, backButton, idBannerImage, idBanner ];
    var thingsToShow = [ nextButton, username ];

    // Show/Hide elements 
    AdjustElementDisplay(thingsToHide, 'none');
    AdjustElementDisplay(thingsToShow, 'block');

    // Set the login message to what it was originally
    if ( loginMessage )
    {
        loginMessage.innerHTML = originalLoginMessage;    
    }

    if ( errorText && errorText.innerHTML && !badUsernamePassword )
    {
        errorDisplay.style.display = 'none';
    }
    
    // Create the 'next' button if we don't have it yet 
    if ( submissionArea && !nextButton )
    {
        var nextButton = document.createElement("span");
        nextButton.id = "nextButton";
        nextButton.className = "submit";
        nextButton.setAttribute("onclick", "PaginatedNext(); return false;");

        var nextButtonText = GetLocalizedStringForElement(nextButton);
        nextButton.innerHTML = nextButtonText;
        submissionArea.appendChild(nextButton);
    }

    // Add 'enter' key listener to username textbox 
    if ( usernameInput && !didAddListener )
    {
        usernameInput.addEventListener("keydown", function(event) {     
            if (event.keyCode === 13) {
                event.preventDefault();
                PaginatedNext();
                return false;
            }
        });

        didAddListener = true;
    }
}

function ShowPasswordPage()
{
    var nextButton = document.getElementById('nextButton');
    var idBanner = document.getElementById('identityBanner');
    var idBannerImage = document.getElementById('identityBannerImage');
    var backButton = document.getElementById('backButton');

    var thingsToHide = [ errorDisplay, nextButton, username ];
    var thingsToShow = [ submitButton, passArea, backButton, idBanner, idBannerImage ];

    // Show/Hide elements 
    AdjustElementDisplay(thingsToHide, 'none');
    AdjustElementDisplay(thingsToShow, 'block');

    if ( loginMessage )
    {
        var loginMessageText = GetLocalizedStringForElement(loginMessage);
        loginMessage.innerHTML = loginMessageText;    
    }
    
    if ( submitButton )
    {
        submitButton.style.width = '160px';
        submitButton.style.float = 'right';
    }

    if ( idBanner )
    {
        idBanner.innerHTML = usernameInput.value;
    }

    // Create the ID Banner if we need to 
    if ( workArea && !idBanner)
    {
        // Create the ID banner
        var idBanner = document.createElement("div");
        idBanner.id = "identityBanner";
        idBanner.className = "identityBanner";
        idBanner.innerHTML = usernameInput.value;

        // Create the ID banner user avatar image 
        var image = document.createElement("img");
        image.role = "presentation";
        image.className = "identityBannerImage";
        image.id = "identityBannerImage";

        // NOTE: Admins should set this source to the image host server they use. Additionally, this image should be set
        //  based on the username entered.  
        image.src = "https://auth.gfx.ms/16.000.27564.3/images/picker_account_msa.svg";
        
        // Add the newly-created elements 
        workArea.insertBefore(image, workArea.firstChild);
        workArea.insertBefore(idBanner, workArea.firstChild);
    }

    // Create the 'Back' button if we need to 
    if ( submissionArea && !backButton )
    {
        var backButton = document.createElement("span");
        backButton.id = "backButton";
        backButton.className = "submit";
        backButton.classList.add('backButton');
        backButton.setAttribute("onclick", "PaginatedBack(); return false;");
        submitButton.classList.add('modifiedSignIn');

        var backButtonText = GetLocalizedStringForElement(backButton);
        backButton.innerHTML = backButtonText;
        submissionArea.appendChild(backButton);
    }

    if ( passwordInput )
    {
        passwordInput.focus();
    }
}


var usernameInput = document.getElementById("userNameInput");
var passwordInput = document.getElementById('passwordInput');

if ( usernameInput && passwordInput)
{
    var username = document.getElementById('userNameArea');
    var passArea = document.getElementById('passwordArea');
    
    var submitButton = document.getElementById('submitButton');
    var submissionArea = document.getElementById('submissionArea');
    var errorText = document.getElementById('errorText');
    var errorDisplay = document.getElementById('error');
    var workArea = document.getElementById('workArea');
    
    var loginMessage = document.getElementById('loginMessage');
    var originalLoginMessage = "";
    var didLoadPasswordPageBefore = false;

    if ( loginMessage )
    {
        originalLoginMessage = loginMessage.innerHTML;
    }
    var didAddListener = false;

    var errorIsShown = false;
    if ( errorDisplay && errorDisplay.style && errorDisplay.style.display != "none")
    {
        errorIsShown = true;
    }

    // Show the Username page, unless a username was already entered (login hint on the request), or we have an error
    if ( usernameInput && usernameInput.value && !errorIsShown )
    {
        ShowPasswordPage();
    }
    else 
    {
        ShowUsernamePage(errorIsShown);
    }
}