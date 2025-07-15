---
title: Submit Scores to Line Item | LTIAAS
url: https://docs.ltiaas.com/api/post-lineitem-scores
source: LTIaaS Documentation
---

# Submit Scores to Line Item | LTIAAS

-   [](/)
-   Scores
-   Submit Scores to Line Item

## Submit Scores to Line Item[​](#submit-scores-to-line-item "Direct link to heading")

The LTI® protocol allows you to submit scores to the LMS grade book through the *Assignment and Grades - Scores* service. LTIAAS gives you access to this service through the `/api/lineitems/:lineItemID/scores` API endpoint.

Please check our [Manipulating grades guide](/guides/api/manipulating-grades) and its [Submitting grades](/guides/api/manipulating-grades#submitting-grades) to learn more about using this endpoint.

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

application/json

**Request Body**

**userId** string **required**

The LTI® user ID identifying the recipient of the Score (usually a learner).

**activityProgress** string **required**

**Possible values:** \[`Initiated`, `Started`, `InProgress`, `Submitted`, `Completed`\]

Used to indicate to the tool platform the status of the user towards the activity's completion.

**gradingProgress** string **required**

**Possible values:** \[`FullyGraded`, `Pending`, `PendingManual`, `Failed`, `NotReady`\]

Used to indicate to the platform the status of the grading process, including allowing to inform when human intervention is needed.

**scoreGiven** number

All scoreGiven values MUST be positive number (including 0). scoreMaximum represents the denominator and MUST be present when scoreGiven is present. When scoreGiven is not present or null, this indicates there is presently no score for that user, and the platform should clear any previous score value it may have previously received from the tool and stored for that user and line item.

The platform MUST support scoreGiven higher than scoreMaximum. For example, if the tool passes normalized score, ranging from 0 to 1, the scoreMaximum would be 1. scoreGiven: 1.1 would be a valid score.

A scoreGiven MAY be used to pass actual points value, in which case a value for scoreMaximum would be the maximum points possible for that student. For example, the tool MAY pass scoreGiven: 1, scoreMaximum: 3 instead of scoreGiven: 0.33333, scoreMaximum: 1.

Usually a platform will just re-scale the value to the line item's scoreMaximum. For example, if the line item maximum is 6 in the above example, then it would show 2 points as the given score; accordingly, the result would contain resultScore of 2 and resultMaximum of 6.

**scoreMaximum** number

The 'scoreMaximum' value MUST be a positive number (not including 0). This field is required if the 'scoreGiven' value is present.

**comment** string

comment is intended to be seen by both the student and the instructors. This specification does not support an history of comments; the platform MUST update its comment with every score update. If a score update does not contain a comment, a blank or null, then the comment value MUST be cleared in the platform if the previously recorded comment was also a comment sent from the tool.

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