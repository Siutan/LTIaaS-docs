---
title: Get ID Token | LTIAAS
url: https://docs.ltiaas.com/api/get-idtoken
source: LTIaaS Documentation
---

# Get ID Token | LTIAAS

-   [](/)
-   ID Token
-   Get ID Token

## Get ID Token[​](#get-id-token "Direct link to heading")

The ID Token is the main piece of data in the LTI® protocol, it's sent by the LMS to the LTI® tool and contains information regarding the current LTI® launch, this includes user information, LMS information, launch context information and everything you need to use the many LTI® services.

LTIAAS gives you access to a launch specific ID Token, formatted for easy of use, through the `/api/idtoken` API endpoint.

Please check our [Retrieving the ID Token guide](/guides/api/idtoken) to learn more about using this endpoint.

API Authentication Method

Supported

[`LTIK-AUTH-V2`](/guides/api/authentication#ltik-based-authentication)

✅

[`SERVICE-AUTH-V1`](/guides/api/authentication#service-key-based-authentication)

[`Bearer`](/guides/api/authentication#bearer-api-key-based-authentication)

**Query Parameters**

**raw** boolean

If true, returns an unformatted version of the ID token.

**Responses**

-   200
-   401

* * *

application/json

Schema

Example (from schema)

* * *

**Schema**

**user** object **required**

User information

**id** string **required**

User ID as defined in the LMS

**roles** string\[\] **required**

**Possible values:** \[`Administrator`, `Student`, `Learner`, `Instructor`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#Administrator`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#None`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#AccountAdmin`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#Creator`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#SysAdmin`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#SysSupport`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#User`, `http://purl.imsglobal.org/vocab/lti/system/person#TestUser`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Administrator`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Faculty`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Guest`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#None`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Other`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Staff`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Student`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Alumni`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Instructor`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Learner`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Member`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Mentor`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Observer`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#ProspectiveStudent`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Administrator`, `http://purl.imsglobal.org/vocab/lis/v2/membership#ContentDeveloper`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Learner`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Mentor`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Manager`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Member`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Officer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#Administrator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#Developer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#ExternalDeveloper`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#ExternalSupport`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#ExternalSystemAdministrator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#Support`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#SystemAdministrator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#ContentDeveloper`, `http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#ContentExpert`, `http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#ExternalContentExpert`, `http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#Librarian`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#ExternalInstructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#Grader`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#GuestInstructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#Lecturer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#PrimaryInstructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#SecondaryInstructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistant`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantGroup`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantOffering`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantSection`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantSectionAssociation`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantTemplate`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#ExternalLearner`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#GuestLearner`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#Instructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#Learner`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#NonCreditLearner`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#AreaManager`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#CourseCoordinator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#ExternalObserver`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#Manager`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#Observer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Member#Member`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Advisor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Auditor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalAdvisor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalAuditor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalLearningFacilitator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalMentor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalReviewer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalTutor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#LearningFacilitator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Mentor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Reviewer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Tutor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Chair`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Communications`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Secretary`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Treasurer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Vice-Chair`\], `>= 1`

The required https://purl.imsglobal.org/spec/lti/claim/roles claim's value contains a (possibly empty) array of URI values for roles that the user has within the message's associated context.

If this list is not empty, it MUST contain at least one role from the role vocabularies described in role vocabularies.

**email** email

End-User's preferred e-mail address. Its value MUST conform to the RFC 5322 addr-spec syntax. The RP MUST NOT rely upon this value being unique. It should be combined with platform.id and launch.context.id to guarantee uniqueness of the user.

**name** string

End-User's full name in displayable form including all name parts, possibly including titles and suffixes, ordered according to the End-User's locale and preferences.

**givenName** string

Given name(s) or first name(s) of the End-User. Note that in some cultures, people can have multiple given names; all can be present, with the names being separated by space characters.

**familyName** string

Surname(s) or last name(s) of the End-User. Note that in some cultures, people can have multiple family names or no family name; all can be present, with the names being separated by space characters.

**platform** object **required**

An object containing information about the LMS.

**id** string **required**

The platform ID as registrered within LTIAAS.

**url** string **required**

The URL of.

**clientId** string **required**

Platform generated Client ID.

**deploymentId** string **required**

Platform generated Deployment ID.

**name** string **required**

Platform name.

**guid** string

A stable locally unique to the iss identifier for an instance of the tool platform. The value of guid is a case-sensitive string that MUST NOT exceed 255 ASCII characters in length. The use of Universally Unique IDentifier (UUID) defined in RFC4122 is recommended.

**productFamilyCode** string

Platform family code.

**version** string

Platform version.

**description** string

Platform description.

**contactEmail** email

Administrative contact email for the platform.

**launch** object

Launch context information.

**type** string **required**

**Possible values:** \[`LtiResourceLinkRequest`\]

contains a string that indicates the type of the sender's LTI® message. For conformance with this specification, the claim must have the value LtiResourceLinkRequest.

**target** uri **required**

The target link URI is the actual endpoint for the LTI® resource to display; for example, the url in Deep Linking ltiResourceLink items, or the launch\_url in IMS Common Cartridges, or any launch URL defined in the tool configuration.

**context** object

The optional [https://purl.imsglobal.org/spec/lti/claim/context](https://purl.imsglobal.org/spec/lti/claim/context) claim composes properties for the context from within which the resource link launch occurs. While this is technically optional, all major LMSes send it.

**id** string **required**

Stable identifier that uniquely identifies the context from which the LTI® message initiates.

**label** string

Short descriptive name for the context. This often carries the "course code" for a course offering or course section context.

**title** string

Full descriptive name for the context. This often carries the "course title" or "course name" for a course offering context.

**type** string\[\] **required**

**Possible values:** \[`http://purl.imsglobal.org/vocab/lis/v2/course#CourseTemplate`, `CourseTemplate`, `urn:lti:context-type:ims/lis/CourseTemplate`, `http://purl.imsglobal.org/vocab/lis/v2/course#CourseOffering`, `CourseOffering`, `urn:lti:context-type:ims/lis/CourseOffering`, `http://purl.imsglobal.org/vocab/lis/v2/course#CourseSection`, `CourseSection`, `urn:lti:context-type:ims/lis/CourseSection`, `http://purl.imsglobal.org/vocab/lis/v2/course#Group`, `Group`, `urn:lti:context-type:ims/lis/Group`\]

An array of URI values for context types. If present, the array MUST include at least one context type from the [context type vocabulary](https://www.imsglobal.org/spec/lti/v1p3#context-type-vocabulary) described in context type vocabulary. If the sender of the message wants to include a context type from another vocabulary namespace, by best practice it should use a fully-qualified URI.

**resourceLink** object **required**

The required [https://purl.imsglobal.org/spec/lti/claim/resource\_link](https://purl.imsglobal.org/spec/lti/claim/resource_link) claim composes properties for the resource link from which the launch message occurs.

**id** string **required**

Opaque identifier for a placement of an LTI® resource link within a context that MUST be a stable and locally unique to the deployment\_id. This value MUST change if the link is copied or exported from one system or context and imported into another system or context. The value of id MUST NOT exceed 255 ASCII characters in length and is case-sensitive.

**title** string

Descriptive title for an LTI® resource link placement.

**description** string

Descriptive phrase for an LTI® resource link placement.

**presentation** object

The optional [https://purl.imsglobal.org/spec/lti/claim/launch\_presentation](https://purl.imsglobal.org/spec/lti/claim/launch_presentation) claim composes properties that describe aspects of how the message sender expects to host the presentation of the message receiver's user experience (for example, the height and width of the viewport the message sender gives over to the message receiver)

**locale** string

Language, country, and variant as represented using the IETF Best Practices for Tags for Identifying Languages.

**document\_target** string

**Possible values:** \[`frame`, `iframe`, `window`\]

The kind of browser window or frame from which the user launched inside the message sender's system. The value for this property MUST be one of: frame, iframe, or window.

**returnUrl** uri

Fully-qualified HTTPS URL within the message sender's user experience to where the message receiver can redirect the user back. The message receiver can redirect to this URL after the user has finished activity, or if the receiver cannot start because of some technical difficulty.

**width** integer

Width of the window or frame where the content from the message receiver will be displayed to the user.

**height** integer

Height of the window or frame where the content from the message receiver will be displayed to the user.

**custom** object **required**

Custom parameters object containing paramaters sent from the LMS.

**services** object **required**

The services section in the LTIAAS ID Token is an object containing information regarding the LTI® services and their availability in the context of a specific LTI® Launch

**deepLinking** object **required**

The deepLinking object contains availability information for the Deep Linking LTI® service

**available** boolean **required**

Availability status for the Deep Linking service in the current launch context

**namesAndRoles** object **required**

The namesAndRoles object contains availability information for the Names and Roles Provisioning LTI® service

**available** boolean **required**

Availability status for the Names and Roles Provisioning service in the current launch context

**assignmentAndGrades** object **required**

The assignmentAndGrades object contains availability information for the Assignment and Grades LTI® service

**available** boolean **required**

Availability status for the Assignment and Grades service in the current launch context

**lineItemId** uri

Line item ID for the current launch context. This field will only be present if there's only one line item ID associated with the current context.

**serviceKey** string

The serviceKey field contains the service key token that can be used to perform the service key based API authentication. This field is only populated if the current launch context has access to at least one of the Assignment and Grades or Names and Roles Provisioning LTI® services

```
{  
  "user": {    "id": "2",    "roles": [      "http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor"    ],    "email": "john@lms.com",    "name": "John Doe",    "givenName": "John",    "familyName": "Doe"  },  "platform": {    "id": "0c41aa0849215449d4298e58f7626c68",    "url": "https://lms.example.com",    "clientId": "KzJtrQxEUYGWXjx",    "deploymentId": "1",    "name": "LMS",    "guid": "lms.example.com",    "productFamilyCode": "lms",    "version": "2020073000",    "description": "LMS",    "contactEmail": "contact@lms.com"  },  "launch": {    "type": "LtiResourceLinkRequest",    "target": "https://your.ltiaas.com/lti/launch",    "context": {      "id": "2",      "label": "course",      "title": "Course",      "type": [        "CourseSection"      ]    },    "resourceLink": {      "id": "1",      "title": "Activity",      "description": "Activity 1"    },    "presentation": {      "locale": "en",      "document_target": "iframe",      "returnUrl": "https://lms.example.com/course/1",      "width": 1300,      "height": 964    },    "custom": {}  },  "services": {    "deepLinking": {      "available": true    },    "namesAndRoles": {      "available": true    },    "assignmentAndGrades": {      "available": true,      "lineItemId": "https://lms.example.com/course/1/lineitems/1"    },    "serviceKey": "eyJhbGciajsheu..."  }}
```

Unauthorized. Please check our guide on [Authenticating API requests](/guides/api/authentication) to learn about how authentication works in the LTIAAS API.

application/json

Schema

Example (from schema)

Example

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

```
{  
  "status": 401,  "error": "Unauthorized",  "details": {    "message": "INVALID_LTIK_AUTH_AUTHORIZATION_HEADER",    "description": "Invalid or expired ltik."  }}
```

Loading...