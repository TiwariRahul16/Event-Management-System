"use client"
import React, { useState,useEffect } from 'react'
import { fetchPayments } from '@/actions/UserAction';

const Payment = ({ username }) => {
const [payment, setPayment] = useState([]);

useEffect(() => {
    getData();
}, []);
    

const getData = async () => {
    let paymentAmount = await fetchPayments(username);
    setPayment(JSON.parse(paymentAmount));      
};


return (
    <>
    <div className='w-[100vw]'>
        <div className=" flex w-fit gap-3  mt-20 pb-12 mx-auto">
                    <div className="  bg-slate-900 rounded-lg text-white p-10">
                        <div className='text-xl text-slate-500 text-center relative p-8'> {payment.length}  Total Participants. ₹{payment.reduce((a,b)=>a + b.amount , 0)} Earned</div>
                        <h2 className="text-xl font-bold mb-5">Participants</h2>

                        {payment.length === 0 && (
                            <div className="text-center font-extrabold text-lg">
                                No Participants yet ☹
                            </div>
                        )}
                        <ul className="mx-2.5 md:mx-5 text-md">
                            {payment.map((p) => (
                                <li key={p._id} className="my-4 flex gap-2 items-center">
                                    <span className="text-sm md:text-base">
                                    <span className="font-bold text-lg">{p.name}</span> participated in <span className="font-bold text-lg">{p.eventname}</span> Amount paid
                                        <span className="font-bold text-lg"> ₹{p.amount} </span> with
                                        a message &quot; <span className="font-bold text-lg">{p.message}</span> &quot;
                                    </span>
                                </li>
                            ))}
                        </ul>

                    </div>


                </div>
            </div>

        </>
    )
};

export default Payment
