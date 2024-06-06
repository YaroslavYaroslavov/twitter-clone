import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';
import { centerByFlex, defaultFont, flexColumn } from 'theme/globalStyles';
export const StyledUserInfoCard = styled.section `
  ${centerByFlex}

  width: 100%;
  gap: 30px;
  height: 100px;
`;
export const StyledUserName = styled.p `
  ${defaultFont}

  font-weight: 700;
`;
export const StyledUserLink = styled.p `
  ${defaultFont}
  color: ${colors.placeholder};
`;
export const UserInfoContainer = styled.div `
  ${flexColumn}

  gap: 10px;
`;
export const UserAvatar = styled.img `
  width: 54px;
  height: 54px;
  border-radius: 100%;
`;
