let bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { TUser } from "./types";
import { JwtSchema } from "./schemas";

const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set");
  }

  return secret;
};

export const hashPass = async (unHashPass: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(unHashPass, salt);
  return { salt, hashedPassword };
};

export const comparePassword = async ({
  passForm,
  passDB
}: {
  passForm: string,
  passDB: string
}) => {
  return bcrypt.compareSync(
    passForm,
    passDB
  );
}

export const applyJWT = async (user: TUser) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({
    username: user.username,
    id: user.id,
    email: user.email
  },
    JWT_SECRET!, {
    expiresIn: "1d"
  });
  
  cookies().set("token", token, {
    secure: process.env.NODE_ENV !== "development",
    maxAge: 86400,
    sameSite: "strict"
  });

  return token;
};

export const verifyAuth = async (token: string) => {
  const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));

  if (!verified) {
    return undefined;
  } else {
    return verified.payload as JwtSchema;
  }
};