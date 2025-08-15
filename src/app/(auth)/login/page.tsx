"use client";

import { Login } from "./login-page";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";

export default function Page() {
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      return;
    }
  }, [isLoggedIn]);

  const loginUser = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      console.log("Login Failed", error);
    }
  };

  return <Login onSubmit={loginUser} />;
}
