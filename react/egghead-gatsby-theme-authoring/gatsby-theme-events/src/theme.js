export const theme = {
  space: [0, 4, 8, 16, 32],
  fonts: {
    body: '-apple-system, BlinkMacSystem, Segoe UI, Roboto, sans-serif'
  },
  fontSizes: [16, 18, 20, 22, 27, 36],
  lineHeights: {
    body: 1.45,
    heading: 1.1
  },
  colors: {
    gray: ['#efefef', '#ddd', '#333', '#111'],
    background: '#fff',
    primary: 'rebeccapurple'
  },
  sizes: {
    default: '90vw',
    max: '540px'
  },
  styles: {
    Layout: {
      color: 'gray.2',
      fontFamily: 'body',
      fontSize: 1,
      lineHeight: 'body'
    },
    Header: {
      backgroundColor: 'primary',
      color: 'background',
      fontWeight: 'bold',
      margin: '0 auto',
      maxWidth: 'max',
      padding: 3,
      width: 'default'
    },
    Main: {
      margin: '0 auto',
      maxWidth: 'max',
      width: 'default'
    },
    Container: {
      padding: 3
    },
    h1: {
      color: 'gray.3',
      fontSize: 5,
      fontWeight: 'bold',
      lineHeight: 'heading',
      margin: 0,
      marginTop: 3
    },
    ul: {
      borderTop: '1px solid',
      borderColor: 'gray.0',
      listStyle: 'none',
      padding: 0
    },
    li: {
      borderBottom: '1px solid',
      borderColor: 'gray.0',
      padding: 2,
      '&:focus-within, &:hover': {
        backgroundColor: 'gray.0'
      }
    }
  }
}