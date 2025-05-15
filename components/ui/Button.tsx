import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ className, children, onClick, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx("button", className)}
    >
      {children}
    </button>
  );
};

export default Button;
