"use client"
import Link from "next/link"
import { useContext } from "react"
import { AppContext } from "@/context/AppContext/page"
import { VscAccount } from "react-icons/vsc";
import { useState } from "react";
import ShowToast from "@/helper/page";
// import { usePathname } from "next/navigation";

const Navbar = () => {

  let { isLoggedIn, setIsLoggedIn, setUser } = useContext(AppContext);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // const pathname = usePathname();

  // const noNavPages = [
  //     "/login",
  //     "/signup"
  //   ]

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setIsLoggedIn(false)
      setUser(null)
      setToggleDropdown(false);
      ShowToast(true, "Log out successful!")
    } catch (error) {
      console.log(error)
      ShowToast(false, "Logged out unsuccessful!")
    }
  }
  return (
    <>
      {/* {(noNavPages.includes(pathname))
        ?
        <div className=""></div>
        : */}
      <nav className="flex justify-between px-10 md:px-20 py-5 bg-gray-900 items-center">
        <div className="">
          <Link href={isLoggedIn ? "/" : "/login"}
            className=" text-lg font-semibold bg-gradient-to-r from-sky-300 via-cyan-600 to-purple-400 inline-block text-transparent bg-clip-text tracking-[0.3rem]"
          >
            Note Verse
          </Link>
        </div>
        <div className="hidden sm:flex gap-4">
          {isLoggedIn ?
            <>
              <Link
                href={"/create-note"}
                className="text-gray-900 text-base font-bold tracking-wider bg-gradient-to-r from-sky-300 via-cyan-500 to-purple-300 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-4 py-2 text-center"
              >
                Create Note
              </Link>
              <Link
                href={"/"}
                className="text-gray-900 text-base font-bold tracking-wider bg-gradient-to-r from-sky-300 via-cyan-500 to-purple-300 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-4 py-2 text-center"
                onClick={handleLogout}
              >
                Log out
              </Link>
            </>
            :
            <>
              <Link
                href={"/login"}
                className="text-gray-900 text-base font-bold tracking-wider bg-gradient-to-r from-sky-300 via-cyan-500 to-purple-300 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-4 py-2 text-center"
              >
                Login
              </Link>
              <Link
                href={"/signup"}
                className="text-gray-900 text-base font-bold tracking-wider bg-gradient-to-r from-sky-300 via-cyan-500 to-purple-300 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-4 py-2 text-center"
              >
                Sign-up
              </Link>
            </>
          }
        </div>
        <div className="flex sm:hidden">
          <VscAccount
            className="text-cyan-200 text-3xl cursor-pointer"
            onClick={() => setToggleDropdown((prev) => !prev)}
          />

          {toggleDropdown && (<div className="bg-gradient-to-r from-sky-50 to-purple-50 z-30 text-center absolute right-10 top-11 mt-3 w-1/2 p-5 rounded-lg min-w-[210px] flex-col gap-2 justify-end items-end max-h-fit shadow-sm shadow-slate-400 py-6">
            {isLoggedIn ?
              <>
                <Link
                  href="/create-note"
                  className=" text-blue-950  font-semibold text-xl hover:text-cyan-500 text-center [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Note
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-3 text-black text-lg shadow-sm shadow-black font-bold tracking-wider bg-gradient-to-r from-sky-300 to-cyan-300 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2 text-center"
                >
                  Log Out
                </button>
              </>
              :
              <div className="flex flex-col items-center">
                <Link
                  href="/login"
                  className="text-gray-900 font-bold text-xl hover:text-cyan-500 text-center [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]"
                  onClick={() => setToggleDropdown(false)}
                >
                  Login
                </Link>
                <Link
                  type="button"
                  href={"/signup"}
                  onClick={() => setToggleDropdown(false)}
                  className="w-fit mt-3 text-black text-lg shadow-sm shadow-black font-bold tracking-wider bg-gradient-to-r from-sky-300  to-cyan-300 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-4 py-2 text-center"
                >
                  Sign Up
                </Link>
              </div>
            } </div>)
          }
        </div>
      </nav>
      {/* } */}
    </>
  )
}

export default Navbar
