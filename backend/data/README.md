# API Reference for Database Methods
These methods are found in the `.js` files under `/backend/data/`.
##`data.members`

###`data.members.getAll()`
**Parameters**
None

**Returns**
A JSON object with all members

###`data.members.search(body)`
**Parameters**
|Field|Description                                                                                                  |
|-----|-------------------------------------------------------------------------------------------------------------|
|body |JSON object to filter by, for example: `{"_id": "5dbe59aed97fcd14609306b9"}` or `{"name": {"first": "Test"}}`|
**Returns**
A JSON object with all matching members.

###`data.members.add(body)`
**Parameters**
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

###`data.members.delete(body)`
**Parameters**
|Field|Description                                                                                                  |
|-----|-------------------------------------------------------------------------------------------------------------|
|body |JSON object to filter by, for example: `{"_id": "5dbe59aed97fcd14609306b9"}` or `{"name": {"first": "Test"}}`|
**Returns**
A JSON object with the results

###`data.members.updateMember(filter, body)`
**Parameters**
|Field |Description                                                                                                  |
|------|-------------------------------------------------------------------------------------------------------------|
|filter|JSON object to filter by, for example: `{"_id": "5dbe59aed97fcd14609306b9"}` or `{"name": {"first": "Test"}}`|
|body  |JSON object with new field(s), for example: `{"subteam": "Electrical"}`                                         |
**Returns**
A JSON object with the results
