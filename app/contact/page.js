import React from 'react'
import Contact from '../components/Contact_us'

const page = () => {
  return (
    <>
    <div className='sm:min-h-screen flex pt-9 flex-col items-center justify-center'>
    <h3 className='text-3xl font-semibold pb-5'>Contact Us</h3>
    <div className='w-full'>
      <Contact/>
    </div>
    </div>
    </>
  )
}

export default page

export const metadata = {
  title: 'CEMS-contact',
}
