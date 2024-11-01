import { Post } from 'components/Post';
import { StateInterface } from 'interface';
import React from 'react';
import { useSelector } from 'react-redux';

export const Feed = () => {
  const currentUserInfo = useSelector((state: StateInterface) => state.userInfo);
  const posts = useSelector((state: StateInterface) => state.posts);

  const followedPosts =
    currentUserInfo !== undefined &&
    currentUserInfo?.follow !== undefined &&
    Object.keys(currentUserInfo?.follow).reduce((followedPosts, userId) => {
      if (posts[userId]) {
        return {
          ...followedPosts,
          ...posts[userId],
        };
      }
      return followedPosts;
    }, {});

  return (
    <>
      {Object.values(followedPosts || {})
        .sort((a, b) => b.time - a.time)
        .map((post) => {
          return <Post key={post.postId} postData={post} />;
        })}
    </>
  );
};
