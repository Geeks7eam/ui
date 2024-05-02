// 'use client';

import { useTreeState } from '@react-stately/tree';

import { useAccordion } from './use-accordion';
import React, { RefObject, useImperativeHandle, useRef } from 'react';
import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import AccordionItem from './accordion-item';
import { AriaAccordionProps } from '@react-types/accordion';
export { Item } from '@react-stately/collections';
export type AccordionProps<T extends object> = AriaAccordionProps<T> & {
  ref?: RefObject<HTMLDivElement>;
};

function Accordion<T extends object>(props: AccordionProps<T>) {
  const ref = useObjectRef(props?.ref);

  let state = useTreeState<T>(props);
  let { accordionProps } = useAccordion(
    {
      ...props,
      children: Array.from(props.items || []).map((item: any) => (
        <Item
          key={item.key}
          title={item?.title}
          hasChildItems={item?.hasChildItems}
        >
          {item?.children}
        </Item>
      )),
    },
    state,
    ref,
  );

  return (
    <div {...filterDOMProps(props)} {...accordionProps} ref={ref}>
      {[...state.collection].map((item) => (
        <AccordionItem key={item.key} item={item} state={state} />
      ))}
    </div>
  );
}

const ClickableListWithRef = <T extends object>(
  props: AccordionProps<T> & { ref?: RefObject<HTMLDivElement> },
) => <Accordion {...props} />;

ClickableListWithRef.displayName = 'Accordion';
export default ClickableListWithRef;
