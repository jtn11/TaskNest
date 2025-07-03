"use client"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RegisterUser } from "./register-user";
import { app } from "@/firestore/firebase";
import { useRouter } from "next/navigation";

export default function Page() {

    const auth = getAuth(app);
    const router = useRouter();

    const signupUser = async (data: { name: string; email: string; password: string }) => {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
            router.push('/dashboard');
            console.log("userRegistered", userCredential.user);
            console.log("userRegistered", userCredential);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <RegisterUser onSubmit={signupUser} />
    )
}