# Frontend Docs

## Table of Contents

- [Frontend Docs](#frontend-docs)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [The `/pages` directory](#the-pages-directory)
    - [The `/frontend` directory](#the-frontend-directory)
  - [Design system](#design-system)
    - [Theme](#theme)
    - [Styling with Styled Components](#styling-with-styled-components)
    - [Atoms](#atoms)
    - [Molecules](#molecules)
    - [Organisms](#organisms)
    - [Templates](#templates)
    - [Pages](#pages)
    - [Updating the design system](#updating-the-design-system)
  - [State management and API integrations](#state-management-and-api-integrations)
  - [Custom Hooks](#custom-hooks)
  - [Final notes](#final-notes)

## Overview

Front-end Organization:

      ├── pages
      ...
      ├── frontend
         ├── components
         ├── hooks
         ├── store

Both `/pages` and `/frontend` exist in the root directory of the app.

With [Next.js](https://nextjs.org/), the file structure in the pages directory get automatically converted into routes that are served (with SSR).

### The `/pages` directory

Every file inside of this directory (with the exception of `/api` route files) are React components. In the browser, they can be accessed by routes corresponding to the name of the files:

For example /pages/index.js corresponds to

- [https://hub.waterloop.ca](https://hub.waterloop.ca) in production
- [http://localhost:3000](http://localhost:3000) in development

For more information, read up on the [Next.js docs](https://nextjs.org/docs).

### The `/frontend` directory

It contains three major subdirectories:

    ├── components
    ├── hooks
    ├── store

`/components` contain the UI building blocks of the Team Hub (here is where the design system lives)

`/hooks` contain custom React Hooks with custom logic that is shared between multiple components

`/store` contains the redux store and handles the data flowing through the web app.

## Design system

In order to write a maintainable front-end, we need to split it up into chunks. For Team Hub, we use [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) in both our design files and front end to create a consistent and unified design system.


With atomic design principles, we can split up our web app into Atoms, Molecules, Organisms, Templates, and Pages. Outlined below are the various design system components and their APIs. Read more about thought process behind the design system in Team Hub [here](./design-system-thinking.md).

### Theme

Our components are based around a theme object which allows any component to ensure that its styling is consistent with the rest of the app. Read about [styling](#styling-with-styled-components) before using! Read the [theme docs](./theme.md) for more information on the Theme.

### Styling with Styled Components

We use [styled-components](https://styled-components.com/) to style our components. In addition, we use [styled-system](https://styled-system.com/), a superset of features to styled-components to help us write our design system.

### Atoms

### Molecules

### Organisms

### Templates

### Pages

### Updating the design system

## State management and API integrations

## Custom Hooks

## Final notes
