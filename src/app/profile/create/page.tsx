import { Button, Input } from "@nextui-org/react";
import React from "react";

const CreateProfile = () => {
    const createProfile =()=>{
        
    }
  return (
    <div>
      CreateProfile
      <form action="/profile" method="post">
        <Input placeholder="Nationality"></Input>
        <Input placeholder="Gender"></Input>
        <Input placeholder="Interests"></Input>
        <Input placeholder="Travel Preferences"></Input>
        <Input placeholder="Contact Number"></Input>
        <Input placeholder="Travel Experiences"></Input>
        <Input placeholder="Languages"></Input>
        <Input placeholder="Place Travelling"></Input>
        <Input placeholder="UserId"></Input>
        <Button type="submit" color="primary">Create</Button>
      </form>
    </div>
  );
};

export default CreateProfile;
