"use client";
import NavBar from "../../NavBar";
import { Input, Image } from "@nextui-org/react";
import { useRef, useState } from "react";

const AddPlace = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showAddButton, setShowAddButton] = useState(true);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: any) => {
    const files = event.target.files;
    const selectedFileURLs: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      selectedFileURLs.push(URL.createObjectURL(file));
    }

    setSelectedImages(selectedFileURLs);
    setShowAddButton(false);
  };

  const handleAddMoreImages = () => {
    setShowAddButton(true);
  };

  return (
    <div className="flex h-screen">
      <NavBar />
      <div className="p-7">
        <h1 className="">Add Place</h1>
        <div>
          <Input
            key={"outside"}
            type="place"
            label="Place"
            labelPlacement="outside"
          />
          <Input
            key={"outside"}
            type="state"
            label="State"
            labelPlacement="outside"
          />
          <Input
            key={"outside"}
            type="description"
            label="Description"
            labelPlacement="outside"
          />{" "}
          <p>Location</p>
          <div className="flex gap-x-3">
            <Input
              key={"outside"}
              type="latitude"
              label="Latitude"
              labelPlacement="outside"
            />
            <Input
              key={"outside"}
              type="Longitude"
              label="Longitude"
              labelPlacement="outside"
            />
          </div>
          <Input
            key={"outside"}
            type="places"
            label="Must Visit places"
            labelPlacement="outside"
          />
          <p>Add Images</p>
          <div className="relative overflow-hidden inline-block">
            <input
              type="file"
              name="myfile"
              ref={fileInputRef}
              className="absolute font-extrabold text-lg left-0 top-0 opacity-0"
              onChange={handleFileInputChange}
              multiple
            />
            {selectedImages.length > 0 ? (
              <>
                <div className="flex flex-wrap">
                  {selectedImages.map((imageURL, index) => (
                    <div key={index} className="mr-2 mb-2">
                      <Image
                        src={imageURL}
                        alt="Selected Image"
                        width={30}
                        height={20}
                      />
                    </div>
                  ))}
                </div>
                {showAddButton && (
                  <button className="border h-11 w-20 opacity-20" onClick={handleImageClick}>
                    <Image
                      src="/images/admin/addImage.svg"
                      alt="Add More Images"
                      width={30}
                      height={20}
                    />
                  </button>
                )}
              </>
            ) : (
              <button className="border" onClick={handleImageClick}>
                <Image
                  src="/images/admin/addImage.svg"
                  alt="Add Image"
                  width={30}
                  height={20}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlace;
