---
title: Get Memberships | LTIAAS
url: https://docs.ltiaas.com/api/get-memberships
source: LTIaaS Documentation
---

# Get Memberships | LTIAAS

-   [](/)
-   Memberships
-   Get Memberships

## Get Memberships[​](#get-memberships "Direct link to heading")

The LTI® protocol allows you to retrieve roster information for an LMS context through the *Names and Roles Provisioning* service. Users that are part of an LMS context are called *members*. LTIAAS gives you access to this service through the `/api/memberships` API endpoint.

Please check our [Retrieving course roster guide](/guides/api/roster) to learn more about using this endpoint.

API Authentication Method

Supported

[`LTIK-AUTH-V2`](/guides/api/authentication#ltik-based-authentication)

✅

[`SERVICE-AUTH-V1`](/guides/api/authentication#service-key-based-authentication)

✅

[`Bearer`](/guides/api/authentication#bearer-api-key-based-authentication)

**Query Parameters**

**role** string

**Possible values:** \[`Administrator`, `Student`, `Learner`, `Instructor`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#Administrator`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#None`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#AccountAdmin`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#Creator`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#SysAdmin`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#SysSupport`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#User`, `http://purl.imsglobal.org/vocab/lti/system/person#TestUser`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Administrator`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Faculty`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Guest`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#None`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Other`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Staff`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Student`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Alumni`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Instructor`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Learner`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Member`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Mentor`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Observer`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#ProspectiveStudent`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Administrator`, `http://purl.imsglobal.org/vocab/lis/v2/membership#ContentDeveloper`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Learner`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Mentor`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Manager`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Member`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Officer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#Administrator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#Developer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#ExternalDeveloper`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#ExternalSupport`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#ExternalSystemAdministrator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#Support`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#SystemAdministrator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#ContentDeveloper`, `http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#ContentExpert`, `http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#ExternalContentExpert`, `http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#Librarian`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#ExternalInstructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#Grader`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#GuestInstructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#Lecturer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#PrimaryInstructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#SecondaryInstructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistant`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantGroup`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantOffering`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantSection`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantSectionAssociation`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantTemplate`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#ExternalLearner`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#GuestLearner`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#Instructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#Learner`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#NonCreditLearner`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#AreaManager`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#CourseCoordinator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#ExternalObserver`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#Manager`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#Observer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Member#Member`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Advisor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Auditor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalAdvisor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalAuditor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalLearningFacilitator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalMentor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalReviewer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalTutor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#LearningFacilitator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Mentor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Reviewer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Tutor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Chair`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Communications`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Secretary`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Treasurer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Vice-Chair`\]

Filters memberships by role. Possible role values are defined in the [IMS Role Vocabularies](https://www.imsglobal.org/spec/lti/v1p3/#role-vocabularies). For example, a query parameter of 'role=http%3A%2%2Fpurl.imsglobal.org%2Fvocab%2Flis%2Fv2%2Fmembership%23Learner' will filter the memberships to just those which have a Learner role. Since this is a context-level role, the parameter could be simplified to 'role=Learner', following the same rule which applies to the 'roles' parameter in a 'LtiResourceLinkRequest' message.

**limit** int32

**Possible values:** `>= 1`

Limits the number of memberships returned.

**resourceLinkId** string

Retrieves the Resource Link level memberships as specified in the [IMS Resource Link Membership Service specification](https://www.imsglobal.org/spec/lti-nrps/v2p0#resource-link-membership-service).

**url** uri

Retrieves memberships from a specific URL. - *When present, the `url` parameter causes every other parameter to be ignored.* - The `url` parameter should be URL encoded. - In cases where not all members are retrieved when the membership limit is reached, the returned object will contain a `next` field holding an URL that can be used to retrieve the remaining members through the `url` parameter.

**Responses**

-   200
-   401

* * *

application/json

Schema

Example (from schema)

* * *

**Schema**

**id** uri **required**

URL the memberships were retrieved from.

**context** object **required**

Context the memberships were retrieved from.

**id** string **required**

Stable identifier that uniquely identifies the context from which the LTI® message initiates.

**label** string

Short descriptive name for the context. This often carries the "course code" for a course offering or course section context.

**title** string

Full descriptive name for the context. This often carries the "course title" or "course name" for a course offering context.

**members** object\[\] **required**

Array of User memberships as defined in the [LTI® Advantage Names and Roles Provisioning Services](https://www.imsglobal.org/spec/lti-nrps/v2p0)

-   Array \[

**userId** string **required**

User ID as defined in the LMS.

**roles** uri\[\] **required**

**Possible values:** \[`Administrator`, `Student`, `Learner`, `Instructor`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#Administrator`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#None`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#AccountAdmin`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#Creator`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#SysAdmin`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#SysSupport`, `http://purl.imsglobal.org/vocab/lis/v2/system/person#User`, `http://purl.imsglobal.org/vocab/lti/system/person#TestUser`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Administrator`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Faculty`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Guest`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#None`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Other`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Staff`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Student`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Alumni`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Instructor`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Learner`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Member`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Mentor`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#Observer`, `http://purl.imsglobal.org/vocab/lis/v2/institution/person#ProspectiveStudent`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Administrator`, `http://purl.imsglobal.org/vocab/lis/v2/membership#ContentDeveloper`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Learner`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Mentor`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Manager`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Member`, `http://purl.imsglobal.org/vocab/lis/v2/membership#Officer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#Administrator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#Developer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#ExternalDeveloper`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#ExternalSupport`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#ExternalSystemAdministrator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#Support`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#SystemAdministrator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#ContentDeveloper`, `http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#ContentExpert`, `http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#ExternalContentExpert`, `http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#Librarian`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#ExternalInstructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#Grader`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#GuestInstructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#Lecturer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#PrimaryInstructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#SecondaryInstructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistant`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantGroup`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantOffering`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantSection`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantSectionAssociation`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#TeachingAssistantTemplate`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#ExternalLearner`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#GuestLearner`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#Instructor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#Learner`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#NonCreditLearner`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#AreaManager`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#CourseCoordinator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#ExternalObserver`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#Manager`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#Observer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Member#Member`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Advisor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Auditor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalAdvisor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalAuditor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalLearningFacilitator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalMentor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalReviewer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalTutor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#LearningFacilitator`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Mentor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Reviewer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Tutor`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Chair`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Communications`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Secretary`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Treasurer`, `http://purl.imsglobal.org/vocab/lis/v2/membership/Officer#Vice-Chair`\]

The required https://purl.imsglobal.org/spec/lti/claim/roles claim's value contains a (possibly empty) array of URI values for roles that the user has within the message's associated context.\\n\\nIf this list is not empty, it MUST contain at least one role from the role vocabularies described in role vocabularies.

**status** string **required**

**Possible values:** \[`Active`, `Inactive`, `Deleted`\]

Each membership has a status of either Active or Inactive. If the status is not specified then a status of Active must be assumed.

**email** email

End-User's preferred e-mail address. Its value MUST conform to the RFC 5322 addr-spec syntax. The RP MUST NOT rely upon this value being unique.

**name** string

End-User's full name in displayable form including all name parts, possibly including titles and suffixes, ordered according to the End-User's locale and preferences.

**givenName** string

Given name(s) or first name(s) of the End-User. Note that in some cultures, people can have multiple given names; all can be present, with the names being separated by space characters.

**familyName** string

Surname(s) or last name(s) of the End-User. Note that in some cultures, people can have multiple family names or no family name; all can be present, with the names being separated by space characters.

**picture** uri

A URL to the user's picture.

-   \]

**next** uri

URL of the next membership page. This field is only present if the membership limit was reached before the full members list was retrieved.

```
{  
  "id": "https://lms.example.com/course/1/memberships?page=1",  "context": {    "id": "1",    "label": "course",    "title": "Course"  },  "members": [    {      "userId": "2",      "roles": [        "http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor"      ],      "status": "Active",      "email": "john@lms.example.com",      "name": "John Doe",      "givenName": "John",      "familyName": "Doe",      "picture": "https://lms.example.com/john.jpg"    }  ],  "next": "https://lms.example.com/course/1/memberships?page=2"}
```

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