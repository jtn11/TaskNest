"use client";
import { RegisterUser } from "./register-user";
import { useAuth } from "@/context/auth-context";

export default function Page() {
  const { signup } = useAuth();

  const signupUser = async (data: { email: string; password: string }) => {
    try {
      await signup(data.email, data.password);
    } catch (error) {
      console.log(error);
    }
  };

  return <RegisterUser onSubmit={signupUser} />;
}
