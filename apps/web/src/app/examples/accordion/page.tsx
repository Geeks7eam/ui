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
    <Accordion defaultExpandedKeys={['one']} items={items}>
      {(item) => (
        <AccordionItem
          key={item.key}
          title={item.title}
          hasChildItems={item.hasChildItems}
        >
          {item.children}
        </AccordionItem>
      )}
    </Accordion>
  );
};

export default AccordionExample;
