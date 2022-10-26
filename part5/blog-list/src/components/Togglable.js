import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const handleVisible = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div style={hide}>
        <button onClick={handleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={handleVisible}>cancel</button>
      </div>
    </>
  )
}

export default Togglable
