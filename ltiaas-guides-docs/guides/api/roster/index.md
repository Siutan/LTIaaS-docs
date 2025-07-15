---
title: Retrieving course roster
url: https://docs.ltiaas.com/guides/api/roster
source: LTIaaS Documentation
---

# Retrieving course roster

-   [](/)
-   [Using the LTIAAS API](/guides/api/introduction)
-   Retrieving course roster

On this page

# Retrieving course roster

tip

Make sure you've read about [authenticating API requests](/guides/api/authentication) before proceeding to the guide below.

info

The Memberships endpoint accepts both the [ltik based](/guides/api/authentication#ltik-based-authentication) and [service key based](/guides/api/authentication#service-key-based-authentication) API authentication methods.

The LTI® protocol allows you to retrieve roster information for an LMS context through the *Names and Roles Provisioning* service. Users that are part of an LMS context are called *members*. LTIAAS gives you access to this service through the `/api/memberships` API endpoint.

![Retrieving course roster](/assets/ideal-img/flow_memberships.3ed6e18.1118.png)

![Retrieving course roster](/assets/ideal-img/flow_memberships_dark.d106714.1118.png)

Retrieving course roster

## The membership object[​](#the-membership-object "Direct link to heading")

info

This guide focuses on the most common and/or relevant fields of the membership object, a detailed description of available fields can be found in the IMS Context Membership documentation:

Learning Tools Interoperability Names and Role Provisioning Services, 1EdTech Final Release Version 2.0, 1EdTech Consortium, April 2019, 2. Context Membership, [https://www.imsglobal.org/spec/lti-nrps/v2p0#context-membership](https://www.imsglobal.org/spec/lti-nrps/v2p0#context-membership)

The *membership* is the LTI® representation of a user in a certain LMS context. Each membership contains information about the user and their status and role within that context.

```
{  
  "userId": "2",  "email": "user@email.com",  "name": "John Doe",  "roles": [...],  "status": "Active"}
```

info

Fields containing personal information like `name` and `email` might not be present in the memberships information. The LMS can choose to omit this information based on their privacy rules. The only fields guaranteed to be present in this section are `userId` and `roles`.

#### userId[​](#userid "Direct link to heading")

The `userId` field contains the user's identifier inside of the LMS. This ID will probably not be unique between LMSes, so it's not recommended to be used alone as a primary identifier. We go into more detail on this topic in the [Performing SSO guide](/guides/api/idtoken#performing-sso).

#### email[​](#email "Direct link to heading")

The `email` field contains the user's registered email inside of the LMS.

#### name[​](#name "Direct link to heading")

The `name` field contains the user's registered full name.

#### roles[​](#roles "Direct link to heading")

The `roles` field contains a list of the user's roles within this specific launch context.

tip

A list of all possible roles can be found in the IMS Role Vocabulary:

Learning Tools Interoperability Core Specification, IMS Final Release Spec Version 1.3, 1EdTech Consortium, April 2019, A.2 Role vocabularies, [https://www.imsglobal.org/node/162741#role-vocabularies](https://www.imsglobal.org/node/162741#role-vocabularies)

#### status[​](#status "Direct link to heading")

The `status` field contains the user's current status within this specific launch context. The value of this field can either be `Active` or `Inactive`.

## Calling the Memberships endpoint[​](#calling-the-memberships-endpoint "Direct link to heading")

To retrieve the memberships related to the context that originated an LTI® launch, you need to make a GET request to the `/api/memberships` endpoint of your LTIAAS' account subdomain.

tip

For a description of all accepted query parameters, as well as possible response bodies and statuses, check the [\[GET\] Memberships endpoint API Reference](/api/get-memberships).

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/memberships GET request  
const response = requests.get('https://your.ltiaas.com/api/memberships', { headers })  
const members = response['members']
```

A successful response will be an object with a `members` field containing an array of membership objects tied to that LTI® context.

```
{  
  "id": "https://lms.example.com/course/1/memberships?page=1",  "context": {...},  "members": [    {      "userId": "2",      "email": "user@email.com",      "name": "John Doe",      "roles": ["Learner"],      "status": "Active"    },    {      "userId": "3",      "email": "another_user@email.com",      "name": "Bob Doe",      "roles": ["Administrator", "Instructor"],      "status": "Active"    }  ]}
```

The response will also contain an `id` field, containing the ID for the current memberships page. And a `context` object, containing information about the LTI® context that originated the launch.

tip

You can find more information about the `context` object in the [ID Token context field documentation](/guides/api/idtoken#context) as the object here is the same as the one present in the ID Token.

#### Response pagination field[​](#response-pagination-field "Direct link to heading")

caution

This functionality might not be supported by every LMS.

The `next` field will only be present if there are more memberships to be retrieved from the context. You can read more about this in the [Handling pagination guide](/guides/api/pagination).

```
{  
  "id": "https://lms.example.com/course/1/memberships?page=1",  "context": {...},  "members": [...],  "next": "https://lms.example.com/course/1/memberships?page=2"}
```

### Filtering results by user role[​](#filtering-results-by-user-role "Direct link to heading")

caution

This functionality might not be supported by every LMS.

You can filter membership results by a specific role by sending the `?role=<ROLE>` query parameter when calling the `/api/memberships` endpoint.

tip

A list of all possible roles can be found in the IMS Role Vocabulary: Learning Tools Interoperability Core Specification, IMS Final Release Spec Version 1.3, 1EdTech Consortium, April 2019, A.2 Role vocabularies, [https://www.imsglobal.org/node/162741#role-vocabularies](https://www.imsglobal.org/node/162741#role-vocabularies)

Most roles in the vocabulary are represented by URLs, so their value needs to be URL encoded to be safely sent as a query parameter. :::

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/memberships GET request  
const role = encodeURIComponent('http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor')  
const response = requests.get(`https://your.ltiaas.com/api/memberships?role=${role}`, { headers })  
const members = response['members']
```

### Filtering results by activity access[​](#filtering-results-by-activity-access "Direct link to heading")

caution

This functionality might not be supported by every LMS.

You can filter membership results by users that have access to an activity in the LMS. You can achieve this by sending the `?resourceLinkId=<RESOURCE_LINK_ID>` query parameter when calling the `/api/memberships` endpoint.

tip

The resource link ID for an activity can be retrieved from the `idtoken.launch.resourceLink.id` field of the [ID Token](/guides/api/idtoken) generated by launching the LTI® tool from that activity.

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/idtoken GET request  
const idtoken = requests.get('https://your.ltiaas.com/api/idtoken', { headers })  
const resourceLinkId = idtoken['launch']['resourceLink']['id']  
// Making /api/memberships GET request  
const response = requests.get(`https://your.ltiaas.com/api/memberships?resourceLinkId=${resourceLinkId}`, { headers })  
const members = response['members']
```

## Checking service availability[​](#checking-service-availability "Direct link to heading")

The *Names and Roles Provisioning* service might not be available for every LTI® launch context. Before attempting to retrieve memberships you can [make a call to the ID Token endpoint](/guides/api/idtoken) and check the [services section](/guides/api/idtoken#namesandroles) to know if the service is available.

You can know if the service is available based on the value of the `idtoken.services.namesAndRoles.available` boolean field:

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/idtoken GET request  
const idtoken = requests.get('https://your.ltiaas.com/api/idtoken', { headers })  
const isServiceAvailable = idtoken['services']['namesAndRoles']['available']  

if (isServiceAvailable) {  
  // Making /api/memberships GET request  const response = requests.get(`https://your.ltiaas.com/api/memberships`, { headers })  const members = response['members']}
```

**Tags:**

-   [API](/tags/api)
-   [Memberships](/tags/memberships)
-   [Tutorials](/tags/tutorials)