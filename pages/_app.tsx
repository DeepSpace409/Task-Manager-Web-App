import '../styles/global.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
function MyApp({ Component, pageProps }) {
    return (
        <>
        <Head>
            <title>Task Manager</title>
            <meta name="description" content="A simple task manager app that hurt me in ways I can never describe" />
            <link rel="icon" href="/icon.png" />
        </Head>
        <Component {...pageProps} />
        </>
    )
}

export default MyApp