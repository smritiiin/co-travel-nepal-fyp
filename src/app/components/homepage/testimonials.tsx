import Image from "next/image";
import { useToken } from "@/utils/token";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Card,
  CardBody,
  Avatar,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

const Testimonials = () => {
  const { getUsernameAndRoleFromToken, isTokenAvailableAndNotExpired } =
    useToken();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [userReview, setUserReview] = useState<any[]>([]);

  const [reviews, setReviews] = useState({
    Rating: 0,
    Review: "",
    ReviewerId: getUsernameAndRoleFromToken("x-access-token").id,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviews({ ...reviews, [e.target.name]: e.target.value });
  };

  const addReview = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/review/addReview",
        reviews
      );
      console.log(response.data); // Do something with the response
      // onClose();
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/review")
      .then(function (response) {
        console.log(response.data);
        setIsLoading(false);
        setUserReview(response.data);
      })
      .catch(function (error) {
        console.log(error);
        // setIsLoading(false);
      });
  }, []);

  const handleStarInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rating = parseInt(e.target.value);
    setReviews({ ...reviews, Rating: rating });
  };

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;

    const stars = [];

    // Render filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <span key={i} className="star filled" style={{ color: "#FDCC0D" }}>
          ★
        </span>
      );
    }

    // Render remaining stars
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span
          key={filledStars + i}
          className="star filled"
          style={{ color: "#D9D9D9" }}
        >
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="w-full mb-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p>See what our users have to say about Co-Travel Nepal</p>
        </div>
        {isTokenAvailableAndNotExpired("x-access-token") && (
          <>
            <Button
              className="text-blue-600 bg-inherit hover:font-bold"
              onPress={onOpen}
            >
              Add Review
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                  Add Review
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={addReview}>
                    <Input
                      label="Review"
                      name="Review"
                      value={reviews.Review}
                      onChange={handleInputChange}
                    />
                    <div className="mt-4">
                      <label className="mr-2">Stars:</label>
                      <input
                        type="number"
                        name="Rating"
                        min="0"
                        max="5"
                        value={reviews.Rating}
                        onChange={handleStarInputChange}
                      />
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onClick={addReview}>
                    Submit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </div>
      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <Loading />
        ) : (
          userReview.map((item) => (
            <Card key={item.ReviewerId} className="">
              <CardBody className="py-2 flex flex-col justify-between">
                <div className="flex gap-3 items-center mb-2">
                  <Avatar></Avatar>
                  <div>
                    <h3 className="font-bold">
                      {item.User.fname} {item.User.lname}
                    </h3>
                    <p className="text-[#676767] text-sm font-semibold ">
                      Traveller
                    </p>
                  </div>
                </div>
                <p className="truncate">{item.Review}</p>
                <div className="flex items-center justify-end">
                  {renderStars(item.Rating)}
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Testimonials;
