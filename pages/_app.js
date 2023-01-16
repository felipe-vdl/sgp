import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import DashboardLayout from "../layouts/Dashboard";
import RegularLayout from "../layouts/Regular";

const layouts = {
  "dashboard": DashboardLayout,
  "regular": RegularLayout
}

export default function App({ Component, session, pageProps }) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
