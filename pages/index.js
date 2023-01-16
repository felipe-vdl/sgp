import { unstable_getServerSession } from "next-auth";
import { authOptions } from './api/auth/[...nextauth]';
import prisma from "../db";

const IndexPage = ({user}) => {
  return (
    <div>Olá, {user.name.split(" ")[0]}.</div>
  );
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