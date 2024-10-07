'use client'

import "../../app/globals.css";
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
      <h1 style={styles.heading}>Show the world what beauty and brains look like</h1>
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
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.cancelButton}>Cancel</button>
          <button type="submit" style={styles.button}>Save</button>
        </div>
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
    padding: '72px 20px',
    rowGap: '70px',
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
    textAlign: 'center',
    maxWidth: '43.75rem',
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
    padding: '16px 60px',
    backgroundColor: '#70d4fc',
    color: 'white',
    border: 'none',
    borderRadius: '200px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '17.6px',
    letterSpacing: '-2%',
  },
  cancelButton: {
    padding: '16px 60px',
    backgroundColor: '#ffffff',
    color: '#313131',
    border: '1px solid #313131',
    borderRadius: '200px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '17.6px',
    letterSpacing: '-2%',
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
};

export default ProfilePictureUpload;
