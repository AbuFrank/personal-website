import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  href?: string;
  className?: string;
  children: ReactNode;
  // onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  className = '',
  // onClick,
  ...props
}) => {
  const baseClasses = "font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl";

  const variantClasses = variant === 'primary'
    ? "bg-indigo-900 text-white hover:from-blue-600 hover:to-indigo-700"
    : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-900";

  const classes = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        // onClick={(e) => onClick?.(e as any)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      // onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};