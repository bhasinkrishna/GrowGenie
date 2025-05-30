// src/components/ui/input.tsx
import React from "react";

export function Input({ type, placeholder, className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`px-3 py-2 rounded-lg border border-gray-300 bg-transparent text-white ${className}`}
      {...props}
    />
  );
}
