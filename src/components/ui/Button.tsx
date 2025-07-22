import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

const base =
  'inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors';

export default function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const variantClasses: Record<string, string> = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary',
    outline:
      'border border-gray-300 text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400 bg-white',
  };

  return (
    <button
      className={`${base} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
