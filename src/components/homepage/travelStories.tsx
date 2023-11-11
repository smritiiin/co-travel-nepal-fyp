import Image from 'next/image';
import React from 'react'

const TravelStories = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1>Travel Stories</h1>
        <p>Read More</p>
      </div>

      <div className="flex">
        {/* THis is the top article for this week/ most read this month */}
        <div className=" w-1/2">
          <Image
            src="/images/Blogs/Bandipur-blog.svg"
            width={350}
            height={350}
            alt=""
          />
          <p className=" truncate">
            Bandipur: authentic village and beautiful hidden gem in Nepal!
          </p>
        </div>

        {/* Other blogs with headline */}
        <div className=" w-1/2">
          <div className="flex">
            <Image
              src="/images/Blogs/Bandipur-blog.svg"
              width={150}
              height={150}
              alt=""
            />
            <div>
              <p className=" truncate">
                Bandipur: authentic village and beautiful hidden gem in Nepal!
              </p>
              <p>
                How cool! You will d0 the Annapurna Circuit trek in Nepal. This
                is a wonderful hike and a physical challenge. We can recommend
                everyone to walk this amazing trek in Nepal....................
              </p>
            </div>
          </div>
          <div className="flex">
            <Image
              src="/images/Blogs/Bandipur-blog.svg"
              width={150}
              height={150}
              alt=""
            />
            <div>
              <p className=" truncate">
                Bandipur: authentic village and beautiful hidden gem in Nepal!
              </p>
              <p>
                How cool! You will d0 the Annapurna Circuit trek in Nepal. This
                is a wonderful hike and a physical challenge. We can recommend
                everyone to walk this amazing trek in Nepal....................
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelStories