import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();

  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform h-9 w-9"
          color="primary"
          name="Jason Hughes"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
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
            <User
              name="Junior Garcia"
              description="@jrgarciadev"
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
              onClick={() => router.push("/profile")}
            />
          </DropdownItem>
          <DropdownItem key="dashboard">Dashboard</DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
          <DropdownItem
            key="new_project"
            // endContent={<PlusIcon className="text-large" />}
          >
            New Project
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
          <DropdownItem key="logout">Log Out</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
