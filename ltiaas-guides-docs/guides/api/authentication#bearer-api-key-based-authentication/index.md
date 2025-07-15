---
title: Authenticating API requests
url: https://docs.ltiaas.com/guides/api/authentication#bearer-api-key-based-authentication
source: LTIaaS Documentation
---

# Authenticating API requests

-   [](/)
-   [Using the LTIAAS API](/guides/api/introduction)
-   Authenticating API requests

On this page

# Authenticating API requests

caution

LTIAAS API endpoints **must** only be called from your application's back-end. Authenticated API requests will include your API key, so making them from the front-end might result in your credentials getting leaked.

## Ltik based authentication[​](#ltik-based-authentication "Direct link to heading")

![Using ltik token to access the LTIAAS API](/assets/ideal-img/flow_ltik.fea24ac.1118.png)

![Using ltik token to access the LTIAAS API](/assets/ideal-img/flow_ltik_dark.9f75f8c.1118.png)

Using ltik token to access the LTIAAS API

During an LTI® launch, LTIAAS will perform the LTI® protocol authentication flow and then redirect the user to your application, this redirection will also append a query parameter called `ltik` to your account's registered target launch URL:

> [https://your.tool.com/launch?ltik=eyJhbGciOiJIUzI1NiIs](https://your.tool.com/launch?ltik=eyJhbGciOiJIUzI1NiIs)...

This token represents a single LTI® launch and allows LTIAAS to store and retrieve information specific to that launch context. You can then combine your account's `API Key` and the `ltik` token received to build the following authorization header:

```
Authorization: LTIK-AUTH-V2 <API_KEY>:<LTIK>
```

Example:

```
Authorization: LTIK-AUTH-V2 df06d55e-3b0f-4121-b60f-c39469b5b550:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0
```

caution

The `ltik` token represents a single LTI® launch, therefore each token must only be used in requests made within the same launch context in which it was generated. Using an `ltik` token outside of its originating context can cause unexpected behavior and provide outdated information.

caution

Due to the nature of LTI®, the ID Token related to a launch should not be trusted after some time, for this reason each `ltik` token **expires after 24 hours.**

The ltik based authentication schema is accepted by all of the LTIAAS service API endpoints.

## Service key based authentication[​](#service-key-based-authentication "Direct link to heading")

![Using service key to access the LTIAAS API](/assets/ideal-img/flow_service_key.d7bcfd1.1142.png)

![Using service key to access the LTIAAS API](/assets/ideal-img/flow_service_key_dark.799c6b9.1142.png)

Using service key to access the LTIAAS API

If you need to make API requests outside of the context of an LTI® launch, you can use the service key based authentication schema.

caution

Due to the nature of LTI®, it's recommended to always utilize the services synchoronously, within the context of an LTI® launch. For most use cases it should be enough and a lot easier to trigger periodic tasks when someone launches to your tool.

After receiving an LTI® launch you can use the [ltik based authentication](#ltik-based-authentication) to [retrieve an ID Token](/guides/api/idtoken). If the current LTI® launch context has access to at least one of the *Assignment and Grades* or *Names and Roles Provisioning* LTI® services, the ID Token you retrieved will have an `idtoken.services.serviceKey` field.

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/idtoken GET request  
const response = requests.get('https://your.ltiaas.com/api/idtoken', { headers })  
// Retrieving service key  
const serviceKey = response['services']['serviceKey']
```

You can then combine your account's `API Key` with the `serviceKey` retrieved to build the following authorization header.

```
Authorization: SERVICE-AUTH-V1 <API_KEY>:<SERVICE_KEY>
```

Example:

```
Authorization: SERVICE-AUTH-V1 df06d55e-3b0f-4121-b60f-c39469b5b550:eyJhbGcieyJzdWIiOiIxMjM0.OiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

info

Unlike the `ltik` token, the `serviceKey` will not expire after 24 hours and can be used outside of an LTI® launch. This allows you to, for example, run a cron job to synchronize grades once a day.

It's important to note that each `serviceKey` represents a single LTI® launch context, which usually translates to an activity in the LMS. So you need to be mindful of that when storing and using these tokens. Calling the API using a certain `serviceKey` will yield results from the launch context that it's associated with.

tip

You can learn more about using the service key based API authentication method in the [Accessing the API asynchronously guide](/guides/api/async).

## Bearer API key based authentication[​](#bearer-api-key-based-authentication "Direct link to heading")

A select few API endpoints are not related to an LTI launch context, such as during dynamic registration. Therefore, an LTIK or service key is not available. Only the API key needs to be sent in the form of a Bearer token.

```
Authorization: Bearer <API_KEY>
```

Example:

```
Authorization: Bearer df06d55e-3b0f-4121-b60f-c39469b5b550
```

**Tags:**

-   [API](/tags/api)
-   [Authentication](/tags/authentication)
-   [Tutorials](/tags/tutorials)