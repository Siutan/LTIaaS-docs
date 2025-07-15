---
title: Complete Dynamic Registration Process | LTIAAS
url: https://docs.ltiaas.com/api/post-api-registrations-complete
source: LTIaaS Documentation
---

# Complete Dynamic Registration Process | LTIAAS

-   [](/)
-   Dynamic Registration
-   Complete Dynamic Registration Process

## Complete Dynamic Registration Process[​](#complete-dynamic-registration-process "Direct link to heading")

Complete the dyanmic registration process.

API Authentication Method

Supported

[`LTIK-AUTH-V2`](/guides/api/authentication#ltik-based-authentication)

[`SERVICE-AUTH-V1`](/guides/api/authentication#service-key-based-authentication)

[`Bearer`](/guides/api/authentication#bearer-api-key-based-authentication)

✅

**Path Parameters**

**registrationID** string **required**

The ID of the dynamic registration

application/json

**Request Body**

All parameters are optional

**platformName** string

**autoActivate** boolean

**messages** object\[\]

-   Array \[

**type** string

**placements** string\[\]

-   \]

**Responses**

-   200
-   401

* * *

application/json

Schema

Example (from schema)

Example

* * *

**Schema**

**html** string **required**

An HTML snippet that needs to be appended to the document body.

**platformId** string **required**

The ID of the newly registered platform

```
{  
  "html": "string",  "platformId": "string"}
```

```
{  
  "html": "<script>(window.opener || window.parent).postMessage({subject:'org.imsglobal.lti.close'}, '*');</script>",  "platformId": "A2F48n9Ss8Hjpw4gjo0"}
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