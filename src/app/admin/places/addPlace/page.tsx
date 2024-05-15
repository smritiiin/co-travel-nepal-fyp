"use client";
import { useState } from "react";
import NavAdmin from "../../NavBar";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const AddPlaceForm = () => {
  const [placeData, setPlaceData] = useState({
    PlaceName: "",
    Description: "",
    Longitude: "",
    Latitude: "",
    StateId: "",
    Difficulty: "",
    Accomodation: "",
    VisitTime: "",
    Culture: "",
    Image: null,
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e: any) => {
    if (e.target.name === "Image") {
      const file = e.target.files[0];
      setPlaceData({ ...placeData, [e.target.name]: file });
    } else {
      setPlaceData({ ...placeData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("PlaceName", placeData.PlaceName);
      formData.append("Description", placeData.Description);
      formData.append("Longitude", placeData.Longitude);
      formData.append("Latitude", placeData.Latitude);
      formData.append("StateId", placeData.StateId);
      formData.append("Difficulty", placeData.Difficulty);
      formData.append("Accomodation", placeData.Accomodation);
      formData.append("VisitTime", placeData.VisitTime);
      formData.append("Culture", placeData.Culture);

      if (placeData.Image) {
        formData.append("Image", placeData.Image);
      }

      const response = await fetch("http://localhost:8000/api/place/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Place added successfully!");
        window.setTimeout(() => {
          setMessage("");
        }, 1000);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  return (
    <div className="h-screen flex">
      <NavAdmin />
      <div className="mx-10 mt-5">
        <Card className="px-10 pt-10">
          <CardHeader className="justify-center font-bold">
            Add New Place
          </CardHeader>
          <Divider />
          <CardBody>
            <form onSubmit={handleSubmit} className="gap-y-2">
              <div className="flex gap-x-4 mb-3">
                <label htmlFor="PlaceName">Place Name</label>
                <input
                  type="text"
                  id="PlaceName"
                  className="border rounded-sm"
                  name="PlaceName"
                  value={placeData.PlaceName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-x-4 mb-3">
                <label htmlFor="Description">Description</label>
                <textarea
                  id="Description"
                  name="Description"
                  className="border rounded-sm"
                  value={placeData.Description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-3">
                <div className="flex flex-col gap-x-4 mb-3">
                  <label htmlFor="Longitude">Longitude</label>
                  <input
                    type="text"
                    id="Longitude"
                    name="Longitude"
                    className="border rounded-sm"
                    value={placeData.Longitude}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-x-4 mb-3">
                  <label htmlFor="Latitude">Latitude</label>
                  <input
                    type="text"
                    id="Latitude"
                    name="Latitude"
                    className="border rounded-sm"
                    value={placeData.Latitude}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-x-4 mb-3">
                  <label htmlFor="StateId">State ID</label>
                  <input
                    type="text"
                    id="StateId"
                    name="StateId"
                    className="border rounded-sm"
                    value={placeData.StateId}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-x-4 mb-3">
                  <label htmlFor="Difficulty">Travel Difficulty</label>
                  <input
                    type="text"
                    id="Difficulty"
                    name="Difficulty"
                    className="border rounded-sm"
                    value={placeData.Difficulty}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-x-4 mb-3">
                  <label htmlFor="Accomodation">Travel Accomodation</label>
                  <input
                    type="text"
                    id="Accomodation"
                    name="Accomodation"
                    className="border rounded-sm"
                    value={placeData.Accomodation}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-x-4 mb-3">
                  <label htmlFor="VisitTime">Time of Visit</label>
                  <input
                    type="text"
                    id="VisitTime"
                    name="VisitTime"
                    className="border rounded-sm"
                    value={placeData.VisitTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-x-4 mb-3">
                  <label htmlFor="Culture">Cultural Importance</label>
                  <input
                    type="text"
                    id="Culture"
                    name="Culture"
                    className="border rounded-sm"
                    value={placeData.Culture}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex gap-x-4 mb-3">
                <label htmlFor="Image">Image</label>
                <input
                  type="file"
                  id="Image"
                  name="Image"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </div>
              {message && (
                <span className="text-green-500 text-sm">{message}</span>
              )}

              <div className="flex justify-center">
                <Button type="submit" color="primary" className="mt-3 px-auto">
                  Add Place
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AddPlaceForm;

// import { addPlace } from "@/app/api/addPlaceAPI";
// import { Input, Image, Button } from "@nextui-org/react";
// import { useRef, useState } from "react";
// import NavAdmin from "../../NavBar";

// const AddPlace = () => {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [placeFields, setPlaceFields] = useState({
//     PlaceName: "",
//     StateId: 0,
//     Description: "",
//     Latitude: 0,
//     Longitude: 0,
//     Image: [] as string[],
//   });

//       const handleImageChange = (
//         event: React.ChangeEvent<HTMLInputElement>
//       ) => {
//         const files = event.target.files;
//         if (files) {
//           const fileURLs = Array.from(files).map((file) =>
//             URL.createObjectURL(file)
//           );
//           setPlaceFields({
//             ...placeFields,
//             Image: [...placeFields.Image, ...fileURLs], // Append the new file URLs to the existing array
//           });
//         }
//       };

//   const onAddPlace = async (e: any) => {
//     e.preventDefault();
//     console.log("These are the values", placeFields);

//     const resp: any = await addPlace(placeFields);
//     console.log("THIS IS RESPONSE: ", resp);
//     if (resp.success) {
//       console.log("Place Added Sucessful");
//     } else {
//       alert("Something went wrong...");
//       console.log(resp.error);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <NavAdmin />
//       <div className="p-7">
//         <h1 className="">Add Place</h1>
//         <form>
//           <Input
//             key={"outside"}
//             type="place"
//             label="Place"
//             labelPlacement="outside"
//             onChange={(text) =>
//               setPlaceFields({
//                 ...placeFields,
//                 PlaceName: text.target.value,
//               })
//             }
//           />
//           <Input
//             key={"outside"}
//             type="state"
//             label="State"
//             labelPlacement="outside"
//             onChange={(text) =>
//               setPlaceFields({
//                 ...placeFields,
//                 StateId: Number(text.target.value),
//               })
//             }
//           />
//           <Input
//             key={"outside"}
//             type="description"
//             label="Description"
//             labelPlacement="outside"
//             onChange={(text) =>
//               setPlaceFields({
//                 ...placeFields,
//                 Description: text.target.value,
//               })
//             }
//           />
//           <p>Location</p>
//           <div className="flex gap-x-3">
//             <Input
//               key={"outside"}
//               type="latitude"
//               label="Latitude"
//               labelPlacement="outside"
//               onChange={(text) =>
//                 setPlaceFields({
//                   ...placeFields,
//                   Latitude: Number(text.target.value),
//                 })
//               }
//             />
//             <Input
//               key={"outside"}
//               type="Longitude"
//               label="Longitude"
//               labelPlacement="outside"
//               onChange={(text) =>
//                 setPlaceFields({
//                   ...placeFields,
//                   Longitude: Number(text.target.value),
//                 })
//               }
//             />
//           </div>
//           <Input
//             key={"outside"}
//             type="places"
//             label="Must Visit places"
//             labelPlacement="outside"
//           />
//           <p>Add Images</p>
//           <div className="relative overflow-hidden inline-block">
//             <input
//               type="file"
//               name="myfile"
//               ref={fileInputRef}
//               // className="absolute font-extrabold text-lg left-0 top-0 opacity-0"
//               multiple
//               onChange={handleImageChange}
//             />

//           </div>
//           <Button type="submit" color="primary" onClick={onAddPlace}>
//             Add Place
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPlace;
