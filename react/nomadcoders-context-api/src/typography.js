import Typography from "typography";

const typography = new Typography({
  googleFonts: [
    {
      name: "Nunito",
      styles: ["400", "600"]
    },
    {
      name: "Open Sans",
      styles: ["400"]
    }
  ],
  headerFontFamily: [
    "Nunito",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif"
  ],
  bodyFontFamily: [
    "Open Sans",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif"
  ],
  includeNormalize: false
});

typography.injectStyles();
