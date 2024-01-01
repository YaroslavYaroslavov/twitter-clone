import { Recomendation } from 'components/Recomendation';
import { StateInterface } from 'interface';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FindInput, RecomendationContainer, SearchSectionContainer, Showmore } from './styled';

export const SearchSection = () => {
  const users = useSelector((state: StateInterface) => state.users);
  const userInfo = useSelector((state: StateInterface) => state.userInfo);

  const [userRecomendation, setUserRecomendation] = useState<string[]>([]);

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
    setUserRecomendation(usersArr.filter((userId) => userId !== userInfo?.userId));
  }, []);

  return (
    <SearchSectionContainer>
      <FindInput type="text" placeholder="Search Twitter" />
      <RecomendationContainer>
        <h1>You might like</h1>
        {[...new Set(userRecomendation)].map((userId) => (
          <Recomendation key={userId} userId={userId} />
        ))}

        {/* <Showmore>Show more</Showmore> */}
      </RecomendationContainer>
    </SearchSectionContainer>
  );
};
