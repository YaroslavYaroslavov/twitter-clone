import { Recomendation } from 'components/Recomendation';
import { StateInterface } from 'interface';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  FindInput,
  RecomendationContainer,
  SearchSectionContainer,
} from './styled';

export const SearchSection = () => {
  const users = useSelector((state: StateInterface) => state.users) || [];

  const userInfo = useSelector((state: StateInterface) => state.userInfo);
  const [inputValue, setInputValue] = useState('');

  const [userRecomendation, setUserRecomendation] = useState<string[]>([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const usersArr: string[] = [];
    users?.forEach((user) => {
      if (!userInfo) return;

      const isFriend =
        Object.keys(user?.follow || {}).includes(userInfo.userId) &&
        Object.keys(userInfo?.followers || {}).includes(user.userId);

      if (isFriend) {
        usersArr.push(...Object.keys(user?.follow || {}));
      }
    });

    const filteredUsersArr = usersArr.filter((userId) => userId !== userInfo?.userId);

    const topFollowersUsers = users
      .map((user) => ({
        [user.userId]: Object.keys(user?.followers || {}).length,
      }))
      .sort((a, b) => {
        const countA = Object.values(a)[0];
        const countB = Object.values(b)[0];
        return countB - countA;
      });


    setUserRecomendation([
      ...filteredUsersArr,
      ...topFollowersUsers.flatMap((user) => Object.keys(user || {})),
    ].filter(userId => userId !== userInfo?.userId && !Object.keys(userInfo?.follow || {}).includes(userId) ) );

  }, []);

  return (
    <SearchSectionContainer>
      <FindInput
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        placeholder="Поиск пользователей"
      />
      {inputValue ? (
        <RecomendationContainer>
          <h1>Результат поиска:</h1>
          {users
            .filter((user) => user.username.toLowerCase().includes(inputValue.toLowerCase()))
            .map((el) => (
              <Recomendation key={el.userId} userId={el.userId} />
            ))}
        </RecomendationContainer>
      ) : (
        <RecomendationContainer>
          <h1>Вас может заинтересовать</h1>
          {[...new Set(userRecomendation)].map((userId) => (
            <Recomendation key={userId} userId={userId} />
          ))}
        </RecomendationContainer>
      )}
    </SearchSectionContainer>
  );
};
