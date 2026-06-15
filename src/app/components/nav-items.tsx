import Link from "next/link";
import { ElementType } from "react";

interface NavItemsProps {
  href: string;
  Icon: ElementType;
  label: string;
  isActive: boolean;
  shortcut?: string;
}

export const NavItem = ({
  href,
  Icon,
  label,
  isActive,
  shortcut,
}: NavItemsProps) => {
  return (
    <Link href={href} className="block w-full">
      <div
        className={`group flex h-9 px-2 gap-2.5 items-center rounded-lg cursor-pointer transition-all duration-150 mb-[2px] border ${
          isActive
            ? "bg-blue-50/80 text-blue-700 border-blue-100/60 font-semibold shadow-sm shadow-blue-500/5"
            : "text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-200/40"
        }`}
      >
        <div className="w-6 h-6 flex items-center justify-center shrink-0">
          <Icon
            className={`w-4 h-4 transition-colors duration-150 ${
              isActive
                ? "text-blue-600"
                : "text-slate-400 group-hover:text-slate-700"
            }`}
          />
        </div>
        <span
          className={`text-sm transition-colors duration-150 ${
            isActive
              ? "text-blue-700"
              : "text-slate-600 group-hover:text-slate-900"
          }`}
        >
          {label}
        </span>
        {shortcut && (
          <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-200/50 border border-slate-300/10 px-1.5 py-0.5 rounded ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            {shortcut}
          </span>
        )}
      </div>
    </Link>
  );
};
