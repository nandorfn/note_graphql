let bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { TUser } from "./types";

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
  const JWT_SECRET = process.env.JWT_SECRET_KEY;
  console.log(JWT_SECRET);
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