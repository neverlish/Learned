import Document, { Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <title>Example Site</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
        </Head>
        <body>
          <div className='container'>
            <Main />
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}

export default CustomDocument;
