import Head from 'next/head';
import Header from '../components/Header';
import { UserProvider } from '@/context/UserContext';
import { useState } from 'react';
import "../app/globals.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Profile'); // State to handle active tab

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div style={leftColumnStyle}>
            {/* Profile Tab Content */}
            <div style={postStyle}>
              <p>Just navigating my way through this world of research...</p>
              <p>Work: Beth Israel Deaconess Medical Center</p>
              <p>Joined: August 1st, 2022</p>
            </div>
            <div style={photoGalleryStyle}>
              <h3>Photos</h3>
              <div style={photosWrapper}>
                <img src="/path-to-photo1.jpg" alt="Photo1" style={photoStyle} />
                <img src="/path-to-photo2.jpg" alt="Photo2" style={photoStyle} />
                <img src="/path-to-photo3.jpg" alt="Photo3" style={photoStyle} />
              </div>
            </div>
          </div>
        );
      case 'About':
        return <div>About Content</div>;
      case 'Research':
        return <div>Research Content</div>;
      case 'Network':
        return <div>Network Content</div>;
      default:
        return <div>Profile Content</div>;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5', flexDirection: 'column' }}>
      <Head>
        <title>PACR - Empowering Research, Together</title>
        <meta name="description" content="Empowering Research, Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UserProvider>
        {/* Header */}
        <Header />

        {/* Profile Main Content */}
        <div style={profilePageStyle}>
          {/* Header Section with Background Image */}
          <div style={headerStyle}>
            <img src="/Placeholder Cover Image.jpg" alt="Profile Background" style={backgroundImageStyle} />
          </div>

          {/* User Information */}
          <div style={profileMainWrapper}>
          <div style={profileInfoWrapperStyle}>
            <div style={userImageWrapperStyle}>
              <img src="/Placeholder Profile Pic.png" alt="Profile" style={profileImageStyle} />
            </div>
            <div style={userInfoStyle}>
              <h1 style={userNameHeading}>Dr. Matthew Antony Manoj</h1>
              <p style={userProfileTagline}>Postdoctoral Research Fellow at Beth Israel Deaconess Medical Center, Harvard University | MBBS | Graduate of Kasturba Medical College, Mangalore, Manipal Academy of Higher Education</p>
            </div>
          </div>

          {/* User Location Information */}
          <div style={locationWrapperStyle}>
            <p>Boston, Massachusetts, United States</p>
            <div style={dotWrapperStyle}></div>
            <div style={userContactWrapStyle}>
              <img src= 'Profile Phone Icon.svg' alt = 'Phone Icon'></img>
              <img src= 'Profile Message Icon.svg' alt = 'Message Icon'></img>
              <img src= 'Profile Globe Icon.svg' alt = 'Globe Icon'></img>
            </div>
          </div>

          {/* Stats Section */}
          <div style={mainStatsWrapperStyle}>
            <div style={mainInnerWrapperStyle}>
              <div style={statsWrapperStyle}>
                <p style={statsTextStyle}>Total Reads: <span style={statsBoldStyle}>27,432</span></p>
                <div style={dotWrapperStyle}></div>
                <p style={statsTextStyle}>H-index: <span style={statsBoldStyle}>4.0</span></p>
                <div style={dotWrapperStyle}></div>
                <p style={statsTextStyle}>PACR Score: <span style={statsBoldStyle}>78.2</span></p>
                <div style={dotWrapperStyle}></div>
                <p style={statsTextStyle}>Citations: <span style={statsBoldStyle}>32</span></p>
              </div>
              <div style={statsWrapperStyle}>
                <p style={followersTextStyle}><span style={statsBoldStyle}>2,478</span> Followers</p>
                <div style={blueDotWrapperStyle}></div>
                <p style={followersTextStyle}><span style={statsBoldStyle}>1,298</span> Friends</p>
              </div>
            </div>
            <a href= '#' style={analyticsButtonStyle}><img src='Analytics Icon.svg' alt='Analytics Icon'></img> Analytics</a>
          </div>

          {/* Horizontal Divider */}
          <div style={dividerWrapperStyle}></div>

          {/* Tabs Section */}
          <div style={tabsWrapperStyle}>
            <div style={activeTab === 'Profile' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('Profile')}>Profile</div>
            <div style={activeTab === 'About' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('About')}>About</div>
            <div style={activeTab === 'Research' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('Research')}>Research</div>
            <div style={activeTab === 'Network' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('Network')}>Network</div>
          </div>

          {/* Tab Content */}
          <div style={contentWrapperStyle}>
            {renderTabContent()}

            {/* Featured Section (Right Column) */}
            <div style={rightColumnStyle}>
              <div style={featuredPostStyle}>
                <h3>Featured</h3>
                <p>Excited to share that I will be joining the research at Harvard...</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </UserProvider>
    </div>
  );
};

