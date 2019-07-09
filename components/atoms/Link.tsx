import React from 'react'
import { default as OriginalLink, LinkProps } from 'next/link'

interface Props extends LinkProps {}

export const Link = ({ children, ...props }: Props) => (
  <OriginalLink {...props}>
    <a style={{ color: '#d3d3d3' }}>{children}</a>
  </OriginalLink>
)
