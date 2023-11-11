import Image from "next/image";

const TopPlaces = () => {
  return (
    <div className="px-10 mt-8">
      <div className="flex justify-between items-start ">
        <h1 className="text-left text-3xl font-bold">Top Places</h1>
        <h3 className=" text-blue-700 font-bold">See all</h3>
      </div>
      <ul className="flex gap-x-12 flex-wrap items-center">
        <li>
          <Image src="/images/logo.svg" alt="" width={180} height={180} />
          <p className="font-bold text-center">Place name</p>
        </li>

        <li>
          <Image src="/images/logo.svg" alt="" width={180} height={180} />
          <p className="font-bold text-center">Place name</p>
        </li>
        <li>
          <Image src="/images/logo.svg" alt="" width={180} height={180} />
          <p className="font-bold text-center">Place name</p>
        </li>
        <li>
          <Image src="/images/logo.svg" alt="" width={180} height={180} />
          <p className="font-bold text-center">Place name</p>
        </li>
        <li>
          <Image src="/images/logo.svg" alt="" width={180} height={180} />
          <p className="font-bold text-center">Place name</p>
        </li>
        <li>
          <Image src="/images/logo.svg" alt="" width={180} height={180} />
          <p className="font-bold text-center">Place name</p>
        </li>
        <li>
          <Image src="/images/logo.svg" alt="" width={180} height={180} />
          <p className="font-bold text-center">Place name</p>
        </li>
      </ul>
    </div>
  );
};

export default TopPlaces;
