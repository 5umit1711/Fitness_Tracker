"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../_config/firebase';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
    toast.success("Logged out successfully");
  };

  const isActive = (route) => pathname === route;

  return (
    <nav className="bg-gray-100 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-gray-800 text-3xl font-bold tracking-wide hover:text-gray-500 transition-colors">
          Fitness Tracker
        </Link>

        
        {user && <ul className="hidden md:flex flex-1 justify-center space-x-8 text-gray-700 font-medium">
          <li>
            <Link
              href="/dashboard"
              className={`${
                isActive('/dashboard') ? 'text-blue-600 font-semibold' : 'hover:text-gray-500'
              } transition-colors`}
            >
              DashBoard
            </Link>
          </li>
          <li>
            <Link
              href="/workouts"
              className={`${
                isActive('/workouts') ? 'text-blue-600 font-semibold' : 'hover:text-gray-500'
              } transition-colors`}
            >
              Workouts
            </Link>
          </li>
          <li>
            <Link
              href="/goals"
              className={`${
                isActive('/goals') ? 'text-blue-600 font-semibold' : 'hover:text-gray-500'
              } transition-colors`}
            >
              Goals
            </Link>
          </li>          
        </ul>
        }

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {user ? (
            <>
              <li>
                <span className="cursor-pointer hover:text-gray-500 transition-colors" onClick={handleLogout}>
                  Logout
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:text-gray-500 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-gray-500 transition-colors">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
