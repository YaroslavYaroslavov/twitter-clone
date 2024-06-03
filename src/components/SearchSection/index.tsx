import { Recomendation } from 'components/Recomendation';
import { StateInterface } from 'interface';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FindInput, RecomendationContainer, SearchResultContainer, SearchSectionContainer } from './styled';

export const SearchSection = () => {
  const users = useSelector((state: StateInterface) => state.users) || [];

  const userInfo = useSelector((state: StateInterface) => state.userInfo);
  const [inputValue, setInputValue] = useState('')


  const [userRecomendation, setUserRecomendation] = useState<string[]>([]);

  console.log(users)

  const handleInputChange = e => {
    setInputValue(e.target.value)
    console.log(e.target.value)
  } 

  useEffect(() => {
    const usersArr: string[] = [];
    users?.forEach((user) => {
      if (!userInfo) return;

      const isFriend =
        Object.keys(user?.follow || {}).includes(userInfo.userId) &&
        Object.keys(userInfo?.followers || {}).includes(user.userId);


      if (isFriend ) {
        usersArr.push(...Object.keys(user?.follow || {}));
      }
     
    });

  
    const filteredUsersArr = usersArr.filter((userId) => userId !== userInfo?.userId && !Object.keys(userInfo.follow || {}).includes(userId)).slice(0, 5)
    // console.log(filteredUsersArr)

    if (filteredUsersArr.length < 5) {
      const remainingSlots = 5 - filteredUsersArr.length;
      const sortedUsers = users
        .filter(
          (user) =>
            !filteredUsersArr.includes(user.userId) &&
            user.userId !== userInfo?.userId &&
            !(userInfo?.followers && userInfo.followers[user.userId] )
        )
        .sort(
          (a, b) =>
            Object.keys(b.followers || []).length -
            Object.keys(a.followers || []).length
        )
        .slice(0, remainingSlots);
      setUserRecomendation([...filteredUsersArr, ...sortedUsers.map((user) => user.userId)]);
    } else {
      setUserRecomendation(filteredUsersArr);
    }
    
  }, []);

  return (
    <SearchSectionContainer>
      <FindInput value={inputValue} onChange={handleInputChange} type="text" placeholder="Поиск пользователей" />
      {inputValue ? <RecomendationContainer>
        <h1>Результат поиска:</h1>
       {users.filter(user => user.username.toLowerCase().includes(inputValue.toLowerCase())).map(el => <Recomendation key={el.userId} userId={el.userId} />)}
      </RecomendationContainer> :   <RecomendationContainer>
        <h1>Вас может заинтересовать</h1>
        {[...new Set(userRecomendation)].map((userId) => (
          <Recomendation key={userId} userId={userId} />
        ))}

     
      </RecomendationContainer>}
    
    </SearchSectionContainer>
  );
};
