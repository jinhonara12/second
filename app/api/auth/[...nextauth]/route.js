
import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import checkNotionData from "../kakao/checkNotionData"

export const authOptions = {
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // 로그인했을 때 카카오 고유값 ID로 노션 디비에서 필터링
            // ID로 필터링 되는 것이 없다면 디비에 고유값과 유저 페이지(디비) 작성
            await checkNotionData(user)
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
