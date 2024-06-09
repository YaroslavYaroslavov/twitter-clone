import { PostInterface } from 'interface';

export interface PostProps {
  postId: string;
  postData: PostInterface;
}

export interface LikeButtonProps {
  isLiked: boolean;
}
