'use client';

import React from 'react';
import AccordionHeader from './accordion-header';
import {
  AccordionDefaultValue,
  CollapseItemProps,
  IconPosition,
} from './types';
import { AccordionProps } from './accordion';
import AccordionContent from './accordion-content';
import { UseAccordionReturn } from './use-accordion';

export type AccordionItemProps = {
  iconPosition?: IconPosition;
  item: CollapseItemProps;
  multiple?: boolean;
  defaultValues?: AccordionDefaultValue;
} & React.HTMLAttributes<HTMLDivElement> &
  Pick<AccordionProps, 'size' | 'variant'> &
  Omit<UseAccordionReturn, 'rootProps'>;

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      children,
      iconPosition,
      size,
      variant,
      multiple,
      defaultValues = [],
      item,
      ...props
    },
    ref,
  ) => {
    const {
      getItemTriggerProps,
      getItemContentProps,
      value,
      focusedValue,
      getItemIndicatorProps,
      getItemProps,
      getItemState,
      setValue,
      ...restProps
    } = props;

    return (
      <div
        ref={ref}
        {...restProps}
        {...getItemProps({ value: String(item.id) })}
      >
        <AccordionHeader
          iconPosition={iconPosition}
          size={size}
          variant={variant}
          id={item.id}
          open={value.includes(String(item.id))}
          triggerProps={getItemTriggerProps({
            value: String(item.id),
          })}
        >
          {item.title}
        </AccordionHeader>
        <AccordionContent
          size={size}
          variant={variant}
          open={value.includes(String(item.id))}
          contentProps={getItemContentProps({ value: String(item.id) })}
        >
          {item.content}
        </AccordionContent>
      </div>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
