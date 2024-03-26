import React, { useEffect, useCallback, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { login } from "../api/login";
import { useRouter } from "next/navigation";

interface LoginCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginCard: React.FC<LoginCardProps> = ({ isOpen, onClose }) => {
  const { onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    // e.preventDefault();

    const resp: any = await login({ email, password });
    console.log("THIS IS RESPONSE: ", resp);
    if (resp.success) {
      console.log("Login Sucessful");
      document.cookie = `x-access-token=${resp.data.token}; path=/;`;
      console.log("COOKIE is : ", document.cookie);
      onClose();
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const router = useRouter();
  const handleCloseButton = () => {
    router.push("/");
  };

  const handleSingUp = () => {
    router.push("/auth/signup");
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      onClose={handleCloseButton}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Log in to Continue
        </ModalHeader>
        <ModalBody>
          <Input
            autoFocus
            label="Email"
            
            placeholder="Enter your email"
            variant="bordered"
            value={email}
            onChange={(v) => setEmail(v.target.value)}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
            value={password}
            onChange={(v) => setPassword(v.target.value)}
          />
          <div className="flex py-2 px-1 justify-between">
            <p>Don&apos;t have an account</p>
            <Link color="primary" href="#" size="sm" onPress={handleSingUp}>
              Sign Up
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={handleClose}>
            Close
          </Button>
          <Button color="primary" onPress={handleLogin}>
            Sign in
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Usage:
// <LoginCard isOpen={true} onClose={handleLoginModalClose} />
