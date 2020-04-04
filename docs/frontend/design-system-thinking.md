# Behind the Design System

The purpose of this document is to outline how exactly Team Hub uses atomic design, and how it affects the way we build our user interface in Team Hub.

## Table of Contents

- [Behind the Design System](#behind-the-design-system)
  - [Table of Contents](#table-of-contents)
  - [The Model](#the-model)
    - [DNA and Theme](#dna-and-theme)
  - [Atoms](#atoms)
  - [Molecules](#molecules)
  - [Organisms](#organisms)

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
