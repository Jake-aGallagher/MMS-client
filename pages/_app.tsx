import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import NavBar from '../navigation/navbar';
import CompanyLogo from '../public/CompanyLogo.png';

export default function App({ Component, pageProps }: AppProps) {
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
            <main className="w-screen h-screen font-sans bg-gray-100">
                <NavBar />
                <div className="pl-52 h-screen">
                    <Component {...pageProps} />
                </div>
            </main>
        </>
    );
}
