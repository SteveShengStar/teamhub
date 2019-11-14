# TeamHub Project

Repository for the TeamHub Project. Technologies used: 
* Based on [NextJS](https://nextjs.org) framework (Server-Side Rendered React).
* [Typescript](www.typescriptlang.org) setup (not being used at the moment)
* Front-End
    * [React](https://reactjs.org)
    * Design System uses [styled-components](https://www.styled-components.com) and [styled-system](https://styled-system.com)
    * State management will use [Redux](https://redux.js.org) (and possibly [redux-thunk](https://github.com/reduxjs/redux-thunk) for asynchronous redux).
* Back-end
    * RESTful API created using ([ExpressJS](https://expressjs.com)? serving NextJS?)
    * MongoDB for database

Link to [mockup](https://xd.adobe.com/view/7509d6a3-f62b-44a7-595b-0250db05ffcc-0338/).

## Installation

Clone from GitHub with: 
```git clone https://www.github.com/waterloop/teamhub.git```

Navigate to `/backend/data/config.template.json`.
Make a copy and rename it to `config.json`.
Ask Michael Pu for the database url.


(Navigate to repository then)
```npm install```

Build project
```npm run build```

Run server (development)
```npm run dev```

## Source Control

Always create a branch when making changes, then create a PR (Pull Request) - for code review - to merge into the master.

### Creating a Branch
* Create a branch from master
    * `git checkout -b <branch_name>` (-b creates a new branch)
    * To switch to existing branch: `git checkout <branch_name>`
