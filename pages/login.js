import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const LoginPage = () => {
  return (
    <div>Login Page</div>
  )
}

export const getServerSideProps = async context => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
      props: {}
    }
  } else {
    return {
      props: {}
    }
  }
}

LoginPage.layout = "regular";
export default LoginPage;