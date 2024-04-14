import Image from "next/image";
import React from "react";

const Testimonials = () => {
  return (
    <div className="w-full">
      <div>
        <div>
          <h1>Testimonials</h1>
          <p>See what our users has to say about Co-Travel Nepal</p>
        </div>
      </div>

      <div className="rounded shadow px-6 py-5 flex justify-center ">
        <div>
          <div className="flex ">
            <Image src="/images/user.svg" alt="User" width={50} height={50} />
            <div>
              <h2>John Doe</h2>
              <p>Traveller</p>
            </div>
          </div>
          <div>
            <p>
              How cool! You will do the Annapurna Circuit trek in Nepal. This is
              a wonderful hike and a physical challenge. We can recommend
              everyone to walk this amazing trek in Nepal....................
            </p>
          </div>
          <div>Stars</div>
        </div>

        <div>
          <div className="flex">
            <Image src="/images/user.svg" alt="" width={50} height={50} />
            <div>
              <h2>John Doe</h2>
              <p>Traveller</p>
            </div>
          </div>
          <div>
            <p>
              How cool! You will do the Annapurna Circuit trek in Nepal. This is
              a wonderful hike and a physical challenge. We can recommend
              everyone to walk this amazing trek in Nepal....................
            </p>
          </div>
        </div>

        <div>
          <div className="flex">
            <Image src="/images/user.svg" alt="" width={50} height={50} />
            <div>
              <h2>John Doe</h2>
              <p>Traveller</p>
            </div>
          </div>
          <div>
            <p>
              How cool! You will do the Annapurna Circuit trek in Nepal. This is
              a wonderful hike and a physical challenge. We can recommend
              everyone to walk this amazing trek in Nepal....................
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
