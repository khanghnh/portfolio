import React from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant = 
  | 'primary'          // Solid red-orange -> fills white on hover
  | 'secondary'        // Dark surface -> fills red-orange on hover
  | 'swipe'            // Large hero swipe button
  | 'outline'          // Crisp 1px border -> fills red-orange
  | 'text-underline'   // Un-boxed text with dynamic expanding underline
  | 'text-bracket'     // Un-boxed text with expanding [ brackets ]
  | 'text-arrow'       // Un-boxed text with animated sliding arrow →
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string; // If provided, renders as React Router Link
  href?: string; // If provided, renders as an <a> tag
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon,
  iconPosition = 'right',
  className = '',
  children,
  onClick,
  ...props
}) => {
  // Size classes for boxed variants
  const isTextVariant = variant.startsWith('text-');

  const sizeClasses: Record<ButtonSize, string> = {
    sm: isTextVariant ? 'text-xs gap-1.5' : 'px-3.5 py-1.5 text-xs gap-1.5 rounded-md font-mono font-bold',
    md: isTextVariant ? 'text-xs sm:text-sm gap-2' : 'px-5 py-2.5 text-xs sm:text-sm gap-2 rounded-lg font-mono font-bold',
    lg: isTextVariant ? 'text-sm sm:text-base gap-2.5' : 'px-7 py-3.5 text-sm sm:text-base gap-3 rounded-xl font-mono font-black',
  };

  // Base styling for boxed vs unboxed
  let baseClasses = '';
  let variantClasses = '';

  if (isTextVariant) {
    baseClasses = 'inline-flex items-center select-none uppercase tracking-tight cursor-pointer font-mono font-bold transition-all';
    
    if (variant === 'text-underline') {
      variantClasses = 'btn-text-underline';
    } else if (variant === 'text-bracket') {
      variantClasses = 'btn-text-bracket';
    } else if (variant === 'text-arrow') {
      variantClasses = 'btn-text-arrow';
    }
  } else {
    // Boxed Buttons with left-to-right fill physics and active click scale
    baseClasses = `
      inline-flex items-center justify-center
      select-none uppercase tracking-tight
      cursor-pointer
      btn-swipe-fill
      border
      active:scale-[0.97]
      focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2
    `;

    const boxedMap: Record<string, string> = {
      primary: 'btn-swipe-primary border-brand-primary',
      secondary: 'btn-swipe-secondary border-border-default',
      swipe: 'btn-swipe-hero border-border-default',
      outline: 'bg-transparent text-txt-primary border-border-default hover:border-brand-primary btn-swipe-fill before:bg-brand-primary hover:text-white',
      ghost: 'bg-transparent text-txt-secondary hover:text-txt-primary hover:bg-bg-surface border-transparent hover:border-border-subtle active:bg-bg-muted',
    };

    variantClasses = boxedMap[variant] || boxedMap.primary;
  }

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses} ${className}`.replace(/\s+/g, ' ').trim();

  // Content formatting for brackets & arrows
  let content = (
    <>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  if (variant === 'text-bracket') {
    content = (
      <>
        <span className="bracket-left font-mono font-bold">[</span>
        <span>{children}</span>
        <span className="bracket-right font-mono font-bold">]</span>
      </>
    );
  } else if (variant === 'text-arrow') {
    content = (
      <>
        <span>{children}</span>
        <span className="arrow-icon font-mono font-bold">→</span>
      </>
    );
  }

  if (to) {
    return (
      <Link to={to} className={combinedClasses} onClick={onClick as any} {...(props as any)}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick as any} {...(props as any)}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} onClick={onClick} {...props}>
      {content}
    </button>
  );
};
