"use client"
import Link from "next/link"
import {useContext } from "react"
import { AppContext } from "@/context/AppContext/page"
// import { usePathname } from "next/navigation";

const Navbar = () => {

    let {isLoggedIn, setIsLoggedIn, setUser} = useContext(AppContext);

    // const pathname = usePathname();

    // const noNavPages = [
    //     "/login",
    //     "/signup"
    //   ]

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false)
        setUser(null)
    }
  return (
    <>
    {/* {(noNavPages.includes(pathname))
        ?
        <div className=""></div>
        : */}
    <nav className="flex justify-between px-10 py-5 bg-gray-900 items-center">
        <div className="">
            <Link href={isLoggedIn?"/":"/login"}
                className=" text-lg font-semibold bg-gradient-to-r from-sky-300 via-cyan-600 to-purple-400 inline-block text-transparent bg-clip-text tracking-[0.3rem]"
            >
                Note Verse
            </Link>
        </div>
        <div className=" flex gap-4">
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
    </nav>
    {/* } */}
    </>
  )
}

export default Navbar
