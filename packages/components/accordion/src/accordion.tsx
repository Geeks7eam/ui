'use client';

import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import { cn } from '@zyxui/lib';
import {
  AccordionDefaultValue,
  CollapseItemProps,
  IconPosition,
} from './types';
import AccordionItem from './accordion-item';
import { useAccordion } from './use-accordion';

const accordionVariants = cva('', {
  variants: {
    variant: {
      default: '[&_[data-part=item]]:border-b',
      bordered:
        '[&_[data-part=item]]:border-x [&_[data-part=item]]:border-t last:[&_[data-part=item]]:border-b',
    },
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type AccordionProps = {
  items: CollapseItemProps[];
  defaultValues?: AccordionDefaultValue;
  multiple?: boolean;
  iconPosition?: IconPosition;
} & React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof accordionVariants>;

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      defaultValues = [],
      multiple = false,
      size,
      variant,
      iconPosition = 'end',
      className,
      ...props
    },
    ref,
  ) => {
    const classNames = cn(accordionVariants({ size, variant, className }));

    const { rootProps, ...restAccordionProps } = useAccordion({
      id: 'id',
      multiple,
      value: defaultValues,
    });

    return (
      <div ref={ref} className={classNames} {...props} {...rootProps}>
        {items?.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            iconPosition={iconPosition}
            defaultValues={defaultValues}
            multiple={multiple}
            {...restAccordionProps}
          />
        ))}
      </div>
    );
  },
);

Accordion.displayName = 'Accordion';
export default Accordion;
