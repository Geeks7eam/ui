import { AriaAccordionProps } from '@react-types/accordion';

export type IconPosition = 'start' | 'end';

export type CollapseItemProps = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export type AccordionDefaultValue = string[];

export type AccordionProps<T extends object> = AriaAccordionProps<T> & {};
