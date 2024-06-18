// 'use client';

import { TreeState } from '@react-stately/tree';
import { Node, PressEvent } from '@react-types/shared';
import { useRef } from 'react';
import { useAccordionItem } from './use-accordion';
import { FocusRing } from '@react-aria/focus';
import { useHover, useFocus } from '@react-aria/interactions';
import { ChevronDownIcon } from 'lucide-react';

import { mergeProps } from '@react-aria/utils';
import { VariantProps, tv } from 'tailwind-variants';
import { AnimationConfig, BodyTransitionType, iconSizes } from './accordion';

import {
  LazyMotion,
  m,
  domAnimation,
  AnimatePresence,
  MotionConfig,
  Transition,
} from 'framer-motion';

const accordionItemVariants = tv({
  slots: {
    button: 'flex w-full bg-red-300 justify-between items-center',
    body: 'bg-yellow-100 h-full',
    icon: '',
    text: 'text-inherit',
  },
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
    },
    iconPosition: {
      start: {
        text: 'order-2',
        icon: 'order-1',
        button: 'justify-start',
      },
      end: {
        text: 'order-1',
        icon: 'order-2',
      },
    },
  },
  compoundSlots: [
    {
      size: 'sm',
      slots: ['button', 'body'],
      class: ['p-2 text-[14px]'],
    },
    {
      size: 'md',
      slots: ['button', 'body'],
      class: ['p-4 text-[18px]'],
    },
    {
      size: 'lg',
      slots: ['button', 'body'],
      class: ['p-6 text-[24px]'],
    },
  ],
});

type AccordionItemVariants = VariantProps<typeof accordionItemVariants>;

type AccordionItemProps<T> = {
  item: Node<T>;
  state: TreeState<T>;
  multiple?: boolean;
  size?: keyof typeof iconSizes;
  // animationConfig?: AnimationConfig;
  animationConfig?: Transition;
} & AccordionItemVariants;

function AccordionItem<T>({
  item,
  state,
  multiple,
  size,
  iconPosition,
  animationConfig,
}: AccordionItemProps<T>) {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps, regionProps } = useAccordionItem(
    { item, multiple },
    state,
    ref,
  );

  let isExpanded = state.expandedKeys.has(item.key);
  let isDisabled = state.disabledKeys.has(item.key);

  // extract slot from variants
  const { button, body, icon, text } = accordionItemVariants({});

  // button focus props
  const { focusProps } = useFocus({ isDisabled });

  return (
    <LazyMotion features={domAnimation} strict>
      <h3>
        <button
          {...mergeProps(buttonProps, focusProps)}
          className={button({ size, iconPosition })}
          ref={ref}
        >
          <span className={text({ iconPosition })}>{item.rendered}</span>
          <m.span
            className={icon({ iconPosition })}
            style={{ overflow: 'hidden' }}
            initial={{ rotate: isExpanded ? 180 : 0 }}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            exit={{ rotate: 0 }}
          >
            <ChevronDownIcon size={iconSizes[size || 'md']} />
          </m.span>
        </button>
      </h3>

      <AnimatePresence initial={isExpanded} presenceAffectsLayout>
        <MotionConfig transition={animationConfig}>
          <m.div
            style={{ overflow: 'hidden', background: 'transparent' }}
            initial={{ height: 'auto' }}
            animate={{
              height: isExpanded ? 'auto' : 0,
            }}
            exit={{ height: 0 }}
          >
            <div {...regionProps} className={body({ size })}>
              {item.props.children}
            </div>
          </m.div>
        </MotionConfig>
      </AnimatePresence>
    </LazyMotion>
  );
}

export default AccordionItem;
