import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('authorize', credentials);
        // Add logic here to look up the user from the credentials supplied
        const user = {
          id: '1',
          name: 'ManDo',
          email: 'fadlan.8291@gmial.com',
          username: 'fadlan.8291@gmail.com',
        };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.username = token.username;
      }

      return session;
    },

    async jwt() {
      return {
        id: '1997',
        name: 'ManDo',
        email: 'fadlan.8291@gmail.com',
        username: 'fadlan.8291@gmail.com',
      };
    },
    redirect() {
      return '/';
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
