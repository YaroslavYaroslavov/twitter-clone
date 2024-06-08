import { Map as YMap, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { TweetBtn } from 'components/CreatePost/styled';
import { Modal } from 'components/Modal';
import { Portal } from 'components/Portal';
import { Post } from 'components/Post';
import { StateInterface } from 'interface';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { MapContainer } from './styled';

export const Map = () => {
  const [isModalActive, setModalActive] = useState(false);

  const posts = useSelector((state: StateInterface) => state.posts);
  const currentUserInfo = useSelector((state: StateInterface) => state.userInfo);

  navigator.geolocation.getCurrentPosition(function (location) {
    // console.log(location.coords.latitude);
    // console.log(location.coords.longitude);
  });

  const mapState = { width: 900, height: 800, center: [56.848217, 53.236675], zoom: 12 };

  // console.log(currentUserInfo)

  const filteredPosts =
    currentUserInfo !== undefined &&
    currentUserInfo?.follow !== undefined &&
    Object.keys(currentUserInfo?.follow).reduce((followedPosts, userId) => {
      if (posts[userId]) {
        for (const postId in posts[userId]) {
          if (posts[userId][postId]?.content?.coord) {
            followedPosts[postId] = posts[userId][postId];
          }
        }
      }
      return followedPosts;
    }, {});

  console.log(filteredPosts);

  // let allCoords = [];

  const placeMark2 = {
    geometry: [56.948217, 53.236675],
  };
  const placeMark = {
    geometry: [56.848217, 53.236675],
  };
  return (
    <>
      <h1>MAP PAGE</h1>

      <YMaps>
        <MapContainer>
          <YMap width={900} height={800} state={mapState}>
            <Placemark
              {...placeMark}
              onClick={() => {
                setModalActive(true);
              }}
            />
            <Placemark
              {...placeMark2}
              onClick={() => {
                setModalActive(true);
              }}
            />
          </YMap>

          <Modal active={isModalActive} setActive={setModalActive}>
            {filteredPosts &&
              Object.values(filteredPosts)
                .reverse()
                .map((post) => {
                  // console.log(post.content?.coord?.);
                  if (post.content?.coord?.isUsedGeo) {
                    return <Post key={post.postId} postId={post.postId} postData={post} />;
                  }
                })}
          </Modal>
        </MapContainer>
      </YMaps>
    </>
  );
};
