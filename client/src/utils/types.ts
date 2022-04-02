export interface iPost {
  uuid: string;
  username?: string;
  createdAt?: number;
  text: string;
  likes?: number;
  media?: string;
  liked?: boolean;
}

export interface iUser {
  uuid?: string;
  username: string;
  password: string;
  email?: string;
  birthday?: number;
  info?: string;
}

export interface iNotification {
  uuid: string;
  createdAt: number;
  text: string;
  username: string;
}
