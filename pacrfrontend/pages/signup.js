'use client'

import "../app/globals.css";
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "../app/page.js";

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
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone_number: value });
  };

  const handleSubmit = () => {
    const data = new FormData();
    for (const key in formData) {
      if (key !== 'confirm_password') {  // Exclude the confirm_password field
        data.append(key, formData[key]);
      }
    }
    axios.post('http://127.0.0.1:8000/api/signup/', data)
      .then((res) => {
        localStorage.setItem('token', res.data.access);
        localStorage.setItem('isloggedin', true);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        router.push('/signup/profilepicture');
      }) // Redirect to profile picture upload on success
      .catch(error => alert(error.message));
  };

  return (
    <div style={styles.pageContainer}>
    <div style={styles.container}>
      <div style={styles.headingBlock}><h1 style={styles.mainHeading}>Tell us a bit about yourself</h1></div>
      <div style={styles.formContainer}>
        <div style={styles.formColumn}>
          <h2 style={styles.subHeading}>Personal Details</h2>
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
          <div style={styles.emailHeading}>
          <h2 style={styles.subHeading}>Enter your Email Address</h2></div>
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
          <div style={styles.selectDrop}><select
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
          <img src="select-dropdown.svg" alt = "Arrow Image" style={styles.arrowDropdown}></img>
          </div>
          <h2 style={styles.subHeading}>Tell us where you work?</h2>
          <InputField
            placeholder="Location"
            name="location"
            type="text"
            value={formData.location}
            change={handleChange}
          />
          <h2 style={styles.subHeading}>Enter Your Phone Number (Optional)</h2>
          <div style={styles.inputField}>
            <PhoneInput
              country={'us'} // Default country
              value={formData.phone_number}
              onChange={handlePhoneChange}
              inputStyle={{
                width: '100%',
                height: '48px',
                padding: '10px 80px',
                borderRadius: '200px',
                border: '0.5px solid #313131',
                backgroundColor: '#f2f2f2',
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: '13.2px',
                letterSpacing: '2%',
                color: '#adadad'
              }}
              buttonStyle={{
                borderTopLeftRadius: '200px', // Round the top left corner
                borderBottomLeftRadius: '200px', // Round the bottom left corner
                borderTopRightRadius: '0px', // Square the top right corner
                borderBottomRightRadius: '0px', // Square the bottom right corner
                border: '0.5px solid #313131', // Match the border style with input
                backgroundColor: '#f2f2f2', // Set a background color if needed
                padding: '0px 8px 0 16px',
              }}
              placeholder="Enter your phone number"
            />
          </div>
          <h2 style={styles.subHeading}>Date of Birth</h2>
          <InputField
            placeholder="DD/MM/YYYY"
            name="date_of_birth"
            type="date" // Changed to type "date"
            value={formData.date_of_birth}
            change={handleChange}
          />
          <button onClick={handleSubmit} style={styles.button}>Create an Account</button>
        </div>
      </div>
    </div>
    </div>
  );
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
);

const styles = {
  pageContainer: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: '82rem',
    margin: '0 auto',
    padding: '72px 20px',
    columnGap: '50px'
  },
  mainHeading: {
    background: 'linear-gradient(125.75deg, #3DC8FF 11.75%, #90DBF9 63.07%, #FFFFFF 114%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '52px',
    fontWeight: '500',
    lineHeight: '57.2px',
    letterSpacing: '-0.03em',
    textAlign: 'left'
  },
  headingBlock: {
    width: '30%'
  },
  formContainer: {
    display: 'flex',
    width: '70%',
    columnGap: '78px'
  },
  formColumn: {
    width: '100%',
  },
  subHeading: {
    fontSize: '16px',
    lineHeight: '17.6px',
    letterSpacing: '2%',
    fontWeight: '400',
    color: '#313131',
    padding: '0 0 16px 0',
  },
  inputField: {
    marginBottom: '16px',
    width: '100%',
  },
  input: {
    width: '100%',
    height: '48px',
    padding: '10px 24px',
    borderRadius: '200px',
    border: '0.5px solid #313131',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '13.2px',
    letterSpacing: '2%',
    color: '#313131',
    backgroundColor: '#f2f2f2'
  },
  emailHeading: {
    marginTop: '40px'
  },
  select: {
    width: '100%',
    height: '48px',
    padding: '10px 24px',
    borderRadius: '200px',
    border: '0.5px solid #313131',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '13.2px',
    letterSpacing: '2%',
    color: '#313131',
    backgroundColor: '#f2f2f2',
    marginBottom: '20px',
    appearance: 'none',
  },
  selectDrop: {
    position: 'relative',
  },
  arrowDropdown: {
    position: 'absolute',
    top: '16px',
    right: '22px'
  },
  button: {
    width: '100%',
    padding: '16px 24px',
    backgroundColor: '#70d4fc',
    color: 'white',
    border: 'none',
    borderRadius: '200px',
    cursor: 'pointer',
    fontSize: '16px',
    height: '50px',
    marginTop: '30px',
    fontSize: '16px',
    lineHeight: '17.6px',
    letterSpacing: '-2%',
    fontWeight: '500',
    transition: '0.3s ease'
  },
};

export default Signup;
