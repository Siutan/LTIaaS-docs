---
title: Get Line Item by ID | LTIAAS
url: https://docs.ltiaas.com/api/get-lineitem
source: LTIaaS Documentation
---

# Get Line Item by ID | LTIAAS

-   [](/)
-   Line Items
-   Get Line Item by ID

## Get Line Item by ID[​](#get-line-item-by-id "Direct link to heading")

The LTI® protocol allows you to retrieve a specific grade line from the LMS grade book through the *Assignment and Grades - Line Items* service. In the context of LTI®, these grade lines are called *line items*. LTIAAS gives you access to this service through the `/api/lineitems` API endpoint.

Please check our [Manipulating grade lines guide](/guides/api/manipulating-grade-lines) and its [Retrieving a grade line by its ID section](/guides/api/manipulating-grade-lines#retrieving-a-grade-line-by-its-id) to learn more about using this endpoint.

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

-   200
-   401

* * *

application/json

Schema

Example (from schema)

* * *

**Schema**

**id** string **required**

URL uniquely identifying the result record.

**label** string **required**

The label is a short string with a human readable text for the line item. It MUST be specified and not blank when posted by the tool. A platform must always include the label.

**scoreMaximum** number **required**

**Possible values:** `> 0`

The maximum score for this line item. Maximum score MUST be a numeric non-null value, strictly greater than 0.

**resourceLinkId** string

A line item MAY be attached to a resource link by including a 'resourceLinkId' in the payload. The resource link MUST exist in the context where the line item is created, and MUST be a link owned by the same tool. If not, the line item creation MUST fail with a response code of Not Found 404.

The platform MAY remove the line items attached to a resource link if the resource link itself is removed.

**resourceId** string

A tool MAY identify to which of its resources the line item is attached to by including a non blank value for resourceId in the payload. This value is a string. For example, resourceId can be 'quiz-231' or any other resource identifier uniquely identifying a resource in a given context.

Multiple line items can share the same resourceId within a given context. resourceId must be preserved when a context is copied if the line items are included in the copy.

If no resourceId is defined for a lineitem, the platform may omit this attribute, or include it with a blank or null value.

**tag** string

A tool MAY further qualify a line item by setting a value to tag. The attribute is a string. For example, one assignment resource may have 2 line items, one with tag as 'grade' and the other tagged as 'originality'.

Multiple line items can share the same tag within a given context. tag must be preserved when a context is copied if the line items are included in the copy.

If no tag is defined for a lineitem, the platform may omit this attribute, or include it with a blank or null value.

**startDateTime** date-time

A tool MAY specify the initial start time submissions for this line item can be made by learners. The initial value may subsequently be changed within the platform.

ISO 8601 Date and time when the line item can start receiving submissions.

**endDateTime** date-time

A tool MAY specify the initial end time submissions for this line item can be made by learners. The initial value may subsequently be changed within the platform.

ISO 8601 Date and time when the line item stops receiving submissions.

**gradesReleased** boolean

The tool specifies this optional property when it wishes the grades to be released. It is up to the LMS to decide how to handle this and every LMSes behavior may be different.

```
{  
  "id": "https://lms.example.com/course/1/lineitems/1",  "label": "Activity",  "scoreMaximum": 95,  "resourceLinkId": "1g3k4dlk49fk",  "resourceId": "quiz-231",  "tag": "grade",  "startDateTime": "2022-03-06T20:05:02Z",  "endDateTime": "2022-04-06T22:05:03Z",  "gradesReleased": true}
```

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