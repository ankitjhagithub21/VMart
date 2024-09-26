import React from 'react'

const Button = ({type,text,onClick,loading}) => {
  return (
   <button type={type}  className={`btn btn-primary ${loading && 'cursor-not-allowed'}`} onClick={onClick}>
    {
        loading && <span className="loading loading-spinner"></span>
    }
    {text}</button>
  )
}

export default Button
