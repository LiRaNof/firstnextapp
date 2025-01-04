export {default } from "next-auth/middleware"; // defaultをママ使う。

export const config = {
    
    matcher: ["/((?!api).*)"], // ?!で否定です。
};