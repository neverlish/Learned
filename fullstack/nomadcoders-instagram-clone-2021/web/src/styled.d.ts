import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor?: string;
    accent?: string;
    fontColor?: string;
    borderColor?: string;
  }
}