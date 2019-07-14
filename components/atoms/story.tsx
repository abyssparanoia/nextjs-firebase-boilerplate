import { storiesOf } from '@storybook/react'
import React from 'react'
import { Button } from './Button'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'
// import { muiTheme } from 'storybook-addon-material-ui'

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo({ inline: true }))
  // .addDecorator(muiTheme())
  .add('Button', () => (
    // <div>
    //   <Button variant="contained">Default</Button>
    //   <Button variant="contained" color="primary">
    //     Primary
    //   </Button>
    //   <Button variant="contained" color="secondary">
    //     Secondary
    //   </Button>
    //   <Button variant="contained" color="secondary">
    //     Disabled
    //   </Button>
    //   <Button variant="contained" href="#contained-buttons">
    //     Link
    //   </Button>
    // </div>
    <Button variant="contained" href="#contained-buttons">
      Link
    </Button>
  ))
