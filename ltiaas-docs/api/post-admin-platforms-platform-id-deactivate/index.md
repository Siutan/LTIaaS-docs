---
title: Deactivate Platform by ID | LTIAAS
url: https://docs.ltiaas.com/api/post-admin-platforms-platform-id-deactivate
source: LTIaaS Documentation
---

# Deactivate Platform by ID | LTIAAS

-   [](/)
-   Platforms
-   Deactivate Platform by ID

## Deactivate Platform by ID[​](#deactivate-platform-by-id "Direct link to heading")

Dynamically registered Platforms will be be activated if the the `Auto Activate Dynamically Registered Platforms` option was turned on during the LTIAAS onboarding process.

Any platform can be deactivated using this API.

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

Returns `200` if the Platform is successfully deactivated.

Loading...