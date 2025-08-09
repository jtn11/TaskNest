"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "@/firestore/firebase";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

interface AuthContextType {
  // currentUser: any;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  username: string | null;
  currentUser: User | null;
}

const auth = getAuth(app);
const firestoreDb = getFirestore(app);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    router.push("/dashboard");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log("user" , user)
      setCurrentUser(user);

      if (user) {
        console.log("userUID", user.uid);
        console.log(
          "This is the current user token",
          (await user.getIdToken()).trim(),
        );
        const docSnap = await getDoc(doc(firestoreDb, "users", user.uid));
        // console.log("docsnap.data",docSnap.data());
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username);
        }
      } else {
        setUsername(null);
      }
    });

    return () => unsubscribe(); // cleanup function
  }, []);

  const isLoggedIn = currentUser ? true : false;

  // signUp User and added in users collection as a doc

  const signup = async (email: string, password: string) => {
    try {
      const SignedInUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = SignedInUser.user;

      // to take username as the first intials before @in gmail
      const username = user.email?.split("@")[0] || "anonymous";

      await setDoc(doc(firestoreDb, "users", user.uid), {
        username,
        uid: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
      });
      // router.push("/dashboard");
      router.push("/workspaces");
    } catch (error) {
      console.log("SignUp Error", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ login, signup, logout, isLoggedIn, username, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
