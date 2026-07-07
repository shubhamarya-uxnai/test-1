import React from 'react';
import './Button.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export type ButtonSize = 'default' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'default',
  leadingIcon,
  trailingIcon,
  children,
  className,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled} type={type} {...props}>
      {leadingIcon && <span className="btn-icon">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className="btn-icon">{trailingIcon}</span>}
    </button>
  );
}
