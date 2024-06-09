import { Placemark, Map as YMap, YMaps } from '@pbe/react-yandex-maps';
import noAvatar from 'assets/userImage.png';
import { Modal } from 'components/Modal';
import { push, ref, set } from 'firebase/database';
import { getDownloadURL, ref as refStorage, uploadBytes } from 'firebase/storage';
import { db, storage } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import { MapContainer } from 'pages/Map/styled';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  ActivityContainer,
  ButtonsContainer,
  CreatePostContainer,
  GeoPick,
  PostInput,
  TweetBtn,
  UploadImg,
  UserImg,
} from './styled';

export const CreatePost = () => {
  const [inputValue, setInputValue] = useState('');
  const [userPostImagesAsFile, setUserPostImagesAsFile] = useState<File[]>([]);
  const [lat, setLat] = useState(49.14);
  const [long, setLong] = useState(28.28);
  const [isUsedGeo, setIsUsingGeo] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const [userPostImages, setUserPostImages] = useState<(string | ArrayBuffer | null | undefined)[]>(
    []
  );

  const userInfo = useSelector((state: StateInterface) => state.userInfo);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const newPostKey = push(ref(db, `tweets/${userInfo?.userId}`)).key;

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function (location) {
      if(location.coords.latitude && location.coords.longitude) {
      setLat(location.coords.latitude);
      setLong(location.coords.longitude);
      }
     
    });
  }, [])

  const onMapClick = (e) => {
    const coords = e.get("coords");
    setLat(coords[0]);
    setLong(coords[1]);
  }

  const pickGeo = () => {
    setIsUsingGeo((prev) => !prev);
    if(!isUsedGeo){
      setModalActive(true)
    }
  };

  const handleCreateTweet = (uploadedLinks: string[]) => {
    set(ref(db, `tweets/${userInfo?.userId}/${newPostKey}`), {
      content: {
        text: inputValue,
        images: uploadedLinks,
        coord: { isUsedGeo, long, lat },
      },
      postId: newPostKey,
      authorId: userInfo?.userId,
      time: Date.now(),
    });
  };
  const uploadPhotos = async () => {
    setInputValue('');
    setUserPostImagesAsFile([]);
    setUserPostImages([]);
    const uploadedLinks = await Promise.all(
      userPostImagesAsFile.map(async (file) => {
        const imageId = Date.now();
        const blob = new Blob([file], {
          type: 'image/png',
        });
        await uploadBytes(refStorage(storage, `images/${userInfo?.userId}/${imageId}`), blob);
        const link = await getDownloadURL(
          refStorage(storage, `images/${userInfo?.userId}/${imageId}`)
        );
        return link;
      })
    );
    if (!uploadedLinks.length && !inputValue) return;
    handleCreateTweet(uploadedLinks);
  };

  const handleLongChange = (e) => {
    setLong(e.target.value);
  };
  const handleLatChange = (e) => {
    setLat(e.target.value);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (stringToRemove: string) => {
    setUserPostImages((prevArray) => prevArray.filter((item) => item !== stringToRemove));
    setUserPostImagesAsFile((prevArray) =>
      prevArray.filter((file, index) => userPostImages[index] !== stringToRemove)
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (userPostImages.includes(result)) return;

      setUserPostImagesAsFile((prev) => [...prev, selectedFile]);
      setUserPostImages((prev) => [...prev, result]);
    };

    reader.readAsDataURL(selectedFile);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <CreatePostContainer>
      <UserImg src={userInfo?.avatar || noAvatar} />
      <div>
        <PostInput
          value={inputValue}
          placeholder="Что у вас нового?"
          onChange={handleInputChange}
        />

        {userPostImages.map(
          (image) =>
            typeof image === 'string' && (
              <img
                src={image}
                data-image={image}
                onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                  const target = e.currentTarget as HTMLImageElement;
                  handleRemoveImage(target.getAttribute('data-image') || '');
                }}
                key={image?.toString()}
                style={{ width: '100px', height: '100px' }}
              />
            )
        )}

        <ButtonsContainer>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            
          />
          <ActivityContainer>
<UploadImg onClick={handleFileUploadClick} />
          <GeoPick onClick={pickGeo}></GeoPick>
          </ActivityContainer>
          
          {isUsedGeo && (
            <>
              Долгота
              <input onChange={handleLongChange} value={long} type="number" />
              Широта
              <input onChange={handleLatChange} value={lat} type="number" />
            </>
          )}
          <TweetBtn onClick={uploadPhotos}>Опубликовать</TweetBtn>
        </ButtonsContainer>
      </div>

      <Modal active={modalActive} setActive={setModalActive}>
      <YMaps>
        <MapContainer>
        <YMap onClick={onMapClick}  width={900} height={400} defaultState={{center: [lat, long], zoom: 12}}>
        {(lat && long) && <Placemark
        geometry={[lat, long]}
        options={{
        zIndex: 100
    }}
  />}
        </YMap>
      
        </MapContainer>
      </YMaps>
      </Modal>
    </CreatePostContainer>
  );
};
