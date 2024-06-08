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


  const [currentKey, setCurrentKey] = useState(null)
  const [lat, setLat] = useState(49.14);
  const [long, setLong] = useState(28.28);



  
  navigator.geolocation.getCurrentPosition(function (location) {
    console.log()
    setLat(location.coords.latitude);
    setLong(location.coords.longitude);
  });

  function roundCoordinates(posts) {
    let roundedPosts = {};
    
    for (let userID in posts) {
      for (let postID in posts[userID]) {
        let coordinates = posts[userID][postID].content.coord;
        let roundedLat = Number(coordinates.lat).toFixed(2);
        let roundedLong = Number(coordinates.long).toFixed(2);
        let key = `${roundedLat}_${roundedLong}`;
    
        if (!roundedPosts[key]) {
          roundedPosts[key] = [];
        }
        
        roundedPosts[key].push({

          ...posts[userID][postID],
          userID: userID,
          postID: postID,
          roundedCoordinates: {
            lat: roundedLat,
            long: roundedLong
          }
        });
      }
    }
    
    return roundedPosts;
  }


  const postsByCoord = roundCoordinates(posts)
  const mapState = { width: 900, height: 800, center: [lat, long], zoom: 12 };



  // console.log(currentUserInfo)

  // const filteredPosts =
  //   currentUserInfo !== undefined &&
  //   currentUserInfo?.follow !== undefined &&
  //   Object.keys(currentUserInfo?.follow).reduce((followedPosts, userId) => {
  //     if (posts[userId]) {
  //       for (const postId in posts[userId]) {
  //         if (posts[userId][postId]?.content?.coord) {
  //           followedPosts[postId] = posts[userId][postId];
  //         }
  //       }
  //     }
  //     return followedPosts;
  //   }, {});

  // console.log(filteredPosts);

  // // let allCoords = [];

 
  return (
    <>
      <h1>MAP PAGE</h1>

      <YMaps>
        <MapContainer>
        <YMap width={900} height={800} defaultState={{center: [lat, long], zoom: 12}}>
  <>
    {Object.keys(postsByCoord).map(key => {
      const [lat, long] = key.split('_');
      
      // Проверяем, имеют ли все объекты в массиве coord.isUsedGeo === false
      const shouldShowPlacemark = postsByCoord[key].some(post => post.content.coord.isUsedGeo);

      // console.log(123,postsByCoord[key])

      // Условие для отображения метки
      if (shouldShowPlacemark) {
        return (
          <Placemark
            key={key}
            geometry={[Number(lat), Number(long)]}
            onClick={() => {
              setLat(lat);
              setLong(long);
              setModalActive(true);
              setCurrentKey(key);
            }}
          />
        );
      } else {
        return null; // Не отображаем метку
      }
    })}
  </>
</YMap>

          <Modal active={isModalActive} setActive={setModalActive}>
              {currentKey && postsByCoord[currentKey].map((post) => {
                if (post.content.coord.isUsedGeo) {return <Post key={post.postId} postId={post.postId} postData={post} />}
                
              })}
          </Modal>
        </MapContainer>
      </YMaps>
    </>
  );
};
