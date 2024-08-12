import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type TLogin = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
export type TRegister = z.infer<typeof registerSchema>;

export const tokenSchema = z.object({
  username: z.string(),
  email: z.string(),
  id: z.number(),
  iat: z.number(),
  exp: z.number(),
});
export type JwtSchema = z.infer<typeof tokenSchema>;

export const noteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string(),
});
export type TNote = z.infer<typeof noteSchema>;