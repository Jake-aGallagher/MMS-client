import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import NavBar from '../navigation/navbar';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>MMS test</title>
                <meta name="description" content="A Maintenance Management System" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className="w-screen h-screen font-sans bg-gray-100">
                    <NavBar />
                    <Component {...pageProps} />
            </main>
        </>
    );
}
