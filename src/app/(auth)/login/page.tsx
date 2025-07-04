'use client'

import { Login } from "./login-page";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Page (){

    const {login} = useAuth();
    const router = useRouter();

    const loginUser = async (data : {email : string ; password : string})=>{
        try {
            await login(data.email, data.password);
            router.push("/dashboard");
        } catch (error) {
            console.log("Login Failed" , error);
        }
    }

    return (
        <Login onSubmit={loginUser}/>
    )
}