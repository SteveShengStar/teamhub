# Theme in Team Hub

Theme is provided to the React application through [React Context](https://reactjs.org/docs/context.html). In styled-compenents, the theme object from Context is available from its props. If not, then access the theme through the `useContext` hook in functional components or statically in class components.

Do not access the theme through `import theme from "../<path_to_theme>/theme"` since this doesn't allow for dynamic changes to theme (switching between light and dark mode).

View [source](../../frontend/components/theme.js).

## Theme Properties

[colors](#colors) | [fonts](#fonts) | fontSizes | fontWeights | space | radii | cornerRadius | shadows | breakpoints | mediaQueries | transitions

## Colors

Each key references a color as a string, grays are an array of strings so an index between 0 - 4 needs to specified for the color gray.

### Sample Usage

```javascript
const MyComponent = styled.div`
    background-color: ${props => props.theme.colors.background};
`
```

### Fields

| Field             | Default Value (Light mode)   | Description      | Usage      | Frequency
| -------------------|:-----------------------------:| ----------------:|---------------:|------------:|
| theme              | ![#](https://placehold.it/25/FED138/000000?text=+) #FED138 | Primary theme color | For logos, or accents | Sometimes
| action             | ![#](https://placehold.it/25/2C8DFF/000000?text=+) #2C8DFF | Primary action color  | Primary buttons, clickable items, primary links | Sparingly
| alertAction        | ![#](https://placehold.it/25/F44848/000000?text=+) #F44848 | Alert action color | For actions that need extra attention or consideration | Rarely |
| foreground         | ![#](https://placehold.it/25/131313/000000?text=+) #131313 | Foreground Color | Color used in foreground (aka text) | Frequent |
| background         | ![#](https://placehold.it/25/FFFFFF/000000?text=+) #FFFFFF | Background Color | Color used in background | Frequent |
| grays.0            | ![#](https://placehold.it/25/F5F5F5/000000?text=+) #F5F5F5 | Super Light Gray Color | Primarily a UI accent on top of white to make it more aesthetically pleasing | Rarely |
| grays.1            | ![#](https://placehold.it/25/D6D6D6/000000?text=+) #D6D6D6 | Light Gray Color | Whenever a light gray is needed | Sparingly |
| grays.2            | ![#](https://placehold.it/25/B4B4B4/000000?text=+) #B4B4B4 | Text Gray Color | For disabled or secondary text | Sparingly |
| grays.3            | ![#](https://placehold.it/25/888888/000000?text=+) #888888 | Just Gray Color | Whenever gray is needed | Sparingly |
| grays.4            | ![#](https://placehold.it/25/333333/000000?text=+) #333333 | Super Dark Gray Color | Primarily a UI accent on top of white to make it more aesthetically pleasing | Sparingly |
| messagesBackground | ![#](https://placehold.it/25/1C9FFF/000000?text=+) #1C9FFF | Message Dialog Color | Color used in messaging boxes | Rarely |
| clickUp            | ![#](https://placehold.it/25/7B68EE/000000?text=+) #7B68EE | ClickUp Color | Primary color indicating ClickUp | Rarely |
| software           | ![#](https://placehold.it/25/DF39F5/000000?text=+) #DF39F5 | Software Team Color | Primary color indicating software subteam | Sparingly |
| mechanical         | ![#](https://placehold.it/25/E03C3C/000000?text=+) #E03C3C | Mechanical Team Color | Primary color indicating mechanical subteam | Sparingly |
| electrical         | ![#](https://placehold.it/25/26C309/000000?text=+) #26C309 | Electrical Team Color | Primary color indicating electrical subteam | Sparingly |
| admin              | ![#](https://placehold.it/25/892FF2/000000?text=+) #892FF2 | Admin Team Color | Primary color indicating admin subteam | Sparingly |
| exec               | ![#](https://placehold.it/25/CEAC36/000000?text=+) #CEAC36 | Exec Team Color | Primary color indicating exec subteam | Sparingly |
| infrastructure     | ![#](https://placehold.it/25/CEAC36/000000?text=+) #CEAC36 | Infrastucture Team Color | Primary color indicating infra subteam | Sparingly |

## Fonts

You shouldn't ever need to set the font of a component if you're following the design system properly. Setting the font is only needed in [SystemComponents](../../frontend/components/atoms/SystemComponents.js) and text-based Atom components.

### Sample Usage

```javascript
const MyComponent = styled.div`
    font-size: ${props => props.theme.fonts.body};
`
```

### Fields

| Field             | Default Value   | Description      | Usage      | Frequency
| -------------------|:-----------------------------:| ----------------:|---------------:|------------:|
| body              | 'Nunito Sans' | Main Application Font | For all body and most header fonts | Frequent |
| title             | 'futura-pt' | Title Font | For titles, subtitles only | Rarely |