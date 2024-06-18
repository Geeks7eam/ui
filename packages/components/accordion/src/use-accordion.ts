import { TreeState } from '@react-stately/tree';
import { ButtonHTMLAttributes, RefObject, useCallback, useId } from 'react';
import { useSelectableItem, useSelectableList } from '@react-aria/selection';

import type { AriaAccordionProps } from '@react-types/accordion';
import type { DOMAttributes, Key, Node } from '@react-types/shared';
import { useButton } from '@react-aria/button';
import { mergeProps } from '@react-aria/utils';

export interface AccordionAria {
  /** Props for the accordion container element. */
  accordionProps: DOMAttributes;
}

export interface AccordionItemAriaProps<T> {
  item: Node<T>;
  multiple?: boolean;
}

export interface AccordionItemAria {
  /** Props for the accordion item button. */
  buttonProps: ButtonHTMLAttributes<HTMLElement>;
  /** Props for the accordion item content element. */
  regionProps: DOMAttributes;
}

export function useAccordionItem<T>(
  props: AccordionItemAriaProps<T>,
  state: TreeState<T>,
  ref: RefObject<HTMLButtonElement>,
): AccordionItemAria {
  let { item, multiple } = props;
  let buttonId = useId();
  let regionId = useId();
  let isDisabled = state.disabledKeys.has(item.key);

  // useSelectableItem is a hook that provides the behavior of selectable items in a listbox or tree.
  let { itemProps } = useSelectableItem({
    selectionManager: state.selectionManager,
    key: item.key,
    ref,
  });

  // toggle the expanded state of the item when the button is clicked
  const toggle = useCallback(
    (itemKey: Key) => {
      if (multiple) {
        // if multiple is true, toggle the expanded state of the item
        state.toggleKey(item.key);
      } else {
        // if multiple is false, set the expanded state of the item to true (thus other items will be collapsed)
        state.setExpandedKeys(new Set([itemKey]));
      }
    },
    [multiple, state],
  );

  let { buttonProps } = useButton(
    mergeProps(itemProps as any, {
      id: buttonId,
      elementType: 'button',
      isDisabled,
      onPress: () => toggle(item.key),
    }),
    ref,
  );

  let isExpanded = state.expandedKeys.has(item.key);

  return {
    buttonProps: {
      ...buttonProps,
      'aria-expanded': isExpanded,
      'aria-controls': isExpanded ? regionId : undefined,
    },
    regionProps: {
      id: regionId,
      role: 'region',
      'aria-labelledby': buttonId,
    },
  };
}

export function useAccordion<T>(
  props: AriaAccordionProps<T>,
  state: TreeState<T>,
  ref: RefObject<HTMLDivElement>,
): AccordionAria {
  let { listProps } = useSelectableList({
    ...props,
    ...state,
    allowsTabNavigation: true,
    disallowTypeAhead: true,
    selectionManager: state.selectionManager,
    ref,
  });

  return {
    accordionProps: {
      ...listProps,
      tabIndex: undefined,
    },
  };
}
