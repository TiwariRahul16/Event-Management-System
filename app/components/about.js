import React from 'react'
import Link from 'next/link'

const about = () => {
  return (
    <section className="bg-gray-100">
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Us</h2>
                <p className="mt-4 text-gray-600 text-lg">A Campus Event Management System is a digital tool designed to streamline the planning, organization, and execution of campus events. Key features include event registration and ticketing, venue selection and booking, scheduling, attendee engagement, and post-event analysis. Benefits include increased efficiency, centralized management, improved communication, data-driven decisions, and enhanced safety and compliance. This system significantly enhances the success and efficiency of campus events, making it easier for planners to coordinate and execute events seamlessly.</p>
                <div className="mt-8">
                    <Link href="/about" className="text-blue-500 hover:text-blue-600 font-medium">Learn more about us
                        <span className="ml-2">&#8594;</span></Link>
                </div>
            </div>
            <div className="mt-12 md:mt-0">
                <img src="https://images.unsplash.com/photo-1531973576160-7125cd663d86" alt="About Us Image" className="object-cover rounded-lg shadow-md"/>
            </div>
        </div>
    </div>
</section>
  )
}

export default about
