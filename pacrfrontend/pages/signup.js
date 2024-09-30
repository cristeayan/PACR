'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone_number: '',
    date_of_birth: '',
    user_type: '',
    location: '',
  })
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    const data = new FormData()
    for (const key in formData) {
      if (key !== 'confirm_password') {  // Exclude the confirm_password field
        data.append(key, formData[key])
      }
    }
    axios.post('http://127.0.0.1:8000/api/signup/', data)
      .then((res) =>{
        localStorage.setItem('token', res.data.access)
        localStorage.setItem('isloggedin', true)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        router.push('/signup/profilepicture')
      }) // Redirect to profile picture upload on success
      .catch(error => alert(error.message))
  }

  return (
    <div style={styles.container}>
      <div><h1> Tell us a bit about yourself</h1></div>
      <div style={styles.formContainer}>
        <div style={styles.formColumn}>
          <h2 style={styles.subHeading}>Basic Details</h2>
          <InputField
            placeholder="First Name"
            name="first_name"
            type="text"
            value={formData.first_name}
            change={handleChange}
          />
          <InputField
            placeholder="Last Name"
            name="last_name"
            type="text"
            value={formData.last_name}
            change={handleChange}
          />
          <h2 style={styles.subHeading}>Enter your Email Address</h2>
          <InputField
            placeholder="Enter Your Email Address"
            name="email"
            type="email"
            value={formData.email}
            change={handleChange}
          />
          <h2 style={styles.subHeading}>Create a Password</h2>
          <InputField
            placeholder="Create a password"
            name="password"
            type="password"
            value={formData.password}
            change={handleChange}
          />
          <h2 style={styles.subHeading}>Confirm Password</h2>
          <InputField
            placeholder="Confirm password"
            name="confirm_password"
            type="password"
            value={formData.confirm_password}
            change={handleChange}
          />
        </div>

        <div style={styles.formColumn}>
          <h2 style={styles.subHeading}>Tell Us What You Do?</h2>
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select from any option</option>
            <option value="student">Student</option>
            <option value="corporate">Corporate</option>
            <option value="not_a_researcher">Not a Researcher</option>
          </select>
          <h2 style={styles.subHeading}>Location</h2>
          <InputField
            placeholder="Location"
            name="location"
            type="text"
            value={formData.location}
            change={handleChange}
          />
          <h2 style={styles.subHeading}>Enter Your Phone Number (Optional)</h2>
          <InputField
            placeholder="Phone Number"
            name="phone_number"
            type="text"
            value={formData.phone_number}
            change={handleChange}
          />
          <h2 style={styles.subHeading}>Date of Birth</h2>
          <InputField
            placeholder="DD/MM/YYYY"
            name="date_of_birth"
            type="text"
            value={formData.date_of_birth}
            change={handleChange}
          />
          <button onClick={handleSubmit} style={styles.button}>Next</button>
        </div>
      </div>
    </div>
  )
}

const InputField = ({ placeholder, name, type, value, change }) => (
  <div style={styles.inputField}>
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={change}
      style={styles.input}
    />
  </div>
)

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
  },
  formContainer: {
    display: 'flex',
    width: '80%',
    padding: '50px',
    marginTop: '20px',
  },
  formColumn: {
    padding: '0 20px',
    width: '100%',
  },
  subHeading: {
    fontSize: '18px',
    padding: '10px',
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
  select: {
    height: '48px',
    width: '100%',
    padding: '10px',
    borderRadius: '200px',
    border: '1px solid #ccc',
    marginBottom: '15px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#00aaff',
    color: 'white',
    border: 'none',
    borderRadius: '200px',
    cursor: 'pointer',
    fontSize: '16px',
    height: '48px',
    marginTop: '10px',
  },
}

export default Signup
