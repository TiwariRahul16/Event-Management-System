"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Cards = () => {
  const [events, setEvents] = useState([]);
  const [comingEvents, setComingEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/findPastEvent');
        const result = await response.json();
        
        if (result.status === "OK") {
          setEvents(result.data);
        } else {
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchComingEvents = async () => {
      try {
        const response = await fetch('/api/findUpCommingEvent');
        const result = await response.json();
        
        if (result.status === "OK") {
          setComingEvents(result.data);
        } else {
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchComingEvents();
  }, []);

  useEffect(() => {
    const fetchOngoingEvents = async () => {
      try {
        const response = await fetch('/api/OngoingEvents');
        const result = await response.json();
        
        if (result.status === "OK") {
          setOngoingEvents(result.data);
        } else {
        }
      } catch (error) {
       
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingEvents();
  }, []);

  return (
    <>
      <div className="topEvent mx-1 pt-10">
        <h3 className="text-2xl font-bold text-center pb-10">Top Events</h3>
        <section className="py-10 my-auto dark:bg-gray-900">
          <div className="w-full sm:w-[80%] md:w-[90%] xs:w-[96%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-6 gap-4">
            {loading && <div>Loading...</div>}
            {loading || events.length === 0 && <div>No past events found</div>}
            {events.map(event => (
              <div key={event._id} className="w-full  lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                <div className="rounded-lg overflow-hidden shadow-lg group relative sm:w-full">
                  <img className="w-full object-cover h-auto group-hover:blur-sm transition duration-300" src={event.Eventpic} alt={event.topic} />
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
                    <h2 className="text-white text-3xl font-bold">{event.topic}</h2>
                    <Link href={`/events/${event._id}`} className="mt-4 text-white text-lg underline">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="topEvent mx-1 pt-10">
        <h3 className="text-2xl font-bold text-center pb-10">Ongoing Events</h3>
        <section className="py-10 my-auto dark:bg-gray-900">
          <div className="w-full sm:w-[80%] md:w-[90%] xs:w-[96%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-6 gap-4">
            {loading && <div>Loading...</div>}
            {loading || ongoingEvents.length === 0 && <div>No ongoing events found</div>}
            {ongoingEvents.map(event => (
              <div key={event._id} className="w-full lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                <div className="rounded-lg overflow-hidden shadow-lg group relative sm:w-full">
                  <img className="w-full object-cover h-auto group-hover:blur-sm transition duration-300" src={event.Eventpic} alt={event.topic} />
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
                    <h2 className="text-white text-3xl font-bold">{event.topic}</h2>
                    <Link href={`/events/${event._id}`} className="mt-4 text-white text-lg underline">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="topEvent mx-1 pt-10">
        <h3 className="text-2xl font-bold text-center pb-10">Upcoming Events</h3>
        <section className="py-10 my-auto dark:bg-gray-900">
          <div className="w-full sm:w-[80%] md:w-[90%] xs:w-[96%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-6 gap-4">
            {loading && <div>Loading...</div>}
            {loading || comingEvents.length === 0 && <div>No upcoming events found</div>}
            {comingEvents.map(event => (
              <div key={event._id} className="w-full lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                <div className=" rounded-lg overflow-hidden shadow-lg group relative sm:w-full">
                  <img className="min-h-44 w-full object-cover h-auto group-hover:blur-sm transition duration-300" src={event.Eventpic} alt={event.topic} />
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
                    <h2 className="text-white text-3xl font-bold">{event.topic}</h2>
                    <Link href={`/events/${event._id}`} className="mt-4 text-white text-lg underline">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Cards;
