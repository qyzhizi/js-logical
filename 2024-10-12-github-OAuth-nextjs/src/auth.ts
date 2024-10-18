import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? 'defaultClientId',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? 'defaultClientSecret',
    }),
  ],
  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);