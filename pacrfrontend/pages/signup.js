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

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for the changed field
    setErrors({ ...errors, [name]: '' });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone_number: value });
    setErrors({ ...errors, phone_number: '' }); // Clear error for phone
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check for empty fields
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== 'phone_number') { // Optional field
        newErrors[key] = `${key.replace('_', ' ')} is required.`;
      }
    });
    
    // Password validation
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop the submission if there are errors
    }
    
    const data = new FormData();
    for (const key in formData) {
      if (key !== 'confirm_password') {
        data.append(key, formData[key]);
      }
    }
    axios.post('http://127.0.0.1:8000/api/signup/', data)
      .then((res) => {
        localStorage.setItem('token', res.data.access);
        localStorage.setItem('isloggedin', true);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        router.push('/signup/profilepicture');
      })
      .catch(error => alert(error.message));
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.headingBlock}>
          <h1 style={styles.mainHeading}>Tell us a bit about yourself</h1>
        </div>
        <form onSubmit={handleSubmit} style={styles.formContainer}>
          <div style={styles.formColumn}>
            <h2 style={styles.subHeading}>Personal Details</h2>
            <InputField
              placeholder="First Name"
              name="first_name"
              type="text"
              value={formData.first_name}
              change={handleChange}
              error={errors.first_name}
            />
            <InputField
              placeholder="Last Name"
              name="last_name"
              type="text"
              value={formData.last_name}
              change={handleChange}
              error={errors.last_name}
            />
            <div style={styles.emailHeading}>
              <h2 style={styles.subHeading}>Enter your Email Address</h2>
            </div>
            <InputField
              placeholder="Enter Your Email Address"
              name="email"
              type="email"
              value={formData.email}
              change={handleChange}
              error={errors.email}
            />
            <h2 style={styles.subHeading}>Create a Password</h2>
            <InputField
              placeholder="Create a password"
              name="password"
              type="password"
              value={formData.password}
              change={handleChange}
              error={errors.password}
            />
            <h2 style={styles.subHeading}>Confirm Password</h2>
            <InputField
              placeholder="Confirm password"
              name="confirm_password"
              type="password"
              value={formData.confirm_password}
              change={handleChange}
              error={errors.confirm_password}
            />
          </div>

          <div style={styles.formColumn}>
            <h2 style={styles.subHeading}>Tell Us What You Do?</h2>
            <div style={styles.selectDrop}>
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
              <img src="select-dropdown.svg" alt="Arrow Image" style={styles.arrowDropdown} />
            </div>
            <h2 style={styles.subHeading}>Tell us where you work?</h2>
            <InputField
              placeholder="Location"
              name="location"
              type="text"
              value={formData.location}
              change={handleChange}
              error={errors.location}
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
                buttonStyle={styles.phoneButtonStyle}
                placeholder="Enter your phone number"
              />
              {errors.phone_number && <div style={styles.errorTooltip}>{errors.phone_number}</div>}
            </div>
            <h2 style={styles.subHeading}>Date of Birth</h2>
            <InputField
              placeholder="DD/MM/YYYY"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              change={handleChange}
              error={errors.date_of_birth}
            />
            <button type="submit" style={styles.button}>Create an Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const InputField = ({ placeholder, name, type, value, change, error }) => (
  <div style={styles.inputField}>
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={change}
      style={{
        ...styles.input,
        border: error ? '1px solid red' : '0.5px solid #313131',
      }}
    />
    {error && <div style={styles.errorTooltip}>{error}</div>}
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
    fontWeight: '400',
    color: '#000000',
    lineHeight: '22.4px',
    margin: '16px 0'
  },
  inputField: {
    position: 'relative',
    marginBottom: '24px',
  },
  input: {
    width: '100%',
    height: '48px',
    borderRadius: '200px',
    border: '0.5px solid #313131',
    backgroundColor: '#f2f2f2',
    padding: '10px 24px',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '13.2px',
    letterSpacing: '2%',
    color: '#adadad',
  },
  errorTooltip: {
    position: 'absolute',
    top: '100%',
    left: '0',
    color: 'red',
    fontSize: '12px',
    marginTop: '4px',
  },
  emailHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selectDrop: {
    position: 'relative',
  },
  select: {
    width: '100%',
    height: '48px',
    borderRadius: '200px',
    border: '0.5px solid #313131',
    backgroundColor: '#f2f2f2',
    padding: '10px 24px',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '13.2px',
    letterSpacing: '2%',
    color: '#adadad',
    appearance: 'none',
  },
  arrowDropdown: {
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '16px',
    height: '16px',
  },
  phoneButtonStyle: {
    borderTopLeftRadius: '200px',
    borderBottomLeftRadius: '200px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    border: '0.5px solid #313131',
    backgroundColor: '#f2f2f2',
    padding: '0px 8px 0 16px',
  },
  button: {
    width: '100%',
    height: '48px',
    borderRadius: '200px',
    border: 'none',
    backgroundColor: '#70D4FC',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Signup;
