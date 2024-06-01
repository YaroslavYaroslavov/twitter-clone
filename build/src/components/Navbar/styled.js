import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';
import { centerByFlexColumn, defaultFont } from 'theme/globalStyles';
export const NavbarStyled = styled.nav `
  width: 400px;
  padding-top: 40px;

  ${centerByFlexColumn};
`;
export const StyledLink = styled(Link) `
  display: block;
  width: 110px;
  color: black;
  text-decoration: none;
  font-size: 18px;
  font-weight: 400;

  font-weight: ${(props) => (props.ismatch ? '600' : '300')};

  ${defaultFont};

  &:hover {
    font-weight: 600;
  }
`;
export const NavbarLinkContainer = styled.div `
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;
  margin-bottom: 40px;
`;
export const ButtonTweet = styled.button `
  background-color: ${colors.lightBlue};

  width: 230px;
  height: 55px;
  border-radius: 28px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightBlueInactive};
  }
`;
export const LogoutButton = styled.button `
  background-color: ${colors.lightGray};

  color: white;
  font-weight: 700;
  font-size: 18px;
  width: 230px;
  height: 55px;
  border-radius: 100px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightGrayHover};
  }
`;
