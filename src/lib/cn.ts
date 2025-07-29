import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine clsx + tailwind-merge into one helper
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
