import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import User from '@/db/models/User';
import dbConnect from '@/db/dbConnect';

export const nextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        dbConnect();
        const { username, password } = credentials;
        let user;
        try {
          user = await User.findOne({ username });
        } catch (err) {
          return null;
        }
        const hashPassword = user?.password || '';

        const match = await bcryptjs.compare(password, hashPassword);

        if (!match || !user) return null;

        return user;
      },
    }),
  ],
  pages: {
    // signIn: '/play/login',
  },
  callbacks: {
    jwt: async ({
      token, user,
    }) => {
      if (user) token.user = user;
      return token;
    },
    session: async ({ session, token }) => {
      const { username, imgSrc, _id } = token.user;

      session.user.name = username;
      session.user.image = imgSrc;
      session.user.id = _id;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(nextAuthConfig);

export { handler as GET, handler as POST };
