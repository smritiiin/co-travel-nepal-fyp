import Image from "next/image";

const PopularDestinations = () => {
  return (
    <div className="px-10 mt-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-left text-3xl font-bold">Popular Destinations</h2>
          <p>Vacations to make your experience enjoyable in Nepal!</p>
        </div>
        <div className="text-blue-600 font-semibold text-sm">View All</div>
      </div>

      {/* CARD COMPONENT FOR POPULAR DESTINATIONS */}

      <Image
        src="/images/home/places.png"
        alt=""
        className="my-5"
        layout="responsive"
        objectFit="cover"
        width={570}
        height={390}
      ></Image>
      {/* <div className="w-[296px] h-[332px]">
      <div className=" w-[296px] h-[332px]  bg-[#f0f0f073] rounded-[16px] border border-solid border-white backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]">
        <div className="relative h-[310px] top-[6px]">
          <Image
            className="absolute w-[296px] h-[212px] top-0 left-0 object-cover"
            alt="Rectangle"
            src=""
          />
          <div className="flex flex-col w-[262px] items-start gap-[16px] absolute top-[206px] left-[16px]">
            <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-[4px] relative flex-[0_0_auto]">
                <img className="relative w-[12px] h-[12px]" alt="Iconly bold location" src="location.svg" />
                <div className="relative w-fit mt-[-1.00px] [font-family:'Lato-Regular',Helvetica] font-normal text-[#8e8e8e] text-[10px] tracking-[0.10px] leading-[14.0px] whitespace-nowrap">
                  Manggarai Barat
                </div>
              </div>
              <div className="inline-flex flex-col items-start gap-[4px] relative flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Lato-Bold',Helvetica] font-bold text-[#333333] text-[16px] tracking-[0.50px] leading-[22.4px] whitespace-nowrap">
                  Flores Road Trip 3D2N
                </div>
                <div className="relative w-fit [font-family:'Lato-Regular',Helvetica] font-normal text-[#636363] text-[14px] tracking-[0.17px] leading-[19.6px] whitespace-nowrap">
                  3 Days
                </div>
              </div>
            </div>
            <p className="relative w-fit [font-family:'Lato-Bold',Helvetica] font-normal text-transparent text-[14px] leading-[19.6px] whitespace-nowrap">
              <span className="font-bold text-[#42a7c3] tracking-[0.17px]">Rp 6.705.000</span>
              <span className="[font-family:'Lato-Regular',Helvetica] text-[#636363] tracking-[0.17px]">&nbsp;</span>
              <span className="[font-family:'Lato-Regular',Helvetica] text-[#347f90] text-[12px] tracking-[0.40px] leading-[16.8px]">
                /orang
              </span>
            </p>
          </div>
        </div>
      </div>
  

      </div> */}
    </div>
  );
};

export default PopularDestinations;
