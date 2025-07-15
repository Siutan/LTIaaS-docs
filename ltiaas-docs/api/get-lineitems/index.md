---
title: Get Line Items | LTIAAS
url: https://docs.ltiaas.com/api/get-lineitems
source: LTIaaS Documentation
---

# Get Line Items | LTIAAS

-   [](/)
-   Line Items
-   Get Line Items

## Get Line Items[​](#get-line-items "Direct link to heading")

The LTI® protocol allows you to retrieve grade lines from the LMS grade book through the *Assignment and Grades - Line Items* service. In the context of LTI®, these grade lines are called *line items*. LTIAAS gives you access to this service through the `/api/lineitems` API endpoint.

Please check our [Manipulating grade lines guide](/guides/api/manipulating-grade-lines) and its [Retrieving grade lines section](/guides/api/manipulating-grade-lines#retrieving-grade-lines-for-an-lti-context) to learn more about using this endpoint.

API Authentication Method

Supported

[`LTIK-AUTH-V2`](/guides/api/authentication#ltik-based-authentication)

✅

[`SERVICE-AUTH-V1`](/guides/api/authentication#service-key-based-authentication)

✅

[`Bearer`](/guides/api/authentication#bearer-api-key-based-authentication)

**Query Parameters**

**resourceLinkId** string

Filters line items by the resource link ID attached to the current launch context

**resourceId** string

Filters line items by resourceId

**tag** string

Filters line items by tag

**limit** integer

**Possible values:** `>= 1`

Limits the number of line items returned. the platform MAY further reduce the number of items returned at its own discretion.

**url** uri

Retrieves line items from a specific URL. - *When present, the `url` parameter causes every other parameter to be ignored.* - The `url` parameter should be URL encoded. - In cases where not all line items are retrieved when the line item limit is reached, the returned object will contain a `next` field holding an URL that can be used to retrieve the remaining line items through the `url` parameter.

**Responses**

-   200
-   401

* * *

application/json

Schema

Example (from schema)

* * *

**Schema**

**lineItems** object\[\] **required**

An array of line items.

-   Array \[

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

ISO 8601 Date and time when the line item can start receiving submission.

**endDateTime** date-time

A tool MAY specify the initial end time submissions for this line item can be made by learners. The initial value may subsequently be changed within the platform.

ISO 8601 Date and time when the line item stops receiving submissions.

**gradesReleased** boolean

The tool specifies this optional property when it wishes the grades to be released. It is up to the LMS to decide how to handle this and every LMSes behavior may be different.

-   \]

**next** uri

A URL pointing to the next page of line items.

**first** uri

A URL pointing to the first page of line items.

**last** uri

A URL pointing to the last page of line items.

**prev** uri

A URL pointing to the previous page of line items.

```
{  
  "lineItems": [    {      "id": "https://lms.example.com/course/1/lineitems/1",      "label": "Activity",      "scoreMaximum": 100,      "resourceLinkId": "1g3k4dlk49fk",      "resourceId": "a-9334df-33",      "tag": "grade",      "startDateTime": "2025-01-09T04:06:33.928Z",      "endDateTime": "2018-04-06T22:05:03Z",      "gradesReleased": true    }  ],  "next": "https://lms.example.com/course/1/lineitems?pages=2",  "first": "https://lms.example.com/course/1/lineitems?pages=1",  "last": "https://lms.example.com/course/1/lineitems?pages=3",  "prev": "string"}
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