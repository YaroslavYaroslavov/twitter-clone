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
  max-height: 435px;
  overflow-y: scroll;
  /* Стили для скроллбара */
  &::-webkit-scrollbar {
    width: 6px; /* Ширина скроллбара */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Цвет трека */
    margin: 40px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* Цвет ползунка */
    border-radius: 40px;
    height: 30px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Цвет ползунка при наведении */
  }
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
export const SearchResultContainer = styled.div`
  height: 550px;
  width: 380px;
  padding-left: 20px;
  font-size: 15px;
  border-radius: 31px;
  border: none;
  background-color: #eff3f4;

  ${flexColumn};
  ${defaultFont};
`;
