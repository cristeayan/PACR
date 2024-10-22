// pages/_app.js
import { UserProvider } from '@/context/UserContext';
import '../app/globals.css'; // global styles

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
