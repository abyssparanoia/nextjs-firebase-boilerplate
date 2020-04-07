import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { TextForm } from './TextForm'

describe(`${TextForm.name}`, () => {
  test('Snapshot', () => {
    const component = render(<TextForm value="value" />)
    const tree = component.baseElement
    expect(tree).toMatchSnapshot()
  })

  test('The onChange fires when the Change Event fires.', () => {
    const onChange = jest.fn()
    const VALUE = 'value'
    render(<TextForm value={VALUE} onChange={onChange} />)
    fireEvent.change(screen.getByDisplayValue(VALUE), {
      target: { value: 'chuck' }
    })
    expect(onChange).toHaveBeenCalled()
  })

  test('The placeholder is working properly.', () => {
    const PLACEHOLDER = 'placeholder'
    render(<TextForm value={PLACEHOLDER} />)
    expect(screen.getByDisplayValue(PLACEHOLDER))
  })
})
