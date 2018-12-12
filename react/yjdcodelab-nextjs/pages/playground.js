import Link from 'next/link';

export default () => (
  <div>
    <h1>Playground</h1>

    <p>Welcome to playground.</p>

    <div>
      <Link href='/'><a>Home</a></Link>
    </div>
    <div>
      <a href='/'>Home (without Link)</a>
    </div>
  </div>
);
