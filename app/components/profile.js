"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Profileimage from './profileimage'


const Profile = ({ params }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [userdata, setuserdata] = useState({})
 

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`/api/user/${params.user}`);
            const result = await response.json();
      
            if (result.status === 'OK') {
              setuserdata(result.data);
            } else {
              alert('Error fetching user data: ' + result.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
      
        fetchUserData();
      }, [params.user]);
      

    const handleChange = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        try {
          const response = await fetch(`/api/user/${params.user}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userdata),  
          });
      
          const result = await response.json();
          
          if (result.status === 'OK') {
            alert('User updated successfully!');
          } else {
            alert('Error updating user: ' + result.message);
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };
      


    return (
        <>
        {!session && <Link href={'/'} className='text-xl text-center pt-10'>Home</Link> }
          {session && <section className="py-10 min-h-screen my-auto dark:bg-gray-900">
                <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                    <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                        <div className="">
                            <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-serif font-extrabold mb-2 dark:text-white">Profile</h1>
                            <h2 className="text-grey text-base mb-4 dark:text-gray-400">Create Profile</h2>
                            <form action={handleSubmit}>

                            <Profileimage />

                                <div className="flex sm:flex-row flex-col  gap-2 justify-center w-full">
                                    <div className="w-full pt-4 sm:pt-0 mb-4 lg:mt-6">
                                        <label htmlFor="name" className="mb-2 dark:text-gray-300">Name</label>
                                        <input value={userdata.name ? userdata.name : ""} onChange={handleChange} type="text" name='name' id='name' className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="Enter Name" /></div>

                                    <div className="w-full  mb-4 lg:mt-6">
                                        <label htmlFor="razorpayId" className=" dark:text-gray-300">RazorpayId</label>
                                        <input value={userdata.razorpayId ? userdata.razorpayId : ""} onChange={handleChange} type="text" name='razorpayId' id='razorpayId' className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="Enter RazorpayId" /></div></div>
                                <div className="flex sm:flex-row flex-col s gap-2 justify-center w-full">

                                    <div className="w-full  mb-4 lg:mt-6">
                                        <label htmlFor="coverpic" className="inline-flex items-center gap-1 cursor-pointer">coverpic </label>
                                        <input className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" value={userdata.coverpic ? userdata.coverpic : ""} onChange={handleChange} type="url" name="coverpic" id="coverpic" placeholder='coverpic' />
                                    </div>
                                    <div className="w-full  mb-4 lg:mt-6">
                                        <label htmlFor="profilepic">profilepic </label>
                                        <input className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" value={userdata.profilepic ? userdata.profilepic : ""} onChange={handleChange} type="url" name="profilepic" id="profilepic" placeholder='profilepic' />
                                    </div>
                                </div>
                                <div className="flex sm:flex-row flex-col s gap-2 justify-center w-full">
                                    <div className="w-full  mb-4 lg:mt-6">
                                        <label htmlFor="razorpaySecret" className="mb-2 dark:text-gray-300">RazorpaySecret</label>
                                        <input value={userdata.razorpaySecret ? userdata.razorpaySecret : ""} onChange={handleChange} type="text" name='razorpaySecret' id='razorpaySecret'
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder="Enter razorpaySecret" />
                                    </div>
                                    <div className="w-full  mb-4 lg:mt-6">
                                        <label htmlFor="phoneNumber" className=" dark:text-gray-300">Phone Number</label>
                                        <input value={userdata.phoneNumber ? userdata.phoneNumber : ""} onChange={handleChange} type="number" minLength={1} maxLength={10} name='phoneNumber' id='phoneNumber'
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder="Phone Number" />
                                    </div>

                                </div>
                                <div className="flex sm:flex-row flex-col s gap-2 justify-center w-full">
                                    <div className="w-full">
                                        <h3 className="dark:text-gray-300 mb-2">Sex</h3>
                                        <input value={userdata.Sex ? userdata.Sex : ""} onChange={handleChange} type="text" name='Sex' id='Sex'
                                            className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" />
                                    </div>
                                    <div className="w-full">
                                        <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                                        <input value={userdata.DOB ? userdata.DOB : ""} onChange={handleChange} type="date" name='DOB' id='DOB'
                                            className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" />
                                    </div>
                                </div>
                                <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                                    <button type="submit" className="w-full p-4">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>}

        </>
    )
}

export default Profile
