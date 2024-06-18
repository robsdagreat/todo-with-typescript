import React from 'react'

interface ButtonProps{
    text: string;
    onClick?: () => void; 
}

const Button: React.FC<ButtonProps> = ({text, onClick})=> {
    
  return (
    <div>
      <button className='py-1 px-4 text- cursor-pointer text-lg text-white hover:text-gray-400'
       onClick={onClick}
      >{text}</button>
    </div>
  )
}

export default Button