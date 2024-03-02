import { Button, Input } from '@nextui-org/react'
import React from 'react'

const AddBlog = () => {
  return (
    <div className="flex">
      <div>
        <Input type="file"></Input>
      </div>
      <div>
        <h2>Blog Title</h2>
        <Input placeholder="Enter Blog title"></Input>
        <h2>Content</h2>
        <Input type="paragraph" placeholder="Blog "></Input>
        <h2>Author</h2>
        <Input placeholder="Author"></Input>
        <h2>Publish Date</h2>
        <Input type='date'></Input>

        <Button type='submit' color='primary'>Create Blog</Button>
      </div>
    </div>
  );
}

export default AddBlog