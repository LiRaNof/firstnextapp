import { NextResponse } from 'next/server';

import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next"

export const authOptions: NextAuthOptions = {
    debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
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

export async function GET() {
    const session = await getServerSession(authOptions) // セッション情報を取得

    console.log(session?.user) // ユーザ情報を取得

    return NextResponse.json({ message: "ok" });
}