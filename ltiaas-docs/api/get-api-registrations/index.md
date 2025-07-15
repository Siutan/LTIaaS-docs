---
title: Get Dynamic Registration by ID | LTIAAS
url: https://docs.ltiaas.com/api/get-api-registrations
source: LTIaaS Documentation
---

# Get Dynamic Registration by ID | LTIAAS

-   [](/)
-   Dynamic Registration
-   Get Dynamic Registration by ID

## Get Dynamic Registration by ID[​](#get-dynamic-registration-by-id "Direct link to heading")

Get information about a dynamic registration event.

API Authentication Method

Supported

[`LTIK-AUTH-V2`](/guides/api/authentication#ltik-based-authentication)

[`SERVICE-AUTH-V1`](/guides/api/authentication#service-key-based-authentication)

[`Bearer`](/guides/api/authentication#bearer-api-key-based-authentication)

✅

**Path Parameters**

**registrationID** string **required**

The ID of the dynamic registration

**Query Parameters**

**raw** string

Get the unfiltered registration with extra, uncommonly used metadata

**Responses**

-   200
-   401

* * *

application/json

Schema

Example (from schema)

Moodle Example

* * *

**Schema**

**url** string **required**

**familyCode** string **required**

**version** string **required**

**supportedScopes** string\[\] **required**

**supportedMessages** object\[\] **required**

-   Array \[

**type** string **required**

**placements** string\[\]

-   \]

```
{  
  "url": "string",  "familyCode": "string",  "version": "string",  "supportedScopes": [    "string"  ],  "supportedMessages": [    {      "type": "string",      "placements": [        "string"      ]    }  ]}
```

```
{  
  "url": "https://moodle.ltiaas.com",  "familyCode": "moodle",  "version": "4.4.1+ (Build: 20240705)",  "supportedScopes": [    "https://purl.imsglobal.org/spec/lti-bo/scope/basicoutcome",    "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem.readonly",    "https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly",    "https://purl.imsglobal.org/spec/lti-ags/scope/score",    "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem",    "https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly",    "https://purl.imsglobal.org/spec/lti-ts/scope/toolsetting",    "openid"  ],  "supportedMessages": [    {      "type": "LtiResourceLinkRequest"    },    {      "type": "LtiDeepLinkingRequest",      "placements": [        "ContentArea"      ]    }  ]}
```

Unauthorized. Please check our guide on [Authenticating API requests](/guides/api/authentication) to learn about how authentication works in the LTIAAS API.

application/json

Schema

Example (from schema)

Example

* * *

**Schema**

**status** integer

**Default value:** `401`

**error** string

**Default value:** `Unauthorized`

**details** object

**message** string

**Default value:** `INVALID_LTIK_AUTH_AUTHORIZATION_HEADER`

**description** string

```
{  
  "status": 401,  "error": "Unauthorized",  "details": {    "message": "INVALID_LTIK_AUTH_AUTHORIZATION_HEADER",    "description": "Invalid API key"  }}
```

```
{  
  "status": 401,  "error": "Unauthorized",  "details": {    "message": "INVALID_LTIK_AUTH_AUTHORIZATION_HEADER",    "description": "Invalid API key"  }}
```

Loading...