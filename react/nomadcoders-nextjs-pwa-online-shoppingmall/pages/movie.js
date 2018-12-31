import Head from 'next/head'
import { withRouter } from 'next/router'

const Movie = props => (
  <div>
    <Head>
      <title>{props.title} | Nomad Store</title>
    </Head>
    <h1>{props.title}</h1>
    <p>lalalala</p>
  </div>
)

Movie.getInitialProps = async () => {
  return { title: 'lalalalal' }
}

export default withRouter(Movie)
