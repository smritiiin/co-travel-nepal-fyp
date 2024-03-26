"use client";
import { addStories } from "@/app/api/addStories";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const AddBlog = () => {
  const [blogFields, setBlogFields] = useState({
    title: "",
    content: "",
    authorId: 0,
  });
  const onAddBlog = async (e: any) => {
    e.preventDefault();
    console.log("The values are: ", blogFields);

    const resp: any = await addStories(blogFields);
    console.log("THIS IS RESPONSE: ", resp);
    if (resp.success) {
      console.log("Blog Added Sucessful");
    } else {
      alert("Something went wrong...");
      console.log(resp.error);
    }
  };

  return (
    <div className="flex">
      <div>
        <Input type="file"></Input>
      </div>
      <div>
        <h2>Blog Title</h2>
        <Input
          placeholder="Enter Blog title"
          onChange={(text) =>
            setBlogFields({
              ...blogFields,
              title: text.target.value,
            })
          }
        ></Input>
        <h2>Content</h2>
        <Input
          type="paragraph"
          placeholder="Blog"
          onChange={(text) =>
            setBlogFields({
              ...blogFields,
              content: text.target.value,
            })
          }
        ></Input>
        <h2>Author</h2>
        <Input
          placeholder="Author"
          onChange={(text) =>
            setBlogFields({
              ...blogFields,
              authorId: Number(text.target.value),
            })
          }
        ></Input>

        <Button type="submit" color="primary" onClick={onAddBlog}>
          Create Blog
        </Button>
      </div>
    </div>
  );
};

export default AddBlog;
