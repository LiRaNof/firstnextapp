import type { NextAuthConfig } from "next-auth";
 import Google from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
 providers: [
       Google, // たったこれだけ
 ],
 
 callbacks: {
  authorized: async ({ auth }) => {
    // Logged in users are authenticated, otherwise redirect to login page
    return !!auth
  },
  async jwt({ token, user, account }) {
    if (user && account?.id_token) {
      token.idToken = account?.id_token;
    }
    return token;
  },
  async session({ token, session }) {
    session.idToken = token.idToken;
    return session;
  },
},
};