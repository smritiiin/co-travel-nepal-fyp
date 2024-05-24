"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Skeleton,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useToken } from "@/utils/token";
import Link from "next/link";
import { NAV_LINKS } from "@/utils";

export default function UserProfile() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isTokenAvailableAndNotExpired, getUsernameAndRoleFromToken } =
    useToken();

  const handleLogout = () => {
    const token = Cookies.get("x-access-token");
    // Clear token from cookie
    Cookies.remove("x-access-token");

    // Check if token is successfully cleared
    if (!Cookies.get("x-access-token")) {
      console.log("Logout successful");
      return router.push("/auth/login");
    } else {
      console.log("Logout failed");
    }
  };

  const login = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <Dropdown
        showArrow
        radius="sm"
        classNames={{
          base: "before:bg-default-200", // change arrow background
          content: "p-0 border-small border-divider bg-background",
        }}
      >
        <DropdownTrigger>
          {isTokenAvailableAndNotExpired("x-access-token") ? (
            <Avatar
              isBordered
              // as="button"
              className="transition-transform h-9 w-9"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          ) : (
            <Avatar isBordered size="sm"></Avatar>
          )}
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Custom item styles"
          disabledKeys={["logout-disabled"]}
          className="p-3"
          itemClasses={{
            base: [
              "rounded-md",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          }}
        >
          <DropdownSection aria-label="Profile & Actions" showDivider>
            <DropdownItem className="h-14 gap-2">
              {isTokenAvailableAndNotExpired("x-access-token") ? (
                <User
                  name={getUsernameAndRoleFromToken("x-access-token").username}
                  description={
                    getUsernameAndRoleFromToken("x-access-token").role
                  }
                  classNames={{
                    name: "text-default-600",
                    description: "text-default-500",
                  }}
                  avatarProps={{
                    size: "sm",
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                  }}
                  onClick={() => router.push("/profile")}
                />
              ) : (
                <div className="max-w-[300px] w-full flex items-center gap-3">
                  <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                  </div>
                </div>
              )}
            </DropdownItem>
            <DropdownItem className="sm:block md:hidden" key="dashboard">
                {NAV_LINKS.map((link) => (
                  <Link
                    href={link.href}
                    key={link.key}
                    className="flex gap-2 transition-all cursor-pointer hover:text-red-600"
                  >
                    
                    {link.label}
                  </Link>
                ))}
            </DropdownItem>
            
          </DropdownSection>

          <DropdownSection aria-label="Help & Feedback">
            {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
            {isTokenAvailableAndNotExpired("x-access-token") ? (
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                onPress={onOpen}
              >
                Log Out
              </DropdownItem>
            ) : (
              <DropdownItem
                key="login"
                className="text-danger"
                color="primary"
                onPress={login}
              >
                Log In
              </DropdownItem>
            )}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log Out</ModalHeader>
              <ModalBody>
                <p className="font-semibold">You are about to be logged out.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleLogout}>
                  Log out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