// Add CSS Styles
const profilePageStyle = {
  width: '100%',
  backgroundColor: '#fff',
};

const profileMainWrapper = {
  width: '100%',
  maxWidth: '1320px',
  display: 'block',
  margin: '0 auto',
};

const headerStyle = {
  width: '100%',
  height: '524px',
};

const backgroundImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: '0 0 24px 24px',
};

const profileInfoWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  padding: '0 0 24px',
  marginTop: '-8.25rem',
};

const userImageWrapperStyle = {
  padding: '10px',
  borderRadius: '16px',
  backgroundColor: '#fff',
};

const profileImageStyle = {
  width: '220px',
  height: '230px',
  borderRadius: '12px',
  objectFit: 'cover',
};

const userNameHeading = {
  fontSize: '48px',
  lineHeight: '48px',
  letterSpacing: '-4%',
  fontWeight: '500',
  marginBottom: '12px',
};

const userProfileTagline = {
  fontSize: '16px',
  lineHeight: '22.4px',
  fontWeight: '400',
  color: '#000000',
};

const userInfoStyle = {
  maxWidth: '48rem',
};

const locationWrapperStyle = {
  display: 'flex',
  justifyContent: 'left',
  gap: '16px',
  alignItems: 'center',
};

const userContactWrapStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const dotWrapperStyle = {
  width: '4px',
  height: '4px',
  backgroundColor: '#313131',
  borderRadius: '50%',
};

const blueDotWrapperStyle = {
  width: '4px',
  height: '4px',
  backgroundColor: '#36c8f4',
  borderRadius: '50%',
};

const mainStatsWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '24px',
};

const statsWrapperStyle = {
  display: 'flex',
  justifyContent: 'left',
  gap: '16px',
  alignItems: 'center',
};

const statsTextStyle = {
  fontSize: '12px',
  lineHeight: '14.84px',
  fontWeight: '400',
  textTransform: 'uppercase',
  color: '#313131',
};

const statsBoldStyle = {
  fontWeight: '600',
};

const followersTextStyle = {
  fontSize: '12px',
  lineHeight: '14.84px',
  fontWeight: '400',
  textTransform: 'uppercase',
  color: '#36c8f4',
};

const mainInnerWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  gap: '12px',
};

const analyticsButtonStyle = {
  backgroundColor: '#70d4fc',
  borderRadius: '200px',
  padding: '16px 40px',
  fontSize: '16px',
  lineHeight: '18px',
  letterSpacing: '2%',
  fontWeight: '500',
  textDecoration: 'none',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const dividerWrapperStyle = {
  width: '100%',
  height: '0.5px',
  backgroundColor: '#36C8F4',
  margin: '46px 0 36px',
};

const tabsWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  columnGap: '146px',
  padding: '10px 0',
};

const tabStyle = {
  cursor: 'pointer',
  padding: '0 20px 10px',
  fontWeight: '400',
  color: '#313131',
  fontSize: '16px',
  lineHeight: '22.4px',
};

const activeTabStyle = {
  ...tabStyle,
  borderBottom: '2px solid #70D4FC',
  color: '#36c8f4',
  fontWeight: '600',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
};

const contentWrapperStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
};

const leftColumnStyle = {
  width: '60%',
};

const rightColumnStyle = {
  width: '35%',
};

const postStyle = {
  padding: '15px',
  marginBottom: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
};

const photoGalleryStyle = {
  marginTop: '20px',
};

const photosWrapper = {
  display: 'flex',
};

const photoStyle = {
  width: '100px',
  height: '100px',
  marginRight: '10px',
  borderRadius: '8px',
  objectFit: 'cover',
};

const featuredPostStyle = {
  padding: '15px',
  backgroundColor: '#f0f0f0',
  borderRadius: '10px',
};

export default Profile;
