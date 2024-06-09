import { Map as YMap, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { Modal } from 'components/Modal';
import { Post } from 'components/Post';
import { StateInterface } from 'interface';
import React, {  useState } from 'react';
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
    const roundedPosts = {};
    
    for (const userID in posts) {
      for (const postID in posts[userID]) {
        const coordinates = posts[userID][postID].content?.coord;
        const roundedLat = Number(coordinates?.lat).toFixed(2);
        const roundedLong = Number(coordinates?.long).toFixed(2);
        const key = `${roundedLat}_${roundedLong}`;
    
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
  const onMapClick = (e) => {
    const coords = e.get("coords");
    console.log(coords)
  }

  return (
    <>
    
      <YMaps>
        <MapContainer>
        <YMap onClick={onMapClick}  width={900} height={800} defaultState={{center: [lat, long], zoom: 12}}>
  <>
    {Object.keys(postsByCoord).map(key => {
      const [lat, long] = key.split('_');
      
      
      const shouldShowPlacemark = postsByCoord[key].some(post => post.content?.coord?.isUsedGeo);

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

    { postsByCoord[currentKey] && <Modal active={isModalActive} setActive={setModalActive}>
              {currentKey  && postsByCoord[currentKey].map((post) => {
                if (post.content?.coord.isUsedGeo) {return <Post key={post.postId} postId={post.postId} postData={post} />}
              })} 

          </Modal>}      
        </MapContainer>
      </YMaps>
    </>
  );
};
