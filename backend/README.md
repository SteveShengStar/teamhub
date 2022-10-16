############################ API Reference ############################

         ################# Member Endpoints ##################

### `POST /api/members/`

**Request Headers**
|Content-Type|application/json|
|Cookie|{cookie}|
|Origin|{origin_url} ie. `http://localhost:3000`|

**Body Parameters**
|Field|Description|
|fields _(optional)_|Array of member's fields to return. If not specified, all member's fields are returned. See [List of Member Fields](#list-of-member-fields)|

**Returns**
A JSON object with all members' data.

### `POST /api/members/update`

**Request Headers**
|Content-Type|application/json|
|Cookie|{cookie}|
|Origin|{origin_url} ie. `http://localhost:3000`|

**Body Parameters**
|Field|Description|
|fields _(optional)_|Array of member's fields to update. ie) `{"active": true}` in order to set the `active` field of all members to true.|

### `POST /api/members/add`

**Body Parameters**
|Field|Description|
|data |JSON object of member to add to database (see example below)|

For example:

```json
{
    "data": {
        "skills": ["Coding", "Hardware"],
        "interests": ["JavaScript"],
        "subteams": ["Software"],
        "name": {
            "first": "FirstName",
            "last": "LastName"
        },
        "email": "test.t@waterloop.ca",
        "imageUrl": "https://example.com",
        "projects": ["TeamHub"],
        "memberType": "Member",
        "bio": "Here is my bio.",
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
}
```

**Effect**
Adds new member to the database.

**Returns**
A copy of the document inserted into the database.

### `POST /api/members/search`

**Request Headers**
|Content-Type|application/json|
|Cookie|{cookie}|

**Body Parameters**
|Field |Description |
|options|JSON object to filter members by|

For example:

-   Filter by User ID: `{"_id": "5dbe59aed97fcd14609306b9"}`
-   Filter by First Name:`{"name": {"first": "Steven"}}`

|fields _(optional)_|Array of members' fields to return. If not specified, all members' fields are returned. See [List of Member Fields](#list-of-member-fields)|

**Returns**
All members that match the criteria specified in the `options` body parameter.

### `GET /api/members/:id/info`

**Request Headers**
|Content-Type|application/json|
|Cookie|{cookie}|

**URL Parameters**
|Field|Description |
|:id |ID of member|

**Returns**
A member with the specified ID.

### `DELETE /api/members/:id/remove`

**Request Headers**
|Content-Type|application/json|
|Cookie|{cookie}|

**URL Parameters**
|Field|Description |
|:id |ID of member|

**Effect**
Deletes a member with the specified ID.

### `PUT /api/members/:id/update`

**Request Headers**
|Content-Type|application/json|
|Cookie|{cookie}|

**URL Parameters**
|Field|Description |
|:id |ID of member to update|

**Body Parameters**
|Field|Description |
|data |JSON object with new field(s), see example below: |

```json
{
    "data": {
        "skills": ["C++", "UIUI", "mama"],
        "interests": ["Self-Driving Cars"],
        "subteams": ["Electrical"],
        "projects": ["Embedded", "Battery Management"],
        "name": {
            "display": "DisplayName",
            "first": "FNFN",
            "last": "LNLN"
        },
        "imageUrl": "https://example.com",
        "memberType": "Member",
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
        },
        "phone": "0000000000",
        "studentId": "77"
    }
}
```

**Effect**
Updates a member with the specified ID.

# List of Member Fields

-   name
-   program
-   bio
-   skills
-   interests
-   memberType
-   subteams
-   projects
-   email
-   stream
-   imageUrl
-   links

    ################ Authentication Endpoints ##################

### `GET/POST /api/auth/check`

**Request Headers**
|Cookie|{cookie}|

**Returns**
A JSON object with the result of the check (whether the user's session token is valid or not.

The session token is inside the Cookie. If token is valid, then the user is currently logged in. If not valid, then the user is not logged in and the endpoint returns a 403 error code).

### `POST /api/auth/login`

**Body Parameters**
JSON object returned by the Google OAuth API

**Returns**
A JSON object with the members's details and the session token stored in a Cookie.

           ################ Form Endpoints ##################

### `GET /api/form/:form_name`

**Request Headers**
|Content-Type|application/json|
|Cookie|{cookie}|

**URL Parameters**
|Field|Description |
|:form_name |Form name. A unique identifier for the form.|

**Returns**
Metadata about the form (Form's Title, Description, and details about Questions asked in the form).

### `GET /api/form/:form_name/user/:user_id`

**Request Headers**
|Content-Type|application/json|
|Cookie|{cookie}|

**URL Parameters**
|Field|Description |
|:form_name |Form name. A unique identifier for the form.|
|:user_id |User's ID|

**Returns**
Metadata about the form (Form's Title, Description, and details about Questions asked in the form) along with details/responses that a user filled in for this form. The response is in the format:

```json
{
  "success": true,
  "body": {
    {
        "form": { /* form metadata */ },
        "user": { /* user's responses/details */ }
    }
  }
}
```

### `POST /api/form/create`

**Request Headers**
|Content-Type|application/json|
|Cookie|{cookie}|

**Body Parameters**

Example:

```json
{
    "title": "Beginning of Term Survey",
    "description": "Survey that asks new members what they are looking forward to this term.",
    "name": "botsurvey" /* unique identifier for this form */,
    "sections": [
        /* Questions that are asked in this form */
        {
            "position": 0,
            "name": "fullName",
            "display": "What is your full name ?",
            "type": "text",
            "required": true,
            "errorText": "Please enter your full name."
        },
        {
            "position": 1,
            "name": "phoneNumber",
            "display": "What is your phone number ?",
            "type": "phone",
            "required": true,
            "errorText": "Please enter a valid 10 digit phone number."
        },
        {
            "position": 2,
            "name": "personalEmail",
            "display": "What is your personal email address ?",
            "type": "email",
            "required": true,
            "errorText": "Please enter a valid email."
        }
    ]
}
```

**Effect**
Creates a new form with the specified Title, Description, and Sections (Questions).

### `PUT /api/form/:form_name/updateForm`

**Request Headers**
|Content-Type|application/json|
|Cookie|{cookie}|

**URL Parameters**
|Field|Description |
|:form_name |Form name. A unique identifier for the form.|

**Body Parameters**

Example:

```json
{
    "title": "Sign Up Form",
    "description": "Sign Up Form",
    "sections": [
        {
            "position": 0,
            "required": true,
            "_id": "62cb8595699c7050d02c4c24",
            "name": "fullName",
            "display": "What is your full name ?",
            "errorText": "Please enter your full name.",
            "options": [],
            "type": "text",
            "description": ""
        },
        {
            "position": 1,
            "required": true,
            "_id": "62cb8595699c7050d02c4c25",
            "name": "phoneNumber",
            "display": "What is your phone number ?",
            "errorText": "Please enter a valid 10 digit phone number.",
            "type": "phone"
        }
    ]
}
```

**Effect**
Updates the form's metadata (Title, Description, Sections/Questions it contains etc.).

### `PUT /api/form/updateSections` (Currently not used in the code. Only executed by developers while developing code.)

**Request Headers**
|Content-Type|application/json|
|Cookie|{cookie}|

**Body Parameters**

Example:

```json
[
    /* array of form questions/sections to update */
    {
        /* 1st form question/section to update */
        "name": "fullName",
        "display": "Full Name",
        "description": "",
        "category": "text"
    },
    {
        /* 2nd form question/section to update */
        "name": "nextSchoolTerm",
        "display": "This upcoming term, I will be in my",
        "description": "",
        "category": "radio",
        "options": [
            "1A Co-op",
            "1B Study",
            "1B Co-op",
            "2A Study",
            "2A Co-op",
            "2B Study",
            "2B Co-op",
            "3A Study"
        ]
    }
]
```

**Effect**
Updates form questions/sections.

        ######## Export File to Google Drive Endpoints ########

### `POST /api/google/export/:form_name`

**Request Headers**
|Content-Type|application/json|
|Cookie|{cookie}|

**URL Parameters**
|Field|Description |
|:form_name |Form name. A unique identifier for the form whose user responses we want to export to a file.|

**Effect**
Exports a form's responses to a File on Google Drive.

###################### Back End Code Structure ######################

When a request comes in from the front end, here is the path it takes:

1. Each API endpoint is represented by a corresponding file in `/pages/api/`. The endpoint `/api/members/update` is represented by `/api/members/update.js` and the endpoint `/api/members/` is represented by `/api/members/index.js`.
   See https://nextjs.org/docs/api-routes/introduction for how the API routing works.
2. A specific handler function is called under `/backend/handlers`, to handle the request.
3. The handler may then access or modify the MongoDB database:
    - The MongoDB database is structured using `mongoose`, a MongoDB framework. The database schema is defined under the folder: `/backend/data/schema`
