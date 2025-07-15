---
title: Handling pagination
url: https://docs.ltiaas.com/guides/api/pagination
source: LTIaaS Documentation
---

# Handling pagination

-   [](/)
-   [Using the LTIAAS API](/guides/api/introduction)
-   Handling pagination

On this page

# Handling pagination

caution

This functionality might not be supported by every LMS. Use with caution.

Some of the LTI® Advantage services provide the LMSes and users with a standardized way of handling a large ammount of results through pagination. LTIAAS allows you to handle pagination easily through special fields in API requests and responses.

## The pagination fields[​](#the-pagination-fields "Direct link to heading")

If the results of a certain service API request are paginated, the response object will likely contain one or more of the following fields:

-   `next` - The URL of the next page of results;
-   `prev` - The URL of the previous page of results;
-   `first` - The URL of the first page of results;
-   `last` - The URL of the last page of results.

tip

Not every endpoint will return all of these fields. We detail expected fields in the guides for each specific service.

## Utilizing pagination fields[​](#utilizing-pagination-fields "Direct link to heading")

After retrieving one of the pagination fields from the API response, you can then use that to perform another API call fetching that specific page of results.

Every endpoint that supports pagination will accept a `url` query parameter, which you can use to specify the page you want to fetch.

info

The value of the pagination fields need to be URL encoded to be safely sent as a query parameter.

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/memberships GET request  
const response = requests.get(`https://your.ltiaas.com/api/memberships`, { headers })  
// Retrieving next pagination field  
const nextPage = response['next']  
// Making /api/memberships GET request for the next page  
const url = encodeURIComponent(nextPage)  
const nextPageResponse = requests.get(`https://your.ltiaas.com/api/memberships?url=${url}`, { headers })  
// Retrieving next page members  
const members = nextPageResponse['members']
```

## Limiting results[​](#limiting-results "Direct link to heading")

Every endpoint that supports pagination will accept a `limit` query parameter, which you can use to specify the maximum number of results you want to fetch.

```
// Building Ltik based API authentication header  
const authorizationHeader = `LTIK-AUTH-V2 ${API_KEY}:${LTIK}`  
const headers = { Authorization: authorizationHeader }  
// Making /api/memberships GET request  
const limit = 10  
const response = requests.get(`https://your.ltiaas.com/api/memberships?limit=${limit}`, { headers })  
// Retrieving next page members  
const members = response['members'] // Maximum of 10 results
```

info

Some LMSes will have a default number of maximum results per page, which you can override by specifying the `limit` query parameter.

**Tags:**

-   [API](/tags/api)
-   [Pagination](/tags/pagination)
-   [Tutorials](/tags/tutorials)