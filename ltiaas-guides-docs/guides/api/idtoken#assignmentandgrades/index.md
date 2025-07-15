---
title: Retrieving the ID Token
url: https://docs.ltiaas.com/guides/api/idtoken#assignmentandgrades
source: LTIaaS Documentation
---

# Retrieving the ID Token

-   [](/)
-   [Using the LTIAAS API](/guides/api/introduction)
-   Retrieving the ID Token

On this page

# Retrieving the ID Token

tip

Make sure you've read about [authenticating API requests](/guides/api/authentication) before proceeding to the guide below.

info

The ID Token endpoint only accepts the [ltik based API authentication method](/guides/api/authentication#ltik-based-authentication).

The ID Token is the main piece of data in the LTI® protocol, it's sent by the LMS to the LTI® tool and contains information regarding the current LTI® launch, this includes user information, LMS information, launch context information and everything you need to use the many LTI® services.

LTIAAS gives you access to a launch specific ID Token, formatted for easy of use, through the `/api/idtoken` API endpoint.

![Retrieving ID Token](/assets/ideal-img/flow_idtoken.41ed26f.1118.png)

![Retrieving ID Token](/assets/ideal-img/flow_idtoken_dark.f622c04.1118.png)

Retrieving ID Token

## Calling the ID Token endpoint[​](#calling-the-id-token-endpoint "Direct link to heading")

To retrieve the ID Token related to an LTI® launch, you need to make a GET request to the `/api/idtoken` endpoint of your LTIAAS' account subdomain.

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/idtoken GET request  
const response = requests.get('https://your.ltiaas.com/api/idtoken', { headers })  
const userInfo = response['user']  
const lmsInfo = response['platform']  
const launchInfo = response['launch']  
const servicesInfo = response['services']
```

You now have everything you need to [perform SSO and let users into your application](#performing-sso).

## Structure of the LTIAAS ID Token[​](#structure-of-the-ltiaas-id-token "Direct link to heading")

info

This guide focuses on the most common and/or relevant fields of each section in the ID Token object, for a full list of fields currently supported, as well as possible API response bodies and statuses, check the [\[GET\] ID Token endpoint API reference](/api/get-idtoken).

LTIAAS formats the raw ID Token sent by the LMS into a developer-friendly format, separating the claims into helpful sections and giving them more human-readable names:

```
{  
  "ltiVersion": "1.3.0",  "user": {...},  "platform": {...},  "launch": {...},  "services": {...}}
```

### User section[​](#user-section "Direct link to heading")

The `user` section in the LTIAAS ID Token is an object containing information provided by the LMS regarding the user that initiated a specific LTI® launch:

```
{  
  "ltiVersion": "1.3.0",  "user": {    "id": "2",    "email": "john@lms.com",    "name": "John Doe",    "givenName": "John",    "familyName": "Doe",    "roles": [      "http://purl.imsglobal.org/vocab/lis/v2/system/person#Administrator"    ],    ...  },  ...}
```

info

Fields containing personal information like `name` and `email` might not be present in the ID Token. The LMS can choose to omit this information based on their privacy rules. The only fields guaranteed to be present in this section are `id` and `roles`.

#### id[​](#id "Direct link to heading")

The `id` field contains the user's identifier inside of the LMS. This ID will probably not be unique between LMSes, so it's not recommended to be used alone as a primary identifier. We go into more detail on this topic in the [performing SSO section](#performing-sso).

#### email[​](#email "Direct link to heading")

The `email` field contains the user's registered email inside of the LMS.

#### name, givenName and familyName[​](#name-givenname-and-familyname "Direct link to heading")

The `name`, `givenName` and `familyName` fields contain the user's registered full name, first last and last name respectively.

#### roles[​](#roles "Direct link to heading")

The `roles` field contains a list of the user's roles within this specific launch context.

tip

A list of all possible roles can be found in the IMS Role Vocabulary:

Learning Tools Interoperability (LTI®) Core Specification, IMS Final Release Spec Version 1.3, 1EdTech Consortium, April 2019, A.2 Role vocabularies, [https://www.imsglobal.org/node/162741#role-vocabularies](https://www.imsglobal.org/node/162741#role-vocabularies).

You can choose to customize your tool's view based on the roles present in this list, for example, showing additional options for user's with variations of the `Instructor` role.

### Platform section[​](#platform-section "Direct link to heading")

The `platform` section in the LTIAAS ID Token is an object containing information regarding the LMS that originated a specific LTI® launch:

```
{  
  "ltiVersion": "1.3.0",  "platform": {    "id": "Y9LENU9n911EMxp9QSrE",    "url": "https://lms.example.com",    "clientId": "KzJtrQxEUYGWXjx",    "deploymentId": "1",    "name": "LMS",    "description": "A great LMS",    "productFamilyCode": "lms",    "version": "2021051712",    ...  },  ...}
```

#### id[​](#id-1 "Direct link to heading")

The `id` field contains the LMS's registration ID inside LTIAAS, generated when you perform a platform registration. This ID is globally unique.

#### url[​](#url "Direct link to heading")

The `url` field contains the LMS's issuer URL. This will match the URL used in the platform registration.

#### clientId[​](#clientid "Direct link to heading")

The `clientId` field contains the identifier generated by LMS for your LTI® tool. This will match the client ID used in the platform registration.

#### deploymentId[​](#deploymentid "Direct link to heading")

The `deploymentId` field contains the identifier for one specific instance of the LMS. This is most relevant when dealing with an LMS that uses multi-tenancy (Blackboard, for example), since this means that every instance of this LMS will share a single platform registration. The deployment ID will allow you to track and/or control access between the various instances of such LMSes.

#### name and description[​](#name-and-description "Direct link to heading")

The `name` and `description` fields contain the LMS's name and description as used in the platform registration.

#### productFamilyCode[​](#productfamilycode "Direct link to heading")

The `productFamilyCode` field contains an identifier for that family of LMSes. This allows you to identify the type of LMS and maybe customize your tool accordingly. Common examples are: `moodle`, `canvas` and `BlackboardLearn`.

#### version[​](#version "Direct link to heading")

The `version` field contains the LMS version inside its own versioning system.

### Launch section[​](#launch-section "Direct link to heading")

The `launch` section in the LTIAAS ID Token is an object containing information specific to the actual LTI® Launch:

```
{  
  "ltiVersion": "1.3.0",  "launch": {    "context": {...},    "resourceLink": {...},    "presentation": {...},    "custom": {...}  },  ...}
```

#### context[​](#context "Direct link to heading")

The `context` object contains information regarding the LMS context where the LTI® launch was originated. A context is most commonly the representation of a course in the LMS, but it can be any section from where an LTI® tool can be launched.

```
{  
  "launch": {    "context": {      "id": "2",      "label": "course",      "title": "Course",      "type": [        "CourseSection"      ]    },    ...  },  ...}
```

-   `id` - Context ID. Commonly the ID of a course in the LMS.
-   `label` and `title` - Context name. These two fields usually contain a short and full version of the context name respectively.
-   `type` - Context type.

tip

A list of all possible context types can be found in the IMS Context Type Vocabulary:

Learning Tools Interoperability Core Specification, IMS Final Release Spec Version 1.3, 1EdTech Consortium, April 2019, A.1 Context type vocabulary, [https://www.imsglobal.org/spec/lti/v1p3/#context-type-vocabulary](https://www.imsglobal.org/spec/lti/v1p3/#context-type-vocabulary).

#### resourceLink[​](#resourcelink "Direct link to heading")

The `resourceLink` object contains information regarding the LMS resource link that originated the current LTI® launch. A resource link is most commonly the representation of an activity in the LMS.

```
{  
  "launch": {    "resourceLink": {      "id": "4",      "title": "LTI® Activity 1",      "description": "This is a cool activity"    },    ...  },  ...}
```

-   `id` - Resource link ID. Commonly the ID of an activity in the LMS.
-   `title` - Resource link name.
-   `description` - Resource link description.

#### presentation[​](#presentation "Direct link to heading")

The `presentation` object contains information regarding how the current LTI® launch is being displayed.

```
{  
  "launch": {    "presentation": {      "documentTarget": "iframe",      "locale": "en"    },    ...  },  ...}
```

-   `documentTarget` - Type of LTI® tool visualization. Possible values for this field are `frame`, `iframe` or `window`.
-   `locale` - Language, country, and variant as represented using the [IETF Best Practices for Tags for Identifying Languages](https://www.rfc-editor.org/rfc/rfc5646).

#### custom[​](#custom "Direct link to heading")

The `custom` object contains key-value pairs representing the custom parameters defined in the LMS for that tool. Depending on the LMS you can set these custom parameters globally for a tool or specific to individual launches or locations inside the LMS. Some LMSes also support variable substitution.

```
{  
  "launch": {    "custom": {      "param": "value",      "location": "workspace"    },    ...  },  ...}
```

### Services section[​](#services-section "Direct link to heading")

The `services` section in the LTIAAS ID Token is an object containing information regarding the LTI® services and their availability in the context of a specific LTI® Launch:

```
{  
  "ltiVersion": "1.3.0",  "services": {    "deepLinking": {...},    "namesAndRoles": {...},    "assignmentAndGrades": {...},    "serviceKey": "eyJhbGciajsheu..."  },  ...}
```

#### deepLinking[​](#deeplinking "Direct link to heading")

The `deepLinking` object contains availability information for the *Deep Linking* LTI® service.

```
{  
  "services": {    "deepLinking": {      "available": false    },    ...  },  ...}
```

-   `available` - Availability status for the *Deep Linking* service in the current launch context.

#### namesAndRoles[​](#namesandroles "Direct link to heading")

The `namesAndRoles` object contains availability information for the *Names and Roles Provisioning* LTI® service.

```
{  
  "services": {    "namesAndRoles": {      "available": true    },    ...  },  ...}
```

-   `available` - Availability status for the *Names and Roles Provisioning* service in the current launch context.

#### assignmentAndGrades[​](#assignmentandgrades "Direct link to heading")

The `assignmentAndGrades` object contains availability information for the *Assignment and Grades* LTI® service.

```
{  
  "services": {    "assignmentAndGrades": {      "available": true,      "lineItemId": "https://lms.example.com/course/1/lineitems/1",    },    ...  },  ...}
```

-   `available` - Availability status for the *Assignment and Grades* service in the current launch context.
-   `lineItemId` - Line item ID for the current launch context. This field will only be present if there's only one line item ID associated with the current context.

#### serviceKey[​](#servicekey "Direct link to heading")

The `serviceKey` field contains the service key token that can be used to perform the [service key based API authentication](/guides/api/authentication#service-key-based-authentication). This field is only populated if the current launch context has access to at least one of the *Assignment and Grades* or *Names and Roles Provisioning* LTI® services.

## Additional fields and raw ID Token[​](#additional-fields-and-raw-id-token "Direct link to heading")

This guide focuses on the most common and/or relevant fields of each section in the ID Token object, for a full list of fields currently supported, check the [ID Token endpoint API reference](/api/get-idtoken).

info

If the field you need to build your LTI® integration is not one of the fields we take into account when formatting the ID Token, please fell free to [contact us](/contact-us) and we will make sure to include it in a future update.

Alternatively, you can retrieve a raw version of the ID Token generated by the LMS by sending the `?raw=true` query parameter when calling the `/api/idtoken` endpoint:

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/idtoken GET request  
const response = requests.get('https://your.ltiaas.com/api/idtoken?raw=true', { headers })  
const userID = response['sub']  
const userEmail = response['email']
```

The response will be an unformatted version of the ID Token object, including every field as sent by the LMS:

```
{  
  "sub": "2",  "iss": "https://lms.example.com",  "aud": "KzJtrQxEUYGWXjx",  "email": "john@lms.com",  "name": "John Doe",  "givenName": "John",  "familyName": "Doe",  "https://purl.imsglobal.org/spec/lti/claim/ext": {...},  "https://purl.imsglobal.org/spec/lti/claim/deployment_id": "1",  "https://purl.imsglobal.org/spec/lti/claim/version": "1.3.0",  "https://purl.imsglobal.org/spec/lti/claim/tool_platform": {...},  "https://purl.imsglobal.org/spec/lti/claim/custom": {...},  "https://purl.imsglobal.org/spec/lti/claim/launch_presentation": {...},  "https://purl.imsglobal.org/spec/lti/claim/roles": [...],  "https://purl.imsglobal.org/spec/lti/claim/context": {...},  "https://purl.imsglobal.org/spec/lti/claim/resource_link": {...},  ...}
```

## Performing SSO[​](#performing-sso "Direct link to heading")

After retrieving the ID Token, you can use the information contained in it to perform SSO and authenticate users into your application, automatically logging them into a preexisting account or provisioning a new one on the spot. There are two main ways of identifying a user:

### Identifying the user by their email[​](#identifying-the-user-by-their-email "Direct link to heading")

One of the quickest ways of identifying a user is through their email:

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/idtoken GET request  
const response = requests.get('https://your.ltiaas.com/api/idtoken', { headers })  
const userEmail = response['user']['email'] // user@email.com
```

The email contained in the ID Token can be trusted as an identifier for the user that initiated that specific LTI® launch.

caution

The `user.email` field might not be present in the ID Token. The LMS can choose to omit this information based on their privacy rules.

### Identifying the user by their ID[​](#identifying-the-user-by-their-id "Direct link to heading")

The most reliable way of identifying a user is through their ID reported in the ID Token. This ID is only unique within the LMS that originated the LTI® launch, so this value alone is not enough to represent a globally unique user. To get a globally unique identifier, you can combine the value of the user ID with the platform ID:

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/idtoken GET request  
const response = requests.get('https://your.ltiaas.com/api/idtoken', { headers })  
const platformID = response['platform']['id'] // Y9LENU9n911EMxp9QSrE  
const userID = response['user']['id'] // 2  
// Build globally unique user ID  
const globalUserID = `${platformID}:${userID}`
```

info

You could technically generate a more precise platform identifier by also combining the platform's deployment ID, however, this is largely unnecessary since user IDs should be unique across different instances of the same platform registration.

**Tags:**

-   [API](/tags/api)
-   [ID Token](/tags/id-token)
-   [Tutorials](/tags/tutorials)