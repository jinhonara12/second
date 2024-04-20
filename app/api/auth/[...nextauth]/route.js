
import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import makeNewNotionData from "../kakao/makeNotionData"

export const authOptions = {
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            await makeNewNotionData(user)
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, token, user }) {
            return { session, token }
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        }
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
