'use client'

import { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProfilePictureUpload = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [user,setUser]=useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve user information from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePicture = () => {
    setProfilePicture(null);
    setProfilePicturePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!user) {
      alert('User not logged in'); // Ensure user is logged in before submitting
      return;
    }

    const data = new FormData();
    data.append('profile_picture', profilePicture);

    try {
      // Send the request to update the user profile picture
      await axios.patch(`http://127.0.0.1:8000/api/users/${user.id}/`, data);
      router.push('/dashboard'); // Redirect to the dashboard on success
    } catch (error) {
      alert(error.message); // Handle error
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Upload Profile Picture</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={styles.fileInput}
        />
        {profilePicturePreview ? (
          <div style={styles.profilePictureContainer}>
            <img src={profilePicturePreview} alt="Profile Preview" style={styles.profilePicture} />
            <button type="button" onClick={handleRemovePicture} style={styles.removePictureButton}>
              Remove
            </button>
          </div>
        ) : (
          <div style={styles.profilePicturePlaceholder}>Upload a profile picture</div>
        )}
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  fileInput: {
    marginBottom: '15px',
  },
  profilePictureContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '15px',
  },
  profilePicture: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  profilePicturePlaceholder: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '1px dashed #aaa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#aaa',
    textAlign: 'center',
  },
  removePictureButton: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#00aaff',
    color: 'white',
    border: 'none',
    borderRadius: '200px',
    cursor: 'pointer',
  },
};

export default ProfilePictureUpload;
