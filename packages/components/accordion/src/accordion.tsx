// 'use client';

import { useTreeState } from '@react-stately/tree';

import { useAccordion } from './use-accordion';
import React, { RefObject, useImperativeHandle, useMemo, useRef } from 'react';
import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import AccordionItem from './accordion-item';
import { AriaAccordionProps } from '@react-types/accordion';
import { tv } from 'tailwind-variants';
import { VariantProps } from 'class-variance-authority';
import { Item } from '@react-stately/collections';
import { CollectionChildren } from '@react-types/shared';
// export { Item } from '@react-stately/collections';

const accordionVariants = tv({
  base: 'w-full bg-red-200',
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

export type Item<T> = {
  key: string;
  title: string;
  children: React.ReactNode;
  hasChildItems?: boolean;
};

export type AccordionProps<T extends object> = AriaAccordionProps<T> &
  AccordionVariants & {
    ref?: RefObject<HTMLDivElement>;
    twClassName?: string;
  };

function Accordion<T extends object>(props: AccordionProps<T>) {
  const { variant, twClassName, ...__restProps } = props;

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
        <AccordionItem key={item.key} item={item} state={state} />
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
