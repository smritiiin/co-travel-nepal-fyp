import { useState, useEffect } from "react";
import pic from "../assets/mail.png";
import pic2 from "../assets/refresh icon.png";

const EmailVerifiedComponent = ({ email }) => {
  const [timer, setTimer] = useState(300); // Initial timer value in seconds
  const [resendEnabled, setResendEnabled] = useState(false);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(intervalId);
          setResendEnabled(true);
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [resendEnabled]);

  const handleResendClick = () => {
    if (resendAttempts >= 2) {
      setDisplayErrorMessage(true);
    }

    if (resendAttempts >= 3) {
      // Display an error message or take appropriate action
      console.log(
        "Due to multiple verification attempts, please wait for a couple of hours before trying again."
      );
      return;
    }

    setTimer(300);
    setResendEnabled(false);
    setResendAttempts((prevAttempts) => prevAttempts + 1);
  };

  const isResendDisabled = !resendEnabled || resendAttempts >= 3;
  const message = displayErrorMessage
    ? "Due to multiple verification attempts, please wait for a couple of hours before trying again."
    : "We've sent a link to your registered email. Please check your inbox as soon as possible.";

  const textColor = isResendDisabled ? "#656565" : "#1B8AF1";
  const textColorDes = isResendDisabled ? "black" : "black";
  const imageColor = isResendDisabled ? "gray" : "inherit";
  const iconColor = isResendDisabled ? "gray" : "inherit";
  const buttonColor = isResendDisabled ? "gray" : "#1B8AF1";

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-3xl">
          <img
            src={pic}
            className={`animate-bounce mt-4`}
            alt="Mail Icon"
            style={{ color: imageColor }}
          />
        </div>
        <div className={`text-2xl p-2`} style={{ color: textColor }}>
          {email}
        </div>
        <div className={`text-center`} style={{ color: textColorDes }}>
          {message}
        </div>
        <div className="flex  py-2">
          <img src={pic2} alt="Refresh Icon" style={{ color: iconColor }} />
          <button
            onClick={handleResendClick}
            disabled={isResendDisabled}
            style={{ color: buttonColor }}
          >
            Resend
          </button>
        </div>
        {timer > 0 && (
          <div className="ml-2 text-[#656565] absolute bottom-3">
            {Math.floor(timer / 60)}:{timer % 60}
          </div>
        )}
      </div>
    </>
  );
};

export default EmailVerifiedComponent;