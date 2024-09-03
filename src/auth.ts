import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { connectDb } from './lib/db';
import User from './lib/userModel';
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.email) {
        session.user.id = token.sub;
        session.user.email = token.email;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        if (user.email) {
          token.email = user.email;
        }
      }
      return token;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        try {
          const { email, name, image, id } = user;
          return true;
          // await connectDb();

          // const alreadyUser = await User.findOne({ email });

          // if (alreadyUser) {
          //   console.log(email, name, image, id);
          //   return true;
          // } else {
          //   return false;
          // }
        } catch (error) {
          return false;
        }
      }
      return true;
    },
  },
});
