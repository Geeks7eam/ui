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
    <Accordion defaultExpandedKeys={['one']} variant='bordered'>
      <AccordionItem key={'one'} title={'Test Text'} hasChildItems={false}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
        adipisci ut cumque assumenda blanditiis corrupti illo iste quis delectus
        nihil suscipit et hic culpa, minus, dolore alias explicabo officia rem.
      </AccordionItem>
      <AccordionItem key={'input'} title={'Fill Name'} hasChildItems={false}>
        <input type='text' />
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionExample;
