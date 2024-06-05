// pages/auth.tsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NavBarActions } from '../modules/builder/nav-bar/atoms';
import { motion } from 'framer-motion';
import { BsGithub } from 'react-icons/bs';

import Image from 'next/image';
import Link from 'next/link';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      router.push('/builder');
    } catch (error) {
      toast.error('Error with login: ' + error.message);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} className="scroll-smooth">
      <ToastContainer />
      <nav className="sticky top-0 z-20 h-14 w-full bg-resume-800 flex py-2.5 px-4 xl:px-60 items-center shadow-level-8dp">
        <Link href="/">
          <Image src={'/icons/resume-icon.png'} alt="logo" height="36" width="36" />
        </Link>
        <div className="flex-auto flex justify-end items-center mr-5">
          <NavBarActions>
            <a
              href={'https://github.com/SxxAq/Resume-builder'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub className="h-6 w-6 text-white" />
            </a>
          </NavBarActions>
        </div>
      </nav>
      <div
        style={{
          background: 'linear-gradient(180deg, #E7EEFA 50%, #FFFFFF 100%)',
          fontFamily: "'Roboto Slab', serif",
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-3xl font-bold mb-5 text-resume-800">Login</h1>
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-md rounded-xl px-10 pt-8 pb-8 mb-4 w-full max-w-md"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#2E4052] hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => router.push('/signup')}
            className="text-[#2E4052] hover:text-teal-700 cursor-pointer"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthPage;
