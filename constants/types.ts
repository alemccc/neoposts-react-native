export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
}

export interface SignUpResponse {
  allowPasswordChange: boolean;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  provider: string;
  uid: string;
  updatedAt: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface CommentData {
  id: number;
  body: string;
  createdAt: string;
  likesCount: number;
  liked: boolean;
  user: string;
}

export interface PostData {
  id: number;
  title: string;
  body: string;
  publishedAt: string;
  likesCount: number;
  liked: boolean;
  author: string;
  comments: CommentData[];
}

export interface SignInResponse {
  id: number;
  name: string;
  email: string;
  followed: boolean;
  posts: PostData[];
  followers: string[];
  followees: string[];
}
