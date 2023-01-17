import { unstable_getServerSession } from "next-auth";
import { authOptions } from './api/auth/[...nextauth]';
import prisma from "../db";
import Head from "next/head";

const IndexPage = ({ user }) => {
  return (
    <>
      <Head>
        <title>SGP Dashboard</title>
      </Head>
      <div className="m-auto">
        <h1 className="text-slate-700 font-medium text-3xl">Olá, {user.name.split(" ")[0]}.</h1>
      </div>
    </>
  )
}

export const getServerSideProps = async context => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      },
      props: {}
    }
  } else {
    const authUser = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      }
    });

    return {
      props: {
        user: {
          id: authUser.id,
          name: authUser.name,
          email: authUser.email,
          role: authUser.role
        }
      }
    }
  }
}

IndexPage.layout = "dashboard";
export default IndexPage;