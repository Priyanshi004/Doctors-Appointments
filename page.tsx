"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add validation or mock signup logic here
    router.push("/doctors");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-xl shadow-md">
        <div>
          <p className="text-gray-500 text-sm">Hi there welcome too <span className="text-sky-600 font-semibold">Shedula</span></p>
          <h2 className="mt-1 text-2xl font-bold text-gray-800">Sign Up</h2>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-sky-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-sky-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-sky-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-400 hover:bg-sky-500 text-white py-2 rounded-lg font-semibold"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
          <hr className="flex-1 border-t" />
          <span>Or sign up with</span>
          <hr className="flex-1 border-t" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 transition">
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-sky-500 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
