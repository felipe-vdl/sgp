import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import DashboardLayout from "../components/layout/Dashboard";
import RegularLayout from "../components/layout/Regular";

const layouts = {
  "dashboard": DashboardLayout,
  "regular": RegularLayout
}

export default function App({ Component, session, pageProps }) {
  const Layout = layouts[Component.layout];

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
