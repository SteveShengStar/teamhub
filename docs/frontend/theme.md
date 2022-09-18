# Theme in Team Hub

Theme is provided to the React application through [React Context](https://reactjs.org/docs/context.html). In styled-compenents, the theme object from Context is available from its props. If not, then access the theme through the `useContext` hook in functional components or statically in class components.

Do not access the theme through `import theme from "../<path_to_theme>/theme"` since this doesn"t allow for dynamic changes to theme (switching between light and dark mode).

View [source](../../frontend/components/theme.js).

## Theme Properties

[colors](#colors) | [fonts](#fonts) | [fontSizes](#font-sizes) | [fontWeights](#font-weights) | [space](#space) | [radii](#radii) | [shadows](#shadows) | [breakpoints](#breakpoints) | [mediaQueries](#media-queries) | [transitions](#transitions)

With the exception of `transitions`, these properties can all be accessed in styled components and as props for components with styled-system injections.

Transitions property can only be used inside of styled-components.

## Colors

Each key references a color as a string, greys are an array of strings so an index between 0 - 4 needs to specified for the color grey.

### Sample Usage

```javascript
const MyComponent = styled.div`
    background-color: ${(props) => props.theme.colors.background};
`;
```

### Fields

| Field              |                 Default Value (Light mode)                 |              Description |                                                                        Usage | Frequency |
| ------------------ | :--------------------------------------------------------: | -----------------------: | ---------------------------------------------------------------------------: | --------: |
| theme              | ![#](https://placehold.it/25/FED138/000000?text=+) #FED138 |      Primary theme color |                                                        For logos, or accents | Sometimes |
| action             | ![#](https://placehold.it/25/2C8DFF/000000?text=+) #2C8DFF |     Primary action color |                              Primary buttons, clickable items, primary links | Sparingly |
| alertAction        | ![#](https://placehold.it/25/F44848/000000?text=+) #F44848 |       Alert action color |                       For actions that need extra attention or consideration |    Rarely |
| foreground         | ![#](https://placehold.it/25/131313/000000?text=+) #131313 |         Foreground Color |                                          Color used in foreground (aka text) |  Frequent |
| background         | ![#](https://placehold.it/25/FFFFFF/000000?text=+) #FFFFFF |         Background Color |                                                     Color used in background |  Frequent |
| greys.0            | ![#](https://placehold.it/25/F5F5F5/000000?text=+) #F5F5F5 |   Super Light Grey Color | Primarily a UI accent on top of white to make it more aesthetically pleasing |    Rarely |
| greys.1            | ![#](https://placehold.it/25/D6D6D6/000000?text=+) #D6D6D6 |         Light Grey Color |                                              Whenever a light grey is needed | Sparingly |
| greys.2            | ![#](https://placehold.it/25/B4B4B4/000000?text=+) #B4B4B4 |          Text Grey Color |                                               For disabled or secondary text | Sparingly |
| greys.3            | ![#](https://placehold.it/25/888888/000000?text=+) #888888 |          Just Grey Color |                                                      Whenever grey is needed | Sparingly |
| greys.4            | ![#](https://placehold.it/25/333333/000000?text=+) #333333 |    Super Dark Grey Color | Primarily a UI accent on top of white to make it more aesthetically pleasing | Sparingly |
| messagesBackground | ![#](https://placehold.it/25/1C9FFF/000000?text=+) #1C9FFF |     Message Dialog Color |                                                Color used in messaging boxes |    Rarely |
| clickUp            | ![#](https://placehold.it/25/7B68EE/000000?text=+) #7B68EE |            ClickUp Color |                                             Primary color indicating ClickUp |    Rarely |
| software           | ![#](https://placehold.it/25/DF39F5/000000?text=+) #DF39F5 |      Software Team Color |                                    Primary color indicating software subteam | Sparingly |
| mechanical         | ![#](https://placehold.it/25/E03C3C/000000?text=+) #E03C3C |    Mechanical Team Color |                                  Primary color indicating mechanical subteam | Sparingly |
| electrical         | ![#](https://placehold.it/25/26C309/000000?text=+) #26C309 |    Electrical Team Color |                                  Primary color indicating electrical subteam | Sparingly |
| admin              | ![#](https://placehold.it/25/892FF2/000000?text=+) #892FF2 |         Admin Team Color |                                       Primary color indicating admin subteam | Sparingly |
| exec               | ![#](https://placehold.it/25/CEAC36/000000?text=+) #CEAC36 |          Exec Team Color |                                        Primary color indicating exec subteam | Sparingly |
| infrastructure     | ![#](https://placehold.it/25/CEAC36/000000?text=+) #CEAC36 | Infrastucture Team Color |                                       Primary color indicating infra subteam | Sparingly |

## Fonts

You shouldn't ever need to set the font of a component if you're following the design system properly. Setting the font is only needed in [SystemComponents](../../frontend/components/atoms/SystemComponents.js) and text-based Atom components.

### Sample Usage

```javascript
const MyComponent = styled.div`
    font-size: ${(props) => props.theme.fonts.body};
`;
```

### Fields

| Field | Default Value |           Description |                              Usage | Frequency |
| ----- | :-----------: | --------------------: | ---------------------------------: | --------: |
| body  | "Nunito Sans" | Main Application Font | For all body and most header fonts |  Frequent |
| title |  "futura-pt"  |            Title Font |         For titles, subtitles only |    Rarely |

## Font Sizes

Font sizes provides all the sizes (in pixels) for different types of text we use.

In most cases, usage of font sizes shouldn't be needed since they are defined in atoms. In the rare case you do need to set the font size of a component, refer to the following.

### Sample Usage

```javascript
const MyCustomTitle = styled.div`
    font-size: ${(props) => props.theme.fontSizes.title}px;
`;
```

### Fields

| Field         | Default Value |                 Description |                                                                 Usage | Frequency |
| ------------- | :-----------: | --------------------------: | --------------------------------------------------------------------: | --------: |
| body          |     14px      |              Body font size |                                                   For all normal text |  Frequent |
| body2         |     16px      |          Body font (bigger) |                       For normal text that needs slightly bigger text | Sparingly |
| header1       |     36px      |            Main Header Font | For page headers, and typically the biggest information on the screen |    Rarely |
| header2       |     24px      | Header Font for subsections |                     Headers on Card, and other subsections components | Sparingly |
| header3       |     18px      |              Subheader font |                                   Subheaders in different subsections | Sparingly |
| header4       |     16px      |           Body2 header font |           To outline a small section with the same font size as body2 | Sparingly |
| header5       |     16px      |            Body header font |            To outline a small section with the same font size as body | Sparingly |
| subtitle      |     36px      |               Subtitle font |                                                                       | Sparingly |
| title         |     42px      |                  Title font |                                        Used as the title on each page | Sparingly |
| smallSubtitle |     24px      |        Mobile subtitle font |                                  Used as the subtitle on mobile fonts | Sparingly |
| smallTitle    |     24px      |           Mobile title font |                                     Used as the title on mobile fonts | Sparingly |

## Font Weights

We are only using three font weights: Regular (400), Bold (700), and Black (900).

### Sample Usage

```javascript
const MyComponent = styled.div`
    font-weight: ${(props) => props.theme.fontWeights.bold};
`;
```

### Fields

| Field   | Default Value |         Description |                                         Usage | Frequency |
| ------- | :-----------: | ------------------: | --------------------------------------------: | --------: |
| regular |      400      | Regular font weight |                  For most body fonts and text |  Frequent |
| bold    |      700      |    Bold font weight |                For subheaders and subsections | Sparingly |
| black   |      900      |   Black font weight | For headers and things needing extra emphasis |    Rarely |

## Space

Spacing is one of the most used properties since it refers to padding and margin of elements.

Rather than providing hardcoded pixel values for spacing, the space prop provides default values encoded in the theme.

### Sample Usage

```javascript
const CustomCard = styled.div`
    padding: ${(props) => props.theme.space.cardPadding}px;
    margin: ${(props) => props.theme.space[2]}px;
`;

// in JSX as props (must be a component based on styled-system)
// note p->padding, mt->margin top, refer to styled-system docs

// see fields section to see what 2 and 4 means
return <SystemComponent p={2} mt={4} />;
```

### Fields

In addition to these named fields, space props can be accessed as an array index from the array

`[0, 2, 5, 10, 15, 20, 25, 30, 35, 40]`

where `<Component p={2}/>` will give the component a padding of `${space[2]}px -> 5px`

| Field              |  Default Value  |                            Description | Usage | Frequency |
| ------------------ | :-------------: | -------------------------------------: | ----: | --------: |
| cardMargin         | space[9] = 40px |  Margin for Card Components on Desktop |       |    Rarely |
| cardPadding        | space[5] = 20px | Padding for Card Components on Desktop |       |    Rarely |
| cardMarginSmall    | space[2] = 5px  |   Margin for Card Components on Mobile |       |    Rarely |
| cardPaddingSmall   | space[3] = 10px |  Padding for Card Components on Mobile |       |    Rarely |
| headerBottomMargin | space[4] = 15px |              Bottom margin for headers |       |    Rarely |
| titleBottomMargin  | space[6] = 25px |               Bottom margin for titles |       |    Rarely |

## Radii

This is a useful property for specifying a component's corner-radius property

### Sample Usage

```javascript
const CustomCard = styled.div`
    border-radius: ${(props) => props.theme.radii.small}px;
`;
```

### Fields

| Field   | Default Value |               Description |                                                                                    Usage | Frequency |
| ------- | :-----------: | ------------------------: | ---------------------------------------------------------------------------------------: | --------: |
| none    |      0px      |          No corner radius | This is useful when animating or transitioning from no border radius to some other value |    Rarely |
| small   |      3px      | Small corner radius value |                                                          For subtle border radius effect | Sparingly |
| default |      5px      |     Default border radius |                                                     Use for regular corner radius effect |    Rarely |
| rounded |     200px     |            Rounded effect |                                      to make a corner-radius completely rounded (circle) |    Rarely |

## Shadows

This property is meant to be mapped to the box-shadow css property.

### Sample Usage

```javascript
const CustomCard = styled.div`
    box-shadow: ${props => props.theme.shadows.default}px;
`

// in JSX element
<SystemComponent shadow="light" />
```

### Fields

| Field   |         Default Value          |        Description |                                                                                 Usage | Frequency |
| ------- | :----------------------------: | -----------------: | ------------------------------------------------------------------------------------: | --------: |
| none    |             "none"             |      No box shadow | This is useful when animating or transitioning from no box shadow to some other value |    Rarely |
| small   | "0 2px 5px 0 rgba(0,0,0,0.05)" |   Light box shadow |                                                          For subtle box shadow effect | Sparingly |
| default | "0 2px 10px 0 rgba(0,0,0,0.1)" | Default box shadow |                                                     Use for default box shadow effect | Sparingly |
| dark    | "0 2px 18px 0 rgba(0,0,0,0.2)" |    Dark box shadow |                                                    Use for a darker box shadow effect |    Rarely |

## Breakpoints

Some constants for the media query breakpoints as an array. Don't use often and use the [mediaQueries](#media-queries) property.

### Sample usage

See [styled-system](https://styled-system.com/responsive-styles) for more information.

```javascript
<SystemComponent p={[2, 3, 4, 5]} />
// will give a padding of 5px, when < breakpoints[0], 10px when < breakpoints[1] etc.
```

### Fields

The fields of breakpoints are simply an array `breakpoints[0], breakpoints[1]`

| Field | Default Value |                   Description | Usage | Frequency |
| ----- | :-----------: | ----------------------------: | ----: | --------: |
| 0     |    "576px"    | Smallest media query (mobile) |       |    Rarely |
| 1     |    "768px"    |            Tablet media query |       |    Rarely |
| 2     |    "992px"    |     Small Desktop media query |       |    Rarely |
| 3     |   "1200px"    |           Desktop media query |       |    Rarely |

## Media Queries

Provides preset media queries to be used in components

### Sample usage

See [styled-system](https://styled-system.com/responsive-styles) for more information.

```javascript
const MyComponent = styled.div`
    background-color: ${(props) => props.theme.colors.theme};
    ${(props) => props.theme.mediaQueries.desktop} {
        background-color: ${(props) => props.theme.colors.background};
    }
`;
// when screen >= 1200px, will set the background color from theme to background
```

### Fields

| Field        |              Default Value              |                          Description |                                                            Usage | Frequency |
| ------------ | :-------------------------------------: | -----------------------------------: | ---------------------------------------------------------------: | --------: |
| mobile       | "@media screen and (min-width: 576px)"  |       Media query for mobile devices |  When you need to specifiy a style when the screen width > 576px |  Frequent |
| tablet       | "@media screen and (min-width: 768px)"  |       Media query for tablet devices |  When you need to specifiy a style when the screen width > 768px |  Frequent |
| smallDesktop | "@media screen and (min-width: 992px)"  | Media query for smallDesktop devices |  When you need to specifiy a style when the screen width > 992px |  Frequent |
| desktop      | "@media screen and (min-width: 1200px)" |      Media query for desktop devices | When you need to specifiy a style when the screen width > 1200px |  Frequent |

## Transitions

Provides some default transition styles that are used pretty often. Cannot be used with styled-system, and only for styled-components.

Incomplete property and needs more work to be more useful!

### Sample usage

```javascript
const MyComponent = styled.div`
    transition: ${(props) => props.theme.transitions.default};
`;
// applies 0.2s ease-out to all properties
```

### Fields

| Field   |    Default Value    |        Description |                                                                                                                Usage | Frequency |
| ------- | :-----------------: | -----------------: | -------------------------------------------------------------------------------------------------------------------: | --------: |
| none    |       "none"        |      No transition | Useful when needing to dynamically change between transitionable to none (or setting no transition in media queries) |    Rarely |
| default | "all 0.2s ease-out" | Default transition |                                                                                                                      |  Frequent |
