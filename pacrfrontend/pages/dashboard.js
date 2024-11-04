import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Recommendations from '../components/Recommendations';
import Post from '../components/Post';
import ResearchPost from '../components/ResearchPost';
import Footer from '../components/Footer';
import "../app/globals.css";
import PostBox from '@/components/PostBox';
import DisplayPost from '@/components/DisplayPost';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#fff', flexDirection: 'column' }}>
      <Head>
        <title>PACR - Empowering Research, Together</title>
        <meta name="description" content="Empowering Research, Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div style={mainContainer}>
        <div style={mainInnerContainer}>
          <Sidebar />
          <main style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
              <PostBox />
              <Post />
              <DisplayPost />
              <ResearchPost />
            </div>
          </main>
          <Recommendations />
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mainContainer = {
  width: '100%',
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
  padding: '130px 0 80px',
};

const mainInnerContainer = {
  width: '100%',
  maxWidth: '1320px',
  display: 'grid',
  gridTemplateColumns: '0.5fr 1fr 0.5fr',
  gridTemplateRows: '1fr',
  gridColumnGap: '20px',
  gridRowGap: '20px',
};



export default Dashboard;