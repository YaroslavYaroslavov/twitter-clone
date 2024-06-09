import { Auth } from 'firebase/auth';
import { Database, DatabaseReference } from 'firebase/database';

export interface UserInfo {
  username: string;
  userlink: string;
  userId: string;
  lastOnline: Date;
  avatar?: string;
  day?: number;
  month?: number;
  year?: number;
  phone?: string;
  tweets?: object;
  follow?: object;
  followers?: object;
  description?: string;
}
export interface StateInterface {
  auth: Auth;
  db: Database;
  dbUserReference: DatabaseReference;
  userInfo?: UserInfo;
  users?: UserInfo[];
  posts: { [userId: string]: PostInterface };
}

export interface Action_SET_USER_DATA {
  type: 'SET_USER_DATA';
  payload: UserInfo;
}

export interface Action_SET_USERS {
  type: 'SET_USERS';
  payload: UserInfo[];
}

export interface PostInterface {
  content: {
    coord: any;
    text: string;
    images: string[];
  };
  postId: string;
  authorId: string;
  likes?: object;
  time: number;
}
export interface Action_SET_POSTS {
  type: 'SET_POSTS';
  payload: PostInterface[];
}
export type Action = Action_SET_USER_DATA | Action_SET_USERS | Action_SET_POSTS;
