"use client"
import React, { useState } from 'react'
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../_config/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();
    
    const handleRegister = async(e)=>{
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;

            await updateProfile(user, {
                displayName: name
            });
            await user.reload();
            router.push("/login");
            toast.success("Registered Successfully");

        } catch (error) {
            toast.error("User already exists");
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-[518px] bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Create an Account</h1>
        <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="email"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register