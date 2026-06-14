"use client";
import { RegisterUser } from "./register-user";
import { useAuth } from "@/context/auth-context";

export default function Page() {
  const { signup } = useAuth();

  const signupUser = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    await signup(data.email, data.password, data.username);
  };

  return <RegisterUser onSubmit={signupUser} />;
}
