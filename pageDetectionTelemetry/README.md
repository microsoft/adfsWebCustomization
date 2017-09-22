# Page Detection with App Insights 

## Overview

This project performs page detection of common, uncustomized ADFS web pages, and then uploads 
telemetry about those pages to your [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) datastore. 

Note that this customization DOES NOT send any telemetry to the Microsoft ADFS team. All telemetry is sent to your datastore only.

This project also includes some useful analysis scripts you can run against your Application Insights datastore. 

## Requirements

This tool requires that you have an [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) subscription.

Additionally, it is recommended that you have minimal web customization of the standard ADFS pages, as customization could throw off the page 
detection. Please note that customization referres to onload.js changes, not logo changes, illustration changes, etc. 

Lastly, there is some page detection logic that relies on English strings in the pages. If you are presenting pages in languages other than 
English, you might need to make modifications to the JavaScript.

## Getting Started 

1. Register for an [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) subscription

2. Download the ```onload.js``` in this repo locally, and update the ```instrumentationKey``` under ```GenerateAppInsightsObject``` to be your Application Insights API key

     (For more details, see [Copy the instrumentation key](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-create-new-resource#copy-the-instrumentation-key))

3. Replace the ```onload.js``` in your ADFS environment with the ```onload.js``` from this project. Alternatively, if you already have content in your ```onload.js```, you 
should append our content to yours. 

    Note: It is *__highly__* recommended that you minify your ```onload.js``` before including it in a production environment. There are many popular tools online 
    for minifying JavaScript code. Two popular choices are [minifier.org](http://www.minifier.org/) and [JSCompress](https://jscompress.com/).

     (For more information, see [Advanced ADFS Customization](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/advanced-customization-of-ad-fs-sign-in-pages))

## What Gets Tracked

The following pages are detected and tracked:

* Forms Page - the username and password collection page 
* Auth Selection Page - the page served when MFA is required. This page lists MFA provider options
* PFA Waiting Page - the page served when Phone Factor Authentication (PFA) is performed by the [MultiFactorAuthenticationAdfsAdapter](https://docs.microsoft.com/en-us/azure/multi-factor-authentication/multi-factor-authentication-get-started-adfs-w2k12)
* Error Page - the ADFS or PFA error page 


## Analyzing the Data

To analyze your data, you will need to write analysis queries against your [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) datastore. 
For more details, see [Analytics](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-analytics).

Included in this project are a number of useful queries for tracking: 

* User prompting rate served by ADFS server 
* Login reliability of your ADFS server
* Interactive completion rate of your ADFS server

## Further Reading 

The following documentation is useful for making changes to the ```onload.js``` code and the included queries.

* [Application Insights Overview](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-overview)
* [Data Analysis Overivew](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-analytics-tour)
* [Custom App Insights Collection](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-api-custom-events-metrics#_flushing-data)
* [App Insights in JavaScript](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-javascript)
* [App Insights JavaScript GitHub](https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md)

## Contributing (Special Note)

If you are contributing code, please be sure that you __remove your instrumentation key__ from any code you 
put in a pull request. This project is public, and anyone on the Internet can see it.

For the full Contributing details, please see __[the root README](../README.md)__.