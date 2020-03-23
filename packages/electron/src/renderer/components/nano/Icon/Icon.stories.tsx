import React from 'react'
import { number, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Variant, Icon, Variants } from './Icon'

storiesOf('nano/Icon', module)
  .add('Playground', () => (
    <Icon variant={select('variant', Variants, 'sample')} width={number('width', 100)} height={number('height', 100)} />
  ))
  .add('All Icons', () => {
    return (
      <>
        {Variants.map((v: Variant) => (
          <span style={{ margin: '5px' }} key={v}>
            <Icon width={40} height={40} variant={v} />
          </span>
        ))}
      </>
    )
  })
