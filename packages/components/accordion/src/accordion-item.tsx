// 'use client';

import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';
import { useRef } from 'react';
import { useAccordionItem } from './use-accordion';
import { FocusRing } from '@react-aria/focus';

interface AccordionItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
}

function AccordionItem<T>({ item, state }: AccordionItemProps<T>) {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps, regionProps } = useAccordionItem({ item }, state, ref);

  let isExpanded = state.expandedKeys.has(item.key);
  let isDisabled = state.disabledKeys.has(item.key);

  let toggle = () => state.toggleKey(item.key);

  return (
    <div>
      <h3>
        <FocusRing within focusRingClass=''>
          <button onClick={toggle} disabled={isDisabled} {...buttonProps}>
            {item.rendered}
          </button>
        </FocusRing>
      </h3>
      <div {...regionProps}>{item.props.children}</div>
    </div>
  );
}

export default AccordionItem;
