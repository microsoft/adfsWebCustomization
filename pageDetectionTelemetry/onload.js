// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

//
// Telemetry Manager is the App Insights telemetry management object
// Callers MUST call 'Initialize' before using the 'ProducePageDetectionTelemetry' method
//
var TelemetryManager = {

    /*
     * Initialize the app state for the current page 
     */ 
    Initialize: function () {
        var _self = this;

        // Collect some page details for later 
        var NOT_SET_CONST = 'NOTSET';
        _self.currentUri = window.location.href.split('?')[0];
        _self.mswtrealm = _self.getQueryString("wtrealm") || NOT_SET_CONST;
        _self.decodedwtrealm = decodeURIComponent(_self.mswtrealm) || NOT_SET_CONST;
        _self.requestID = _self.getQueryString("client-request-id") || NOT_SET_CONST;
        _self.wfresh = _self.getQueryString("wfresh") || NOT_SET_CONST;
        _self.wauth = _self.getQueryString("wauth") || NOT_SET_CONST;
        _self.debugging = _self.getQueryString("debug") || NOT_SET_CONST;
        _self.wauth = decodeURIComponent(_self.wauth);
        _self.Username = NOT_SET_CONST;

        _self.startedPfaWaiting = false;
        _self.pfaTimestamp = null;
        _self.pfaTimestampOldBrowser = null;
        _self.startedAuthSelectionWaiting = false;
        _self.authSelectionTimestamp = null;
        _self.authSelectionTimestampOldBrowser = null;
        _self.authSelectionLinkClicked = null;
        _self.authSelectionMethod = null;
        _self.startedFormsPage = false;

        // Create App Insights object with settings 
        if (!window.appInsights) {
            if(console && _self.debugging) console.log("TelemetryManager: Generating a new App Insights object");
            var appInsights = _self.GenerateAppInsightsObject.call();

            // Set App Insights object against the current window 
            window.appInsights = appInsights;
            if(console && _self.debugging) console.log("TelemetryManager: Set new App Insights object against the current window");
        }

        //
        // Add unload callback to window, so we can capture telemetry 
        //
        if (window.addEventListener) {
            window.addEventListener("unload", function () { _self.LeavingCurrentPageCallback(_self); }, false);  // Modern browsers
        } else if (window.attachEvent) {
            window.attachEvent('onunload', function () { _self.LeavingCurrentPageCallback(_self); });            // Old IE
        }

        if(console && _self.debugging) console.log("Exit: TelemetryManager.Initialize");
    },

    /*
     * Generate an App Insights object to use when
     *  sending telemetry. 
     */
    GenerateAppInsightsObject: function() {
        return function (config) {
            function r(config) { t[config] = function () { var i = arguments; t.queue.push(function () { t[config].apply(t, i) }) } } var t = { config: config }, u = document, e = window, o = "script", s = u.createElement(o), i, f; for (s.src = config.url || "//az416426.vo.msecnd.net/scripts/a/ai.0.js", u.getElementsByTagName(o)[0].parentNode.appendChild(s), t.cookie = u.cookie, t.queue = [], i = ["Event", "Exception", "Metric", "PageView", "Trace"]; i.length;) r("track" + i.pop()); return r("setAuthenticatedUserContext"), r("clearAuthenticatedUserContext"), config.disableExceptionTracking || (i = "onerror", r("_" + i), f = e[i], e[i] = function (config, r, u, e, o) { var s = f && f(config, r, u, e, o); return s !== !0 && t["_" + i](config, r, u, e, o), s }), t
        }({
            samplingPercentage: 100,
            instrumentationKey: "YOUR-KEY-HERE",
            endpointUrl: "https://dc.services.visualstudio.com/v2/track"   // modify endpoint for Azure Government or Azure China as per https://docs.microsoft.com/en-us/azure/azure-monitor/app/custom-endpoints
        });
    },

    /*
     * Helper function to get a querystring parameter 
     */
    getQueryString: function(qsName) {
        qsName = qsName.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + qsName + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(location.href);
        if (!results) return "";
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    /*
     *  Produces all telemetry for the following pages: 
     *      Forms Page 
     *      AuthSelection Page 
     *      Home Realm Discovery Page 
     *      Phone Factor Authentication Page 
     *      Phone Factor Error Page 
     *      ADFS Error Page 
     *      Phone Factor Authentication Options Page 
     */
    ProducePageDetectionTelemetry: function () {
        
        var _self = this;

        if(console && _self.debugging) console.log("Enter: TelemetryManager.ProducePageDetectionTelemetry");

        //
        // Generic Page view tracking 
        //
        window.appInsights.trackPageView("Generic");

        //
        // Home Realm Discovery Page
        //
        var hrd = document.getElementById('hrd');
        if (hrd) {
            window.appInsights.trackPageView("HomeRealmDiscovery");
            if(console && _self.debugging) console.log("ProducePageDetectionTelemetry: Found HRD Page");
            return;
        }

        //
        // Forms Page (before creds are entered)
        //  NOTE: This only works for pages presented in English 
        //
        var pageloginForm = document.getElementById('loginForm');
        if (!hrd && pageloginForm && document.title == 'Sign In') {
            window.appInsights.trackPageView("FormsPage");
            window.appInsights.trackEvent("FormsPageStart",
                { CorrelationID: _self.requestID, CurrentUri: _self.currentUri, CurrentRealm: _self.mswtrealm, wauth: _self.wauth, wfresh: _self.wfresh, wtrealm: _self.decodedwtrealm }
            );
            _self.startedFormsPage = true;
            if(console && _self.debugging) console.log("ProducePageDetectionTelemetry: Found Forms Page");
            return;
        }

        //
        // Error Page
        //
        var ierrorText = document.getElementById("errorText");
        if (ierrorText) {
            var ierrorCurrent = ierrorText.innerHTML;
            if (ierrorCurrent.length > 0) {
                var pageTitle = document.title;

                //
                // Try to gather more error information from the page 
                //
                var erruserAccount = _self.GetUserNameFromAuthArea();
                var erractivityId = (document.getElementById('activityId') || {innerText:''}).innerText;
                var errcontextId = (document.getElementById('contextId')|| {innerText:''}).innerText;
                var errtimestamp = (document.getElementById('timestamp')|| {innerText:''}).innerText;
                
                if(erractivityId || errcontextId || errtimestamp){
                    window.appInsights.trackPageView("ErrorDetailedPage");
                    window.appInsights.trackEvent("ErrorDetailedPageStart",
                        { CorrelationID: _self.requestID, CurrentUri: _self.currentUri, CurrentRealm: _self.mswtrealm, wtrealm: _self.decodedwtrealm, wfresh: _self.wfresh, wauth: _self.wauth, PageTitle: pageTitle, Username: erruserAccount, ActivityID: erractivityId, ContextId: errcontextId, ErrorTimestamp: errtimestamp }
                    );
                    if(console && _self.debugging) console.log("ProducePageDetectionTelemetry: Found Detailed Error Page");
                }                
                return;
            }
        }

        //
        // AuthSelection Page
        //
        var authOptions = document.getElementById('authOptions')
        var progress = document.getElementById('Progress')
        if (authOptions && !progress) {
            
            var foundUsername = _self.GetUserNameFromAuthArea();
            _self.Username = foundUsername;

            window.appInsights.trackPageView("AuthSelectionPage");
            window.appInsights.trackEvent("AuthSelectionPageStart",
                { CorrelationID: _self.requestID, CurrentUri: _self.currentUri, CurrentRealm: _self.mswtrealm, wtrealm: _self.decodedwtrealm, wfresh: _self.wfresh, wauth: _self.wauth, Username: _self.Username }
            );
            if(console && _self.debugging) console.log("ProducePageDetectionTelemetry: Found Auth Selection Page");

            //
            // Add click callbacks to the auth selection options
            //  NOTE: If you have other options you wish to track, add them here
            //
            var certOption = document.getElementById('CertificateAuthentication');
            if (certOption) {
                certOption.addEventListener("click", function () { _self.AuthSelectionPageSubmitCallback("cert", "manual", _self); }, false);
            }
            var azureOption = document.getElementById('WindowsAzureMultiFactorAuthentication');
            if (azureOption) {
                azureOption.addEventListener("click", function () { _self.AuthSelectionPageSubmitCallback("phonefactor", "manual", _self); }, false);
            }

            return;
        }

        //
        // Phone Factor Waiting Page 
        //
        var workArea = document.getElementById('workArea');
        var authArea = document.getElementById('authArea');
        var progressDiv = document.getElementById('Progress');
        var authMethod = document.getElementById('authMethod');
        var errorDiv = document.getElementById('errorDiv');
        if (workArea && authArea && progressDiv && authMethod && !errorDiv) {            

            var phonefactorUserID = _self.GetUserNameFromAuthArea();
            var authchildren = authArea.childNodes;
            for (var i = 0; i < authchildren.length; i++) {
                if (authchildren[i].className === 'fieldMargin bigText') {
                    window.appInsights.trackPageView("PhoneFactorWaitingPage");
                    window.appInsights.trackEvent("PhoneFactorWaitingStart",
                        { CorrelationID: _self.requestID, CurrentUri: _self.currentUri, CurrentRealm: _self.mswtrealm, wtrealm: _self.decodedwtrealm, wfresh: _self.wfresh, wauth: _self.wauth, Username: phonefactorUserID }
                    );
                    if(console && _self.debugging) console.log("ProducePageDetectionTelemetry: Found PFA Waiting Page");

                    // Once we detect the pfa page, add a timer to collect the PFA latency 
                    _self.startedPfaWaiting = true;
                    _self.Username = phonefactorUserID;

                    if (performance && performance.now()) {
                        _self.pfaTimestamp = performance.now();
                    }

                    if (Date && Date.now()) {
                        _self.pfaTimestampOldBrowser = Date.now();
                    }

                    return;
                }
            }
        }

        if(console && _self.debugging) console.log("Exit: TelemetryManager.ProducePageDetectionTelemetry");
    },

    /*
     * Collect the username from the auth area message 
     *  NOTE: This method only works for pages presented in English 
     */
    GetUserNameFromAuthArea: function () {
        var authchildren = document.getElementById('authArea').childNodes;
        for (var i = 0; i < authchildren.length; i++) {
            if (authchildren[i].className === 'fieldMargin bigText') {
                var tempuserAccount = authchildren[i].innerText;
                return tempuserAccount.replace("Welcome ", "");
            }
        }
    },

    /*
     * Callback function when the AuthSelection page is being submitted after an 
     *  auth option was chosen.
     */
    AuthSelectionPageSubmitCallback: function (linkClicked, selectionMethod, _self) {
        if(console && _self.debugging) console.log("Enter: TelemetryManager.AuthSelectionPageSubmitCallback");

        // Collect telemetry
        window.appInsights.trackEvent("AuthSelectionPicked",
             { CorrelationID: _self.requestID, CurrentUri: _self.currentUri, CurrentRealm: _self.mswtrealm, wauth: _self.wauth, wfresh: _self.wfresh, Type: linkClicked, SelectionMethod: selectionMethod, wtrealm: _self.decodedwtrealm, Username: _self.Username }
        );

        if(console && _self.debugging) console.log("AuthSelectionPageSubmitCallback: Link Clicked: " + linkClicked);

        // Start the auth selection timer to time from page submit to page unload 
        _self.startedAuthSelectionWaiting = true;
        _self.authSelectionLinkClicked = linkClicked;
        _self.authSelectionMethod = selectionMethod;

        if (performance && performance.now()) {
            _self.authSelectionTimestamp = performance.now();
        }

        if (Date && Date.now()) {
            _self.authSelectionTimestampOldBrowser = Date.now();
        }

        if(console && _self.debugging) console.log("Exit: TelemetryManager.AuthSelectionPageSubmitCallback");
    },

    /*
     * Callback function when any page is being left
     *  NOTE: Due to browser unload calls, there is no guarantee that the 
     *   processing in this method will complete. Some of the XHR requests made for 
     *   trackEvent calls may not succeed. This telemetry is a best-effort collection
     */
    LeavingCurrentPageCallback: function (_self) {

        // Grab the window appInsights object for local use 
        var localAppInsights = window.appInsights;
        var flushMePlease = false;

        if (_self.startedFormsPage) {
            _self.Username = document.getElementById(Login.userNameInput).value;
            localAppInsights.trackEvent("FormsPageEnd",
                { CorrelationID: _self.requestID, CurrentUri: _self.currentUri, CurrentRealm: _self.mswtrealm, wtrealm: _self.decodedwtrealm, wfresh: _self.wfresh, wauth: _self.wauth, Username: _self.Username }
            );
            _self.startedFormsPage = false;
            flushMePlease = true;
        }

        var pfaTime = null;
        if (_self.pfaTimestamp) {
            pfaTime = (performance.now() - _self.pfaTimestamp) / 1000.0;
        }

        var pfaTimeOldBrowser = null;
        if (_self.pfaTimestampOldBrowser) {
            pfaTimeOldBrowser = (Date.now() - _self.pfaTimestampOldBrowser) / 1000.0;
        }

        if (pfaTime) {
            localAppInsights.trackEvent("PhoneFactorLatency",
                { CorrelationID: _self.requestID, CurrentUri: _self.currentUri, CurrentRealm: _self.mswtrealm, wtrealm: _self.decodedwtrealm, wfresh: _self.wfresh, wauth: _self.wauth, Username: _self.Username },
                { Latency: pfaTime }
            );
            flushMePlease = true;
        } else if (pfaTimeOldBrowser) {
            localAppInsights.trackEvent("PhoneFactorLatency",
                { CorrelationID: _self.requestID, CurrentUri: _self.currentUri, CurrentRealm: _self.mswtrealm, wtrealm: _self.decodedwtrealm, wfresh: _self.wfresh, wauth: _self.wauth, Username: _self.Username },
                { OldBrowserLatency: pfaTimeOldBrowser }
            );
            flushMePlease = true;
        }

        if (_self.startedPfaWaiting) {

            localAppInsights.trackEvent("PhoneFactorWaitingEnd",
                { CorrelationID: _self.requestID, CurrentUri: _self.currentUri, CurrentRealm: _self.mswtrealm, wtrealm: _self.decodedwtrealm, wfresh: _self.wfresh, wauth: _self.wauth, Username: _self.Username }
            );
            _self.startedPfaWaiting = false;
            flushMePlease = true;
        }

        if (_self.startedAuthSelectionWaiting) {
            localAppInsights.trackEvent("AuthSelectionPageEnd",
                { CorrelationID: _self.requestID, CurrentUri: _self.currentUri, CurrentRealm: _self.mswtrealm, wtrealm: _self.decodedwtrealm, wfresh: _self.wfresh, wauth: _self.wauth, Username: _self.Username, Type: _self.authSelectionLinkClicked, SelectionMethod: _self.authSelectionMethod }
            );
            _self.startedAuthSelectionWaiting = false;
            flushMePlease = true;
        }

        var authSelectionTime = null;
        if (_self.authSelectionTimestamp) {
            authSelectionTime = (performance.now() - _self.authSelectionTimestamp) / 1000.0;
        }

        var authSelectionTimeOldBrowser = null;
        if (_self.authSelectionTimestampOldBrowser) {
            authSelectionTimeOldBrowser = (Date.now() - _self.authSelectionTimestampOldBrowser) / 1000.0;
        }

        if (authSelectionTime ) {
            localAppInsights.trackEvent("AuthSelectionLatency",
                { CorrelationID: _self.requestID, Username: _self.Username, wauth: _self.wauth, wfresh: _self.wfresh, wtrealm: _self.decodedwtrealm, Type: _self.authSelectionLinkClicked, SelectionMethod: _self.authSelectionMethod },
                { Latency: authSelectionTime }
            );
            flushMePlease = true;
        } else if (authSelectionTimeOldBrowser) {
            localAppInsights.trackEvent("AuthSelectionLatency",
                { CorrelationID: _self.requestID, Username: _self.Username, wauth: _self.wauth, wfresh: _self.wfresh, wtrealm: _self.decodedwtrealm, Type: _self.authSelectionLinkClicked, SelectionMethod: _self.authSelectionMethod },
                { OldBrowserLatency: authSelectionTimeOldBrowser }
            );
            flushMePlease = true;
        }

        if (flushMePlease) {
            if (localAppInsights) {
                if (localAppInsights.flush) {
                    localAppInsights.flush();
                }
            }
        }
    },
};

// Produce telemetry 
if(console) console.log("TelemetryManager: Start trying to produce telemetry");
var pageTelemetryManager = TelemetryManager;
pageTelemetryManager.Initialize();
pageTelemetryManager.ProducePageDetectionTelemetry();
if(console) console.log("TelemetryManager: End trying to produce telemetry");
