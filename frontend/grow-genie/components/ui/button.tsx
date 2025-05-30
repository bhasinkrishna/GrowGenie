import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition ${className}`}
      {...props}
    />
  );
}
