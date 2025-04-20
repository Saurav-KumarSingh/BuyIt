import React from 'react'
import LogoImg from '../../assets/buyit-logo.png'

const Logo = ({className}) => {
  return (
    <img src={LogoImg} alt="BuyIt logo" className={`${className}`}/>
  )
}

export default Logo