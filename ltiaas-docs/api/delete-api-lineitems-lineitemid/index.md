---
title: Delete Line Item by ID | LTIAAS
url: https://docs.ltiaas.com/api/delete-api-lineitems-lineitemid
source: LTIaaS Documentation
---

# Delete Line Item by ID | LTIAAS

-   [](/)
-   Line Items
-   Delete Line Item by ID

## Delete Line Item by ID[​](#delete-line-item-by-id "Direct link to heading")

The LTI® protocol allows you to delete a specific grade line from the LMS grade book through the *Assignment and Grades - Line Items* service. In the context of LTI®, these grade lines are called *line items*. LTIAAS gives you access to this service through the `/api/lineitems` API endpoint.

Please check our [Manipulating grade lines guide](/guides/api/manipulating-grade-lines) and its [Deleting a grade line by its ID section](/guides/api/manipulating-grade-lines#deleting-a-grade-line-by-its-id) to learn more about using this endpoint.

API Authentication Method

Supported

[`LTIK-AUTH-V2`](/guides/api/authentication#ltik-based-authentication)

✅

[`SERVICE-AUTH-V1`](/guides/api/authentication#service-key-based-authentication)

✅

[`Bearer`](/guides/api/authentication#bearer-api-key-based-authentication)

**Path Parameters**

**lineItemID** uri **required**

The URL encoded line item ID.

**Responses**

-   204
-   401

* * *

No Content

Unauthorized. Please check our guide on [Authenticating API requests](/guides/api/authentication) to learn about how authentication works in the LTIAAS API.

application/json

Schema

Example (from schema)

* * *

**Schema**

**status** number **required**

**Default value:** `401`

**error** string **required**

**Default value:** `Unauthorized`

**details** object **required**

**message** string **required**

**description** string **required**

```
{  
  "status": 401,  "error": "Unauthorized",  "details": {    "message": "INVALID_LTIK_AUTH_AUTHORIZATION_HEADER",    "description": "Invalid or expired ltik."  }}
```

Loading...