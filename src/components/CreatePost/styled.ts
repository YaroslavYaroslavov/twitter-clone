import uploadImg from 'assets/uploadImg.png';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';
import { centerByFlex, defaultFont } from 'theme/globalStyles';

export const CreatePostContainer = styled.section`
  display: flex;
  padding: 15px;
  margin-top: 40px;
  border-top: 3px solid ${colors.border};
  border-bottom: 3px solid ${colors.border};
`;

export const UserImg = styled.img`
  border-radius: 100%;
  width: 54px;
  height: 54px;
  margin: 25px;
  margin-top: 0px;
`;

export const ButtonsContainer = styled.div`
  ${centerByFlex}

  justify-content: space-between;
`;

export const PostInput = styled(TextareaAutosize)`
  ${defaultFont};

  resize: none;
  width: 750px;
  overflow: hidden;
  font-weight: 600px;
  color: gray;
  font-size: 22px;
  border: none;
  color: black;
  min-height: 70px;
`;

export const TweetBtn = styled.button`
  background-color: ${colors.lightBlue};

  width: 116px;
  height: 50px;
  border-radius: 28px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightBlueInactive};
  }
`;

export const UploadImg = styled.button`
  background-image: url(${uploadImg});

  border: none;
  background-color: transparent;
  width: 25px;
  height: 25px;
`;
