import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"

export default function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}