import React from 'react'

const Button = ({type,text,onClick,loading}) => {
  return (
   <button type={type} disabled={loading}  className={`btn btn-primary `} onClick={onClick}>
    {
        loading && <span className="loading loading-spinner"></span>
    }
    {text}</button>
  )
}

export default Button
