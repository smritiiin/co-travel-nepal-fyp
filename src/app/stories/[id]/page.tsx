"use client";
import Loading from "@/app/components/Loading";
import { Avatar, Divider } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { format } from "timeago.js";


const Blog = ({ params }: { params: { id: string } }) => {
  const [blogData, setBlogData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Simulating an API request with a delay
        const response = await axios.get(
          `http://localhost:8000/api/blog/blog/${params.id}`
        );
        setBlogData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlogData();
  }, [params.id]);
  return (
    <div key={params.id}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div key={blogData.id}>
            <Image
              src={`http://localhost:8000/${blogData.imageUrl}`}
              alt=""
              height={300}
              width={400}
            ></Image>
            <div>
              <h2>{blogData.title}</h2>
              <p>{blogData.content}</p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between p-4">
            <div className="flex justify-center items-top gap-3">
              <Avatar size="lg"></Avatar>
              <h3>
                {blogData.author.fname} {blogData.author.lname}
              </h3>
            </div>
            <p className="font-semibold text-gray-600">{format(blogData.publishedDate)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
