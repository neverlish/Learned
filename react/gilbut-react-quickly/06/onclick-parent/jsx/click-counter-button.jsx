const ClickCounterButton = (props) => {
  return <button
    onClick={props.handler}
    className='btn btn-danger'
  >
    Don't touch me with your dirty hands!
  </button>
}
