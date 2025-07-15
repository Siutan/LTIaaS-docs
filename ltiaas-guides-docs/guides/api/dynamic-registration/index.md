---
title: Performing Dynamic Registration
url: https://docs.ltiaas.com/guides/api/dynamic-registration
source: LTIaaS Documentation
---

# Performing Dynamic Registration

-   [](/)
-   [Using the LTIAAS API](/guides/api/introduction)
-   Performing Dynamic Registration

On this page

# Performing Dynamic Registration

tip

Make sure you've read about [authenticating API requests](/guides/api/authentication) before proceeding to the guide below.

info

The Dynamic Registrations API endpoints only accept the [bearer api key based authentication method](/guides/api/authentication#bearer-api-key-based-authentication).

## How Dynamic Registration Works[​](#how-dynamic-registration-works "Direct link to heading")

LTI® Dynamic Registration is used to automate the LMS/tool registration process. Several LMSes support it, including [Canvas](/guides/api/guides/lms/canvas#dynamic-registration), [Moodle](/guides/lms/moodle#dynamic-registration), and [Brightspace](/guides/lms/brightspace#dynamic-registration). The default Dynamic Registration process is as follows:

1.  The LMS administrator enters your dynamic registration URL into their LMS: `https://your.ltiaas.com/lti/register`
2.  LTIAAS communicates with the LMS and completes the registration process automatically.
3.  (optional) The LMS administrator can open the registered tool and modify any pre-defined settings as needed.

In some cases, it is not desirable to allow specific users or LMSes to register your tool. There are two general scenarios that might require approval/intervention while doing dynamic registration:

1.  **Simple Approval**: If you want to allow any user to register your tool, but want to manually approve each registration before it can be used, you can simply enable the `Dynamic Registration Auto-Activation` feature in the LTIAAS Portal within the *API Settings* page.
2.  **Account Authentication or Payment**: You might want to require the user to login to your service or submit payment before allowing the registration to complete. LTIAAS has APIs that enable this flow that we call *Dynamic Registration Pre-Approval*.

info

If all you need is *simple approval*, you can stop reading here.

## The Pre-Approval Flow[​](#the-pre-approval-flow "Direct link to heading")

tip

The *Dynamic Registration Pre-Approval* flow is disabled by default. It can be enabled in the LTIAAS Portal under the *API Settings* page by enabling the `Enable Pre-Approval` option.

The LTIAAS *Dynamic Registration Pre-Approval* flow consists of 4 steps:

-   [Initiate Dynamic Registration](#initiate-dynamic-registration)
-   [Pre-Approval Redirection](#intermediate-target-redirection)
-   [Get Registration Data](#get-registration-data)
-   [Submission of registration approval and/or settings override](#submission-of-registration-approval-and-settings-override)

![Performing Dynamic Registration With An Pre-Approval](/assets/ideal-img/flow_dynreg.b6c074b.592.png)

![Performing Dynamic Registration With An Pre-Approval](/assets/ideal-img/flow_dynreg_dark.47f33e3.590.png)

Performing Dynamic Registration With An Pre-Approval

### Initiate Dynamic Registration[​](#initiate-dynamic-registration "Direct link to heading")

Just like in the *'vanilla'* dynamic registration described above, the LMS administrator initiates Dynamic Registration by entering the Dynamic Registration URL into their LMS: `https://your.ltiaas.com/lti/register`.

### Pre-Approval Redirection[​](#pre-approval-redirection "Direct link to heading")

Because the `Enable Pre-Approval` option is true, the user is redirected to the URL you entered into the `Pre-Approval URL` field of the *API Settings* page. This page will receive a query parameter called `registrationId`. For example:

`https://yoursite.com/intermediateTarget?registrationId=123`

You will use the `registrationId` to get information about the LMS and complete/approve the registration process.

### Get Registration Data[​](#get-registration-data "Direct link to heading")

Once LTIAAS has redirected to your `Pre-Approval URL`, you can use the `registrationId` query parameter to get information about the LMS using the [Get Registrations API](/api/get-api-registrations).

```
// Building Bearer API authentication header  
const authorizationHeader = `Bearer ${API_KEY}`  
const headers = { Authorization: authorizationHeader }  
// Get the registrationId (from the front-end)  
const registrationId = req.query.registrationId  
// Making /api/registrations GET request (called in your back-end)  
const response = requests.get(`https://your.ltiaas.com/api/registrations/${registrationId}`, { headers })  
const url = response['url']  
const lmsFamily = response['familyCode']  
//... and other data
```

A successful response will contain details about the LMS and the options it supports.

```
{  
  "url": "https://moodle.ltiaas.com",  "familyCode": "moodle",  "version": "4.4.1+ (Build: 20240705)",  "supportedScopes": [    "https://purl.imsglobal.org/spec/lti-bo/scope/basicoutcome",    "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem.readonly",    "https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly",    "https://purl.imsglobal.org/spec/lti-ags/scope/score",    "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem",    "https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly",    "https://purl.imsglobal.org/spec/lti-ts/scope/toolsetting",    "openid"  ],  "supportedMessages": [    {      "type": "LtiResourceLinkRequest"    },    {      "type": "LtiDeepLinkingRequest",      "placements": [        "ContentArea"      ]    }  ]}
```

caution

The `registrationId` parameter is not persistent. It can only be used to get information about a potential registration and to complete a registration. Once the registration is completed or abandoned, the registrationId will no longer work.

### Submission of registration approval and settings override[​](#submission-of-registration-approval-and-settings-override "Direct link to heading")

During the dynamic registration process, you are free to redirect to other pages on your site, for example to allow the user to log in. It is important to not leave the context of the dynamic registration iframe, because the iframe is used by LTIAAS to communicate with the LMS.

When you are ready to approve the registration, you can use the [Complete Registration API](/api/post-api-registrations-complete).

```
// Building Bearer API authentication header  
const authorizationHeader = `Bearer ${API_KEY}`  
const headers = { Authorization: authorizationHeader }  
// Get the registrationId  
const registrationId = req.query.registrationId  
// build the registration completion message  
const body = {  
  // These are all optional, defaulting to the stored values set in the LTIAAS Portal  platformName: 'Platform name',  autoActivate: true,  
  messages: [    { type: 'LtiResourceLinkRequest', placements: ['placement1'] },    { type: 'LtiDeepLinkingRequest', placements: ['placement2'] }    // LTIAAS will validate each of these placements, only sending the ones allowed by the LMS  ]}  
// Making /api/registrations POST request  
const response = requests.post(`https://your.ltiaas.com/api/registrations/${registrationId}/complete`, body, { headers })  
const htmlToInject = response['html']  
return htmlToInject
```

This will return an html snippet that needs to be appended to the document that is in the active iframe for this registration.

```
{  
  platformId: "A2F48n9Ss8Hjpw4gjo0",  html: "<script>(window.opener || window.parent).postMessage({subject:'org.imsglobal.lti.close'}, '*');</script>"}
```

tip

The `platformId` that is returned in this step is persistent. It can be used later on to update, activate, or deactivate the platform registration.

Here's an example of completing the process by appending the html snippet to the active iframe's document body.

```
// Front-end  
// Append returned script to HTML body  
$('body').append(htmlToInject)
```

## Platform Registration Management[​](#platform-registration-management "Direct link to heading")

Once dynamic registration (or manual registration) is complete, you can use the platformId to manipulate the registration via the `/admin/platforms` API. See our [Platforms API reference](/api/ltiaas) for more information.

**Tags:**

-   [API](/tags/api)
-   [Dynamic Registration](/tags/dynamic-registration)
-   [Tutorials](/tags/tutorials)