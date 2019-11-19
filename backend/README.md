# API Reference
## `/members`

### `POST /members/`
**Body Parameters**
|Field              |Description                                                                                                              |
|-------------------|-------------------------------------------------------------------------------------------------------------------------|
|fields *(optional)*|Array of fields to return. If not specified, all fields are returned. See [List of Member Fields](#list-of-member-fields)|

**Returns**
A JSON object with all members with all specified fields

### `GET /members/:id/info`
**URL Parameters**
|Field|Description |
|-----|------------|
|:id  |ID of member|
**Returns**
A JSON object of the member with the specified ID.

### `POST /members/add`
**Body Parameters**
|Field|Description                                                 |
|-----|------------------------------------------------------------|
|body |JSON object of member to add to database (see example below)|
For example, 
```json
{
    "name": {
        "first": "Robertson",
        "last": "Bob",
        "display": "Rob Bob"
    },
    "bio": "This is my bio.",
    "skills": [
        "MongoDB"
    ],
    "interests": [
        "Database"
    ],
    "joined": {
        "year": 2019,
        "season": "Fall"
    },
    "coopExp": [],
    "memberType": "Newbie",
    "subteam": "Software",
    "project": {
        "name": "TeamHub",
        "subteams": [
            "Software"
        ]
    },
    "email": "rob.b@waterloop.ca",
    "stream": {
        "isCoop": true,
        "onStream": true,
        "coopStream": 1,
        "currentSchoolTerm": "1A"
    },
    "age": 15,
    "birthday": {
        "month": 5,
        "day": 12
    },
    "links": [
        {
            "type": "GitHub",
            "link": "https://github.com/robobob"
        }
    ]
}
```
**Returns**
A copy of the document inserted into the database.

### `DELETE /members/:id/remove`
**URL Parameters**
|Field|Description |
|-----|------------|
|:id  |ID of member|
**Returns**
A JSON object with the results

### `PUT /members/:id/update`
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

### `POST /members/search`
**Body Parameters**
|Field              |Description                                                                                                              |
|-------------------|-------------------------------------------------------------------------------------------------------------------------|
|fields *(optional)*|Array of fields to return. If not specified, all fields are returned. See [List of Member Fields](#list-of-member-fields)|
|query              |JSON object to filter by, for example: `{"_id": "5dbe59aed97fcd14609306b9"}` or `{"name": {"first": "Test"}}`            |

**Returns**
A JSON object with the results

### List of Member Fields
- name
- bio
- skills
- interests
- joined
- coopExp
- memberType
- subteam
- project
- email
- stream
- picture
- age
- birthday
- links
