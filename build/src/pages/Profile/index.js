import background from 'assets/userbackgrounddefault.png';
import userImgBig from 'assets/userImageBig.png';
import { CreatePost } from 'components/CreatePost';
import { Modal } from 'components/Modal';
import { Post } from 'components/Post';
import { ref, remove, set, update } from 'firebase/database';
import { getDownloadURL, ref as refStorage, uploadBytes } from 'firebase/storage';
import { db, storage } from 'firebaseConfig/firebase';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BackgroundImg, Description, DescriptionInput, EditProfileButton, EditUserAvatar, EditUserData, EditUserInput, EditUserWrapper, FollowButton, FollowCounter, FollowerInfoContainer, Header, ProfileContainer, ProfileInfoContainer, ProfileMain, UserAbout, UserAvatar, } from './styled';
export const Profile = () => {
    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false);
    const [userNewAvatar, setUserNewAvatar] = useState(null);
    const [userAvatarAsFile, setUserAvatarAsFile] = useState(null);
    const newNameRef = useRef(null);
    const newLinkRef = useRef(null);
    const newDescriptionRef = useRef(null);
    const fileInputRef = useRef(null);
    const currentUserInfo = useSelector((state) => state.userInfo);
    const posts = useSelector((state) => state.posts);
    const users = useSelector((state) => state.users);
    const { id } = useParams();
    const currentUserPage = users === null || users === void 0 ? void 0 : users.find((user) => user.userlink === id);
    const currentUserPageFollowList = Object.keys((currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.follow) || {});
    const currentUserPageFollowers = Object.keys((currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.followers) || {});
    const isFollowingUser = Object.keys((currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.follow) || {}).find((userId) => userId === (currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.userId));
    const authorPosts = currentUserPage && posts && posts[currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.userId];
    const isUserOwnerPage = (currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userlink) === id;
    const handleFileChange = (event) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            if (selectedFile.type.indexOf('image/') === 0) {
                setUserAvatarAsFile(selectedFile);
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) {
                        setUserNewAvatar(e.target.result);
                    }
                };
                reader.readAsDataURL(selectedFile);
            }
            else {
                alert('Only images');
            }
        }
    };
    const handleSaveChanges = () => {
        var _a;
        if (!newLinkRef.current || !newLinkRef.current.value)
            return;
        if (!newNameRef.current || !newNameRef.current.value)
            return;
        if (!newDescriptionRef.current)
            return;
        if ((users === null || users === void 0 ? void 0 : users.find((user) => { var _a; return user.userlink === ((_a = newLinkRef.current) === null || _a === void 0 ? void 0 : _a.value); })) &&
            ((_a = newLinkRef.current) === null || _a === void 0 ? void 0 : _a.value) !== (currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userlink)) {
            alert('Id alredy used');
            return;
        }
        update(ref(db, `users/${currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userId}`), {
            userlink: newLinkRef.current.value,
            username: newNameRef.current.value,
            description: newDescriptionRef.current.value,
        });
        navigate('/profile/' + newLinkRef.current.value);
        if (userAvatarAsFile === null)
            return;
        const blob = new Blob([userAvatarAsFile], {
            type: userAvatarAsFile.type,
        });
        uploadBytes(refStorage(storage, `avatars/${currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userId}`), blob).then(() => {
            getDownloadURL(refStorage(storage, `avatars/${currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userId}`)).then((link) => {
                set(ref(db, `users/${currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userId}/avatar`), link);
            });
        });
    };
    const handleFileUploadClick = () => {
        var _a;
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    const handleOpenModal = () => {
        setModalActive(true);
    };
    const followToUser = () => {
        set(ref(db, `users/${currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userId}/follow/${currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.userId}`), '');
        set(ref(db, `users/${currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.userId}/followers/${currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userId}`), '');
    };
    const unfollowUser = () => {
        remove(ref(db, `users/${currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userId}/follow/${currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.userId}`));
        remove(ref(db, `users/${currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.userId}/followers/${currentUserInfo === null || currentUserInfo === void 0 ? void 0 : currentUserInfo.userId}`));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(ProfileContainer, null,
            React.createElement(ProfileMain, null,
                React.createElement(Header, null,
                    React.createElement("h2", null, currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.username),
                    React.createElement(Description, null,
                        (authorPosts && Object.keys(authorPosts).length) || 0,
                        " tweets")),
                React.createElement(BackgroundImg, { src: background, alt: "" }),
                React.createElement(ProfileInfoContainer, null,
                    React.createElement("div", null,
                        React.createElement(UserAvatar, { src: (currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.avatar) || userImgBig, alt: "avatar" }),
                        React.createElement("h2", null, currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.username),
                        React.createElement(Description, null,
                            "@", currentUserPage === null || currentUserPage === void 0 ? void 0 :
                            currentUserPage.userlink),
                        React.createElement(UserAbout, null, currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.description),
                        React.createElement(FollowerInfoContainer, null,
                            React.createElement(FollowerInfoContainer, null,
                                React.createElement(FollowCounter, null, currentUserPageFollowList.length),
                                React.createElement("span", null, "Following")),
                            React.createElement(FollowerInfoContainer, null,
                                React.createElement(FollowCounter, null, currentUserPageFollowers.length),
                                React.createElement("span", null, "Followers")))),
                    isUserOwnerPage ? (React.createElement(EditProfileButton, { onClick: handleOpenModal }, "Edit Profile")) : isFollowingUser ? (React.createElement(EditProfileButton, { onClick: unfollowUser }, "Unfollow")) : (React.createElement(FollowButton, { onClick: followToUser }, "Follow"))),
                isUserOwnerPage && React.createElement(CreatePost, null),
                authorPosts &&
                    Object.values(authorPosts)
                        .reverse()
                        .map((post) => {
                        return React.createElement(Post, { key: post.postId, postData: post });
                    }))),
        React.createElement(Modal, { active: modalActive, setActive: setModalActive },
            React.createElement(EditUserData, null,
                React.createElement("h2", null, "Edit your data:"),
                React.createElement(EditUserAvatar, { onClick: handleFileUploadClick },
                    React.createElement("input", { type: "file", ref: fileInputRef, style: { display: 'none' }, onChange: handleFileChange }),
                    React.createElement(UserAvatar, { src: (userNewAvatar === null || userNewAvatar === void 0 ? void 0 : userNewAvatar.toString()) || (currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.avatar) || userImgBig, alt: "avatar" })),
                React.createElement(EditUserWrapper, null,
                    React.createElement("p", null, "Name:"),
                    React.createElement(EditUserInput, { ref: newNameRef, defaultValue: currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.username })),
                React.createElement(EditUserWrapper, null,
                    React.createElement("p", null, "Link"),
                    React.createElement(EditUserInput, { ref: newLinkRef, id: 'link', defaultValue: currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.userlink })),
                React.createElement(EditUserWrapper, null,
                    React.createElement("p", null, "About:"),
                    React.createElement(DescriptionInput, { ref: newDescriptionRef, defaultValue: currentUserPage === null || currentUserPage === void 0 ? void 0 : currentUserPage.description })),
                React.createElement(FollowButton, { onClick: handleSaveChanges }, "Save")))));
};
