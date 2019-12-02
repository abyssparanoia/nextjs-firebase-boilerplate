import React from 'react'
import { ExNextPageContext } from 'next'
import { Credential } from 'src/firebase/interface'
import { authenticate } from 'src/modules/services'
import { fetchTableList } from 'src/modules/table'
import { useSelector } from 'react-redux'
import { ReduxStore } from 'src/modules/reducer'

type InitialProps = {
  credential?: Credential
}

type Props = {} & InitialProps

const Index = (_: Props) => {
  const tableList = useSelector((state: ReduxStore) => state.table.list)
  console.log(tableList)

  return <div>Hello world</div>
}

Index.getInitialProps = async ({ req, res, store }: ExNextPageContext): Promise<InitialProps> => {
  const credential = await authenticate(req, res, false)

  await store.dispatch(fetchTableList() as any)

  return { credential }
}

export default Index
