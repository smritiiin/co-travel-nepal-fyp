import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@nextui-org/react";

const TopContributors = () => {
  const [contributors, setContributors] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/blog/top-contributors")
      .then((response) => {
        setContributors(response.data);
        console.log("Contributors:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h3 className=" font-semibold p-5 text-gray-600">Top Contributors</h3>
      {contributors.map((contributor) => (
        <div key={contributor.authorId} className="my-4">
          <div className="flex items-center">
            <div className="mr-2">
              <Avatar />
            </div>
            <div>
              <h4 className="font-bold">{contributor.authorName}</h4>
              {/* <p>Total Blogs: {contributor.totalBlogs}</p> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopContributors;
