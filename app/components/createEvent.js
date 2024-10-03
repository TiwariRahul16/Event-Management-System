"use client"
import React from "react";
import { submitEvent } from "@/actions/UserAction";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

const CreateEvent = () => {

  const router = useRouter()
  const { data: session, status } = useSession();

  const handleSubmit = async (formData) => {
    if (status === "authenticated") {
      const userEmail = session?.user?.email;
      const userName = session?.user?.name;
  
      try {
        const response = await submitEvent({
          eventfield: formData.get("eventfield"),
          topic: formData.get("topic"),
          address: formData.get("address"),
          speaker: formData.get("speaker"),
          TicketPrice: formData.get("TicketPrice"),
          Eventpic: formData.get("Eventpic"),
          Time: formData.get("Time"),
          Date: formData.get("Date"),
          email: userEmail,  
          user: userName,   
        });
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      console.log("User not authenticated.");
    }
  };
  
  if(!session) {
    router.push(`/`)
   } 
  

  return (
    <>
      <div className="p-8 rounded border w-[80%] pt-20 pb-40 mx-auto  border-gray-200">
        <h1 className="font-medium text-2xl sm:text-3xl">Add Event Details</h1>
        <form action={handleSubmit}>
          <div className="mt-6 grid lg:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventfield" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">Event field</label>
              <input type="text" name="eventfield" id="eventfield" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="Enter event field" />
            </div>
            <div>
              <label htmlFor="topic" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">Topic</label>
              <input type="text"  name="topic" id="topic" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="Enter event topic" />
            </div>
            <div>
              <label htmlFor="address" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">Address</label>
              <input type="text" name="address" id="address" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="Enter event address" />
            </div>
            <div>
              <label htmlFor="speaker" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">Speaker</label>
              <input type="text" name="speaker" id="speaker" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="speaker name" />
            </div>
         
            <div>
              <label htmlFor="Eventpic" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">Eventpic</label>
              <input type="url" name="Eventpic" id="Eventpic" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="Enter event Eventpic URL" />
            </div>
            
            <div>
              <label htmlFor="Time" className="text-sm l text-gray-900 sm:text-xl block mb-1 font-medium">Time</label>
              <input type="time" name="Time" id="Time" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="Time" />
            </div>
            <div>
              <label htmlFor="TicketPrice" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">TicketPrice</label>
              <input type="number" name="TicketPrice" id="TicketPrice" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="Enter TicketPrice" />
            </div>
            <div>
              <label htmlFor="Date" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">Date</label>
              <input type="date" name="Date" id="Date" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="(01/01/1993)" />
            </div>
          </div>
          <div className="space-x-4 mt-8">
            <button type="submit" className="sm:py-4 sm:px-10 text-lg py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Save</button>
            <button className="sm:py-4 sm:px-10 text-lg py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Cancel</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateEvent

