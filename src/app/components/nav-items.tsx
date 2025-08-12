import Link from "next/link";
import { ElementType } from "react";

interface NavItemsProps {
  href: string;
  Icon: ElementType;
  label: string;
  isActive: boolean;
}

export const NavItem = ({ href, Icon, label, isActive }: NavItemsProps) => {
  return (
    <Link href={href}>
      <div
        className={`group flex h-8 px-2 gap-2 items-center rounded cursor-pointer hover:text-gray-800 mb-[2px] ${isActive ? " bg-gray-200" : "hover:bg-gray-100"}`}
      >
        <Icon
          className={`w-4 h-4 group-hover:text-gray-800 ${isActive ? "text-gray-800" : "text-gray-500"}`}
        />
        <span
          className={`text-sm group-hover:text-gray-800 font-medium ${isActive ? "text-gray-800" : "text-gray-500"}`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};
