'use client';

import React from 'react';
import Accordion, { AccordionItem } from '@zyxui/accordion/src';

let items = [
  { key: 'one', title: 'one title', children: 'one children' },
  { key: 'two', title: 'two title', children: 'two children' },
  {
    key: 'three',
    title: 'three title',
    children: <input type='text' />,
    hasChildItems: false,
  },
];

const AccordionExample = () => {
  return (
    <Accordion defaultExpandedKeys={['one']}>
      <AccordionItem
        key={'item.key'}
        title={'item.title'}
        hasChildItems={false}
      >
        {'item.children'}
      </AccordionItem>
      <AccordionItem
        key={'item.key 2'}
        title={'item.title 2'}
        hasChildItems={false}
      >
        {'item.children 2'}
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionExample;
