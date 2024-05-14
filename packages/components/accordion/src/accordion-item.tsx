// 'use client';

import { TreeState } from '@react-stately/tree';
import { Node, PressEvent } from '@react-types/shared';
import { useRef } from 'react';
import { useAccordionItem } from './use-accordion';
import { FocusRing } from '@react-aria/focus';
import { useHover, useFocus } from '@react-aria/interactions';

import { mergeProps } from '@react-aria/utils';

interface AccordionItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
}

function AccordionItem<T>({ item, state }: AccordionItemProps<T>) {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps, regionProps, toggle } = useAccordionItem(
    { item },
    state,
    ref,
  );

  let isExpanded = state.expandedKeys.has(item.key);
  let isDisabled = state.disabledKeys.has(item.key);

  // button focus props
  const { focusProps } = useFocus({ isDisabled });

  return (
    <div>
      <h3>
        <button {...mergeProps(buttonProps, focusProps)} ref={ref}>
          {item.rendered}
        </button>
      </h3>

      {isExpanded && <div {...regionProps}>{item.props.children}</div>}
    </div>
  );
}

export default AccordionItem;
