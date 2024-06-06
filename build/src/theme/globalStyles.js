import { createGlobalStyle, css } from 'styled-components';
export default createGlobalStyle `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }
  
  
`;
export const flexAlignCenter = css `
  display: flex;
  align-items: center;
`;
export const flexColumn = css `
  display: flex;
  flex-direction: column;
`;
export const centerByFlex = css `
  ${flexAlignCenter}
  justify-content: center;
`;
export const centerByFlexColumn = css `
  ${flexAlignCenter}
  flex-direction: column;
`;
export const defaultFont = css `
  font-family: Arial, Helvetica, sans-serif;
`;
