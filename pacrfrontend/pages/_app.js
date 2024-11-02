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

if (!Promise.withResolvers) {
  Promise.withResolvers = () => {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

export default MyApp;
