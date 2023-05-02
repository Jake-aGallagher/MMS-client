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
        setLoggedIn(true);
    };

    const logoutHandler = () => {
        setLoggedIn(false);
    };

    const forceLogoutHandler = () => {
        if (loggedIn) {
            /// @ts-ignore
            let expiry: any = new Date(localStorage.getItem('expiryDate'));
            expiry = expiry.getTime();
            if (Date.now() > expiry) {
                logoutHandler();
            }
        }
        return null;
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
                <Script src="https://kit.fontawesome.com/5e0bf4683d.js" crossOrigin="anonymous" />
            </Head>
            <main className="h-screen font-sans bg-gray-100">
                <Provider store={store}>
                    {forceLogoutHandler()}
                    {loggedIn ? (
                        <>
                            <NavBar logoutHandler={logoutHandler} />
                            <div className="pl-52 h-screen">
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
