var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import noAvatar from 'assets/userImage.png';
import { ref, set } from 'firebase/database';
import { getDownloadURL, ref as refStorage, uploadBytes } from 'firebase/storage';
import { db, storage } from 'firebaseConfig/firebase';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonsContainer, CreatePostContainer, PostInput, TweetBtn, UploadImg, UserImg, } from './styled';
export const CreatePost = () => {
    const [inputValue, setInputValue] = useState('');
    const [userPostImagesAsFile, setUserPostImagesAsFile] = useState([]);
    const [userPostImages, setUserPostImages] = useState([]);
    const userInfo = useSelector((state) => state.userInfo);
    const fileInputRef = useRef(null);
    const handleCreateTweet = (uploadedLinks) => {
        set(ref(db, `tweets/${userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId}/${userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId}_${Date.now()}`), {
            content: {
                text: inputValue,
                images: uploadedLinks,
            },
            postId: `${userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId}_${Date.now()}`,
            authorId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId,
            time: Date.now(),
        });
    };
    const uploadPhotos = () => __awaiter(void 0, void 0, void 0, function* () {
        setInputValue('');
        setUserPostImagesAsFile([]);
        setUserPostImages([]);
        const uploadedLinks = yield Promise.all(userPostImagesAsFile.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const imageId = Date.now();
            const blob = new Blob([file], {
                type: 'image/png',
            });
            yield uploadBytes(refStorage(storage, `images/${userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId}/${imageId}`), blob);
            const link = yield getDownloadURL(refStorage(storage, `images/${userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId}/${imageId}`));
            return link;
        })));
        handleCreateTweet(uploadedLinks);
    });
    const handleFileUploadClick = () => {
        var _a;
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    // const handleRemoveImage = (stringToRemove: string) => {
    //   setUserPostImages((prevArray) => prevArray.filter((item) => item !== stringToRemove));
    // };
    const handleFileChange = (event) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (!selectedFile) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a;
            const result = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            if (userPostImages.includes(result))
                return;
            setUserPostImagesAsFile((prev) => [...prev, selectedFile]);
            setUserPostImages((prev) => [...prev, result]);
        };
        reader.readAsDataURL(selectedFile);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    return (React.createElement(CreatePostContainer, null,
        React.createElement(UserImg, { src: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.avatar) || noAvatar }),
        React.createElement("div", null,
            React.createElement(PostInput, { placeholder: "What\u2019s happening", onChange: handleInputChange }),
            userPostImages.map((image) => typeof image === 'string' && (React.createElement("img", { src: image, 
                // data-image={image}
                // onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                //   const target = e.currentTarget as HTMLImageElement;
                //   handleRemoveImage(target.getAttribute('data-image') || '');
                // }}
                key: image === null || image === void 0 ? void 0 : image.toString(), style: { width: '100px', height: '100px' } }))),
            React.createElement(ButtonsContainer, null,
                React.createElement("input", { type: "file", accept: "image/*", ref: fileInputRef, style: { display: 'none' }, onChange: handleFileChange }),
                React.createElement(UploadImg, { onClick: handleFileUploadClick }),
                React.createElement(TweetBtn, { onClick: uploadPhotos }, "Tweet")))));
};
