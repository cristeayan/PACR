import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { useUser } from '../context/UserContext';
import "../app/globals.css";

const Header = () => {
  const router = useRouter()
  const { user } = useUser();

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 32px',
    backgroundColor: 'rgb(0 0 0 / 25%)',
    boxShadow: '5px 7px 16px 0px #00000063',
    position: 'fixed',
    top: '20px',
    alignSelf: 'center',
    gap: '14px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '1320px',
    backdropFilter: 'blur(30px)',
    zIndex: '9999',
  };

  const brandSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Varela, sans-serif',
    color: '#000',
    textAlign: 'center',
  };

  const brandNameStyle = {
    fontSize: '40px',
    alignSelf: 'center',
    margin: '0',
  };

  const brandTaglineStyle = {
    fontSize: '10px',
  };

  const searchBarStyle = {
    flex: 1,
    maxWidth: '356px',
    position: 'relative'
  };

  const searchInputStyle = {
    width: '100%',
    padding: '10px 10px 10px 50px',
    border: '1px solid #ffffff',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '16px',
    letterSpacing: '2%',
    color: '#313131',
    backgroundColor: '#f2f2f2',
    borderRadius: '200px',
    height: '48px',
  };

  const searchIconStyle = {
    position: 'absolute',
    top: '12px',
    left: '12px'
  };

  const navIconsStyle = {
    display: 'flex',
    gap: '28px',
  };

  const navButtonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  const iconCircleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
    marginBottom: '6px', // Space between the circle and the text
  };

  const iconStyle = {
    width: '32px',
    height: '32px',
  };

  const navTextStyle = {
    fontSize: '16px',
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '400',
    lineHeight: '17.6px',
    letterSpacing: '2%'
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const userButtonStyle = {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const uploadButtonStyle = {
    padding: '8px 16px',
    backgroundColor: 'white',
    color: 'black',
    border: '2px solid',
    borderColor:'#0057FF',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  const premiumButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#0057FF',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  const dropdownContainerStyle = {
    position: 'relative',
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#88d8f9',
    border: '1px solid #ffffff',
    borderRadius: '16px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 2,
    minWidth: '240px',
    opacity: 0,
    transform: 'translateY(-10px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    pointerEvents: 'none',
    boxShadow: '5px 7px 16px 0px #00000063',
    backdropFilter: 'blur(30px)',
  };

  const dropdownVisibleStyle = {
    opacity: 1,
    transform: 'translateY(0)',
    pointerEvents: 'auto',
  };

  const dropdownItemStyle = {
    padding: '10px',
    cursor: 'pointer',
    color: '#ffffff',
  };

  const navLogoWrapStyle = {
    display: 'flex',
    gap: '30px',
    width: '100%',
    alignItems: 'center',
  };

  const navMenuWrapStyle = {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleUsernameClick = () => {
    console.log(user)
    setShowDropdown(!showDropdown);
  };

  return (
    <header style={headerStyle}>
      <div style={navLogoWrapStyle}>
      <div style={brandSectionStyle}>
        <img src='Header PACR Logo.svg'></img>
        {/* <h1 style={brandNameStyle}>PACR</h1>
        <p style={brandTaglineStyle}>Empowering Research, Together</p> */}
      </div>
      <div style={searchBarStyle}>
        <img src='Header Search Bar Icon.svg' style={searchIconStyle}></img>
        <input
          type="text"
          placeholder="Search"
          style={searchInputStyle}
        />
      </div>
      </div>
      <div style={navMenuWrapStyle}>
      <div style={navIconsStyle}>
        <div style={navButtonStyle}>
          <div style={iconCircleStyle}>
            <img style={iconStyle} src="Header Home Icon.svg" alt="home" onClick={()=>{
              router.push('/dashboard')
            }}/>
          </div>
          <span style={navTextStyle}>Home</span>
        </div>
        <div style={navButtonStyle}>
          <div style={iconCircleStyle}>
            <img style={iconStyle} src="Header Research Icon.svg" alt="literature"/>
          </div>
          <span style={navTextStyle}>Research</span>
        </div>
        <div style={navButtonStyle}>
          <div style={iconCircleStyle}>
            <img style={iconStyle} src="Header Communites Icon.svg" alt="people-working-together"/>
          </div>
          <span style={navTextStyle}>Communities</span>
        </div>
        <div style={navButtonStyle}>
          <div style={iconCircleStyle}>
            <img style={iconStyle} src="Header Stats Icon.svg" alt="bookmark-ribbon"/>
          </div>
          <span style={navTextStyle}>Library</span>
        </div>
        <div style={navButtonStyle}>
          <div style={iconCircleStyle}>
            <img style={iconStyle} src="Header Notification Icon.svg" alt="notification-bell"/>
          </div>
          <span style={navTextStyle}>Alerts</span>
        </div>
        <div style={navButtonStyle}>
          <div style={iconCircleStyle}>
            <img style={iconStyle} src="Header Messages Icon.svg" alt="chat-message"/>
          </div>
          <span style={navTextStyle}>Messages</span>
        </div>
      </div>
      <div style={userInfoStyle}>
        <div style={dropdownContainerStyle}>
          <div style={userButtonStyle} onClick={handleUsernameClick}>
            <img 
              src={user ? "http://127.0.0.1:8000"+user.profile_picture : '/dummy-man.png'} 
              alt="Profile" 
              style={{ 
                height: '60px', 
                width: '60px', 
                borderRadius: '50%' 
              }} 
            />
            <img src='Profile Down Arrow.svg'></img>
          </div >
          <div style={{ ...dropdownStyle, ...(showDropdown ? dropdownVisibleStyle : {}) }}>
            <div style={dropdownItemStyle} on onClick={()=>{router.push('/profile')}}>Profile Settings</div>
            <div style={dropdownItemStyle}>Manage Company Profiles</div>
            <div style={dropdownItemStyle}>Ads History/Manager</div>
            <div style={dropdownItemStyle}>Help Center</div>
            <div style={dropdownItemStyle} onClick={()=>{router.push('/login')}}>Log Out</div>
          </div>
        </div>
        {/* <button style={uploadButtonStyle}>Upload</button>
        <button style={premiumButtonStyle}>Premium</button> */}
      </div>
      </div>
    </header>
  );
};

export default Header;
