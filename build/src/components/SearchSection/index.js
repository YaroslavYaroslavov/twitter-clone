import { Recomendation } from 'components/Recomendation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FindInput, RecomendationContainer, SearchSectionContainer } from './styled';
export const SearchSection = () => {
    const users = useSelector((state) => state.users);
    const userInfo = useSelector((state) => state.userInfo);
    const [userRecomendation, setUserRecomendation] = useState([]);
    useEffect(() => {
        const usersArr = [];
        users === null || users === void 0 ? void 0 : users.forEach((user) => {
            if (!userInfo)
                return;
            const isFriend = Object.keys((user === null || user === void 0 ? void 0 : user.follow) || {}).includes(userInfo.userId) &&
                Object.keys((userInfo === null || userInfo === void 0 ? void 0 : userInfo.followers) || {}).includes(user.userId);
            if (isFriend) {
                usersArr.push(...Object.keys((user === null || user === void 0 ? void 0 : user.follow) || {}));
            }
        });
        setUserRecomendation(usersArr.filter((userId) => userId !== (userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId)));
    }, []);
    return (React.createElement(SearchSectionContainer, null,
        React.createElement(FindInput, { type: "text", placeholder: "Search Twitter" }),
        React.createElement(RecomendationContainer, null,
            React.createElement("h1", null, "You might like"),
            [...new Set(userRecomendation)].map((userId) => (React.createElement(Recomendation, { key: userId, userId: userId }))))));
};
