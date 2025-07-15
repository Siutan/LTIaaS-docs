---
title: LTIAAS
url: https://docs.ltiaas.com/api/ltiaas
source: LTIaaS Documentation
---

# LTIAAS

-   [](/)
-   Introduction

On this page

Version: 2.0

# LTIAAS

The **LTIAAS** API allows you to easily access the various LTI® 1.3 Advantage services and functionalities like SSO, grade manipulation and roster retrieval.

## Using the LTIAAS API[​](#using-the-ltiaas-api "Direct link to heading")

To learn how to use our API to build your very own LTI® integration, please check our detailed guides.

### Retrieve the ID Token and perform SSO[​](#retrieve-the-id-token-and-perform-sso "Direct link to heading")

The ID Token is the main piece of data in the LTI® protocol, it's sent by the LMS to the LTI® tool and contains information regarding the current LTI® launch, this includes user information, LMS information, launch context information and everything you need to use the many LTI® services.

You can use the information contained in the ID Token to perform SSO and authenticate users into your application, automatically logging them into a preexisting account or provisioning a new one on the spot. To learn more about this, please check our [Retrieving ID Token guide](/guides/api/idtoken) and its [Performing SSO section](/guides/api/idtoken#performing-sso).

### Retrieve roster information[​](#retrieve-roster-information "Direct link to heading")

The LTI® protocol allows you to retrieve roster information for an LMS context through the *Names and Roles Provisioning* service. LTIAAS gives you access to this service through the Memberships API endpoint. To learn more about this functionality, please check our [Retrieving course roster guide](/guides/api/roster).

### Manipulate user grades[​](#manipulate-user-grades "Direct link to heading")

The LTI® protocol allows you to manipulate user's grades and LMS grade lines through the *Assignment and Grades* service. LTIAAS gives you access to this service through the Line Items API endpoint. To learn more about this functionality, please check our [Manipulating grade lines guide](/guides/api/manipulating-grade-lines) and [Manipulating grades guide](/guides/api/manipulating-grades).

### Serve multiple resources through your LTI® tool[​](#serve-multiple-resources-through-your-lti-tool "Direct link to heading")

If your application is a hub of multiple resources and/or activities, the LTI® protocol makes this easy to manage through the *Deep Linking* service. You can use this service to allow teachers and administrators to select one specific resource from your application when creating an activity in the LMS. LTIAAS gives you access to this service through the Deep Linking flow and API endpoint. To learn more about this functionality, please check our [Performing Deep Linking guide](/guides/api/deeplinking).

## Authenticating API requests[​](#authenticating-api-requests "Direct link to heading")

Please check our guide on [Authenticating API requests](/guides/api/authentication) to learn about how authentication works in the LTIAAS API.

## Authentication[​](#authentication "Direct link to heading")

API Key: LTIK-AUTH-V2

API Key: SERVICE-AUTH-V1

* * *

An http Header who's value is of the format: `LTIK-AUTH-V2 <API_KEY>:<ltik>`. Where <API\_KEY\> should be replaced with your static API Key provided by LTIAAS and <ltik\> is the ltik value passed to you on each new launch of your tool. Learn more about this in the [Authenticating API requests](/guides/api/authentication) guide.

Security Scheme Type:

apiKey

Header parameter name:

Authorization

An http Header who's value is of the format: `SERVICE-AUTH-V1 <API_KEY>:<SERVICE_KEY>`. Where <API\_KEY\> should be replaced with your static API Key provided by LTIAAS and <SERVICE\_KEY\> is the service key value obtained from an idtoken. Learn more about this in the [Authenticating API requests](/guides/api/authentication) guide.

Security Scheme Type:

apiKey

Header parameter name:

Authorization

### Contact

LTIAAS Support: [support@ltiaas.com](mailto:support@ltiaas.com)URL: [https://ltiaas.com](https://ltiaas.com)

### Terms of Service

[https://ltiaas.com/terms](https://ltiaas.com/terms)

### License

[BSD-3-Clause](https://opensource.org/license/bsd-3-clause)