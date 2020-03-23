import React, { useCallback } from 'react'
import { ExNextPageContext } from 'next'
import { fetchTableList } from 'src/modules/table'
import { pushFeedback } from 'src/modules/feedback'
import { useSelector, useDispatch } from 'react-redux'
import { ReduxStore } from 'src/modules/reducer'
import { Button } from '@material-ui/core'

type InitialProps = {}

type Props = {} & InitialProps

const Index = (_: Props) => {
  const tableList = useSelector((state: ReduxStore) => state.table.list)
  const dispatch = useDispatch()

  const handleClick = useCallback(() => dispatch(pushFeedback({ variant: 'info', message: 'hello world!' })), [
    dispatch
  ])

  console.log(tableList)

  return (
    <div>
      <Button onClick={handleClick}>please click here!</Button>
    </div>
  )
}

Index.getInitialProps = async ({ store }: ExNextPageContext): Promise<InitialProps> => {
  // sample dispatch
  await store.dispatch(fetchTableList() as any)

  return {}
}

export default Index
