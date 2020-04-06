# Atomic Design & The Design System

The purpose of this document is to outline how exactly Team Hub uses atomic design, and how it affects the way we build our user interface in Team Hub.

## Table of Contents

- [Atomic Design & The Design System](#atomic-design--the-design-system)
  - [Table of Contents](#table-of-contents)
  - [The Model](#the-model)
    - [DNA and Theme](#dna-and-theme)
  - [Atoms](#atoms)
  - [Molecules](#molecules)
  - [Organisms](#organisms)
  - [Templates](#templates)
  - [Pages](#pages)
  - [In Combination with Styled Components](#in-combination-with-styled-components)
  - [Styled System with Styled Components](#styled-system-with-styled-components)
  - [Final notes](#final-notes)

## The Model

There are many people who have written about atomic design. While we follow the core concepts of atomic design, we don't strictly follow a set of guidelines set by someone else. In a way, we are creating our own set of guidelines and rules for atomic design that is gradually changing as our UI grows.

We separate our application into 5 main sections

- Atoms
- Molecules
- Organisms
- Templates
- Pages

Each one of these sections are pretty distinctly organized in the code with separate folders for each.

Each atom, molecule, organism, template, or page is encapsulated in a React component (we can refer to a general element in our design system as a component).

### DNA and Theme

Each component shares a set of core "DNA", which in our case, we define as the <b>theme</b>. The theme contains information about possible colors, spacing guidelines, fonts, etc.

DNA/Theme consists of the "invisible" parts of the application since they don't actually appear as components. Instead, they are used by components to create a consistent user interface. Rather than specifying hardcoded when we style our components, we try to use the theme.

The big advantage of extending from a standard theme object is that it's really easy to change the theme of our project. Combining theme with Contexts in React, we can dynamically change our theme without modifying any existing code.

It's pretty easy to understand why a global theme object is useful, but not why we use React Context to integrate with our theme. Consider the following example:

```javascript
// theme.js
export const theme = {
    colors: {
        red: "#FF0000",
    }
}

// index.js
import { theme } from "./theme";
const App = ({children}) => (
    <div style={{color: theme.colors.red }}>
        {children}
    <div>
)
```

Now imagine that we imported theme in 20 different files where we needed to use the color red. We have 2 options to change the theme now:

1. Change the theme file but lose the old theme
2. Create a new theme file called theme2, and update all the imports

Both options aren't ideal. Instead you'd want something like this:

```javascript
// theme.js
const themes = [theme1, theme2, ...] // aggregate all our themes inside of an array
let currentTheme = 0;

export const getTheme = () => {
    return themes[currentTheme]
}

// App.js
import { getTheme } from "./theme";
const App = ({children}) => (
    <div style={{color: getTheme().colors.red }}>
        {children}
    <div>
)
```

The second example is what we want more. We can change our theme pretty easily this way.React Context (and styled-components) takes it this a step further and lets us manage our themes inside of React components (so we can change our theme based on states in React).

## Atoms

Intuitively, Atoms contain the most basic building blocks - buttons, headers, labels, cards, input fields, etc.

While browsers and the HTML spec have buttons, input fields, headers, etc. built in, they don't necessarily have the styling (and are inconsistent between browsers and operating systems) so we want so we create our own atoms (components) on top of them.

Since every component is built on top of atoms and our theme, if we want to completely change the way our application looks visually, we only need to change the theme and some styling in the atoms.

## Molecules

Molecules more complex components that are built strictly from atoms. For example, a header + input + button that creates a simple form element would be considered a molecule.

There isn't much logic present in molecules. They simply take in props to render the correct data and notify it's parent when an action happens. For example, the MemberPreviewComponent is a great example of a molecule:

```javascript
const MemberPreviewComponent = ({name, subteam, role, onClick, imageUrl, term, isOnStream}) => {
    return (
        <GridLayout 
            backgroundColor="grays.0"
            borderRadius="small"
            height={36} 
            onClick={onClick}
        >
            <Image 
                height={36} 
                key={0}
                src={imageUrl || "/static/default-headshot.png"}
                gridRow="1/3"
                borderRadius="18px"
                overflow="visible"
            />

            <RowFlexLayout>
                <Header5>{name}</Header5>
                <Body>{term}</Body>
            </RowFlexLayout>

            <RowFlexLayout gridRow="2/3" gridColumn="2/3">
                <BorderlessButton variant={'software'}>{subteam && subteam.name || ""}</BorderlessButton>
                <Body>{role}</Body>
            </RowFlexLayout>
            <Dot isOnStream={isOnStream}/>

        </GridLayout>
    );
};
```

Notice how this is a pure function (it's always rendered the same way given the same props). There are no side effects or state present. When the user clicks on the object, it calls the onClick method passed in as props instead of managing it's own state.

## Organisms

Organisms are like organisms in real life - they are some living thing that does something useful. They are put together by molecules and atoms. Organsisms typically contain logic in order to get stuff done.

They are typically the most complex components other than pages since they typically own multiple molecules and contain the states for each of the molecules.

## Templates

With templates, we move away from the chemistry analogies. Templates are what they sound like. They are general purpose components that many pages use in order to generate a similar look/feel, or layout.

For example, in Team Hub, we have two main templates. The LoginTransition template and PageTemplate.

The LoginTransition is used on every login onboarding page in order to handle transitions consistently on each page.

The PageTemplate is included on each page of Team Hub to render to Nav Bar, page header, and general spacing of each page in the same way.

## Pages

These are the final and biggest components of our system. They are a big component, usually composed by a template, consisting of multiple organisms, molecules and atoms. They will also include logic that isn't managed in the organisms to make the page fully functional.

In Team Hub, each page inside of the `/pages` directory is a good example of a page and how it's built up of templates, organisms, molecules, and atoms.

## In Combination with Styled Components

At the core, the standard way to style and layout a website is with CSS. CSS has it's own problems with scoping issues, and growing complexity. These are all issues that can be avoided, with pure, well managed CSS. However, using a library such as styled-components can make styling our websites a lot nicer and easier to write, and much more manageable.

While [styled-component's documentation](https://styled-components.com/docs) give the best overview of styled-compenents (that you should definitely read through), the rest of this section will point out and explain some of the most important parts to keep in mind.

Our theme object is provided to each styled-component (remember a styled-component is simply a React component that takes in props, we just don't define the implementation of this styled-component since it's maintained by the library). Additionally, the syntax of styled-components are based on [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

We want to access the theme object that's passed into our styled-components as props:

```javascript
const Component = styled.div`
    background-color: ${props => props.theme.colors.background};
`
```

There's no magic happening inside of `${props => props.theme.colors.background}`. This is simply an arrow function with parameter props which is whatever props are passed down to the component. `props.theme.colors.background` is just accessing properties of props, and the theme (props and theme are both `object` types).

Each of our atoms and molecules are designed to be extendable by a styled-components. Styled-components provide the syntax:

```javascript
styled(MyOwnDefinedReactComponent)`
    styles...
`
```

This will pass a generated className prop to `MyOwnDefinedReactComponent` and apply the new styles to the React component. In the definition of `MyOwnDefinedReactComponent`, you just need to receive the className prop and assign it to a JSX Element:

```javascript
function MyOwnDefinedReactComponent({className, ...otherProps}) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}
```

These are core concepts with styled-components that we use in Team Hub to build our design system.

## Styled System with Styled Components

Our last front-end technology we use for our design system is styled-system. Read up on the [docs](https://styled-system.com/getting-started) to see how it works.

In essence, it allows us to pass props as styles based on our theme in styled-components.

## Final notes

This section should give you a pretty good idea of why we choose to use this design system for our project and how you can write your front-end that follows the guideline of this design system. For more specifics into the design system, look at the [main doc](../frontend/README.md) for front-end which contains details about each individual component inside of the design system.
