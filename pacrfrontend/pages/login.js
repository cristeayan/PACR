'use client'

import "../app/globals.css";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

const InputField = ({ change, name, label, type, style }) => (
  <div style={styles.inputField}>
    <input
      name={name}
      type={type}
      placeholder={label}
      onChange={change}
      style={{ ...styles.input, ...style }}
    />
  </div>
)

const Login = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' })
  const router = useRouter()

  useEffect(() => {
    localStorage.clear()
  }, [])

  function inputChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  function getData() {
    if (inputs.email === '') {
      window.alert('Enter username')
    } else if (inputs.password === '') {
      window.alert('Enter password')
    } else {
      axios
        .post('http://127.0.0.1:8000/api/signin/', inputs)
        .then((res) => {
          localStorage.setItem('token', res.data.access)
          localStorage.setItem('isloggedin', true)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          router.push('/dashboard')
        })
        .catch((error) => {
          if (error.response) {
            window.alert('Data: ' + error.response.data)
            window.alert('Status: ' + error.response.status)
          } else if (error.request) {
            window.alert(error.request)
          } else {
            window.alert('Error: ' + error.message)
          }
        })
    }
  }

  return (
    <>
      <div style={styles.mainContainer}>
        <img src="research.png" width='600px' height='600px' alt='Research'></img>
        <div style={styles.loginContainer}>
          <div style={styles.headingwrap}>
          <h1 style={styles.heading}>Welcome Back!</h1>
            <h3 style={styles.subheading}>A Community for Researchers</h3>
            <h3 style={styles.subheading}>by Researchers</h3>
          </div>
          <InputField
            change={inputChange}
            name='email'
            label='Email'
            type='email'
          />
          <InputField
            change={inputChange}
            name='password'
            label='Password'
            type='password'
          />
          <span>
            <span>
              <input type='checkbox' />
              Remember Me
            </span>
            <span>
              <u><b>Forgot Password?</b></u>
            </span>
          </span>
          <button onClick={getData} style={styles.button}>
            Login
          </button>
          <div style={styles.orContinueWith}>
            <hr style={styles.line} />
            <span>or continue with</span>
            <hr style={styles.line} />
          </div>
          <div style={styles.socialLogos}>
            <img src="google logo.svg" alt="Google" style={styles.logo} />
            <img src="apple logo.svg" alt="Apple" style={styles.logo} />
            <img src="fb logo.svg" alt="Facebook" style={styles.logo} />
          </div>
          <h2 style={styles.registerText}>
            Don't have an account? <Link href="/signup" style={styles.link}>Sign Up now</Link>
          </h2>
        </div>
      </div>
    </>
  )
}

const styles = {
  mainContainer: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '124px'
  },
  loginContainer: {
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    backgroundColor: '#fff'
  },
  heading: {
    marginBottom: '8px',
    background: 'linear-gradient(125.75deg, #3DC8FF 11.75%, #90DBF9 63.07%, #FFFFFF 114%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '52px',
    fontWeight: '500',
    lineHeight: '57.2px',
    letterSpacing: '-0.03em',
    textAlign: 'center'
  },
  subheading: {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '17.6px',
    letterSpacing: '0.02em',
    textAlign: 'center',
    color: '#777777'
  },
  headingwrap: {
    marginBottom: '36px'
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  inputField: {
    marginBottom: '16px',
    width: '100%',
  },
  input: {
    background: '#F2F2F2',
    width: '100%',
    height: '48px',
    padding: '18px 24px',
    borderRadius: '200px',
    border: '0.5px solid #313131',
    fontSize: '14px',
    lineHeight: '16px'
  },
  button: {
    margin: '20px',
    padding: '10px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '250px'
  },
  buttonHover: {
    backgroundColor: '#005bb5'
  },
  orContinueWith: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '20px 0'
  },
  line: {
    flex: 1,
    height: '1px',
    backgroundColor: '#ccc'
  },
  socialLogos: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0'
  },
  logo: {
    width: '40px',
    height: '40px',
    margin: '0 10px',
    cursor: 'pointer'
  },
  registerText: {
    marginTop: '20px'
  },
  link: {
    color: '#0070f3',
    textDecoration: 'none'
  }
}



export default Login
