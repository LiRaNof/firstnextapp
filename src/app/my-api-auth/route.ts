import {NextResponse} from 'next/server';

import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import {getServerSession} from "next-auth/next"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
};

export async function GET() {
    const session = await getServerSession(authOptions) // セッション情報を取得

    console.log(session?.user) // ユーザ情報を取得

    return NextResponse.json({message: "ok"});
}