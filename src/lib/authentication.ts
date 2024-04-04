import { SessionOptions } from "iron-session";
export const sessionOptions: SessionOptions = {
  cookieName: "token",
  password: process.env.SECRET_KEY!,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export interface SessionData {
  userId?: string;
  isLoggedIn?: boolean;
}

export interface RegisterForm {
  email: string;
  password: string;
}
