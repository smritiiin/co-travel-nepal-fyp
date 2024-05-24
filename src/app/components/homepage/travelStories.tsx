import { Card, CardBody } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

const TravelStories = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/blog")
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const router = useRouter();
  const cardClick = (id: number) => {
    console.log("Card Clicked");
    console.log("BlogId:", id);
    router.push(`/stories/${id}`);
  };

  return (
    <div className="px-2 flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Travel Blogs</h2>
        <Link href="/stories" className="text-blue-700 font-semibold">
          Read More
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.length > 0 && (
          <>
            {/* Top article for this week / most read this month */}
            <Card
              className="p-1"
              isHoverable
              isPressable
              onClick={() => cardClick(blogs[0].id)}
            >
              <CardBody>
                <Image
                  src={`http://localhost:8000/${blogs[0].imageUrl}`}
                  width={550}
                  height={300}
                  alt={blogs[0].title}
                  className="object-cover rounded-md"
                />
                <p className="font-semibold mt-2">{blogs[0].title}</p>
                <p className="text-gray-600 text-sm truncate">
                  {blogs[0].content.slice(0, 100)}...
                </p>
              </CardBody>
            </Card>

            <div className="flex flex-col gap-2">
              {blogs.slice(1, 4).map((blog) => (
                <Card
                  key={blog.id}
                  className="p-2 flex-1"
                  isHoverable
                  isPressable
                  onClick={() => cardClick(blog.id)}
                >
                  <div className="flex h-full">
                    <div className="">
                      <Image
                        src={`http://localhost:8000/${blog.imageUrl}`}
                        width={240}
                        height={100}
                        alt={blog.title}
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-1/2 p-2">
                      <p className="font-semibold truncate">{blog.title}</p>
                      <p className="text-gray-600 text-sm text-ellipsis overflow-hidden h-full w-full">
                        {blog.content.slice(0, 40)}...
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TravelStories;
