import { OtherOptions } from 'components/OtherOptions';
import { StyledUserLink, StyledUserName } from 'components/UserInfoCard/styled';
import { ref, remove, set } from 'firebase/database';
import { db } from 'firebaseConfig/firebase';
import React from 'react';
import { useSelector } from 'react-redux';
import { LikeButton, LikeSection, PostContainer, PostContent, PostHeader, PostInfoHeader, PostTextContent, UserAvatar, } from './styled';
function getTimePassed(milliseconds) {
    const timePassed = Date.now() - milliseconds;
    const seconds = Math.floor(timePassed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) {
        return years + ' year';
    }
    else if (months > 0) {
        return months + ' month';
    }
    else if (days > 0) {
        return days + ' day';
    }
    else if (hours > 0) {
        return hours + ' hr';
    }
    else if (minutes > 0) {
        return minutes + ' min';
    }
    else {
        return seconds + ' sec';
    }
}
export const Post = ({ postData }) => {
    var _a, _b;
    const users = useSelector((state) => state.users);
    const currentUserInfo = useSelector((state) => state.userInfo);
    if (!(currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userId))
        return;
    const currentUserPage = users === null || users === void 0 ? void 0 : users.find((user) => user.userId === postData.authorId);
    const likesUserArray = (postData === null || postData === void 0 ? void 0 : postData.likes) ? Object.keys(postData.likes) : [];
    const isLiked = likesUserArray.includes(currentUserInfo.userId);
    const toggleLikePost = () => {
        const likesRef = `tweets/${postData.authorId}/${postData.authorId}_${postData.time}/likes/${currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userId}`;
        isLiked ? remove(ref(db, likesRef)) : set(ref(db, likesRef), '');
    };
    const handleDeletePost = () => {
        const postRef = `tweets/${postData.authorId}/${postData.authorId}_${postData.time}`;
        remove(ref(db, postRef));
    };
    return (React.createElement(PostContainer, null,
        React.createElement(UserAvatar, { src: currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.avatar }),
        React.createElement(PostContent, null,
            React.createElement(PostHeader, null,
                React.createElement(PostInfoHeader, null,
                    React.createElement(StyledUserName, null, currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.username),
                    React.createElement(StyledUserLink, null,
                        "@", currentUserPage === null || currentUserPage === void 0 ? void 0 :
                        currentUserPage.userlink),
                    React.createElement("span", null, "\u2022"),
                    React.createElement(StyledUserLink, null, getTimePassed(postData.time))),
                currentUserInfo.userId === postData.authorId && (React.createElement(OtherOptions, { deletePost: handleDeletePost }))),
            React.createElement(PostTextContent, null, (_a = postData.content) === null || _a === void 0 ? void 0 : _a.text),
            ((_b = postData.content) === null || _b === void 0 ? void 0 : _b.images) &&
                postData.content.images.map((image) => (React.createElement("img", { style: { width: '200px', height: '200px' }, src: image, key: image }))),
            React.createElement(LikeSection, { isLiked: isLiked },
                React.createElement(LikeButton, { isLiked: isLiked, onClick: toggleLikePost }),
                React.createElement("span", null, likesUserArray.length)))));
};
