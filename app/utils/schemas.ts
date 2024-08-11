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