"use client"
import Link from 'next/link'
import React from 'react'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import { checkNavuser } from '@/actions/UserAction'

const Navbar = () => {
  const { data: session } = useSession()
  const Username = `${session?.user.name}`
  const router = useRouter()
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [dropdown, setdropdown] = useState(false)
  const [currentUser, setCurrentUser] = useState({});
  

  const handleToggle = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  useEffect(() => {
    getData(Username);
  }, [Username]);

  const getData = async (Username) => {
    let u = await checkNavuser(Username);
    setCurrentUser(JSON.parse(u));
  };

  return (
    <>
      <nav className="bg-slate-100 dark:bg-gray-900 w-full text-xl z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/about" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CEMS</span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!session && <button type="button" onClick={() => router.push('/auth/signup')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>}

            {session && <>
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:p-3">
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                  <button onClick={() => { setdropdown(!dropdown) }} onBlur={(e) => { setTimeout(() => { setdropdown(false) }, 300) }} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 object-contain rounded-full" src={`${currentUser.profilepic}`} alt="user photo" />
                  </button>
                  {/* <!-- Dropdown menu --> */}
                  <div className={`z-50 ${dropdown ? "" : "hidden"} w-40 sm:w-64 absolute top-20 right-14 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                    <div className="px-4 py-3">
                      <span className="block sm:text-xl font-bold text-sm text-gray-900 dark:text-white">Hi! {session.user.name}</span>
                      <span className="block sm:text-lg text-sm  text-gray-500 truncate dark:text-gray-400">{session.user.email}</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <a href={`/dashboard/${session.user.name}`} className="block px-4 py-2 sm:text-xl text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                      </li>
                      <li>
                        <a href={`/profile/${session.user.name}`} className="block px-4 py-2 sm:text-xl text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Manage Profile</a>
                      </li>
                      <li>
                        <a href={`/${session.user.name}`} className="block px-4 py-2 sm:text-xl text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
                      </li>
                      <li>
                        <button className="text-left w-full block px-4 py-2 sm:text-xl text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => {signOut()}}>Sign out</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>}

            <button data-collapse-toggle="navbar-sticky" type="button" aria-controls="navbar-sticky" aria-expanded={isNavbarVisible} onClick={handleToggle} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={`items-center justify-between ${isNavbarVisible ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href={"/"} className="block py-1 text-base active:bg-blue-400 px-1 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
              </li>
              <li>
                <Link href={"/about"} className="block py-1 text-base active:bg-blue-400 px-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
              </li>
              <li>
                <Link href={"/"} className="block py-1 text-base active:bg-blue-400 px-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</Link>
              </li>
              <li>
                <Link href={"/contact"} className="block py-1 text-base active:bg-blue-400 px-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </>
  )
}

export default Navbar
