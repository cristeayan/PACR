// pages/index.js
'use client'

import Link from 'next/link'
import { useState } from 'react'

const Button = ({ href, children, variant }) => {
  const [isHovered, setIsHovered] = useState(false)

  const buttonStyles = {
    login: {
      backgroundColor: isHovered ? '#f0f0f0' : '#ffffff',
      color: '#000000',
      border: '2px solid #000000',

    },
    signup: {
      backgroundColor: isHovered ? '#005bb5' : '#70D4FC',
      color: '#ffffff',
      border: 'none',
    },
  }

  const buttonStyle = {
    ...buttonStyles[variant],
    display: 'inline-block',
    margin: '10px',
    padding: '16px 60px',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '200px',
    transition: 'background-color 0.3s, color 0.3s',
    cursor: 'pointer',
    fontSize:'18px'
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <a
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </a>
    </Link>
  )
}

export default function Landing() {
  return (
    <main style={mainStyle}>
      <div style={headerStyle}>
        <img src='pacrlogo.png' height='75px' width='185px' alt='Logo'></img>
        <div style={messageStyle} >
          <h1>Welcome to a Community</h1>
          <h1>for Researchers by </h1>
          <h1 style={{color:'#70D4FC'}}>Researchers</h1>
        </div>
        <div style={buttonContainerStyle}>
          <Button href="/login" variant="login">Login</Button>
          <Button href="/signup" variant="signup">Signup</Button>
        </div>
      </div>
      <img src="research.png" width='600px' height='600px' alt='Research'></img>
    </main>
  )
}

const messageStyle={
  fontSize:'32px'
}
const headerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  height: '100vh'
}

const mainStyle = {
  display: 'flex',
  height: '100vh',
  justifyContent: 'space-evenly',
  alignItems: 'center'
}

const buttonContainerStyle = {
  display: 'flex',
}
