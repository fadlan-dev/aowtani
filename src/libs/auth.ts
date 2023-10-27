import { IUser } from '@/types';
import { NextAuthOptions, getServerSession, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify(credentials);

        const requestOptions: RequestInit = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        };

        const res = await fetch(
          `${process.env.NEXT_API_HOST}/customers/login.json`,
          requestOptions
        );

        console.log('aabbdd', res);

        const user = await res.json();
        if (user && res.ok) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }

        // Return an object that will pass error information through to the client-side.
        throw new Error(
          JSON.stringify({ errors: user.message, status: false })
        );
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, session, trigger }) {
      if (trigger === 'update') {
        token.username = session.username;
        token.name_title = session.name_title;
        token.first_name = session.first_name;
        token.last_name = session.last_name;
        token.phone = session.phone;
        token.address = session.address;
        token.post_code = session.post_code;
        token.created_at = session.created_at;
        token.updated_at = session.updated_at;
        token.updated_at = session.updated_at;
        token.profile = session.profile;
      } else if (account) {
        token.accessToken = user.token;
        token.id = user.id;
        token.username = user.username;
        token.name_title = user.name_title;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.phone = user.phone;
        token.address = user.address;
        token.post_code = user.post_code;
        token.created_at = user.created_at;
        token.updated_at = user.updated_at;
        token.updated_at = user.updated_at;
        token.profile = user.profile;
        token.token = user.token;
      }
      return token;
    },
    async session({ token, session, newSession, trigger }) {
      if (trigger === 'update') {
        console.log('newSession', newSession);
      }
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.name_title = token.name_title;
      session.user.first_name = token.first_name;
      session.user.last_name = token.last_name;
      session.user.phone = token.phone;
      session.user.address = token.address;
      session.user.post_code = token.post_code;
      session.user.created_at = token.created_at;
      session.user.updated_at = token.updated_at;
      session.user.updated_at = token.updated_at;
      session.user.profile = token.profile;
      session.user.token = token.token;

      return session;
    },
    // redirect() {
    //   return '/';
    // },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
