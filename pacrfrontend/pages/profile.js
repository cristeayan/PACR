import Head from 'next/head';
import Header from '../components/Header';
import { useState } from 'react';
import "../app/globals.css";
import { useUser } from '../context/UserContext';
import PostBox from '@/components/PostBox';


const Profile = () => {
  const [activeTab, setActiveTab] = useState('Profile'); // State to handle active tab
  const { user } = useUser();

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div style={leftColumnStyle}>
            {/* Profile Tab Content */}
            <div style={postStyle}>
              <h2 style={aboutHeading}>About</h2>
              <p style={aboutText}>Passionate about transcending boundaries and igniting imaginations, I've embraced the digital canvas for my artistic journey. Specializing in graphic design, UX design, digital art, and architecture, my work aims to create meaningful experiences and evoke emotions, blending beauty with functionality.</p>
              <p style={seeMoreText}>...See More</p>
              <div style={aboutDetailStyle}>
                <div style={aboutDetailwrap}>
                  <img src='Profile Work Icon.svg'></img>
                  <p style={aboutDetailText}>Works at Beth Israel Deaconess Medical Center</p>
                </div>
                <div style={aboutDetailwrap}>
                  <img src='Profile Postdoc Icon.svg'></img>
                  <p style={aboutDetailText}>Postdoc Research Fellow</p>
                </div>
                <div style={aboutDetailwrap}>
                  <img src='Profile Studied Icon.svg'></img>
                  <p style={aboutDetailText}>Studied at Kasturba Medical College, Mangalore</p>
                </div>
                <div style={aboutDetailwrap}>
                  <img src='Profile Lives Icon.svg'></img>
                  <p style={aboutDetailText}>Lives in Boston, MA</p>
                </div>
                <div style={aboutDetailwrap}>
                  <img src='Profile Joined Icon.svg'></img>
                  <p style={aboutDetailText}>Joined on August 1st, 2022</p>
                </div>
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

        {/* Header */}
        <Header />

        {/* Profile Main Content */}
        <div style={profilePageStyle}>
          {/* Header Section with Background Image */}
          <div style={headerStyle}>
            <img src="/Placeholder Cover.jpg" alt="Profile Background" style={backgroundImageStyle} />
          </div>

          {/* User Information */}
          <div style={profileMainWrapper}>
            <div style={profileInfoWrapperStyle}>
              <div style={userImageWrapperStyle}>
                <img src={user ? "http://127.0.0.1:8000"+user.profile_picture : '/dummy-man.png'} alt="Profile" style={profileImageStyle} />
              </div>
              <div style={userInfoStyle}>
                <h1 style={userNameHeading}>{user?user.first_name+' '+user.last_name:"why"}</h1>
                <p style={userProfileTagline}>Postdoctoral Research Fellow at Beth Israel Deaconess Medical Center, Harvard University | MBBS | Graduate of Kasturba Medical College, Mangalore, Manipal Academy of Higher Education</p>
              </div>
            </div>

            {/* User Location Information */}
            <div style={locationWrapperStyle}>
              <p>Boston, Massachusetts, United States</p>
              <div style={dotWrapperStyle}></div>
              <div style={userContactWrapStyle}>
                <img src='Profile Phone Icon.svg' alt='Phone Icon' />
                <img src='Profile Message Icon.svg' alt='Message Icon' />
                <img src='Profile Globe Icon.svg' alt='Globe Icon' />
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
              <a href='#' style={analyticsButtonStyle}><img src='Analytics Icon.svg' alt='Analytics Icon' /> Analytics</a>
            </div>

            {/* Horizontal Divider */}
            <div style={dividerWrapperStyle}></div>

            {/* Tabs Section */}
            <div style={tabsWrapperStyle}>
              <div style={activeTab === 'Profile' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('Profile')}>Profile</div>
              <div style={activeTab === 'About' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('About')}>Statistics</div>
              <div style={activeTab === 'Research' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('Research')}>Research</div>
              <div style={activeTab === 'Network' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('Network')}>Network</div>
            </div>

            {/* Tab Content */}
            <div style={contentWrapperStyle}>
              {renderTabContent()}

              {/* Right Column (This is where the posting box will appear in the Profile tab) */}
              <div style={rightColumnStyle}>
                <PostBox/>

                {/* Featured Section */}
                <div style={featuredPostStyle}>
                  <h3>Featured</h3>
                  <p>Excited to share that I will be joining the research at Harvard...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  display: 'grid',
  gridTemplateColumns: '0.5fr 1fr',
  gridTemplateRows: '1fr',
  gridColumnGap: '20px',
  gridRowGap: '20px',
  marginTop: '40px',
};

const leftColumnStyle = {
  width: '100%',
};

const rightColumnStyle = {
  width: '100%',
};

const postStyle = {
  padding: '24px 18px 30px 28px',
  marginBottom: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '5px 4px 16px 0px #0000001C',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const aboutHeading = {
  fontSize: '20px',
  color: '#313131',
  fontWeight: '600',
  lineHeight: '28px',
  letterSpacing: '-2%',
};

const aboutText = {
  fontSize: '12px',
  lineHeight: '16.8px',
  fontWeight: '400',
  letterSpacing: '2%',
  color: '#313131',
};

const seeMoreText = {
  fontSize: '12px',
  lineHeight: '16.8px',
  fontWeight: '500',
  letterSpacing: '2%',
  color: '#4fcff5',
  textAlign: 'end',
};

const aboutDetailStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const aboutDetailwrap = {
  display: 'flex',
  flexDirection: 'row',
  gap: '14px',
  alignItems: 'center',
};

const aboutDetailText = {
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '26px',
  letterSpacing: '2%',
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

const postBoxWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '5px 4px 16px 0px #0000001C',
  marginBottom: '20px',
  gap: '16px',
};

const postBoxProfilePicStyle = {
  width: '90px',
  height: '94px',
  borderRadius: '12px',
  border: '0.5px solid #313131',
};

const postBoxContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '20px',
};

const postBoxInputStyle = {
  width: '100%',
  padding: '14px 24px',
  fontSize: '12px',
  lineHeight: '13.2px',
  border: '1px solid #ddd',
  borderRadius: '200px',
  backgroundColor: '#f2f2f2',
  color: '#313131',
};

const postBoxButtonsWrapperStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const postBoxButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#313131',
  border: 'none',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '16.8px',
  letterSpacing: '2%',
  backgroundColor: 'transparent',
};


export default Profile;
