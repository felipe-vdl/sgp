import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import prisma from "../../db";

import { v4 as uuid } from 'uuid';
import Head from "next/head";

const UsersPage = (props) => {
  return (
    <>
      <Head>
        <title>Usuários</title>
      </Head>
      <div>
        {props.users.map(user => (
          <div key={uuid()}>{user.id} / {user.name} / {user.email} / {user.role}</div>
        ))}
      </div>
    </>
  );
}
UsersPage.layout = "dashboard";
export default UsersPage;

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

    if (!authUser.role === "STAFF") {
      return {
        redirect: {
          permanent: false,
          destination: "/"
        },
        props: {}
      }
    }

    let users = await prisma.user.findMany();
    users = JSON.parse(JSON.stringify(users));

    return {
      props: {
        user: {
          id: authUser.id,
          name: authUser.name,
          email: authUser.email,
          role: authUser.role
        },
        users
      }
    }
  }
}
