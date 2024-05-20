import { useTreeState } from '@react-stately/tree';
import { useAccordion } from './use-accordion';
import React, { RefObject, useMemo } from 'react';
import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import AccordionItem from './accordion-item';
import { AriaAccordionProps } from '@react-types/accordion';
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';
import { Item } from '@react-stately/collections';

export const iconSizes = {
  sm: 14,
  md: 18,
  lg: 24,
};

export type IconSizeType = keyof typeof iconSizes;

const accordionVariants = tv({
  base: 'w-full bg-black',
  variants: {
    variant: {
      default: 'border-0',
      bordered: 'border border-red-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type AccordionVariants = VariantProps<typeof accordionVariants>;

// export type Item<T> = {
//   key: string;
//   title: string;
//   children: React.ReactNode;
//   hasChildItems?: boolean;
// };

export type AccordionProps<T extends object> = AriaAccordionProps<T> &
  AccordionVariants & {
    ref?: RefObject<HTMLDivElement>;
    twClassName?: string;
    multiple?: boolean;
    size?: IconSizeType;
    iconPosition?: 'start' | 'end';
  };

function Accordion<T extends object>(props: AccordionProps<T>) {
  const {
    variant,
    twClassName,
    multiple,
    size = 'md',
    iconPosition = 'end',
    ...__restProps
  } = props;

  const ref = useObjectRef(__restProps?.ref);

  let state = useTreeState<T>({
    ...__restProps,
    selectionMode: 'single',
  });

  let { accordionProps } = useAccordion(
    {
      ...__restProps,
    },
    state,
    ref,
  );
  const __items = useMemo(
    () =>
      [...state.collection].map((item) => (
        <AccordionItem
          key={item.key}
          item={item}
          state={state}
          multiple={multiple}
          size={size}
          iconPosition={iconPosition}
        />
      )),
    [state.collection],
  );

  return (
    <div
      {...filterDOMProps(__restProps)}
      {...accordionProps}
      ref={ref}
      className={accordionVariants({ variant, className: twClassName })}
    >
      {__items}
    </div>
  );
}

const ClickableListWithRef = <T extends object>(
  props: AccordionProps<T> & { ref?: RefObject<HTMLDivElement> },
) => <Accordion {...props} />;

ClickableListWithRef.displayName = 'Accordion';
export default ClickableListWithRef;
