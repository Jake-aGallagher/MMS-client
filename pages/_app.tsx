import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '../components/store/store';
import { Provider } from 'react-redux';
import { useState } from 'react';
import Head from 'next/head';
import NavBar from '../components/navigation/navbar';
import Login from '../components/login/login';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
    const [loggedIn, setLoggedIn] = useState(false);

    const loginHandler = () => {
        refreshExpiry();
        setLoggedIn(true);
    };

    const logoutHandler = () => {
        setLoggedIn(false);
    };

    const refreshExpiry = () => {
        if (localStorage.getItem('expiryDate')) {
            localStorage.removeItem('expiryDate');
        }
        const remainingMilliseconds = 60 * 60 * 1000;
        setTimeout(() => {
            logoutHandler();
        }, remainingMilliseconds + 1000); // the extra thousand is to give time for token to expire on serverside
        const expiryDate = new Date().getTime() + remainingMilliseconds;
        localStorage.setItem('expiryDate', expiryDate.toString());
    };

    return (
        <>
            <Head>
                <title>Gallagtic Maintenance</title>
                <meta name="description" content="A Maintenance Management System" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
            </Head>
            <Script src="https://kit.fontawesome.com/5e0bf4683d.js" crossOrigin="anonymous" />
            <main className="h-screen font-sans bg-background text-text">
                <Provider store={store}>
                    {loggedIn ? (
                        <>
                            <NavBar logoutHandler={logoutHandler} />
                            <div className="pl-16 xl:pl-52 h-screen transition-all">
                                <Component {...pageProps} />
                            </div>
                        </>
                    ) : (
                        <Login loginHandler={loginHandler} />
                    )}
                </Provider>
            </main>
        </>
    );
}
