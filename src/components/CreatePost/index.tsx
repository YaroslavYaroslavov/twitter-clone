import noAvatar from 'assets/userImage.png';
import { ref, set } from 'firebase/database';
import { getDownloadURL, ref as refStorage, uploadBytes } from 'firebase/storage';
import { db, storage } from 'firebaseConfig/firebase';
import { StateInterface } from 'interface';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  ButtonsContainer,
  CreatePostContainer,
  PostInput,
  TweetBtn,
  UploadImg,
  UserImg,
} from './styled';

export const CreatePost = () => {
  const [inputValue, setInputValue] = useState('');
  const [userPostImagesAsFile, setUserPostImagesAsFile] = useState<File[]>([]);
  const [userPostImages, setUserPostImages] = useState<(string | ArrayBuffer | null | undefined)[]>(
    []
  );

  const userInfo = useSelector((state: StateInterface) => state.userInfo);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateTweet = (uploadedLinks: string[]) => {
    set(ref(db, `tweets/${userInfo?.userId}/${userInfo?.userId}_${Date.now()}`), {
      content: {
        text: inputValue,
        images: uploadedLinks,
      },
      postId: `${userInfo?.userId}_${Date.now()}`,
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
    if(!uploadedLinks.length && !inputValue) return
    handleCreateTweet(uploadedLinks);
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
            // value={inputValue}
          />
          <UploadImg onClick={handleFileUploadClick} />
          <TweetBtn onClick={uploadPhotos}>Опубликовать</TweetBtn>
        </ButtonsContainer>
      </div>
    </CreatePostContainer>
  );
};
