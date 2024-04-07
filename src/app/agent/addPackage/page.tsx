import { Input, Textarea } from "@nextui-org/react";

const AddPackage = () => {
  
  return (
    <div>
      Add Package
      <form  className="flex flex-col gap-2">
        <Input type="text" label="Package Name"></Input>
        <Input type="number" label="Price"></Input>
        <Input type="text" label="Duration"></Input>
        <Input type="number" label="No of Person"></Input>
        <Textarea
          label="Description"
          placeholder="Enter your description"
        ></Textarea>
        <Textarea
          label="Accommodation"
          placeholder="Accommodation details"
        ></Textarea>
        <Textarea
          label="Activities"
          placeholder="Popular Activities"
        ></Textarea>
        <Textarea label="Itinerary" placeholder=" Day-1: ..."></Textarea>
        <Input type="file"></Input>
      </form>
    </div>
  );
};
export default AddPackage;
