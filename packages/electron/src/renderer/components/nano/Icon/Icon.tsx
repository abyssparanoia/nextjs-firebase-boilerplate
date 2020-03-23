import React from 'react'
import * as BaseSvg from './SvgComponents'

export const Variants = ['sample'] as const

export type Variant = typeof Variants[number]

export interface IconProps {
  variant: Variant
  width?: number
  height?: number
  color?: string
}

const Svg = ({ variant, width, height, color }: IconProps) => {
  switch (variant) {
    case 'sample':
      return <BaseSvg.Sample width={width} height={height} color={color} />
    default:
      throw new Error('Invalid Icon variant.')
  }
}

export const Icon = ({ variant, width, height, color }: IconProps) => {
  return <Svg variant={variant} width={width} height={height} color={color} />
}
