import like from 'assets/like.png';
import likeFill from 'assets/likeFill.png';
import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';
import { centerByFlex, defaultFont, flexColumn } from 'theme/globalStyles';

import { LikeButtonProps } from './interface';

export const PostContainer = styled.section`
  ${defaultFont};

  display: flex;
  padding-left: 20px;
  padding-right: 30px;
  gap: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const PostTextContent = styled.p`
  word-break: break-all;
`;

export const PostInfoHeader = styled.div`
  display: flex;
  gap: 10px;
`;

export const PostHeader = styled.div`
  display: flex;
  width: 760px;
  justify-content: space-between;
`;

export const UserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: red;
`;

export const PostContent = styled.div`
  ${flexColumn};

  gap: 10px;
`;

export const LikeButton = styled.button<LikeButtonProps>`
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  background-repeat: no-repeat;
  background-position: center;

  background-image: url(${({ isLiked }) => (isLiked ? likeFill : like)});
`;

export const LikeSection = styled.section<LikeButtonProps>`
  ${centerByFlex}

  justify-content: start;
  gap: 5px;
  color: ${({ isLiked }) => (isLiked ? '#f0215f' : colors.lightGray)};
  font-weight: 600;
`;
