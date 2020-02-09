import React from 'react'
import styled from 'styled-components'
import { CircularIndeterminate } from 'src/components/atoms/CircularIndeterminate'

const ProgressWrapper = styled.div`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: #222;
  opacity: 0.7;
  z-index: 100;
`
const ProgressInner = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const Progress = (): JSX.Element => {
  return (
    <ProgressWrapper>
      <ProgressInner>
        <CircularIndeterminate />
      </ProgressInner>
    </ProgressWrapper>
  )
}
