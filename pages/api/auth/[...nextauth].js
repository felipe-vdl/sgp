import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from "../../../db";
import bcrypt from 'bcrypt';

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      authorize: async credentials => {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          }
        });        
        if (!user) throw new Error('User doesn\'t exist.');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error('Invalid credentials.');

        return {
          name: user.name,
          email: user.email,
          image: user.role,
        };
      },
      pages: {
        signIn: '/login',
        error: '/error'
      }
    }),
  ]
}

export default NextAuth(authOptions);