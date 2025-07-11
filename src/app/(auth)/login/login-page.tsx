"use client";
import Link from "next/link";
import { useState } from "react";

interface FormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

export const Login = ({ onSubmit }: FormProps) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-2">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="text-md">
          <span className="text-gray-600">New to TaskNest ? </span>
          <Link
            href="/register"
            className=" text-blue-600 ml-2 hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};
