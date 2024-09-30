'use client'

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
          <div>
            <h1>Welcome Back!</h1>
            <h3>A Community for Researchers</h3>
            <h3>by Researchers</h3>
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
              Remberber Me
            </span>
            <span>
              <u><b>Forgot Password?</b></u>
            </span>
          </span>
          <button onClick={getData} style={styles.button}>
            Login
          </button>
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
    justifyContent: 'space-evenly',
    alignItems: 'center'

  },
  loginContainer: {
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px'
  },
  heading: {
    marginBottom: '20px'
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  inputField: {
    marginBottom: '15px',
    width: '100%',
  },
  input: {
    width: '100%',
    height: '42px',
    paddingLeft: '20px',
    borderRadius: '200px',
    border: '1px solid #ccc',
  },
  button: {
    margin:'20px',
    padding: '10px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width:'250px'
  },
  buttonHover: {
    backgroundColor: '#005bb5'
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
