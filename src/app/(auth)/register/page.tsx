"use client";
import { RegisterUser } from "./register-user";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { signup, isLoggedIn } = useAuth();

  const signupUser = async (data: { email: string; password: string }) => {
    try {
      await signup(data.email, data.password);
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(()=>{
  //     if(isLoggedIn) {
  //         router.push("/dashboard");
  //     }else {
  //         return ;
  //     }
  //   },[isLoggedIn])

  return <RegisterUser onSubmit={signupUser} />;
}
