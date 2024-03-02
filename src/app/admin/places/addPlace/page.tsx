"use client";
import { addPlace } from "@/app/api/addPlaceAPI";
import { Input, Image, Button } from "@nextui-org/react";
import { useRef, useState } from "react";
import NavAdmin from "../../NavBar";

const AddPlace = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showAddButton, setShowAddButton] = useState(true);

  const [placeFields, setPlaceFields] = useState({
    PlaceName: "",
    StateId: 0,
    Description: "",
    Latitude: 0,
    Longitude: 0,
    // image: null,
  });

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

  const onAddPlace = async (e: any) => {
    e.preventDefault();
    console.log("These are the values", placeFields);

    const resp: any = await addPlace(placeFields);
    console.log("THIS IS RESPONSE: ", resp);
    if (resp.success) {
      console.log("Place Added Sucessful");
    } else {
      alert("Something went wrong...");
      console.log(resp.error);
    }
  };

  return (
    <div className="flex h-screen">
      <NavAdmin />
      <div className="p-7">
        <h1 className="">Add Place</h1>
        <div>
          <Input
            key={"outside"}
            type="place"
            label="Place"
            labelPlacement="outside"
            onChange={(text) =>
              setPlaceFields({
                ...placeFields,
                PlaceName: text.target.value,
              })
            }
          />
          <Input
            key={"outside"}
            type="state"
            label="State"
            labelPlacement="outside"
            onChange={(text) =>
              setPlaceFields({
                ...placeFields,
                StateId: Number(text.target.value),
              })
            }
          />
          <Input
            key={"outside"}
            type="description"
            label="Description"
            labelPlacement="outside"
            onChange={(text) =>
              setPlaceFields({
                ...placeFields,
                Description: text.target.value,
              })
            }
          />
          <p>Location</p>
          <div className="flex gap-x-3">
            <Input
              key={"outside"}
              type="latitude"
              label="Latitude"
              labelPlacement="outside"
              onChange={(text) =>
                setPlaceFields({
                  ...placeFields,
                  Latitude: Number(text.target.value),
                })
              }
            />
            <Input
              key={"outside"}
              type="Longitude"
              label="Longitude"
              labelPlacement="outside"
              onChange={(text) =>
                setPlaceFields({
                  ...placeFields,
                  Longitude: Number(text.target.value),
                })
              }
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
              // onChange={handleFileInputChange}
              multiple
              // onChange={(event) => {
              //   const file = event.target.files?.[0] || null;
              //   setPlaceFields({
              //     ...placeFields,
              //     image: file !== null ? file : null,
              //   });
              // }}
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
                  <button
                    className="border h-11 w-20 opacity-20"
                    onClick={handleImageClick}
                  >
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
          <Button type="submit" color="primary" onClick={onAddPlace}>
            Add Place
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPlace;
