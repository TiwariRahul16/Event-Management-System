'use client'
import Cards from "./components/cards";
import Contact from "./components/Contact_us";
import About from "./components/about";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <main className="pt-5 mx-1">
      <div className="sm:h-[60rem] h-60 " >
        <img className=" sm:h-[60rem] h-60 w-full object-fill sm:object-cover " src="/images/event.jpg" alt="" />
        <div className="flex  flex-col text-white font-sans font-extrabold text-3xl sm:text-6xl md:text-9xl relative top-[-70%] items-center justify-center"><span>Campus</span> <span>Event Planner</span>
          <div className=" pt-5">
            <button onClick={() => router.push('/about')} className="relative text-sm sm:text-3xl inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden  font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-1 sm:px-5 py-1 sm:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                About Us
              </span>
            </button>
            <button onClick={() => router.push('/auth/signup')} className="relative  text-sm sm:text-3xl inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden  font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-1 sm:px-5 py-1 sm:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Get Started
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-slate-200 sm:mt-14 mt-9 mb-5 sm:mb-7"></div>
      <Cards/>
      <About/>
      <div className="h-1 w-full bg-slate-200 sm:mt-14 mt-9 mb-5 sm:mb-7"></div>
      <div className=" text-center">
        <h2 className="mt-10 mb-10 text-2xl font-bold">Feedback Form</h2>
      <Contact/>
      </div>
      <div className="h-1 w-full bg-slate-200 sm:mt-14 mt-9 mb-5 sm:mb-7"></div>

    </main >
  );
}
