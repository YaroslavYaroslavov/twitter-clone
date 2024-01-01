import styled from 'styled-components';
import { defaultFont, flexColumn } from 'theme/globalStyles';

export const SearchSectionContainer = styled.section`
  width: 380px;
  margin-left: 30px;
  margin-top: 30px;
  gap: 30px;

  ${flexColumn}
`;

export const RecomendationContainer = styled.div`
  ${flexColumn}

  background-color: #eff3f4;
  gap: 20px;
  border-radius: 20px;
  padding: 20px;
`;

export const Showmore = styled.p`
  padding-top: 30px;
`;

export const FindInput = styled.input`
  height: 55px;
  width: 380px;
  padding-left: 20px;
  font-size: 15px;
  border-radius: 31px;
  border: none;
  background-color: #eff3f4;

  ${defaultFont};
`;
