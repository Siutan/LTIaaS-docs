---
title: Get Platform by ID | LTIAAS
url: https://docs.ltiaas.com/api/get-admin-platforms-id
source: LTIaaS Documentation
---

# Get Platform by ID | LTIAAS

-   [](/)
-   Platforms
-   Get Platform by ID

## Get Platform by ID[​](#get-platform-by-id "Direct link to heading")

Get registered platform by ID

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

Returns an object with a single Platform registration.

application/json

Schema

Example (from schema)

Example

* * *

**Schema**

**url** string **required**

Platform URL

**clientId** string **required**

Platform client ID

**name** string **required**

Platform name

**authenticationEndpoint** string **required**

Platform authentication endpoint

**authConfig** object **required**

Platform token authentication configuration object

**key** string **required**

Platform token authentication key

**method** **required**

**Possible values:** \[`JWK_SET`, `JWK_KEY`, `RSA_KEY`\]

Platform token authentication method. **MUST be one of JWK\_SET, JWK\_KEY or RSA\_KEY**

**accesstokenEndpoint** string **required**

Platform access token endpoint

**id** string **required**

Platform ID

**publicKey** string **required**

Platform public key

**active** boolean **required**

When true, the registration is active and allowed to launch

```
{  
  "url": "string",  "clientId": "string",  "name": "string",  "authenticationEndpoint": "string",  "authConfig": {    "key": "string"  },  "accesstokenEndpoint": "string",  "id": "string",  "publicKey": "string",  "active": true}
```

```
{  
  "url": "https://platform.org",  "clientId": "10000000000001",  "name": "Platform 1",  "authenticationEndpoint": "https://platform.org/lti/authorize",  "authConfig": {    "key": "https://platform.org/lti/security/jwks",    "method": "JWK_SET"  },  "accesstokenEndpoint": "https://platform.org/login/oauth2/token",  "id": "f33d6c450b7632c1ff87586c4f150eee",  "publicKey": "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAymGcob5nh7kKHWCNQ3J6\n4dX5fknKrwCifFtt32ov09IUHWj2WwTSnZOvi43a3IpJ+zCj9dUnW9NF+Axx+s/X\nNUIcJWLAZtf3QkDAChJZeEEsxptFm9bFfKZjXlq1e5XFFetZBgUN0d+KDJYZP8BV\nQ1bAIwRcrwDDqVXdmYJlwfejstSm8oPkW7NJv6HBsqcloJVlwIfl5ltZfAUiKgIP\nuecHkD16ma712VxSDhZALhhtgGNRbur64nfkEWenYjCyECWMEFJBBw+ef2FAR5g/\nWtvzvkHZmoG79p/9eBw1wM09edT/GnXMXrv9CLWaTz7aTrn0GCBSK/K1unBaF8Q4\nbzRDDrbETKSLc9TPbD7xw+RIMOjLnJXUSz/2FfqmJggzzBOnISwQsuFPIK8IaCdS\nM+CHpHuUHMY8cPNgn63HiWEuy9evrny6gAK40pIgCpTGdsf0EYvOYn/kP7wElCDf\nmogRFJKBRH7BN0Syk+aMmt1t4mPP1QTk3HdfUmdZTU3ueeaIJ18m6Kif88wtij4F\n6PZDrs6h5BCEZUtpl78+H030TSm7OrY9SlOPcD/K+4fZlrkiuFc2hhjb1awTHd2I\nGzWZ8ur3Dr7V/Zgdm6Tio33ot8dEhJcKXbC8V1jhiVtewyDGqFSOBTRuhxNIt0/0\n24z6Wb9bMUH/ztaywZjkIesCAwEAAQ==\n-----END PUBLIC KEY-----\n",  "active": true}
```

Loading...