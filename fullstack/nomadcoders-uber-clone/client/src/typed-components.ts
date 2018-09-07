import styledComponents, { ThemedStyledComponentsModule } from 'styled-components';

interface IThemeInterface {
  primaryColor: string;
  primaryColorInverted: string;
}

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
