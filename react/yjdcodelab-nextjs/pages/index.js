import Link from 'next/link';

export default () => (
  <div>
    Hello, Next.js!

    <div>
      <Link href='/playground'>
        <a>Go Playground</a>
      </Link>
    </div>

    <div>
      <a href='/playground'>Go Playground(without Link)</a>
    </div>
  </div>  
);
