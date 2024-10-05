import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { useUser } from '../context/UserContext';

const Header = () => {
  const router = useRouter()
  // const { user } = useUser();

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#EAEDFF',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    height: '100px',
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
    marginLeft: 'auto',
    flex: 1,
    maxWidth: '500px',
    margin: '10px',
  };

  const searchInputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontSize: '1rem',
    height:'45px',

  };

  const navIconsStyle = {
    display: 'flex',
    gap: '20px',
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
    width: '60px',
    height: '60px',
    backgroundColor: 'white',
    border:'2px solid',
    color: '#fff',
    borderRadius: '50%',
    marginBottom: '5px', // Space between the circle and the text
  };

  const iconStyle = {
    width: '40px',
    height: '40px',
  };

  const navTextStyle = {
    fontSize: '0.75rem',
    textAlign: 'center',
    color: '#000',
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const userButtonStyle = {
    fontWeight: 'bold',
    backgroundColor:'white',
    color: '#333',
    margin: '10px',
    border: '1px solid',
    borderRadius: '5px',
    padding: '0 10px',
    cursor: 'pointer',
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
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
    minWidth: '150px',
    opacity: 0,
    transform: 'translateY(-10px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    pointerEvents: 'none',
  };

  const dropdownVisibleStyle = {
    opacity: 1,
    transform: 'translateY(0)',
    pointerEvents: 'auto',
  };

  const dropdownItemStyle = {
    padding: '10px',
    cursor: 'pointer',
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleUsernameClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header style={headerStyle}>
      <div style={brandSectionStyle}>
        <h1 style={brandNameStyle}>PACR</h1>
        <p style={brandTaglineStyle}>Empowering Research, Together</p>
      </div>
      <div style={searchBarStyle}>
        <input
          type="text"
          placeholder="Search for articles, journals, communities, researchers, etc."
          style={searchInputStyle}
        />
      </div>
      <div style={navIconsStyle}>
        <div style={navButtonStyle}>
          <div style={iconCircleStyle}>
            <img style={iconStyle} src="https://img.icons8.com/pulsar-line/48/home.png" alt="home"/>
          </div>
          <span style={navTextStyle}>Home</span>
        </div>
        <div style={navButtonStyle}>
          <div style={iconCircleStyle}>
            <img style={iconStyle} src="https://img.icons8.com/pulsar-line/48/literature.png" alt="literature"/>
          </div>
          <span style={navTextStyle}>Research</span>
        </div>
        <div style={navButtonStyle}>
          <div style={iconCircleStyle}>
            <img style={iconStyle} src="https://img.icons8.com/dotty/80/people-working-together.png" alt="people-working-together"/>
          </div>
          <span style={navTextStyle}>Communities</span>
        </div>
        <div style={navButtonStyle}>
          <div style={iconCircleStyle}>
            <img style={iconStyle} src="https://img.icons8.com/pastel-glyph/64/bookmark-ribbon.png" alt="bookmark-ribbon"/>
          </div>
          <span style={navTextStyle}>Library</span>
        </div>
        <div style={navButtonStyle}>
          <div style={iconCircleStyle}>
            <img style={iconStyle} src="https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/external-notification-bell-user-interface-anggara-basic-outline-anggara-putra.png" alt="notification-bell"/>
          </div>
          <span style={navTextStyle}>Alerts</span>
        </div>
        <div style={navButtonStyle}>
          <div style={iconCircleStyle}>
            <img style={iconStyle} src="https://img.icons8.com/ios/50/chat-message--v1.png" alt="chat-message"/>
          </div>
          <span style={navTextStyle}>Messages</span>
        </div>
      </div>
      <div style={userInfoStyle}>
        <div style={dropdownContainerStyle}>
          <div style={userButtonStyle} onClick={handleUsernameClick}>
            {/* <p>{user ? user.first_name +" "+ user.last_name: 'Guest'}</p> */}
          </div>
          <div style={{ ...dropdownStyle, ...(showDropdown ? dropdownVisibleStyle : {}) }}>
            <div style={dropdownItemStyle}>Profile Settings</div>
            <div style={dropdownItemStyle}>Manage Company Profiles</div>
            <div style={dropdownItemStyle}>Ads History/Manager</div>
            <div style={dropdownItemStyle}>Help Center</div>
            <div style={dropdownItemStyle} onClick={()=>{router.push('/login')}}>Log Out</div>
          </div>
        </div>
        <button style={uploadButtonStyle}>Upload</button>
        <button style={premiumButtonStyle}>Premium</button>
      </div>
    </header>
  );
};

export default Header;
