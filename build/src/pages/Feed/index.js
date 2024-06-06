import { Post } from 'components/Post';
import React from 'react';
import { useSelector } from 'react-redux';
export const Feed = () => {
    const currentUserInfo = useSelector((state) => state.userInfo);
    const posts = useSelector((state) => state.posts);
    const followedPosts = currentUserInfo !== undefined &&
        (currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.follow) !== undefined &&
        Object.keys(currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.follow).reduce((followedPosts, userId) => {
            if (posts[userId]) {
                return Object.assign(Object.assign({}, followedPosts), posts[userId]);
            }
            return followedPosts;
        }, {});
    return (React.createElement(React.Fragment, null, Object.values(followedPosts)
        .sort((a, b) => b.time - a.time)
        .map((post) => {
        return React.createElement(Post, { key: post.postId, postData: post });
    })));
};
