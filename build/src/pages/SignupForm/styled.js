import { styled } from 'styled-components';
import { colors } from 'theme/colorsPallete';
import { flexColumn } from 'theme/globalStyles';
export const AlternativeLogin = styled.p `
  color: ${colors.lightBlue};

  cursor: pointer;
`;
export const BirthdayContainer = styled.section `
  display: flex;
  justify-content: space-between;
`;
export const ErrorContainer = styled.p `
  color: ${colors.error};
`;
export const StyledSignupForm = styled.form `
  ${flexColumn}

  gap: 30px;
`;
export const TextContainer = styled.div `
  ${flexColumn}

  gap: 20px;
`;
