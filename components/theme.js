/**
 * Define colors
 */
const white = "#FFFFFF";
const grays = [
  "#F5F5F5", // light
  "#D6D6D6", // light gray
  "#B4B4B4", // grayed text
  "#888888", // gray
  "#333333" // dark gray
]
const black = "#131313";
const primaryBlue = "#2C8DFF";
const messagesBlue = "#1C9FFF";
const themeYellow = "#FED138";
const clickUpPurple = "#7B68EE";
const alertRed = "#F44848";

const softwareMagenta = "#DF39F5";
const mechRed = "#E03C3C";
const electricalGreen = "#26C309";
const adminPurple = "#892FF2";
const execYellow = "#CEAC36";
const infraOrange = "#CEAC36";

/**
 * Fonts
 */

const fontSizes = [12, 14, 16, 18, 36, 42];
fontSizes.body = fontSizes[0];
fontSizes.body2 = fontSizes[2];
fontSizes.body3 = fontSizes[1];
fontSizes.header1 = fontSizes[3];
fontSizes.header2 = fontSizes[2];
fontSizes.header3 = fontSizes[1];
fontSizes.header4 = fontSizes[0];
fontSizes.title = fontSizes[5];
fontSizes.subtitle = fontSizes[4];

const fontWeights = [400, 700, 900];
fontWeights.regular = fontWeights[0];
fontWeights.bold = fontWeights[1];
fontWeights.black = fontWeights[2];

const space = [0, 2, 5, 10, 15, 20, 25, 40];
space.cardSpacing = space[7];
space.cardPadding = space[5];
space.headerBottomMargin = space[4];

const theme = {
    colors: {
      theme: themeYellow,
      action: primaryBlue,
      alertAction: alertRed,
      foreground: black,
      background: white,
      grays,
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
        title: "Futura",
        body: "Nunito Sans"
    },
    fontSizes,
    fontWeights,
    space

}

export default theme;