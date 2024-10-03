"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useSession} from "next-auth/react"

const ManageEvent = ({ params }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [events, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    eventfield: "",
    topic: "",
    address: "",
    speaker: "",
    TicketPrice: "",
    Eventpic: "",
    Time: "",
    Date: "",
  });


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`);
        const result = await response.json();
        if (result.status === "OK") {
          setEvent(result.data);
          setFormData({
            eventfield: result.data.eventfield,
            topic: result.data.topic,
            address: result.data.address,
            speaker: result.data.speaker,
            TicketPrice: result.data.TicketPrice,
            Eventpic: result.data.Eventpic,
            Time: result.data.Time,
            Date: result.data.Date.split("T")[0], // format the date
          });
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/events/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === "OK") {
        alert("Event updated successfully!");
        router.refresh(); 
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log("Error updating event:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 rounded border w-[80%] pt-20 pb-40 mx-auto  border-gray-200">
      <h1 className="font-medium text-3xl">Update Event Details</h1>
      <form onSubmit={handleSubmit}>

        <div className="mt-6 grid lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="eventfield" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">Event field</label>
            <input value={formData.eventfield} onChange={handleInputChange} type="text" name="eventfield" id="eventfield" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="Enter event field" />
          </div>
          <div>
            <label htmlFor="topic" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">Topic</label>
            <input value={formData.topic} onChange={handleInputChange} type="text" name="topic" id="topic" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="Enter event topic" />
          </div>
          <div>
            <label htmlFor="address" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">Address</label>
            <input value={formData.address} onChange={handleInputChange} type="text" name="address" id="address" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="Enter event address" />
          </div>
          <div>
            <label htmlFor="speaker" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">Speaker</label>
            <input value={formData.speaker} onChange={handleInputChange} type="text" name="speaker" id="speaker" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="speaker name" />
          </div>
          <div>
            <label htmlFor="Eventpic" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">Eventpic</label>
            <input value={formData.Eventpic} onChange={handleInputChange} type="url" name="Eventpic" id="Eventpic" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="Enter event Eventpic URL" />
          </div>

          <div>
            <label htmlFor="Time" className="text-sm l text-gray-900 sm:text-xl block mb-1 font-medium">Time</label>
            <input value={formData.Time} onChange={handleInputChange} type="time" name="Time" id="Time" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="Time" />
          </div>
          <div>
            <label htmlFor="TicketPrice" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">TicketPrice</label>
            <input value={formData.TicketPrice} onChange={handleInputChange} type="number" name="TicketPrice" id="TicketPrice" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="Enter TicketPrice" />
          </div>
          <div>
            <label htmlFor="Date" className="text-sm  text-gray-900 sm:text-xl block mb-1 font-medium">Date</label>
            <input value={formData.Date} onChange={handleInputChange} type="date" name="Date" id="Date" className="bg-gray-100 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-xl w-full" placeholder="(01/01/1993)" />
          </div>
        </div>

        <button type="submit" className="mt-4">Update Event</button>
      </form>
    </div>
  );
};

export default ManageEvent;
