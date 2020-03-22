import { configure, addParameters, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

addParameters({
  backgrounds: [
    { name: 'white', value: 'white', default: true },
    {
      name: 'primary',
      value: 'gray'
    }
  ]
})

addDecorator(withKnobs)

// automatically import all files ending in *.stories.tsx
configure(require.context('../src/renderer/', true, /\.stories\.tsx$/), module)
