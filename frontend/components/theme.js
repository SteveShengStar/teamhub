/**
 * Define colors
 */
const white = '#FFFFFF';
const greys = [
    '#F5F5F5', // light
    '#D6D6D6', // light gray
    '#B4B4B4', // grayed text
    '#888888', // gray
    '#333333' // dark gray
];
const black = '#131313';
const primaryBlue = '#2C8DFF';
const messagesBlue = '#1C9FFF';
const themeYellow = '#FED138';
const clickUpPurple = '#7B68EE';
const alertRed = '#F44848';

const softwareMagenta = '#DF39F5';
const mechRed = '#E03C3C';
const electricalGreen = '#26C309';
const adminPurple = '#892FF2';
const execYellow = '#CEAC36';
const infraOrange = '#CEAC36';

/**
 * Responsive Scaling
 */

const breakpoints = ['576px','768px', '992px', '1200px'];

const mediaQueries = {
    mobile: `@media screen and (min-width: ${breakpoints[0]})`,
    tablet: `@media screen and (min-width: ${breakpoints[1]})`,
    smallDesktop: `@media screen and (min-width: ${breakpoints[2]})`,
    desktop: `@media screen and (min-width: ${breakpoints[3]})`,
};

/**
 * Fonts
 */

const fontSizes = [14, 16, 18, 24, 36, 42];
fontSizes.body = fontSizes[0];
fontSizes.body2 = fontSizes[1];
fontSizes.header1 = fontSizes[4];
fontSizes.header2 = fontSizes[3];
fontSizes.header3 = fontSizes[2];
fontSizes.header4 = fontSizes[1];
fontSizes.header5 = fontSizes[0];
fontSizes.title = fontSizes[5];
fontSizes.subtitle = fontSizes[4];
fontSizes.smallSubtitle = fontSizes[3];
fontSizes.smallTitle = fontSizes[2];
fontSizes.nav = fontSizes[3];
fontSizes.smallNav = fontSizes[2];

const fontWeights = [400, 700, 900];
fontWeights.regular = fontWeights[0];
fontWeights.bold = fontWeights[1];
fontWeights.black = fontWeights[2];

const space = [0, 2, 5, 10, 15, 20, 25, 30, 35, 40];
space.cardMargin = space[9];
space.cardMarginSmall = space[2];
space.cardPadding = space[5];
space.cardPaddingSmall = space[3];
space.headerBottomMargin = space[4];
space.titleBottomMargin = space[6]; 
// For Account Settings Page
space.editableHeaderMargin = space[8];
space.settingsSubsectionPadding = space[4];

const cornerRadius = [0, 3, 5, 200];
cornerRadius.none = cornerRadius[0];
cornerRadius.small = cornerRadius[1];
cornerRadius.default = cornerRadius[2];
cornerRadius.rounded = cornerRadius[3];

const shadows = ['none', '0 2px 5px 0 rgba(0,0,0,0.05)', '0 2px 10px 0 rgba(0,0,0,0.1)', '0 2px 18px 0 rgba(0,0,0,0.2)'];
shadows.none = shadows[0];
shadows.light = shadows[1];
shadows.default = shadows[2];
shadows.dark = shadows[3];


/** Transition */
const transitions = ['none', 'all 0.2s ease-out'];
transitions.none = transitions[0];
transitions.default = transitions[1];


const theme = {
    colors: {
        theme: themeYellow,
        action: primaryBlue,
        alertAction: alertRed,
        foreground: black,
        background: white,
        greys,
        messagesBackground: messagesBlue,
        clickUp: clickUpPurple,
        software: softwareMagenta,
        mechanical: mechRed,
        electrical: electricalGreen,
        admin: adminPurple,
        exec: execYellow,
        infrastructure: infraOrange
    },
    fonts: {
        title: 'futura-pt',
        body: 'Nunito Sans'
    },
    fontSizes,
    fontWeights,
    space,
    radii: cornerRadius,
    shadows,
    breakpoints, mediaQueries,
    transitions
};

export default theme;