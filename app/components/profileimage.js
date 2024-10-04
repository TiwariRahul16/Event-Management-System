import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { fetchUserImages } from '@/actions/UserAction'

const Profileimage = () => {
  const { data: session } = useSession()
  const [currentUser, setCurrentUser] = useState({});
  const useremail = `${session?.user.email}`
  

  const getData = async (useremail) => {
    let u = await fetchUserImages(useremail);
    setCurrentUser(JSON.parse(u));
  };

  useEffect(() => {
    getData(useremail);
  }, [useremail]);

  return (
    <>
      <section className="my-auto dark:bg-gray-900">
        <div className="w-full  mx-auto flex gap-4">
          <div
            className="w-full  mx-auto shadow-2xl mb-20 p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
            {/* <!--  --> */}
            <div className="">
              {/* <!-- Cover Image --> */}
              <div className={`w-full object-fill flex items-center justify-center h-56 sm:h-72 md:h-96 rounded-sm bg-cover bg-center bg-no-repeat`}
                style={{ backgroundImage: `url(${currentUser.coverpic})` }} >

                <div
                  className={`relative top-44 mx-auto object-cover flex items-center justify-center w-[141px] h-[141px]  sm:w-[200px] sm:h-[200px] bg-blue-300/20 rounded-full bg-contain bg-center bg-no-repeat`}
                  style={{ backgroundImage: `url(${currentUser.profilepic})` }}
                >
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profileimage
