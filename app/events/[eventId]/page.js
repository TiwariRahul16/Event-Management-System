"use client"
import React,{useEffect} from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Script from 'next/script'
import { fetchUser,fetchPayments,initiate } from '@/actions/UserAction';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

const Event = ({params}) => {
    const { data: session } = useSession()

    const  Username = `${session?.user.name}`
    const [paymentform, setpaymentform] = useState({ name: "", message: ""})
    const [currentUser, setCurrentUser] = useState({});
    const [payment, setPayment] = useState([]);
    const searchParams = useSearchParams()
    const Router = useRouter()

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const EventUser = `${event?.user}`
    const eventname = `${event?.topic}`

    const calculateTime = (time, minutesToAdd) => {
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes + minutesToAdd);
        const newHours = date.getHours().toString().padStart(2, '0');
        const newMinutes = date.getMinutes().toString().padStart(2, '0');
        return `${newHours}:${newMinutes}`;
    };
    

    const lunchTime = event && event.Time ? calculateTime(event.Time, 90) : 'Invalid time'; 
    const endTime = event && event.Time ? calculateTime(event.Time, 180) : 'Invalid time';

    useEffect(() => {
        getData();
      }, []);

    useEffect(() => {
      if (searchParams.get("paymentdone") == "true") {
        toast('🦄 Payment done successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            
      }
      Router.push(`/events/${params.eventId}`)
    }, [])


    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/api/events/${params.eventId}`); // Use params.eventId
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
    }, [params.eventId]);


    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchUser(EventUser);
        setCurrentUser(JSON.parse(u));
        let paymentAmount = await fetchPayments(EventUser);
        setPayment(JSON.parse(paymentAmount));
      };

      const pay = async (amount) => {

        let a = await initiate(amount, EventUser,eventname, paymentform)
        let orderId = a.id

         var options = {
            "key": currentUser.RazorpayId, 
            "amount": amount, 
            "currency": "INR",
            "name": "CEMS", 
            "deScription": "Test Transaction",
            "img": "https://example.com/your_logo",
            "order_id": orderId, 
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { 
                "name": session?.user.name, 
                "email": session?.user.email,
                "contact": "9000090000" 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            },
         };
        var rzp1 = new Razorpay(options);
        rzp1.open();

     };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: No event found</div>;
    if (error) return <div>Error: {error}</div>;

  return (
  <>

      <ToastContainer
               position="top-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="light"
          />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

   <main className='w-[80%] mx-auto'>
   <div className='flex justify-between h-52 mt-20 sm:mt-36 '>
    <div className='flex flex-col gap-14'>
        <h1 className='text-base sm:text-6xl'>{event.eventfield}</h1>
        <h3 className='text-base sm:text-3xl'>{event.topic}</h3>
    </div>
    <div className='text-2xl flex flex-col gap-20 text-wrap text-right'>
        <h4 className='text-base sm:text-5xl'>{new Date(event.Date).toLocaleDateString()}</h4>
        <h4 className='text-base sm:text-5xl'> {event.address}</h4>
    </div>
    </div> 
    <div className=' w-full'>
    {event.Eventpic && <img className='w-full ' src={event.Eventpic} alt="Event" />}
    </div>
    <div className='w-full h-28 text-left mt-36 '>
        <h2 className='text-2xl sm:text-5xl'>About the Event</h2>
    </div>
    <div className='sm:flex gap-16'>
        <div className='w-full sm:w-[50%]'>
          <p className='font-semibold pb-12 text-base sm:text-xl'>Are your designs the best? You may. But a design is the best only when it matches your client’s needs and brings more customers. Let us work on this together.</p>
            <p className='text-base sm:text-xl'>Like every once in a while we need to upgrade a technology to match with the latest trend, so is it with design. It is important to study and understand the client’s needs and merge it with the latest design trend that’ll help attract more customers.</p>
        </div>
        <div className='w-full sm:w-[50%]'>
            <p className='pb-12 text-base sm:text-xl'>In this special seminar, we’ll understand the changes observed in client requirements and some realistic designs that work.</p>
            <div className='flex flex-col sm:flex-row gap-4'>
            <div className='px-10 py-5 rounded-lg text-white text-center text-xl bg-sky-700'> Price-₹{event.TicketPrice} </div>
            {!session && <Link className='px-10 py-5 rounded-lg text-white text-xl bg-sky-700' href={"/auth/login"}> <span>login to reserve seat</span> </Link> }
            {session && <>
             <div className='flex flex-col sm:flex-row gap-2'>
             <div className='flex flex-col gap-2'>
             <div className='flex flex-col'>
             <label htmlFor="Name" className="text-sm  text-gray-900 sm:text-xl  mb-3 font-medium">Name</label>
             <input type="text" placeholder="Name" className="p-2 text-xl rounded-md bg-slate-200/40" onChange={handleChange} value={paymentform.name} name="name" required />
             </div>
             <div  className='flex flex-col'>
             <label htmlFor="message" className="text-sm  text-gray-900 sm:text-xl  mb-3 font-medium">message</label>
             <input type="text" placeholder="Enter Message" className="p-2 text-xl rounded-md bg-slate-200/40" onChange={handleChange} value={paymentform.message} name="message" required />
             </div>
             </div>
            <button onClick={() => pay(`${event.TicketPrice}`* 100)} className='px-10 py-5 rounded-lg text-white text-xl bg-sky-700'>Reserve my spot</button>
             </div>
            </>}
            </div>
        </div>
    </div>

    <div className='mt-36 pt-10 sm:pt-28 pb-28 bg-slate-100 mb-36'>
    <div className='sm:flex mb-10 pb-20 '>
        <div className='text-xl sm:text-5xl w-full sm:w-[50%] pb-4 sm:pb-0'>Event Schedule</div>
        <div className='w-full sm:w-[50%] text-sm sm:text-xl  '>This isn’t another day-long session repeating the things we know. We’ve designed and framed them well, so every minute introduces a new concept and a different point of view to adopt.</div>
    </div>
    <div className='flex justify-between w-full '>
    <div className='flex flex-col text-xl gap-6 w-56'>
        <h5 className='text-blue-600 '>{event.Time}</h5>
        <div className='text-sm sm:text-3xl'>Introduction & Opening</div>
        <h5 className='text-sm sm:text-4xl' >Speaker: {event.speaker}</h5>
    </div>
    <div className='flex flex-col text-xl gap-6 w-56' >
        <h5 className='text-blue-600 ' >{lunchTime}</h5>
        <div className='text-sm sm:text-3xl' >Lunck Time</div>
        <h5 className='text-sm sm:text-4xl' >Speaker: {event.speaker}</h5>
    </div>
    <div className='flex flex-col text-xl gap-6 w-56' >
        <h5 className='text-blue-600 ' >{endTime}</h5>
        <div className='text-sm sm:text-3xl' >Conclusion and Q&A Session</div>
        <h5 className='text-sm sm:text-4xl'>Speaker: {event.speaker}</h5>
    </div>
    </div>
    </div>
    <div>
    <div className='sm:flex gap-1 pb-20 bg-slate-100'>
        <h1 className='w-full pb-4 sm:pb-0 sm:w-[50%] text-xl sm:text-5xl'>Meet the Speakers</h1>
        <p className='w-full text-lg sm:text-xl sm:w-[50%]'>Our bench of speakers includes some well-established and successful designers who are known to be ruling the industry for years. Join the seminar and take a step closer to being an expert.</p>
    </div>
    <div className='flex flex-col sm:flex-row justify-between mt-14 pt-14 pb-14 bg-white sm:bg-slate-100' >
        <div className='flex flex-col p-3 mb-5 bg-slate-100 gap-5'>
            <img className='sm:w-60 w-full h-48 sm:h-80 object-cover' src={event.Eventpic} alt="" />
            <h2 className='text-lg sm:text-3xl'>{event.speaker}</h2>
            <h6 className='text-xl'>Sr. Creative Designer</h6>
        </div>
        <div className='flex flex-col mt-4 p-3 mb-5 bg-slate-100 gap-5'>
            <img className='sm:w-60 w-full h-48 sm:h-80 object-cover' src={event.Eventpic} alt="" />
            <h2 className='text-lg sm:text-3xl'>{event.speaker}</h2>
            <h6 className='text-xl'>Sr. Creative Designer</h6>
        </div>
        <div className='flex flex-col mt-4 p-3 mb-5 bg-slate-100 gap-5'>
            <img className='sm:w-60 w-full h-48 sm:h-80 object-cover' src={event.Eventpic} alt="" />
            <h2 className='text-lg sm:text-3xl'>{event.speaker}</h2>
            <h6 className='text-xl'>Sr. Creative Designer</h6>
        </div>
        <div className='flex flex-col mt-4 p-3 bg-slate-100 gap-5'>
            <img className='sm:w-60 w-full h-48 sm:h-80 object-cover' src={event.Eventpic} alt="" />
            <h2 className='text-lg sm:text-3xl'>{event.speaker}</h2>
            <h6 className='text-xl'>Sr. Creative Designer</h6>
        </div>
    </div>
    </div>
    <div className='mt-14 pt-14 bg-slate-100'>
        <div className='flex justify-between'>
            <h1 className='text-lg sm:text-5xl w=[50%]'>Our Sponsors</h1>
            <p className='w-[50%] text-base sm:text-xl' > It is not possible to host several seminars in different locations without helping hands. We have several sponsors who volunteer to help us physically and financially to make things happen.</p>
        </div>
        <div className='flex justify-between mt-14 pt-14 mb-14 pb-14'>
            <div><img className='' src="https://websitedemos.net/event-02/wp-content/uploads/sites/863/2021/05/logo-1.svg" alt="" /></div>
            <div><img className='' src="https://websitedemos.net/event-02/wp-content/uploads/sites/863/2021/05/logo-2.svg" alt="" /></div>
            <div><img className='' src="https://websitedemos.net/event-02/wp-content/uploads/sites/863/2021/05/logo-3.svg" alt="" /></div>
            <div><img className='' src="https://websitedemos.net/event-02/wp-content/uploads/sites/863/2021/05/logo-5.svg" alt="" /></div>
        </div>
    </div>
   </main>
  </>
  )
}

export default Event
