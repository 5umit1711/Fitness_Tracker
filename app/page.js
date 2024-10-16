'use client'

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const onButtonClick = (route)=>{
      router.push(`/${route}`);
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-[518px] flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        {user ? (
          <>
            <h1 className="text-4xl font-bold text-gray-800">Welcome Back, {user?.displayName || user.email}!</h1>
            <p className="text-lg text-gray-600 mt-4">
              Ready to track your fitness progress?
            </p>
            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            onClick={()=>onButtonClick("dashboard")}>
              View Dashboard
            </button>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-gray-800">
              Please log in to access your dashboard.
            </h1>
            <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
            onClick={()=>onButtonClick("login")}>
              Log In
            </button>
          </>
        )}
      </div>
    </div>
  );
}
