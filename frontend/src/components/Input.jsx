import React from 'react'

const Input = ({type,placeholder,name,value,setValue}) => {
  return (
    <input type={type} className='input input-primary' value={value} onChange={(e)=>setValue(e.target.value)} name={name} placeholder={placeholder} required autoComplete='off'/>
  )
}

export default Input
