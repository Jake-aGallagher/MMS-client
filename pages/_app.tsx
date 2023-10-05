import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '../components/store/store';
import { Provider } from 'react-redux';
import { useState } from 'react';
import Head from 'next/head';
import NavBar from '../components/navigation/navbar';
import Login from '../components/login/login';
import Script from 'next/script';
import { SERVER_URL } from '../components/routing/addressAPI';

export default function App({ Component, pageProps }: AppProps) {
    const [loggedIn, setLoggedIn] = useState(false);

    const loginHandler = () => {
        setLoggedIn(true);
    };

    const logoutHandler = () => {
        setLoggedIn(false);
    };

    const forceLogoutHandler = () => {
        if (loggedIn) {
            let expiry = localStorage.getItem('expiryDate');
            if (expiry) {
                if (Date.now() < parseInt(expiry)) {
                    refreshExpiry();
                } else {
                    logoutHandler();
                }
            }
        }
        return null;
    };

    const refreshExpiry = () => {
        if (localStorage.getItem('expiryDate')) {
            localStorage.removeItem('expiryDate');
        }
        const remainingMilliseconds = 30 * 60 * 1000;
        const expiryDate = new Date().getTime() + remainingMilliseconds;
        localStorage.setItem('expiryDate', expiryDate.toString());
    };

    return (
        <>
            <Head>
                <title>UpTime</title>
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="description" content="A Maintenance Management System" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Script src="https://kit.fontawesome.com/5e0bf4683d.js" crossOrigin="anonymous" />
            <main className="h-screen font-sans bg-background text-text">
                <Provider store={store}>
                    {forceLogoutHandler()}
                    {loggedIn ? (
                        <>
                            <NavBar logoutHandler={logoutHandler} />
                            <div className="pl-16 xl:pl-52 h-screen transition-all">
                                <Component {...pageProps} />
                            </div>
                        </>
                    ) : (
                        <Login loginHandler={loginHandler} refreshExpiry={refreshExpiry} />
                    )}
                </Provider>
            </main>
        </>
    );
}
