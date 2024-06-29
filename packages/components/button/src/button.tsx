'use client';

import { AriaButtonOptions, useButton } from '@react-aria/button';
import { useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@zyxui/lib';
import { useTheme } from '@zyxui/theme';

const buttonVariants = cva(
  'relative inline-flex gap-1 items-center justify-center font-medium transition-all border aria-[disabled=true]:opacity-40',
  {
    variants: {
      color: {
        default:
          'bg-primary outline-primary text-primary-foreground hover:bg-primary/80',
        error: 'bg-error outline-error text-error-foreground hover:bg-error/80',
        warning:
          'bg-warning outline-warning text-warning-foreground hover:bg-warning/80',
        success:
          'bg-success outline-success text-success-foreground hover:bg-success/80',
      },
      variant: {
        solid: 'border-transparent',
        bordered: '',
        light: 'border-transparent',
        ghost: 'hover:text-primary-foreground',
        flat: 'border-transparent',
        shadow: 'border-transparent shadow-md',
      },
      size: {
        sm: 'h-8 px-3 text-xs max-h-8',
        md: 'h-9 px-4 text-sm max-h-9',
        lg: 'h-12 px-5 text-lg max-h-12',
      },
      radius: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        circle: 'rounded-full',
        none: 'rounded-none',
      },
      isPressed: {
        true: 'opacity-30',
      },
      iconOnly: {
        true: 'p-0',
        false: '',
      },
      glassEffect: {
        true: 'bg-opacity-10',
      },
    },
    compoundVariants: [
      {
        variant: ['bordered', 'light', 'flat', 'ghost'],
        className: 'bg-transparent',
      },
      {
        variant: ['bordered', 'light', 'flat', 'ghost'],
        color: 'default',
        className: 'text-primary',
      },
      {
        variant: ['bordered', 'light', 'flat', 'ghost'],
        color: 'error',
        className: 'text-error',
      },
      {
        variant: ['bordered', 'light', 'flat', 'ghost'],
        color: 'success',
        className: 'text-success',
      },
      {
        variant: ['bordered', 'light', 'flat', 'ghost'],
        color: 'warning',
        className: 'text-warning',
      },
      {
        variant: 'ghost',
        color: 'default',
        className: 'hover:bg-primary',
      },
      {
        variant: 'ghost',
        color: 'error',
        className: 'hover:bg-error',
      },
      {
        variant: 'ghost',
        color: 'success',
        className: 'hover:bg-success',
      },
      {
        variant: 'ghost',
        color: 'warning',
        className: 'hover:bg-warning',
      },
      {
        variant: ['bordered', 'light', 'flat'],
        color: 'default',
        className: 'hover:bg-primary/30',
      },
      {
        variant: ['bordered', 'light', 'flat'],
        color: 'error',
        className: 'hover:bg-error/30',
      },
      {
        variant: ['bordered', 'light', 'flat'],
        color: 'success',
        className: 'hover:bg-success/30',
      },
      {
        variant: ['bordered', 'light', 'flat'],
        color: 'warning',
        className: 'hover:bg-warning/30',
      },
      {
        variant: ['bordered', 'ghost'],
        color: 'default',
        className: 'border-primary',
      },
      {
        variant: ['bordered', 'ghost'],
        color: 'error',
        className: 'border-error',
      },
      {
        variant: ['bordered', 'ghost'],
        color: 'success',
        className: 'border-success',
      },
      {
        variant: ['bordered', 'ghost'],
        color: 'warning',
        className: 'border-warning',
      },
      {
        variant: 'flat',
        color: 'default',
        className: 'bg-primary/20',
      },
      {
        variant: 'flat',
        color: 'error',
        className: 'bg-error/20',
      },
      {
        variant: 'flat',
        color: 'success',
        className: 'bg-success/20',
      },
      {
        variant: 'flat',
        color: 'warning',
        className: 'bg-warning/20',
      },
      {
        variant: 'shadow',
        color: 'default',
        className: 'shadow-primary/50',
      },
      {
        variant: 'shadow',
        color: 'error',
        className: 'shadow-error/50',
      },
      {
        variant: 'shadow',
        color: 'success',
        className: 'shadow-success/50',
      },
      {
        variant: 'shadow',
        color: 'warning',
        className: 'shadow-warning/50',
      },
      {
        iconOnly: true,
        size: 'sm',
        className: 'w-8 h-8 p-0',
      },
      {
        iconOnly: true,
        size: 'md',
        className: 'w-9 h-9 p-0',
      },
      {
        iconOnly: true,
        size: 'lg',
        className: 'w-12 h-12 p-0',
      },
    ],
    defaultVariants: {
      color: 'default',
      size: 'md',
      radius: 'md',
      variant: 'solid',
      iconOnly: false,
    },
  },
);

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  // onClick?: () => void;
} & AriaButtonOptions<'button'> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      color,
      size,
      radius,
      variant,
      iconOnly,
      className,
      startContent,
      endContent,
      ...props
    },
    ref,
  ) => {
    const forwardRef = useObjectRef(ref);
    const { config } = useTheme();

    const { buttonProps, isPressed } = useButton(props, forwardRef);

    const classNames = cn(
      buttonVariants({
        color,
        size,
        isPressed,
        radius,
        variant,
        iconOnly,
        className,
        glassEffect: config?.glassEffect || false,
      }),
    );

    return (
      <button ref={ref} {...buttonProps} className={classNames}>
        {startContent && !iconOnly ? startContent : null}
        {children}
        {endContent && !iconOnly ? endContent : null}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
