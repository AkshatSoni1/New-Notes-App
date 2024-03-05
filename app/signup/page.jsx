"use client"
import ShowToast from "@/helper/page";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const signup = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false)
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })
      setFormData({ ...formData, name: '', email: '', password: '' })
      let response = await res.json()
      if (res.ok) {
        ShowToast(true, "Welcome! Sign up successful!")
        router.push("/")
        setTimeout(() => {
          ShowToast(true, "Log-in to create notes!🤗")
        }, 3600);
      }
      else{
        console.log(res)
        console.log(response)
        ShowToast(false, response.message)
      }
    } catch (error) {
      console.log(error)
    } finally{
      setSubmitting(false);
    }
  }
  return (
    <>
      <div className="flex flex-col items-center  justify-center min-h-screen">
        <div>
          <h1 className='text-3xl pt-12 pb-5 text-blue-950 font-semibold'>
            New Here? Sign Up
          </h1>
        </div>

        <form className=' z-10 border border-black flex flex-col gap-4 justify-center items-center w-full sm:w-96 px-8 py-6 sm:px-10 sm:py-8 md:py-12 md:px-14  rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 shadow-sm shadow-black' onSubmit={handleSubmit}>
          <div className="flex flex-col w-full gap-2">
            <label className='text-cyan-100'>Name</label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              type='text'
              placeholder='Your good name?'
              className=' z-10 outline-none px-2 py-1 sm:px-2 sm:py-1.5 rounded-md shadow-gray-600 shadow-sm text-gray-700'
              required
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className='text-cyan-100'>Email</label>
            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              type='email'
              placeholder="hello@gmail.com"
              className=' z-10 outline-none px-2 py-1 sm:px-2 sm:py-1.5 rounded-md shadow-gray-600 shadow-sm text-gray-700'
              required
            />
          </div>

          <div className="relative flex flex-col w-full gap-2">
            <label className='text-cyan-100'>Password</label>
            <div className="relative">

              <input
                type={showPass ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder='Make sure to remember it'
                className=' pr-10  outline-none relative px-2 py-1 sm:px-2 sm:py-1.5 w-full rounded-md shadow-gray-600 shadow-sm text-gray-700'
                required
              />
              <div className="absolute right-3 top-2">
                {showPass && (
                  <AiFillEye
                    className="cursor-pointer text-lg text-text_secondary"
                    onClick={() => setShowPass(!showPass)}
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
              className=" shadow-sm shadow-black border border-cyan-200 px-5 py-2.5 sm:px-7 sm:py-3.5 hover:bg-gray-700 hover:text-cyan-200 mt-3 sm:mt-5 rounded-md bg-cyan-200 text-gray-800 hover:shadow-md hover:shadow-gray-900 transition-all duration-300 hover:transition-all hover:duration-300 font-bold disabled:opacity-40"
            >Sign up</button>
          </div>
        </form>

        <div className="py-8 text-lg sm:text-xl text-blue-950 font-semibold">
          <h2>Already a user?{" "}
            <Link
              href="/login"
              className='text-blue-600 hover:text-blue-400'
            >
              Log-in</Link>
          </h2>
        </div>
      </div>
    </>
  )
}

export default signup
