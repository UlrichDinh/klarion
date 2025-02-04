"use client";

import { cn } from "@/lib/utils";
import { SettingsIcon, UsersIcon } from "lucide-react";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

const routes = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

export const Navigation = () => {

  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        return (<li key={item.href}>
          <div
            className={cn(
              "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500", "bg-white shadow-sm hover:opacity-100 text-primary"
            )}
          >
            {item.label}
          </div>
        </li>
        );
      })}
    </ul>
  );
};