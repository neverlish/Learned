import { NextFunctionComponent, NextContext } from 'next'
import Link from 'next/link';

import Layout from '../components/Layout'
import List from '../components/List'
import IDataObject from '../interfaces'
import { findAll } from '../utils/sample-api';

type Props = {
  items: IDataObject[],
  pathname: string,
}

const ListFunction: NextFunctionComponent<Props> = ({ items, pathname }) => (
  <Layout title="List Example (as Functional Component) | Next.js + TypeScript Example">
    <h1>List Example (as Function Component)</h1>
    <p>You are currently on: {pathname}</p>
    <List items={items} />
    <p><Link href='/'><a>Go home</a></Link></p>
  </Layout>
)

ListFunction.getInitialProps = async ({ pathname }: NextContext) => {
  // Example for including initial props in a Next.js function compnent page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: IDataObject[] = await findAll()

  return { items, pathname }
}

export default ListFunction
