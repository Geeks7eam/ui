import { TreeState } from '@react-stately/tree';
import { ButtonHTMLAttributes, RefObject, useCallback, useId } from 'react';
import { useSelectableItem, useSelectableList } from '@react-aria/selection';

import type { AriaAccordionProps } from '@react-types/accordion';
import type { DOMAttributes, Node } from '@react-types/shared';
import { useButton } from '@react-aria/button';
import { mergeProps } from '@react-aria/utils';

export interface AccordionAria {
  /** Props for the accordion container element. */
  accordionProps: DOMAttributes;
}

export interface AccordionItemAriaProps<T> {
  item: Node<T>;
}

export interface AccordionItemAria {
  /** Props for the accordion item button. */
  buttonProps: ButtonHTMLAttributes<HTMLElement>;
  /** Props for the accordion item content element. */
  regionProps: DOMAttributes;
  toggle: () => void;
}

export function useAccordionItem<T>(
  props: AccordionItemAriaProps<T>,
  state: TreeState<T>,
  ref: RefObject<HTMLButtonElement>,
): AccordionItemAria {
  let { item } = props;
  let buttonId = useId();
  let regionId = useId();
  let isDisabled = state.disabledKeys.has(item.key);

  // useSelectableItem is a hook that provides the behavior of selectable items in a listbox or tree.
  let { itemProps } = useSelectableItem({
    selectionManager: state.selectionManager,
    key: item.key,
    ref,
  });

  let { buttonProps } = useButton(
    mergeProps(itemProps as any, {
      id: buttonId,
      elementType: 'button',
      isDisabled,
      onPress: () => state.toggleKey(item.key),
    }),
    ref,
  );

  let isExpanded = state.expandedKeys.has(item.key);

  // toggle the expanded state of the item when the button is clicked
  const toggle = useCallback(() => {
    state.toggleKey(item.key);
  }, []);

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
    toggle,
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
    ref,
  });

  return {
    accordionProps: {
      ...listProps,
      tabIndex: undefined,
    },
  };
}
