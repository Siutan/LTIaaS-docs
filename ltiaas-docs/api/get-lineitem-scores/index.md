---
title: Get Scores from Line Item | LTIAAS
url: https://docs.ltiaas.com/api/get-lineitem-scores
source: LTIaaS Documentation
---

# Get Scores from Line Item | LTIAAS

-   [](/)
-   Scores
-   Get Scores from Line Item

## Get Scores from Line Item[​](#get-scores-from-line-item "Direct link to heading")

The LTI® protocol allows you to retrieves scores from the LMS grade book through the *Assignment and Grades - Results* service. LTIAAS gives you access to this service through the `/api/lineitems/:lineItemID/scores` API endpoint.

Please check our [Manipulating grades guide](/guides/api/manipulating-grades) and its [Retrieving grades section](/guides/api/manipulating-grades#retrieving-grades) to learn more about using this endpoint.

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

**Query Parameters**

**userId** string

Used to to filter the results to a single user. The results MUST contain at most 1 result. An empty array MAY be returned if the user does not have any result recorded.

**limit** integer

**Possible values:** `>= 1`

Used to to restrict the number of results returned; the platform MAY further reduce the number of results returned at its own discretion.

**url** string

Retrieves scores from a specific URL

**Responses**

-   200
-   401

* * *

application/json

Schema

Example (from schema)

* * *

**Schema**

**scores** object\[\] **required**

The platform must return a result record for each user that has a non empty 'resultScore' for the queried upon line item. The platform MAY skip empty results.

-   Array \[

**id** uri **required**

URL uniquely identifying the result record.

**userId** string **required**

The userId contains the LTI® user ID identifying the recipient of the Result (usually a learner). The userId MUST be present.

**scoreOf** uri **required**

URL identifying the Line Item to which this result belongs. Must be the same as the line item id and the value of the lineitem claim when included in the LTI® message.

**timestamp** date-time **required**

The timestamp MUST be present and indicate when the score was changed; it is intended to be used by the platform as a way to guard against out of order score updates. Score timestamp represents the server time when the Score state was modified.

**resultScore** number

The current score for this user. The value must be a numeric value. If no value exists, this attribute may be omitted, or have an explicit null value.

**resultMaximum** number

**Possible values:** `> 0`

The 'resultMaximum' value MUST be a positive number (with 0 considered a negative number); if no value is specified, then a default maximum value of 1 must be used.

**comment** string

The current value for the comment. The value must be a string. If no value exists, this attribute may be omitted, blank or have an explicit null value.

-   \]

**next** uri

A URL pointing to the next page of line items.

**prev** uri

A URL pointing to the previous page of line items.

**first** uri

A URL pointing to the first page of line items.

**last** uri

A URL pointing to the last page of line items.

```
{  
  "scores": [    {      "id": "https://lms.example.com/course/1/lineitems/1/scores/2",      "userId": "2",      "scoreOf": "https://lms.example.com/course/1/lineitems/1",      "timestamp": "2020-06-02T10:51:08-03:00",      "resultScore": 95,      "resultMaximum": 100,      "comment": "string"    }  ],  "next": "https://lms.example.com/course/1/lineitems/1/scores?page=3",  "prev": "https://lms.example.com/course/1/lineitems/1/scores?page=1",  "first": "https://lms.example.com/course/1/lineitems/1/scores?page=1",  "last": "https://lms.example.com/course/1/lineitems/1/scores?page=3"}
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