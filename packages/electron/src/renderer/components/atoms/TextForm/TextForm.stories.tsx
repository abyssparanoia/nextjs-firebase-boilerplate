import React from 'react'
import { storiesOf } from '@storybook/react'
import { TextForm } from './TextForm'

storiesOf('atoms/TextForm', module).add('Required', () => <TextForm required label="Required" defaultValue="Value" />)

storiesOf('atoms/TextForm', module).add('Disabled', () => <TextForm disabled label="Disabled" defaultValue="Value" />)

storiesOf('atoms/TextForm', module).add('Password', () => (
  <TextForm label="Password" type="password" autoComplete="current-password" />
))

storiesOf('atoms/TextForm', module).add('number', () => <TextForm label="Number" type="number" defaultValue={3} />)

storiesOf('atoms/TextForm', module).add('Search Field', () => <TextForm label="Search field" type="search" />)

storiesOf('atoms/TextForm', module).add('Read Only', () => (
  <TextForm readOnly label="label" defaultValue="Value" helperText="Read Only" />
))

storiesOf('atoms/TextForm', module).add('Error', () => <TextForm error label="Error" defaultValue="Value" />)

storiesOf('atoms/TextForm', module).add('With Icon', () => (
  <TextForm required label="Required" defaultValue="Value" iconVariant="sample" />
))
