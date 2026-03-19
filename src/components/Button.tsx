import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';
import { Slot } from '@radix-ui/react-slot';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-primary hover:bg-accent/90',
  secondary: 'bg-secondary text-text hover:bg-secondary/80 border border-accent/20',
  outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-primary',
  ghost: 'text-text hover:text-accent hover:bg-secondary/50',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  asChild,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed';
  
  const classes = twMerge(
    clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)
  );

  const content = (
    <>
      {children}
    </>
  );

  if (href) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  if (asChild) {
    return (
      <Slot className={classes}>
        {children}
      </Slot>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
