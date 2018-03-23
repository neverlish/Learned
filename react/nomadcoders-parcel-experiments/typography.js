import Typography from 'typography';

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  googleFonts: [
    {
      name: "Montserrat",
      styles: ["700"]
    },
    {
      name: "Open Sans",
      styles: ["400"]
    }
  ],
  headerFontFamily: [ "Montserrat", "Helvetica Neue", "sans-serif" ],
  bodyFontFamily: [ "Open Sans", "sans-serif" ]
});


typography.injectStyles();

export default typography;
