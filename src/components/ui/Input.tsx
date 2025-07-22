import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const base =
  'w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50';

export default function Input({ className = '', ...props }: InputProps) {
  return <input className={`${base} ${className}`} {...props} />;
}
