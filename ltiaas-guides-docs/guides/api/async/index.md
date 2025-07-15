---
title: Accessing the API asynchronously
url: https://docs.ltiaas.com/guides/api/async
source: LTIaaS Documentation
---

# Accessing the API asynchronously

-   [](/)
-   [Using the LTIAAS API](/guides/api/introduction)
-   Accessing the API asynchronously

On this page

# Accessing the API asynchronously

caution

Due to the nature of LTI®, it's recommended to always utilize the services synchoronously, within the context of an LTI® launch. For most use cases it should be enough and a lot easier to trigger periodic tasks when someone launches to your tool.

Some of the LTI® services might be useful to access outside of the context of an LTI® launch. For example, you might want to run a cron job daily to submit students grades.

Since the `ltik` token used in the [ltik based API authentication method](/guides/api/authentication#ltik-based-authentication) expires after **24 hours**, it's not ideal for this kind of use case. Instead, you can use the `serviceKey` token detailed in the [service key based API authentication method](/guides/api/authentication#service-key-based-authentication) to call the LTIAAS service API asynchronously.

![Using service key to access the LTIAAS API](/assets/ideal-img/flow_service_key.d7bcfd1.1142.png)

![Using service key to access the LTIAAS API](/assets/ideal-img/flow_service_key_dark.799c6b9.1142.png)

Using service key to access the LTIAAS API

## Retrieving the service key[​](#retrieving-the-service-key "Direct link to heading")

After receiving an LTI® launch you can use the [ltik based authentication](/guides/api/authentication#ltik-based-authentication) to [retrieve an ID Token](/guides/api/idtoken). If the current LTI® launch context has access to at least one of the *Assignment and Grades* or *Names and Roles Provisioning* LTI® services, the ID Token you retrieved will have an `idtoken.services.serviceKey` field.

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/idtoken GET request  
const response = requests.get('https://your.ltiaas.com/api/idtoken', { headers })  
// Retrieving service key  
const serviceKey = response['services']['serviceKey']
```

## Storing the service key[​](#storing-the-service-key "Direct link to heading")

Each `serviceKey` represents a single LTI® launch context, which usually translates to an activity in the LMS. So you need to be mindful of that when storing and using these tokens. Calling the API using a certain `serviceKey` will yield results from the launch context that it's associated with.

Ideally you want to store the `serviceKey` in your database along with the, **resource link ID**, **context ID** and **platform (LMS) ID** that originated it.

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/idtoken GET request  
const response = requests.get('https://your.ltiaas.com/api/idtoken', { headers })  
// Retrieving service key and context and platform IDs  
const serviceKey = response['services']['serviceKey']  
const resourceLinkId = response['launch']['resourceLink']['id']  
const contextId = response['launch']['context']['id']  
const platformId = response['platform']['id']  

storeServiceKeyInDatabase(resourceLinkId, contextId, platformId, serviceKey)
```

caution

The `serviceKey` does not expire, however, due to the nature of LTI®, the information stored within a certain `serviceKey` might become inaccurate at some point and this will likely cause API requests to fail. For this reason it's recommended to always update the `serviceKey` for a certain context **on every launch**.

tip

It also makes sense to store the context IDs along side activity and grading information on your application, so you can know which `serviceKey` to use when calling the API to perform an action.

## Using the service key[​](#using-the-service-key "Direct link to heading")

Once you have a `serviceKey` stored, you can use it to perform the LTIAAS service API calls by using the [service key based API authentication method](/guides/api/authentication#service-key-based-authentication).

*Synchronizing grades example:*

```
const getLineItem = (headers, resourceLinkId) => {  
  // Making /api/lineitems GET request to get line item for resource link  const url = `https://your.ltiaas.com/api/lineitems?resourceLinkId=${resourceLinkId}`  const lineitems = requests.get(url, { headers })  return encodeURIComponent(lineitems[0]['id'])}  

const sendGrade = (headers, lineItemId, grade) => {  
  // Making /api/lineitems/<id>/scores POST request to sync grades  const score = {    userId: grade.userId,    scoreGiven: grade.score,    activityProgress: 'Completed',    gradingProgress: 'FullyGraded'  }  requests.post(`https://your.ltiaas.com/api/lineitems/${lineItemId}/scores`, score, { headers })}  

const syncGrades = (activity) => {  
  // Get service key for activity  const serviceKey = getServiceKeyFromDatabase(activity)  // Building service key based API authentication header  const authorizationHeader = `SERVICE-AUTH-V1 ${API_KEY}:${serviceKey}`  const headers = { Authorization: authorizationHeader }  // Get line item ID for activity  const lineItemId = getLineItem(headers, activity.resourceLinkId)  // Send grades  for (const grade of activity.grades) {    sendGrade(headers, lineItemId, grade)  }}  

// This task runs once a day  
const activities = getAcvivitiesFromDatabase()  
for (const activity of activities) {  
  syncGrades(activity)}
```

**Tags:**

-   [API](/tags/api)
-   [Async](/tags/async)
-   [Tutorials](/tags/tutorials)