"use client";
import { RegisterUser } from "./register-user";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const router = useRouter();
  const { signup } = useAuth();

  const signupUser = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await signup(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return <RegisterUser onSubmit={signupUser} />;
}
