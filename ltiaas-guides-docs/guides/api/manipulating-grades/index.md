---
title: Manipulating grades
url: https://docs.ltiaas.com/guides/api/manipulating-grades
source: LTIaaS Documentation
---

# Manipulating grades

-   [](/)
-   [Using the LTIAAS API](/guides/api/introduction)
-   Manipulating grades

On this page

# Manipulating grades

tip

Make sure you've read about [authenticating API requests](/guides/api/authentication) before proceeding to the guide below.

tip

Make sure you've read about [manipulating grade lines](/guides/api/manipulating-grade-lines) before proceeding to the guide below.

info

The Scores endpoint accepts both the [ltik based](/guides/api/authentication#ltik-based-authentication) and [service key based](/guides/api/authentication#service-key-based-authentication) API authentication methods.

The LTI® protocol allows you to manipulate grades in the LMS grade book through the *Assignment and Grades - Scores and Results* services. LTIAAS gives you access to these services through the `/api/lineitems/:lineItemID/scores` API endpoint.

![Accessing scores API](/assets/ideal-img/flow_scores.a043d6b.1166.png)

![Accessing scores API](/assets/ideal-img/flow_scores_dark.2078d25.1166.png)

Accessing scores API

## The score object[​](#the-score-object "Direct link to heading")

info

This guide focuses on the most common and/or relevant fields of the score object, a detailed description of available fields can be found in the IMS Score Service documentation:

Learning Tools Interoperability (LTI®) Assignment and Grade Services Specification, IMS Final Release Spec Version 2.0, 1EdTech Consortium, April 2019, 3.4 Score publish service, [https://www.imsglobal.org/spec/lti-ags/v2p0/#score-publish-service](https://www.imsglobal.org/spec/lti-ags/v2p0/#score-publish-service).

The *score* is the object used when we want to update the status of a user in a grade line. This can be used not only to submit grades but also to provide feedback and update the status of the activity.

```
{  
  "userId" : "1",  "activityProgress" : "Completed",  "gradingProgress": "FullyGraded",  "scoreGiven" : 95,  "scoreMaximum" : 100}
```

#### userId \[*required*\][​](#userid-required "Direct link to heading")

The `userId` field is the identifier for the user to whom the score belongs.

caution

Some LMSes might restrict grade submissions based on the user role. It's recommended to only submit grades to users with a student role.

#### activityProgress \[*required*\][​](#activityprogress-required "Direct link to heading")

The `activityProgress` field is an indicator of the user's status towards the activity's completion. The values allowed in this field are:

-   `Initialized` - The user has not started the activity, or the activity has been reset for that student.
-   `Started` - The activity associated with the line item has been started by the user to which the result relates.
-   `InProgress` - The activity is being drafted and is available for comment.
-   `Submitted` - The activity has been submitted at least once by the user but the user is still able make further submissions.
-   `Completed` - The user has completed the activity associated with the line item.

#### gradingProgress \[*required*\][​](#gradingprogress-required "Direct link to heading")

The `gradingProgress` field is an indicator of the user's current grading process in the activity. The values allowed in this field are:

-   `FullyGraded` - The grading process is completed; the score value, if any, represents the current Final Grade; the gradebook may display the grade to the learner.
-   `Pending` - Final Grade is pending, but does not require manual intervention; if a Score value is present, it indicates the current value is partial and may be updated.
-   `PendingManual` - Final Grade is pending, and it does require human intervention; if a Score value is present, it indicates the current value is partial and may be updated during the manual grading.
-   `Failed` - The grading could not complete.
-   `NotReady` - There is no grading process occurring; for example, the student has not yet made any submission.

#### scoreGiven[​](#scoregiven "Direct link to heading")

The `scoreGiven` field is the numeric grade that should be assigned to the user. This field is optional as the score can be used to provide feedback or update a task status without assigning a grade. If present, it MUST be positive number (including 0).

#### scoreMaximum[​](#scoremaximum "Direct link to heading")

The `scoreMaximum` field is the maximum grade that can be assigned to the grade line to which the score belongs. **This field is required if `scoreGiven` is present**. If present, it MUST be a numeric non-null value, strictly greater than 0.

## Submitting grades[​](#submitting-grades "Direct link to heading")

tip

In the example bellow, we're hardcoding the line item ID (grade line ID), for information on how you would actually retrieve the correct line item ID for a context, please check the [Retrieving grade lines guide](/guides/api/manipulating-grade-lines#retrieving-grade-lines-for-a-context).

To submit a score to a grade line, you need to make a POST request to the `/api/lineitems/:lineItemID/scores` endpoint of your LTIAAS' account subdomain. The score will be submitted to the grade line (line item) specified in the request URL.

tip

For a description of all accepted fields, as well as possible response statuses, check the [\[POST\] Scores endpoint API Reference](/api/post-lineitem-scores).

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/lineitems/:lineItemID/scores POST request  
const score = {  
  userId: '1',  activityProgress: 'Completed',  gradingProgress: 'FullyGraded',  scoreGiven: 95,  scoreMaximum: 100}  
const lineItemId = 'https://lms.example.com/course/1/lineitems/1'  
const urlSafeLineItemId = encodeURIComponent(lineItemId)  
requests.post(`https://your.ltiaas.com/api/lineitems/${urlSafeLineItemId}/scores`, score, { headers })
```

info

When submitting a score, the `userId`, `activityProgress` and `gradingProgress` fields are required.

A successful response will have a `204` status.

## The result object[​](#the-result-object "Direct link to heading")

info

This guide focuses on the most common and/or relevant fields of the result object, a detailed description of available fields can be found in the IMS Result Service documentation:

Learning Tools Interoperability (LTI®) Assignment and Grade Services Specification, IMS Final Release Spec Version 2.0, 1EdTech Consortium, April 2019, 3.9 Results Service, [https://www.imsglobal.org/spec/lti-ags/v2p0/#result-service](https://www.imsglobal.org/spec/lti-ags/v2p0/#result-service).

The *result* is the object returned when we retrieve the grades of a user from a grade line.

```
{  
  "id": "https://lms.example.com/course/1/lineitems/1/results/1",  "scoreOf": "https://lms.example.com/course/1/lineitems/1",  "userId": "1",  "resultScore": 95,  "resultMaximum": 100,}
```

#### id[​](#id "Direct link to heading")

The `id` field is the identifier for the result.

#### scoreOf[​](#scoreof "Direct link to heading")

The `scoreOf` field is the identifier for the line item to which the result belongs.

#### userId[​](#userid "Direct link to heading")

The `userId` field is the identifier for the user to whom the result belongs.

#### resultScore[​](#resultscore "Direct link to heading")

The `resultScore` field is the numeric grade currently assigned to the user. This field may be empty.

#### resultMaximum[​](#resultmaximum "Direct link to heading")

The `resultMaximum` field is the maximum grade that can be assigned to the grade line to which the result belongs.

## Retrieving grades[​](#retrieving-grades "Direct link to heading")

tip

In the example bellow, we're hardcoding the line item ID (grade line ID), for information on how you would actually retrieve the correct line item ID for a context, please check the [Retrieving grade lines guide](/guides/api/manipulating-grade-lines#retrieving-grade-lines-for-a-context).

To retrieve results from a grade line you need to make a GET request to the `/api/lineitems/:lineItemID/scores` endpoint of your LTIAAS' account subdomain. The results will be retrieved from the grade line (line item) specified in the request URL.

tip

For a description of all accepted query parameters, as well as possible response bodies and statuses, check the [\[GET\] Line Items endpoint API Reference](/api/get-lineitem-scores).

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/lineitems/:lineItemID/scores GET request  
const lineItemId = 'https://lms.example.com/course/1/lineitems/1'  
const urlSafeLineItemId = encodeURIComponent(lineItemId)  
const results = requests.get(`https://your.ltiaas.com/api/lineitems/${urlSafeLineItemId}/scores`, { headers })
```

A successful response will be an object with a `scores` field containing an array of result objects tied to that grade line.

```
{  
  "scores":[    {      "id": "https://lms.example.com/course/1/lineitems/1/results/1",      "scoreOf":"https://lms.example.com/course/1/lineitems/1",      "userId": "1",      "resultScore": 95,      "resultMaximum": 100    },    {      "id":"https://lms.example.com/course/1/lineitems/1/results/2",      "scoreOf":"https://lms.example.com/course/1/lineitems/1",      "userId":"2",      "resultScore":90,      "resultMaximum":100    }  ]}
```

#### Response pagination fields[​](#response-pagination-fields "Direct link to heading")

caution

This functionality might not be supported by every LMS.

The `next`, `prev`, `first` and `last` fields will only be present if there are more results to be retrieved from the grade line. You can read more about this in the [Handling pagination guide](/guides/api/pagination).

```
{  
  "scores": [...],  "next": "https://lms.example.com/course/1/lineitems?page=3",  "prev": "https://lms.example.com/course/1/lineitems?page=1",  "first": "https://lms.example.com/course/1/lineitems?page=1",  "last": "https://lms.example.com/course/1/lineitems?page=4"}
```

### Filtering grades by the user ID[​](#filtering-grades-by-the-user-id "Direct link to heading")

If you want to retrieve only the grades belonging to a specific user, you can populate the `userId` query parameter.

tip

The ID for a user can be retrieved from the `idtoken.user.id` field of the [ID Token](/guides/api/idtoken).

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/idtoken GET request  
const idtoken = requests.get('https://your.ltiaas.com/api/idtoken', { headers })  
const userId = response['user']['id']  
// Making /api/lineitems/:lineItemID/scores GET request  
const lineItemId = 'https://lms.example.com/course/1/lineitems/1'  
const urlSafeLineItemId = encodeURIComponent(lineItemId)  
const results = requests.get(`https://your.ltiaas.com/api/lineitems/${urlSafeLineItemId}/scores?userId=${userId}`, { headers })
```

## Checking service availability[​](#checking-service-availability "Direct link to heading")

The *Assignment and Grades* service might not be available for every LTI® launch context. Before attempting to manipulate grades you can [make a call to the ID Token endpoint](/guides/api/idtoken) and check the [services section](/guides/api/idtoken#assignmentandgrades) to know if the service is available.

You can know if the service is available based on the value of the `idtoken.services.assignmentAndGrades.available` boolean field:

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/idtoken GET request  
const idtoken = requests.get('https://your.ltiaas.com/api/idtoken', { headers })  
const isServiceAvailable = idtoken['services']['assignmentAndGrades']['available']  

if (isServiceAvailable) {  
  // Making /api/lineitems/:lineItemID/scores GET request  const lineItemId = 'https://lms.example.com/course/1/lineitems/1'  const urlSafeLineItemId = encodeURIComponent(lineItemId)  const results = requests.get(`https://your.ltiaas.com/api/lineitems/${urlSafeLineItemId}/scores`, { headers })}
```

**Tags:**

-   [API](/tags/api)
-   [Grades](/tags/grades)
-   [Grade lines](/tags/grade-lines)
-   [Tutorials](/tags/tutorials)