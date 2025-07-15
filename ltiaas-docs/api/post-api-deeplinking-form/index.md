---
title: Build A Deep-Linking Form | LTIAAS
url: https://docs.ltiaas.com/api/post-api-deeplinking-form
source: LTIaaS Documentation
---

# Build A Deep-Linking Form | LTIAAS

-   [](/)
-   Deep Linking
-   Build A Deep-Linking Form

## Build A Deep-Linking Form[​](#build-a-deep-linking-form "Direct link to heading")

If your application is a hub of multiple resources and/or activities, the LTI® protocol makes this easy to manage through the *Deep Linking* service. You can use this service to allow teachers and administrators to select one specific resource from your application when creating a resource link (activity) in the LMS. LTIAAS gives you access to this service through the Deep Linking flow and `/api/deeplinking/form` API endpoint.

Please check our [Performing Deep Linking guide](/guides/api/deeplinking) to learn more about using this endpoint.

API Authentication Method

Supported

[`LTIK-AUTH-V2`](/guides/api/authentication#ltik-based-authentication)

✅

[`SERVICE-AUTH-V1`](/guides/api/authentication#service-key-based-authentication)

[`Bearer`](/guides/api/authentication#bearer-api-key-based-authentication)

application/json

**Request Body**

**contentItems** object\[\] **required**

An array of content items as defined in the LTI® 1.3 specification: [https://www.imsglobal.org/spec/lti-dl/v2p0/#content-item-types](https://www.imsglobal.org/spec/lti-dl/v2p0/#content-item-types)

-   Array \[

**type** string **required**

**Possible values:** \[`link`, `ltiResourceLink`, `file`, `html`, `image`\]

The type of the content item

**url** string

A URL pointing to your LTIAAS instance. In order to pass parameters to your Tool and identify the selected resource you can add query parameters to the URL.

> Example:
> 
> -   URL passed inside the Deep Linking content item: `https://your.ltiaas.com?resource=1234`
> -   URL the user will be redirected to after a successful launch from the created resource: `https://yourtool.com?resource=1234`

**title** string

plain text to use as the title or heading for content.

**text** string

plain text description of the content item intended to be displayed to all users who can access the item.

**icon** object

Fully qualified URL, height, and width of an icon image to be placed with the file. A platform may not support the display of icons, but where it does, it may choose to use a local copy of the icon rather than linking to the URL provided (which would also allow it to resize the image to suit its needs).

**url** uri

fully qualified URL to the image file.

**width** integer

integer representing the width in pixels of the image.

**height** integer

integer representing the height in pixels of the image.

**thumbnail** object

Fully qualified URL, height, and width of a thumbnail image to be made a hyperlink. This allows the hyperlink to be opened within the platform from text or an image, or from both.

**url** uri

fully qualified URL to the image file.

**width** integer

integer representing the width in pixels of the image.

**height** integer

integer representing the height in pixels of the image.

**embed** object

The embed property has a single required property html that contains the HTML fragment to embed the resource directly inside HTML. It is commonly used as a way to embed a resource in an HTML editor. Platform must make sure to properly sanitize the HTML prior to inclusion.

**html** string

the HTML fragment to embed the resource directly inside HTML.

**window** object

The window property indicates how to open the resource in a new window/tab.

**targetName** string

String identifying the name of the window to open; this allows for a single window to be shared as the target of multiple links, preventing a proliferation of new windows/tabs.

**width** integer

integer representing the width in pixels of the new window.

**height** integer

integer representing the height in pixels of the new window.

**windowFeatures** string

Comma-separated list of window features as per the [window.open() definition](https://developer.mozilla.org/en-US/docs/Web/API/Window/open).

**iframe** object

The iframe property indicates the resource can be embedded using an iframe. The child parameters ndicates the dimension and the src URL for embedding

**src** string

required parameter indicating the URL to use as the src of the iframe. The src value may differ from the link url.

**width** integer

integer representing the width in pixel of the new iframe.

**height** integer

integer representing the height in pixel of the new iframe.

**custom** object

```
A map of key/value custom parameters. Those parameters MUST be included in the LtiResourceLinkRequest payload. Value may include substitution parameters as defined in the LTI® Core Specification [LTI®-13](https://www.imsglobal.org/spec/lti/v1p3/). Map values must be strings. Note that "empty-string" is a valid value (""); however, null is not a valid value.
```

**lineItem** object

A lineItem object that indicates this activity is expected to receive scores; the platform may automatically create a corresponding line item when the resource link is created, using the maximum score as the default maximum points. The resource\_id, tag and scoreMaximum are defined in the [LTI®-AGS-20](https://www.imsglobal.org/spec/lti-ags/v2p0/). A line item created as a result of a Deep Linking interaction must be exposed in a subsequent line item service call, with the resourceLinkId of the associated resource link, as well as the resourceId and tag if present in the line item definition.

**label** string

label for the line item. If not present, the title of the content item must be used.

**scoreMaximum** number

Positive decimal value indicating the maximum score possible for this activity.

**resourceId** string

Tool provided ID for the resource.

**tag** string

Additional information about the line item; may be used by the tool to identify line items attached to the same resource or resource link (example: grade, originality, participation).

**gradesReleased** boolean

boolean to indicate if the platform should release the grades, e.g., to learners.

**available** object

Indicates the initial start and end time this activity should be made available to learners. A platform may choose to make an item not accessible by hiding it, or by disabling the link, or some other method which prevents the link from being opened by a learner. The initial value may subsequently be changed within the platform and the tool may use the ResourceLink.available.startDateTime and ResourceLink.available.endDateTime substitution parameters defined in LTI® Core specification [LTI®-13](https://www.imsglobal.org/spec/lti/v1p3/) within custom parameters to get the actual values at launch time. Note there may be many factors controlling the availability of an item by the platform, and tools are not guaranteed to receive available start and end times in a launch, even if they set them when creating content.

**startDateTime** date-time

ISO 8601 date and time when the link becomes accessible [ISO8601](http://www.iso.org/iso/catalogue_detail?csnumber=40874).

**endDateTime** date-time

ISO 8601 date and time when the link stops being accessible [ISO8601](https://www.imsglobal.org/spec/lti-dl/v2p0/#bib-iso8601).

**submission** object

Indicates the initial start and end time submissions for this activity can be made by learners. The initial value may subsequently be changed within the platform and the tool may use the ResourceLink.submission.startDateTime and ResourceLink.submission.endDateTime substitution parameters defined in LTI® Core specification [LTI®-13](https://www.imsglobal.org/spec/lti/v1p3/) within custom parameters to get the actual values at launch time.

**startDateTime** date-time

ISO 8601 Date and time when the link can start receiving submissions [http://www.iso.org/iso/catalogue\_detail?csnumber=40874](http://www.iso.org/iso/catalogue_detail?csnumber=40874).

**endDateTime** date-time

ISO 8601 Date and time when the link stops accepting submissions [http://www.iso.org/iso/catalogue\_detail?csnumber=40874](http://www.iso.org/iso/catalogue_detail?csnumber=40874).

**expiresAt** date-time

```
ISO 8601 Date and time [http://www.iso.org/iso/catalogue_detail?csnumber=40874](http://www.iso.org/iso/catalogue_detail?csnumber=40874). The URL will be available until this time. No guarantees after that. (e.g. 2014-03-05T12:34:56Z).
```

**html** string

When type=="html". HTML fragment to be embedded. The platform is expected to sanitize it against cross-site scripting attacks.

**width** integer

Integer representing the width in pixels of the image.

**height** integer

Integer representing the height in pixels of the image.

-   \]

**options** object

An object containing one or more optioal fields to aid in error conditions

**message** string

Message displayed to the user if the deep linking process is successfully completed.

**log** string

Log generated by the Platform if the deep linking process is successfully completed.

**errMessage** string

Message displayed to the user if the deep linking process finishes with an error. Sending this will cause the LMS to reject the deep linking submission and display the error message.

**errLog** string

Log generated by the Platform if the deep linking process finishes with an error. Sending this will cause the LMS to reject the deep linking submission and display the error message.

**Responses**

-   200
-   401

* * *

application/json

Schema

Example (from schema)

* * *

**Schema**

**form** string **required**

Self-submitting form that must be appended to the HTML body.

```
{  
  "form": "<form id=\"ltijs_submit\" style=\"display: none;\" action=\"https://ltiadvantagevalidator.imsglobal.org/ltitool/deeplinkresponse.html\" method=\"POST\"><input type=\"hidden\" name=\"JWT\" value=\"eyJhbGciOiJIUzIVCJ9.eyJzdWIbmFtZSI6IG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKV_adQssw5c\" /></form><script>document.getElementById(\"ltijs_submit\").submit()</script>"}
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