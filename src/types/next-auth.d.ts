import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      name_title: string;
      first_name: string;
      last_name: string;
      phone: string;
      address: string;
      post_code: string;
      created_at: string;
      updated_at: string;
    } & Session['user'];
  }

  interface User {
    id: string;
    username: string;
    name_title: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    post_code: string;
    created_at: string;
    updated_at: string;
    profile: Profile;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
    name_title: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    post_code: string;
    created_at: string;
    updated_at: string;
    profile: Profile;
    token: string;
  }
}
