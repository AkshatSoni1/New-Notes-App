"use client"

import Link from 'next/link'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { AppContext } from '@/context/AppContext/page';

const login = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setIsLoggedIn} = useContext(AppContext)
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const res = await fetch('/api/auth/login', {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        })
      })

      setEmail('')
      setPassword('')
      let response = await res.json();
      if (res.ok) {
        const userObj = {
          userToken : response.token,
          userId : response.user._id
        }
        localStorage.setItem('token',JSON.stringify(userObj))
        setIsLoggedIn(true);
        router.push("/");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div>
          <h1 className='text-3xl pt-20 pb-5 text-blue-950 font-semibold'>
            Already here? Login🤗
          </h1>
        </div>

        <form
          className=' z-10 border border-black flex flex-col gap-4 justify-center items-center w-96 py-12 px-16 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 shadow-sm shadow-black'
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full gap-2">
            <label className='text-cyan-100'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@gmail.com"
              className='px-2 py-1 rounded-md shadow-gray-600 shadow-sm text-gray-700 bg-cyan-50'
              required
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className='text-cyan-100'>Password</label>
            <div className="relative">

              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Shh...'
                className='relative px-2 py-1 w-full rounded-md shadow-gray-600 shadow-sm text-gray-700 bg-cyan-50'
                required
              />
              <div className="absolute right-3 top-2">
                {showPass && (
                  <AiFillEye
                    className="cursor-pointer text-lg text-text_secondary"
                    onClick={() => setShowPass(()=>!showPass)}
                  />
                )}
                {!showPass && (
                  <AiFillEyeInvisible
                    className="cursor-pointer text-lg text-text_secondary"
                    onClick={() => setShowPass(!showPass)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="">
            <button
              disabled={submitting}
              type='submit'
              className="border border-cyan-200 px-7 py-3.5 hover:bg-gray-700 hover:text-cyan-200 mt-5 rounded-md bg-cyan-200 text-gray-800 hover:shadow-md hover:shadow-gray-900 transition-all duration-300 hover:transition-all hover:duration-300 font-bold disabled:opacity-40"
            >Log in</button>
          </div>
        </form>

        <div className="py-8 text-xl text-blue-950 font-semibold">
          <h2>New user?{" "}
            <Link
              href="/signup"
              className='text-blue-600 hover:text-blue-400'
            >
              Sign-up</Link>
          </h2>
        </div>
      </div>
    </>
  )
}

export default login
