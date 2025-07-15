---
title: Activate Platform by ID | LTIAAS
url: https://docs.ltiaas.com/api/post-admin-platforms-platform-id-activate
source: LTIaaS Documentation
---

# Activate Platform by ID | LTIAAS

-   [](/)
-   Platforms
-   Activate Platform by ID

## Activate Platform by ID[​](#activate-platform-by-id "Direct link to heading")

Dynamically registered Platforms have to be activated if the the `Auto Activate Dynamically Registered Platforms` option was turned off during the LTIAAS onboarding process.

Any platform can be activated using this API.

API Authentication Method

Supported

[`LTIK-AUTH-V2`](/guides/api/authentication#ltik-based-authentication)

[`SERVICE-AUTH-V1`](/guides/api/authentication#service-key-based-authentication)

[`Bearer`](/guides/api/authentication#bearer-api-key-based-authentication)

✅

**Path Parameters**

**platformID** string **required**

The platform ID

**Responses**

-   200

* * *

Returns `200` if the Platform is successfully activated.

Loading...