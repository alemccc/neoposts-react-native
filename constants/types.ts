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

export interface UserData {
  id: number;
  name: string;
  email: string;
  followed: boolean;
  posts: string[] | PostData[];
  followers: string[];
  followees: string[];
}

export interface CommentData {
  id: number;
  body: string;
  createdAt: string;
  likesCount: number;
  liked: boolean;
  user: string | UserData;
}

export interface PostData {
  id: number;
  title: string;
  body: string;
  publishedAt: string;
  likesCount: number;
  liked: boolean;
  author: string | UserData;
  comments: CommentData[];
}

export interface GetPostsRequest {
  page?: number;
  perPage?: number;
  userId?: number;
}

interface PaginationData {
  currentPage: number;
  nextPage: number;
  prevPage: number | null;
  totalPages: number;
  totalCount: number;
  perPage: number;
}

export interface GetPostsResponse {
  posts: PostData[];
  pagination: PaginationData;
}

export interface MyPostsData {
  id: number;
  title: string;
  body: string;
}

interface OtherUsersData {
  id: number;
  name: string;
  email: string;
}

export interface GetMyProfileResponse {
  id: number;
  name: string;
  email: string;
  followed: boolean;
  posts: MyPostsData[];
  followers: OtherUsersData[];
  followees: OtherUsersData[];
}

export interface CreatePostRequest {
  title: string;
  body: string;
  publishedAt: string;
}

export interface CreatePostResponse {
  id: number;
  title: string;
  body: string;
  publishedAt: string;
  likesCount: number;
  liked: boolean;
  author: UserData;
  comments: CommentData[];
}
