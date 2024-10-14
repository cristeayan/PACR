'use client'

import "../app/globals.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const InputField = ({ change, name, label, type, error }) => {
  // Dynamic border color based on error state
  const inputBorderColor = error ? '#eb8181' : '#313131'; // Red for error, original color otherwise
  
  return (
    <div style={styles.inputField}>
      <input
        name={name}
        type={type}
        placeholder={label}
        onChange={change}
        style={{ ...styles.input, borderColor: inputBorderColor }}
      />
      {error && <div style={styles.errorTooltip}>{error}</div>}
    </div>
  );
};

const Login = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState('');
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
  }, []);

  function inputChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setFormError('');
  }

  function getData() {
    let formValid = true;
    const newErrors = {};

    if (inputs.email === '') {
      newErrors.email = 'Enter username';
      formValid = false;
    }
    if (inputs.password === '') {
      newErrors.password = 'Enter password';
      formValid = false;
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    axios
      .post('http://127.0.0.1:8000/api/signin/', inputs)
      .then((res) => {
        localStorage.setItem('token', res.data.access);
        localStorage.setItem('isloggedin', true);
        // localStorage.setItem('user', JSON.stringify(res.data.user));
        router.push('/dashboard');
      })
      .catch((error) => {
        if (error.response) {
          setFormError('Login failed. Please check your credentials and try again.');
        } else if (error.request) {
          setFormError('No response from the server. Please try again later.');
        } else {
          setFormError('An unexpected error occurred. Please try again.');
        }
      });
  }

  return (
    <>
      <div style={styles.mainContainer}>
        <img src="research.png" width='600px' height='600px' alt='Research' />
        <div style={styles.loginContainer}>
          <div style={styles.headingwrap}>
            <h1 style={styles.heading}>Welcome Back!</h1>
            <h3 style={styles.subheading}>A Community for Researchers</h3>
            <h3 style={styles.subheading}>by Researchers</h3>
          </div>
          <InputField
            change={inputChange}
            name='email'
            label='Email or Phone Number'
            type='email'
            error={errors.email}
          />
          <InputField
            change={inputChange}
            name='password'
            label='Enter Password'
            type='password'
            error={errors.password}
          />
          <span style={styles.rememberMe}>
            <span style={styles.rememberCheck}>
              <input type='checkbox' style={styles.rememberCheckBox} />
              <span style={styles.rememberText}>Remember Me</span>
            </span>
            <span style={styles.forgotPassword}>
              <u><b>Forgot Password?</b></u>
            </span>
          </span>
          <button onClick={getData} style={styles.button}>
            Login
          </button>

          {formError && (
            <div style={styles.errorBox}>
              {formError}
            </div>
          )}

          <div style={styles.orContinueWith}>
            <hr style={styles.line} />
            <span style={styles.orContinueText}>or continue with</span>
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
  );
}
const styles = {
  
  mainContainer: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontFamily:'Open Sauce One,sans serif',
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
    position: 'relative',
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
  rememberMe: {
    display: 'flex',
    marginTop: '4px',
    justifyContent: 'space-between',
    width: '100%'
  },
  rememberCheck: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  rememberText: {
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '13.2px',
    letterSpacing: '2%',
    color: '#313131'
  },
  rememberCheckBox: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    border: '0.5px solid #313131',
    backgroundColor: '#f2f2f2'
  },
  forgotPassword: {
    fontSize: '12px',
    lineHeight: '13.2px',
    letterSpacing: '2%',
    color: '#313131',
    fontWeight: '500',
    cursor: 'pointer'
  },
  button: {
    margin: '32px 0 40px',
    padding: '16px 32px',
    backgroundColor: '#ffffff',
    color: '#313131',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '17.6px',
    letterSpacing: '-2%',
    border: '1px solid #313131',
    borderRadius: '80px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%'
  },
  buttonHover: {
    backgroundColor: '#40C9FF'
  },
  orContinueWith: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '24px'
  },
  orContinueText: {
    fontSize: '16px',
    lineHeight: '17.6px',
    letterSpacing: '2%',
    textAlign: 'center',
    fontWeight: '400',
    color: '#313131'
  },
  line: {
    flex: 1,
    height: '1px',
    backgroundColor: '#313131'
  },
  socialLogos: {
    display: 'flex',
    justifyContent: 'center',
    margin: '40px 0 64px',
    columnGap: '48px'
  },
  logo: {
    width: '54px',
    height: '54px',
    cursor: 'pointer'
  },
  registerText: {
    fontSize: '16px',
    fontWeight: '400',
    color: '#313131',
    lineHeight: '17.6px',
    letterSpacing: '2%',
    textAlign: 'center'
  },
  link: {
    color: '#00b8ff',
    textDecoration: 'underline',
    fontWeight: '500'
  },
  errorBox: {
    color: 'red',
    fontSize: '0.9em',
    border: '1px solid red',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '16px',
    textAlign: 'center',
    backgroundColor: '#ffe6e6'
  },
  errorTooltip: {
    position: 'absolute',
    top: '0.75rem',
    right: '-7.25rem',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '6px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    whiteSpace: 'nowrap'
  },
}

export default Login