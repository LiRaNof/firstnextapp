import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      // 注意: トークンをログ出力してはダメです。
      console.log('in jwt', { user, token, account, profile })

      if (user) {
        token.user = user;
        const u = user as any
        token.role = u.role;
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token;
    },
    session: ({ session, token }) => {
      console.log("in session", { session, token });
      token.accessToken
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
    
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
