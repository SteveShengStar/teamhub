# API Reference
## `/members`

### `POST /members/`
**Request Headers**
|Header       |Value                |
|-------------|---------------------|
|authorization|"Bearer " + authToken|

**Body Parameters**
|Field              |Description                                                                                                              |
|-------------------|-------------------------------------------------------------------------------------------------------------------------|
|fields *(optional)*|Array of fields to return. If not specified, all fields are returned. See [List of Member Fields](#list-of-member-fields)|

**Returns**
A JSON object with all members with all specified fields

### `POST /members/add`
**Body Parameters**
|Field|Description                                                 |
|-----|------------------------------------------------------------|
|body |JSON object of member to add to database (see example below)|
For example, 
```json
{
      "skills": ["Coding", "Hardware"],
      "interests": ["JavaScript"],
      "subteams": [
        "Software"
      ],
      "name": {
        "display": "DisplayName",
        "first": "FirstName",
        "last": "LastName"
      },
      "email": "test.t@waterloop.ca",
      "imageUrl": "https://example.com",
      "coopExp": [],
      "projects": [
        {
          "description": [
            "Backend"
          ],
          "project": "TeamHub"
        }
      ],
      "joined": {
        "season": "Fall",
        "year": 2019
      },
      "memberType": {
        "name": "Member"
      },
      "bio": "Here is my bio.",
      "birthday": {
        "month": 15,
        "day": 11,
        "year": 2001
      },
      "program": "Software Engineering",
      "stream": {
        "coopStream": {
          "F19": true,
          "W20": true,
          "F20": true,
          "S21": true,
          "W22": true,
          "F22": true,
          "S23": true,
          "W24": true
        },
        "currentSchoolTerm": "1B"
      }
    }
```
**Returns**
A copy of the document inserted into the database.

### `POST /members/search`
**Request Headers**
|Header       |Value                |
|-------------|---------------------|
|authorization|"Bearer " + authToken|

**Body Parameters**
|Field              |Description                                                                                                              |
|-------------------|-------------------------------------------------------------------------------------------------------------------------|
|fields *(optional)*|Array of fields to return. If not specified, all fields are returned. See [List of Member Fields](#list-of-member-fields)|
|options            |JSON object to filter by, for example: `{"_id": "5dbe59aed97fcd14609306b9"}` or `{"name": {"first": "Test"}}`            |

**Returns**
A JSON object with the results

### `GET /members/:id/info`
**Request Headers**
|Header       |Value                |
|-------------|---------------------|
|authorization|"Bearer " + authToken|

**URL Parameters**
|Field|Description |
|-----|------------|
|:id  |ID of member|

**Returns**
A JSON object of the member with the specified ID.

### `PUT /members/:id/update`
**Request Headers**
|Header       |Value                                                |
|-------------|-----------------------------------------------------|
|authorization|"Bearer " + authToken (must match user being updated)|

**URL Parameters**
|Field|Description           |
|-----|----------------------|
|id   |ID of member to update|

**Body Parameters**
|Field|Description                                                            |
|-----|-----------------------------------------------------------------------|
|data |JSON object with new field(s), for example: `{"subteam": "Electrical"}`|

**Returns**
A JSON object with the results

## `/login`
### `GET/POST /auth/check`
**Request Headers**
|Header       |Value                                                |
|-------------|-----------------------------------------------------|
|authorization|"Bearer " + authToken (must match user being updated)|

**Returns**
A JSON object with the result of the check (if the token is valid or not)

### `POST /auth/login`
**Body Parameters**
JSON object returned by the Google OAuth API

**Returns**
A JSON object of the document of the user with its authToken

# List of Member Fields
- name
- program
- bio
- skills
- interests
- joined
- memberType
- subteams
- projects
- email
- stream
- imageUrl
- birthday
- links

# Structure of Backend
When a request comes in from the frontend, here is the path it takes:
1. Each API endpoint is handled by the corresponding files in `/pages/api/`. See https://nextjs.org/docs/api-routes/introduction for how the API routing works.
2. A specific handler is then called under `/backend/handlers`, to handle the request.
3. The handler may then access or modify the MongoDB database or external APIs to retrieve the needed information
     - The MongoDB database is structure using `mongoose`, a MongoDB framework.
     - Schemas for the database can be found under `/backend/data/schema`
     - External API handlers can be found under `/backend/data/` (for example `/backend/data/gsuite`).