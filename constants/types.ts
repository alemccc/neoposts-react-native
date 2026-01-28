export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
}

export interface SignUpResponse {
  data: UserData,
  status: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  data: UserData;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  followed: boolean;
  posts: PostData[];
  followers: UserShortData[];
  followees: UserShortData[];
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
  publishedAt?: string;
  likesCount?: number;
  liked?: boolean;
  author?: string | UserData;
  comments?: CommentData[];
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

export interface UserShortData {
  id: number;
  name: string;
  email: string;
  followed?: boolean;
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

export interface GetUsersRequest {
  search?: string;
  page?: number;
  perPage?: number;
}

export interface GetUsersResponse {
  users: UserData[];
  followed: UserData[];
  pagination: PaginationData;
}

export interface GetUserProfileRequest {
  userId: number;
}

export interface FollowUnfollowUserRequest {
  userId: number;
}

export interface FollowUnfollowUserResponse {
  id: number;
  name: string;
  email: string;
  followed: boolean;
  posts: PostData[];
  followers: UserShortData[];
  followees: UserShortData[];
}
