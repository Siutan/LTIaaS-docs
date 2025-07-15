---
title: Performing Deep Linking
url: https://docs.ltiaas.com/guides/api/deeplinking
source: LTIaaS Documentation
---

# Performing Deep Linking

-   [](/)
-   [Using the LTIAAS API](/guides/api/introduction)
-   Performing Deep Linking

On this page

# Performing Deep Linking

tip

Make sure you've read about [authenticating API requests](/guides/api/authentication) before proceeding to the guide below.

info

The Deep Linking endpoint only accepts the [ltik based authentication method](/guides/api/authentication#ltik-based-authentication).

If your application is a hub of multiple resources and/or activities, the LTI® protocol makes this easy to manage through the *Deep Linking* service. You can use this service to allow teachers and administrators to select one specific resource from your application when creating a resource link (activity) in the LMS. LTIAAS gives you access to this service through the Deep Linking flow and `/api/deeplinking/form` API endpoint.

![Performing Deep Linking](/assets/ideal-img/flow_deeplinking.357dd10.1162.png)

![Performing Deep Linking](/assets/ideal-img/flow_deeplinking_dark.a5220b2.1162.png)

Performing Deep Linking

## The Deep Linking flow[​](#the-deep-linking-flow "Direct link to heading")

The LTI® Deep Linking flow consists of 4 steps:

-   [Deep Linking launch](#deep-linking-launch);
-   [User content selection](#user-content-selection);
-   [Creation of deep linking form](#creation-of-deep-linking-form);
-   [Submission of selected content](#submission-of-selected-content).

### Deep Linking launch[​](#deep-linking-launch "Direct link to heading")

An LTI® Deep Linking launch happens when a privileged user within the LMS, usually administrator or teacher, launches to your LTI® tool from an activity or tool link creation page. This launch works in the same way as the regular LTI® launch, with the exception that, at the end of the flow, LTIAAS will redirect the user to your application's registered deep linking target launch URL.

After receiving the Deep Linking launch, your application should display a content selection view.

tip

Your application can display a personalized view for the user that initiated the LTI® launch based on their access level and role. To know more about this, check our [Retrieving ID Token guide](/guides/api/idtoken) and its [Performing SSO section](/guides/api/idtoken#performing-sso).

### User content selection[​](#user-content-selection "Direct link to heading")

![Example content selection view](/assets/ideal-img/select_content.880e764.1152.png)

Example content selection view

In the content selection view, the user will be able to choose which resource provided by your application should be linked to the activity being created.

After the user selects the desired resource, your application's front-end should make a request to your back-end identifying the selection.

### Creation of deep linking form[​](#creation-of-deep-linking-form "Direct link to heading")

info

This guide focuses on the most common and/or relevant fields of each section in the deep linking request body, for a full list of available fields, as well as possible API response bodies and statuses, check the [Deep Linking endpoint API reference](/api/post-api-deeplinking-form).

#### The content item object[​](#the-content-item-object "Direct link to heading")

A content item represents a resource that should be added to the LMS. Only the `type` field is always required to be present in this object, the other fields might be required or optional depending on the type of resource being added.

tip

You can find a full list of available types and their respective required fields in the IMS Deep Linking Content Item Types Documentation:

Learning Tools Interoperability (LTI®) Deep Linking Specification, IMS Final Release Spec Version 2.0, 1EdTech Consortium, April 2019, Section 3, [https://www.imsglobal.org/node/162911#content-item-types](https://www.imsglobal.org/node/162911#content-item-types).

The most common type of content item is the `ltiResourceLink`, which represents an LTI® link to a resource in your application, usually in the form of an activity. For this type of content item, the `type` and `url` fields are **required**.

```
{  
  "type": "ltiResourceLink",  "url": "https://your.ltiaas.com/lti/launch?resource=123",  "title": "Resource"}
```

tip

It's common to provide a `title` field that most LMSes will use as the activity title.

#### Building the content item URL[​](#building-the-content-item-url "Direct link to heading")

The `ltiResourceLink` content item `url` field is the target the LMS should redirect the user to after a successful LTI® launch from the newly created activity.

caution

For the LTI® launch to work from the new activity, the `url` field of the content item **MUST** point to your LTIAAS subdomain launch URL `https://your.ltiaas.com/lti/launch`.

You can add any query parameters you want to the content item URL, as they will be passed along to your application's registered launch URL during subsequent LTI® launches. These parameters can be used to identify the resource linked to the activity.

**Content item URL:**

> [https://your.ltiaas.com/lti/launch?resource=123](https://your.ltiaas.com/lti/launch?resource=123)

**Final target URL after LTI® launch:**

> [https://your.application.com/your-launch-endpoint?resource=123](https://your.application.com/your-launch-endpoint?resource=123)

#### Calling the Deep Linking endpoint[​](#calling-the-deep-linking-endpoint "Direct link to heading")

After your back-end receives the request containing the user's selection, you can call the `/api/deeplinking/form` endpoint to create a self-submitting form that will be used to submit the selection and finalize the flow.

The Deep Linking endpoint accepts a POST request with a JSON body containing the `contentItems` field. This field is an array of content item objects that represent a resource that should added to the LMS, potentially being created as an activity.

tip

The LTI® protocol allows you to pass multiple content items in a deep liking request, but it's common for LMSes to accept only one since this flow is often connected to the creation of an activity.

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/deeplinking/form POST request  
const body = {  
  contentItems: [{    type: 'ltiResourceLink',    url: 'https://your.ltiaas.com/lti/launch?resource=123',    title: 'Resource'  }]}  
const response = requests.post(`https://your.ltiaas.com/api/deeplinking/form`, body, { headers })  
const form = response['form']  
return form
```

The `/api/deeplinking/form` endpoint response is an object containing a `form` field that is an HTML snippet that should be added to your application's HTML body to finalize the deep linking process.

```
{  
  "form": "<form id='ltiaas_dl' style='display: none;' action='...' method='POST'>              <input type='hidden' name='JWT' value='eyJhbGciOiJIUzI1NiIkpXVCJ9.eyJzdODkwIiwib...' />           </form>           <script>              document.getElementById('ltiaas_dl').submit()           </script>"}
```

#### Creating your own submission form[​](#creating-your-own-submission-form "Direct link to heading")

If you want to create your own form instead of using the one provided by the Deep Linking form endpoint, you can do so by making a POST request to the `/api/deeplinking` endpoint. This endpoint accepts the same request body as the `/api/deeplinking/form` endpoint, but instead of returning a self-submitting form, it returns a JSON object containing the `message` and `target` fields.

```
{  
  "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwib...",  "target": "https://lms.example.com/lti/deeplinking"}
```

The `message` field is a JWT containing the selected resource information and the `target` field is the submission endpoint for the form. You can use this information to create your own submission form:

```
const form = `<form id="ltiaas_dl" style="display: none;" action="${target}" method="POST">  
                <input type="hidden" name="JWT" value="${message}" />              </form>              <script>                document.getElementById("ltiaas_dl").submit()              </script>`return form
```

### Submission of selected content[​](#submission-of-selected-content "Direct link to heading")

After your application's back-end makes the API request to generate the self-submitting form, your front-end should append the resulting HTML snippet to the body:

```
// Back-end  
// ...  
const form = response['form']  
return form  

// Front-end  
// Append self-submitting form to HTML body  
$('body').append(form)
```

The form will then submit itself, finalizing the deep linking process and often closing the dialogue window.

## Checking service availability[​](#checking-service-availability "Direct link to heading")

The *Deep Linking* service will only be available in the context of deep linking LTI® launches. Before attempting to submit resources you can [make a call to the ID Token endpoint](/guides/api/idtoken) and check the [services section](/guides/api/idtoken#deeplinking) to know if the service is available.

You can know if the service is available based on the value of the `idtoken.services.deepLinking.available` boolean field:

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/idtoken GET request  
const idtoken = requests.get('https://your.ltiaas.com/api/idtoken', { headers })  
const isServiceAvailable = idtoken['services']['deepLinking']['available']  

if (isServiceAvailable) {  
  // Making /api/deeplinking/form POST request  const body = {    contentItems: [{      type: 'ltiResourceLink',      url: 'https://your.ltiaas.com/lti/launch?resource=123',      title: 'Resource'    }]  }  const response = requests.post(`https://your.ltiaas.com/api/deeplinking/form`, body, { headers })  const form = response['form']  return form}
```

**Tags:**

-   [API](/tags/api)
-   [Deep Linking](/tags/deep-linking)
-   [Tutorials](/tags/tutorials)