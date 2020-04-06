# Frontend Docs

This page of the docs assumes that you have a pretty good understanding of Team Hub's design system, styled-components, styled-system, React and, React hook. If not, read other parts of this documentation to fill in the gaps:

- [Atomic Design & The Design System](./atomic-design-and-design-system.md)

Use this primarily as a reference when you're building out front-end code.

## Table of Contents

- [Frontend Docs](#frontend-docs)
  - [Table of Contents](#table-of-contents)
  - [Organization](#organization)
    - [The `/pages` directory](#the-pages-directory)
    - [The `/frontend` directory](#the-frontend-directory)
  - [Design system](#design-system)
    - [Styling with styled-components and styled-system](#styling-with-styled-components-and-styled-system)
    - [Theme](#theme)
    - [Atoms](#atoms)
      - [SystemComponent](#systemcomponent)
      - [SystemSpan](#systemspan)
      - [Other System Components](#other-system-components)
      - [Body](#body)
      - [Header 1](#header-1)
      - [Header 2](#header-2)
      - [Header 3](#header-3)
      - [Header 4](#header-4)
      - [Header 5](#header-5)
    - [Molecules](#molecules)
    - [Organisms](#organisms)
    - [Templates](#templates)
    - [Pages](#pages)
    - [Updating the design system](#updating-the-design-system)
  - [State management and API integrations](#state-management-and-api-integrations)
  - [Custom Hooks](#custom-hooks)
  - [Final notes](#final-notes)

## Organization

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


With atomic design principles, we can split up our web app into Atoms, Molecules, Organisms, Templates, and Pages. Outlined below are the various design system components and their APIs. Read more about thought process behind the design system in Team Hub [here](./atomic-design-and-design-system.md).

### Styling with styled-components and styled-system

We use [styled-components](https://styled-components.com/) to style our components. In addition, we use [styled-system](https://styled-system.com/), a superset of features to styled-components to help us write our design system.

For more information, read up on those docs and [this](./atomic-design-and-design-system.md) part of the docs which outlines atomic design and the design system.

### Theme

Our components are based around a theme object which allows any component to ensure that its styling is consistent with the rest of the app. Read about [styling](#styling-with-styled-components) before using! Read the [theme docs](./theme.md) for more information on the Theme.

### Atoms

The base building blocks in our application. Each atom extends a set of default styling:

```javascript
export const themeDefaultProps = {
    fontFamily: 'body', // Nunito Sans font 
    fontSize: 'body', // Font size of 14px
    fontWeight: 'regular', // Font weight of 400
    color: 'foreground' // color of Foreground = white
};
```

Each atom is also built with the following `styled-system` injections to be used as props:

grid | color | space | layout | typography | flexbox | compose | shadow | border | position | system

#### SystemComponent

A `div` tag with `styled-system` injections with default theme styling. You should use this when you need to use a div tag without any additional styles. (You can also use a `div` tag by itself but won't be able to take advantage of `styled-system` props).

<em> Example </em>

```javascript
function MyComponent({children, className}) {
    // pass in className so that MyComponent can be extended as a styled-component using styled(MyComponent)``
    return (
        <SystemComponent 
          className={className}
          p={2}
          m={4}
        >
          {children}
        </SystemComponent>
    )
}
```

#### SystemSpan

A `span` tag with `styled-system` injections with default theme styling. Same notes as above.

<em> Example </em>

```javascript
return (
  <SystemComponent>
    <SystemSpan>{title}</SystemSpan>
    <SystemSpan ml={2}>{subtitle}</SystemSpan>
  </SystemComponent>
)
```

#### Other System Components

These are only base tags that include styled-system injections and the core theme styles but don't provide all the application styling that we want so we typically don't use the rest of the components defined here, unless we extend them as atoms.

#### Body

In `/front-end/components/atoms/Body.js`. View [source](../../frontend/components/atoms/Body.js).

<em> Variants </em>

| Variant name | Description |
|--------------|:------------|
| default      | Regular body with font size of body |
| big          | When body with font-size of body2 (16px) font is needed. |

<em> Default Properties </em>

| CSS Property | Default Variant Value | 'big' Variant Value |
|--------------|:----------------------|:--------------------|
| margin       | 0px                   | 0px                 |
| font-size    | 14px                  | 16px                |

<em> Examples </em>

```javascript
<Body>Here is a body of text with font-size 14px </Body>
<Body variant="big">Now this body of text has a font-size of 16px</Body>
```

#### Header 1

In `/front-end/components/atoms/Header1.js`. View [source](../../frontend/components/atoms/Header1.js).

<em>Default Properties</em>

| CSS Property  | Value |
|---------------|:----------------------|
| margin-top    | 0px                   |
| margin-bottom | 0px                   |
| font-family   | "title"               |
| font-weight   | "regular"             |
| font-size     | "header1"             |

#### Header 2

In `/front-end/components/atoms/Header2.js`. View [source](../../frontend/components/atoms/Header2.js).

<em>Default Properties</em>

| CSS Property  | Value |
|---------------|:----------------------|
| margin-top    | 0px                   |
| margin-bottom | 0px                   |
| font-family   | "title"               |
| font-size     | "header2"             |

#### Header 3

In `/front-end/components/atoms/Header3.js`. View [source](../../frontend/components/atoms/Header3.js).

<em>Default Properties</em>

| CSS Property  | Value |
|---------------|:----------------------|
| margin-top    | 0px                   |
| margin-bottom | 4 (15px)              |
| padding-bottom| 1 (2px)               |
| border-bottom-style | "solid"         |
| border-bottom-width | "2px"           |
| border-bottom-color | theme           |
| font-family   | "body"                |
| font-size     | "header3"             |

#### Header 4

In `/front-end/components/atoms/Header4.js`. View [source](../../frontend/components/atoms/Header4.js).

<em>Default Properties</em>

| CSS Property  | Value |
|---------------|:----------------------|
| margin-top    | 0px                   |
| margin-bottom | 0px                   |
| font-family   | "body"                |
| font-size     | "header4"             |

#### Header 5

In `/front-end/components/atoms/Header5.js`. View [source](../../frontend/components/atoms/Header5.js).

<em>Default Properties</em>

| CSS Property  | Value                 |
|---------------|:----------------------|
| margin-top    | 0px                   |
| margin-bottom | 0px                   |
| font-family   | "body"                |
| font-size     | "header5"             |

### Molecules

### Organisms

### Templates

### Pages

### Updating the design system

## State management and API integrations

## Custom Hooks

## Final notes
