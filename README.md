# TeamHub Project

[![Actions Status](https://github.com/waterloop/teamhub/workflows/CI/badge.svg)](https://github.com/waterloop/teamhub/actions)

## Installation

Clone from GitHub with:
```git clone https://www.github.com/waterloop/teamhub.git```

Navigate to `/backend/data/config.template.json`.

Make a copy and rename it to `config.json`.

Follow the instructions listed under Setting Up Development Environment

## Setting up Development Environment

Here are the steps to run locally:

1. Install [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
2. Copy the contents of `/backend/data/config.template.json` into `/backend/data/config.json`
3. To start the database server, simply go to the root directory and run `docker-compose up -d`
4. To start the **web app in development, run `npm run dev` at the root directory of the project**
5. You can access the local database running in the docker container by going to `localhost:8081` and using the database credentials in `/backend/data/config.json` to login.
6. To stop the docker containers, run `docker-compose stop`


To run tests locally, use the command `npm run test` to ensure there were no breaking changes (see step 5 above).

### Troubleshooting


* If the DB did not load successfully from the dump and is empty, run `docker-compose rm` and then restart the server with `docker-compose up`.

### If Installing Docker Doesn't Work
1. Install `Node.js` and `MongoDB` locally
2. Run the script under `/docker/mongodb/docker-entrypoint-initdb.d/import.sh` if you are on Linux system. If you are on Windows or Mac, you may have to modify the command the script slightly.
3. Run `npm install` in the root directory of this repo to install all othe dependencies
4. Run `npm run dev` to start the dev environment

## Contributing

1. Take a look under [Issues](https://github.com/waterloop/teamhub/issues) for ones you want to work on.
2. Assign yourself to the issue to let others know you are working on it.
3. Create a new branch and work on the issue on that branch.
4. Create a [Pull Request](https://github.com/waterloop/teamhub/pulls) for merging the new branch (this should be done when you start working on the issue) so that others may see your progress
5. Add the `wip` label to the Pull Request as well as `[WIP]` to the title of the Pull Request.
6. Once you are finished, remove the `wip` label and `[WIP]` from the title of the Pull Request, add the `ready-to-merge` label to your Pull Request, and add at least one reviewer.
7. Check up on your Pull Request and respond to any comments/questions
8. Once your Pull Request has been reviewed and approved, you may merge it with `dev` if it has not been done so already by the reviewer. When merging a pull request, use the `Create a merge commit` option.
9. After testing, the `dev` branch will then be merged with `master` and deployed to production by site maintainers.

## Technologies used

* Based on [NextJS](https://nextjs.org) framework (Server-Side Rendered React).
* [Typescript](www.typescriptlang.org) setup (not being used at the moment)
* Front-End
  * [React](https://reactjs.org)
  * Design System uses [styled-components](https://www.styled-components.com) and [styled-system](https://styled-system.com)
  * State management will use [Redux](https://redux.js.org) (and possibly [redux-thunk](https://github.com/reduxjs/redux-thunk) for asynchronous redux).
* Back-end
  * **For Detailed Documentation on the Backend, see [./backend/README.md](./backend/README.md)**
  * RESTful API created using ([ExpressJS](https://expressjs.com)? serving NextJS?)
  * MongoDB for database
  * [Jest](https://jestjs.io/) for testing

Link to [mockup](https://xd.adobe.com/view/7509d6a3-f62b-44a7-595b-0250db05ffcc-0338/)
