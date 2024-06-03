import upload from 'assets/uploadImg.png';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';
import { centerByFlex, centerByFlexColumn, defaultFont, flexColumn } from 'theme/globalStyles';

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const ProfileMain = styled.main`
  border: 3px solid ${colors.border};
  width: 910px;
`;
export const Header = styled.header`
  ${flexColumn};

  justify-content: center;
  gap: 10px;
  height: 90px;
  margin-left: 20px;
`;
export const HeaderUserName = styled.h2``;

export const Description = styled.p`
  color: grey;

  ${defaultFont}
`;

export const BackgroundImg = styled.img`
  width: 100%;
  margin-bottom: -100px;
`;

export const ProfileInfoContainer = styled.section`
  ${centerByFlex}
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 40px;
`;

export const EditProfileButton = styled.button`
  ${defaultFont}

  border-radius: 50px;
  border: 2px solid ${colors.border};
  background-color: transparent;
  width: 120px;
  font-weight: 600;
  height: 44px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightGrayHover};
  }
`;

export const UserAbout = styled.p`
  ${defaultFont}
  font-size: 20px;
  margin-top: 20px;
`;

export const FollowerInfoContainer = styled.section`
  ${defaultFont};

  display: flex;
  gap: 10px;
  margin-top: 20px;
  color: grey;
`;

export const FollowCounter = styled.p`
  color: black;
  font-weight: 700;
`;
export const UserAvatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
`;

export const FollowButton = styled.button`
  ${defaultFont}

  border-radius: 50px;
  border: none;
  background-color: ${colors.lightBlue};
  color: white;
  width: 120px;
  font-weight: 700;
  height: 44px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightBlueInactive};
  }
`;

export const EditUserData = styled.section`
  ${centerByFlexColumn};

  gap: 20px;
  width: 200px;
`;
export const EditUserAvatar = styled.div`
  background-color: black;
  border-radius: 100%;
  width: 150px;
  height: 150px;
  background-image: url(${upload});
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: center;
  user-select: none;

  cursor: pointer;

  &:hover {
    * {
      transition: 0.1s;
      opacity: 0.3;
    }
  }
`;

export const EditUserInput = styled.input`
  padding: 10px;
  max-width: 130px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid ${colors.border};
`;

export const EditUserWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  p {
    width: 50px;
  }
`;
export const DescriptionInput = styled(TextareaAutosize)`
  ${defaultFont};
  padding: 10px;
  resize: none;
  width: 130px;
  max-height: 100px;
  border: 1px solid ${colors.border};

  border-radius: 12px;
`;
export const MessageButton = styled.button`
  ${defaultFont}

  border-radius: 50px;
  border: none;
  background-color: ${colors.lightBlue};
  color: white;
  width: 120px;
  font-weight: 700;
  height: 44px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightBlueInactive};
  }
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 20px
`;