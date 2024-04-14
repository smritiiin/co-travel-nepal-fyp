"use client";
import { addStories } from "@/app/api/addStories";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { useToken } from "@/utils/token";

const AddBlog = () => {
  const {getUsernameAndRoleFromToken} = useToken();

  const [blogFields, setBlogFields] = useState({
    title: "",
    content: "",
    authorId: getUsernameAndRoleFromToken("x-access-token").id,
    imageUrl: null,
  });
  // const onAddBlog = async (e: any) => {
  //   e.preventDefault();
  //   console.log("The values are: ", blogFields);

  //   const resp: any = await addStories(blogFields);
  //   console.log("THIS IS RESPONSE: ", resp);
  //   if (resp.success) {
  //     console.log("Blog Added Sucessful");
  //   } else {
  //     alert("Something went wrong...");
  //     console.log(resp.error);
  //   }
  // };

  const handleInputChange = (e: any) => {
    if (e.target.name === "imageUrl") {
      const file = e.target.files[0];
      setBlogFields({ ...blogFields, [e.target.name]: file });
    } else {
      setBlogFields({ ...blogFields, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", blogFields.title);
      formData.append("content", blogFields.content);
      formData.append("authorId", String(blogFields.authorId));

      if (blogFields.imageUrl) {
        formData.append("imageUrl", blogFields.imageUrl);
      }

      const response = await fetch("http://localhost:8000/api/blog/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert(JSON.stringify(await response.json()));
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <Card className=" max-w-lg mx-auto my-10">
      <form onSubmit={handleSubmit}>
        <CardHeader className="justify-center font-bold">
          Create a Blog
        </CardHeader>
        <Divider />
        <CardBody className="gap-5">
          {/* <h2>Blog Title</h2> */}

          <input
            id="title"
            type="text"
            name="title"
            value={blogFields.title}
            placeholder="Blog title"
            onChange={handleInputChange}
          ></input>
          {/* <h2>Content</h2> */}
          <textarea
            id="content"
            rows={6}
            name="content"
            value={blogFields.content}
            // label="Content"
            placeholder="Enter your Content"
            onChange={handleInputChange}
          ></textarea>        
          <div>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              accept="image/*"
              onChange={handleInputChange}
            ></input>
          </div>

          <Button type="submit" color="primary">
            Create Blog
          </Button>
        </CardBody>
      </form>
    </Card>
  );
};

export default AddBlog;
