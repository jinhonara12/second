"use client"
import styles from "./page.module.scss"
import { signOut, SessionProvider, signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

function Join() {
    const { data: session, status } = useSession()
    if (status === "unauthenticated") {
        return (
            <div className={styles.join}>
                <div className={styles.terms}>
                    <div className={styles.textarea}>
                        {`개인정보 수집 및 이용에 대한 동의
                
                데일리스윙은 개인정보 보호에 대한 중요성을 인식하고 있으며, 개인정보 보호법을 준수하고 있습니다. 본 약관은 데일리스윙이 수집하는 개인정보와 그 이용 목적, 보유 기간 등에 대해 설명합니다.

                1. 수집하는 개인정보 항목
                데일리스윙은 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:
                - 카카오 고유 아이디 (Kakao ID)
                - 카카오 닉네임
                
                또한, 사용자가 마이페이지에서 입력할 수 있는 추가 정보는 다음과 같습니다:
                - 사용자가 자발적으로 제공한 개인정보: 이름, 이메일 주소, 연락처, 생년월일
                - 사용자가 자발적으로 제공한 스윙정보: 닉네임, 스윙시작날짜
                
                2. 개인정보의 수집 및 이용 목적
                수집된 개인정보는 다음의 목적으로 사용됩니다:
                - 회원 관리: 회원 식별, 로그인 유지, 고객 지원
                - 서비스 제공: 마이페이지에서 정보 수정 및 개인화된 서비스 제공
                
                3. 개인정보의 보유 및 이용 기간
                데일리스윙은 개인정보 수집 및 이용은 서비스 제공하는 기간 동안 사용되며 회원탈퇴 전까지 보관합니다.
                - 회원 탈퇴 시: 즉시 파기
                - 서비스 제공 기간 동안: 사용자가 서비스를 이용하는 동안 보유
                
                4. 개인정보의 제공
                데일리스윙은 수집된 개인정보를 외부에 제공하지 않습니다. 다만, 법령에 따라 요구되는 경우는 예외로 합니다.

                5. 개인정보의 관리 및 보호
                데일리스윙은 사용자의 개인정보를 안전하게 관리하기 위해 다음과 같은 대책을 마련하고 있습니다:
                - 관리적 대책: 개인정보 접근 권한 최소화
                
                6. 이용자의 권리와 행사 방법
                이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있습니다. 또한, 개인정보 수집 및 이용에 대한 동의를 철회할 수 있습니다.
                - 개인정보 조회/수정: 마이페이지에서 직접 조회 및 수정
                - 동의 철회: 문의 링크를 통해 문의 요청
                
                7. 개인정보 보호책임자 및 문의
                개인정보 보호와 관련된 문의는 아래의 연락처로 해주시기 바랍니다:
                - 개인정보 보호책임자: 스윙데일리 관리자
                - 문의처: 하단에 표기된 문의 링크
                
                본 약관은 2024년 6월 14일부터 시행됩니다.`}
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.text}>
                        <p>회원 가입은 카카오 로그인을 통해서 카카오 계정으로 자동 가입 등록됩니다.</p>
                        <p>추가 회원정보는 카카오 계정으로 로그인 후 마이페이지에서 변경 가능합니다.</p>
                        <p>하단 버튼을 클릭하면 개인정보 수집 및 이용 약관에 동의한 것으로 간주됩니다.</p>
                    </div>
                    <div className={styles.login}>
                        <button
                            onClick={() => {
                                signIn("kakao")
                            }}
                        >
                            <img src="/icons/kakao.png" alt="카카오 로그인 이미지" />
                            login with kakao
                        </button>
                    </div>
                </div>
            </div>
        )
    } else if (status === "authenticated") {
        const router = useRouter()
        router.push("/")
    }
}

export default function page() {
    return (
        <SessionProvider>
            <Join />
        </SessionProvider>
    )
}
