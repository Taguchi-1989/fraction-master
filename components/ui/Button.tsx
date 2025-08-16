'use client';

import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'hint';
  size?: 'small' | 'medium' | 'large';
}

const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  success: 'bg-green-500 hover:bg-green-600 text-white',
  hint: 'bg-yellow-500 hover:bg-yellow-600 text-white',
};

const sizeVariants = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
};

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`
        ${buttonVariants[variant]}
        ${sizeVariants[size]}
        rounded-lg font-bold transition-all duration-200
        hover:scale-105 active:scale-95 transform
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};