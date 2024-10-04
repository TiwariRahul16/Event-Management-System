"use client"
import React, { useState, useEffect } from 'react';
import { useSession, signIn } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Payments from './Payments';
import Profileimage from './profileimage';

const Dashboard = ({ params }) => {
  const [events, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleSection, setVisibleSection] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleToggle = (sectionId) => {
    setVisibleSection(visibleSection === sectionId ? null : sectionId);
  };


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/dashboard/${params.user}`);
        const result = await response.json();
        if (result.status === 'OK') {
          setEvent(result.data);
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

    if (status === "unauthenticated") {
      router.push("/"); // Redirect to home if not logged in
    }

  }, [params.user,status]);

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEvent(events.filter(event => event._id !== eventId));
        alert('Event deleted successfully');
      } else {
        const result = await response.json();
        alert(result.message || 'Failed to delete event');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!session) {
    return <div>You need to be logged in to access this page.</div>;
  }

  return (
    <>

      <section className="w-full">
        <Profileimage />
      </section>

      <section className="py-10 my-auto dark:bg-gray-900">
        <div className="flex justify-between text-xl font-bold w-full lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <button><Link href={'/createEvent'}>Create Event</Link></button>
          <button data-collapse-toggle="Participated" type="button" aria-controls="Participated" aria-expanded={ visibleSection === 'Participated'} onClick={() => handleToggle('Participated')}>Event Participants</button>
          <button
            data-collapse-toggle="Created"
            type="button"
            aria-controls="Created"
            aria-expanded={visibleSection === 'Created'}
            onClick={() => handleToggle('Created')}
          >
            Event Created
          </button>
        </div>

        <div id="Participated" className={`${visibleSection === 'Participated' ? 'block' : 'hidden'} w-full sm:w-[80%] md:w-[95%] xs:w-[96%]  `}>
        <Payments username={params.user} />
        </div> 


<div id="Created" className={`${visibleSection === 'Created' ? 'block' : 'hidden'} w-full sm:w-[80%] md:w-[90%] xs:w-[96%] mx-auto`}>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {events.map(event => (
      <div key={event._id} className="shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
        <div className="rounded-lg overflow-hidden shadow-lg group relative">
          <img className="min-h-44 w-full object-cover h-auto group-hover:blur-sm transition duration-300" src={event.Eventpic || "/images/Image1.jpg"} alt="Event Image" />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
            <h2 className="text-white text-xl sm:text-2xl font-bold">{event.topic}</h2>
            <Link href={`/events/${event._id}`} className="mt-4 text-white text-lg underline">Read More</Link>
            <div className="mt-4 flex gap-4 justify-center items-center">
              <Link href={`/manageEvent/${event._id}`} className="text-white text-lg underline">
                Update Event
              </Link>
              <button
                className="text-white text-lg underline"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      </section>
    </>
  );
}

export default Dashboard;



  



