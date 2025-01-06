import { auth } from "@/auth";

// NextAuthConfigのauthorized callbackが呼び出される
export default auth;
export const config = {
    
    matcher: ["/((?!api|signin|favicon.ico).*)"],
};