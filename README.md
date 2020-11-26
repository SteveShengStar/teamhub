# TeamHub Project

[![Actions Status](https://github.com/waterloop/teamhub/workflows/CI/badge.svg)](https://github.com/waterloop/teamhub/actions)

[Adobe XD Wireframes](https://docs.google.com/document/d/1yDFDckhPNuz4jlZWigfjXOWjwTWLsb8ll4V4M-vw15E/edit)

## Table of Contents

- [TeamHub Project](#teamhub-project)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Setting up your Development Environment](#setting-up-your-development-environment)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)
  - [Documentation](#documentation)

## Getting Started

### Installation

Clone from GitHub with:
```git clone https://www.github.com/waterloop/teamhub.git```

Navigate to `/backend/data/config.template.json`.

Make a copy and rename it to `config.json`.

Follow the instructions listed under Setting Up Development Environment

### Setting up your Development Environment

Here are the steps to run locally:

1. Install [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
2. Copy the contents of `/backend/data/config.template.json` into `/backend/data/config.json`
3. Go to the root directory and run `docker build ./docker -t teamhub` or `npm run build:docker`
4. To start the server, simply go to the root directory and run `docker-compose up -d`
5. To run a command in the docker container, for example `npm run test`, run `docker exec -it teamhub_nodejs /bin/sh`, which will open up a shell into the container and then you can run whichever commands you wish. To exit out of the container, press <kbd>Ctrl</kbd> + <kbd>C</kbd>.
6. To stop the docker containers, run `docker-compose stop`

To run tests locally, use the command `npm run test` **when you are in a shell inside `teamhub_nodejs` the docker container** to ensure there were no breaking changes (see step 5 above). If you are not inside the `teamhub_nodejs` the docker container, it will not connect to the database.

## Troubleshooting

- To use the MongoDB Compass desktop app, use `localhost` as the hostname and the default port 27017.

- If the DB did not load successfully from the dump and is empty, run `docker-compose rm` and then restart the server with `docker-compose up`.

### If Installing Docker Doesn't Work
1. Install `Node.js` and `MongoDB` locally
2. Run the script under `/docker/mongodb/docker-entrypoint-initdb.d/import.sh` if you are on Linux system. If you are on Windows or Mac, you may have to modify the command the script slightly.
3. Run `npm install` in the root directory of this repo to install all othe dependencies
4. Run `npm run dev` to start the dev environment

## Contributing
1. Ask the team lead to be added to the JIRA space
https://waterloop.atlassian.net/jira/software/c/projects/HUB/issues
2. Once added, browse through the list of open issues on JIRA. You can assign yourself to any issue and begin working on it.
3. Create a new branch and work on the issue on that branch. Ask the team lead about which branch you should branch out from.

Use the following branch naming convention:
{first_name}{last_initial}/{descriptive_branch_name}

4. Create a [Pull Request](https://github.com/waterloop/teamhub/pulls) for merging the new branch (this should be done when you start working on the issue) so that others may see your progress
5. Add the `wip` label to the Pull Request as well as `[WIP]` to the title of the Pull Request.
6. Once you are finished, remove the `wip` label and `[WIP]` from the title of the Pull Request, add the `ready-to-merge` label to your Pull Request, and add at least one reviewer.
7. Check up on your Pull Request and respond to any comments/questions
8. Once your Pull Request has been reviewed and approved, you may merge it with `dev` if it has not been done so already by the reviewer. When merging a pull request, use the `Create a merge commit` option.
9. After testing, the `dev` branch will then be merged with `master` and deployed to production by site maintainers.

## Documentation

https://docs.google.com/document/d/10TdYNHSy5nAID4gu48gxqB8-lJWQHVfyYjl5rlyP6HU/edit