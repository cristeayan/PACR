import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Recommendations from '../components/Recommendations';
import { UserProvider } from '@/context/UserContext';

const Dashboard = () => {

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5', flexDirection: 'column' }}>
      <Head>
        <title>PACR - Empowering Research, Together</title>
        <meta name="description" content="Empowering Research, Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UserProvider>
        <Header />
        <main style={{ flex: '1', display: 'flex', flexDirection: 'row' }}>
          <Sidebar />
          <Feed />
          <Recommendations />
        </main>
      </UserProvider>
    </div>
  );
}

export default Dashboard;
