import React from 'react'
import { ExNextPageContext } from 'next'
import { fetchTableList } from 'src/modules/table'
import { useSelector } from 'react-redux'
import { ReduxStore } from 'src/modules/reducer'

type InitialProps = {}

type Props = {} & InitialProps

const Index = (_: Props) => {
  const tableList = useSelector((state: ReduxStore) => state.table.list)
  console.log(tableList)

  return <div>Hello world</div>
}

Index.getInitialProps = async ({ store }: ExNextPageContext): Promise<InitialProps> => {
  await store.dispatch(fetchTableList() as any)

  return {}
}

export default Index
