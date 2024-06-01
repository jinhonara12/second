import styles from './page.module.scss';
import { Suspense } from 'react';
import Loading from '../../(component)/Loading';

export const metadata = {
    title: "소개",
    description: "데일리스윙은 스윙댄스 커뮤니티 사이트로 다양한 정보와 스윙과 관련된 정보를 제공합니다."
};

export default function About() {
    return (
        <Suspense fallback={<Loading />}>
            <main className={styles.main}>
                <section>
                    <div className={styles.img_box}>
                        <span>just swing it</span>
                    </div>
                    <div className={styles.about_box}>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <span>01.</span>
                            </div>
                            <div className={styles.right}>
                                <h3>스윙데일리</h3>
                                <div className={styles.sub_text}>
                                    <p>데일리스윙은 린디하퍼의 커뮤니티 지향합니다.</p>
                                    <p>'동호회'와 '팀', '바' 그리고 각종 '대회', '행사' 모집 관련 게시글을 취합합니다.</p>
                                    <p>- 데일리스윙은 린디합 위주의 정보만 다루고 있습니다.</p>
                                    <p>- 다른 장르에 대한 내용은 추후 데이터 관리 방침이 정리되면 확장할 예정입니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <span>02.</span>
                            </div>
                            <div className={styles.right}>
                                <h3>홈페이지 안내</h3>
                                <div className={styles.sub_text}>
                                    <p>- 'HOME'에서는 [7일 이내 마감되는 모든 모집글]과 [최근에 업데이트 또는 작성된 모집글]이 각 10개 / 5개 노출 됩니다.</p>
                                    <p>- 'ABOUT'은 스윙데일리의 구성과 설명 내용을 전달합니다.</p>
                                    <p>- 'BETA'는 홈페이지 수정 및 추가 로그 기록용입니다.</p>
                                    <p>- 'CLUB', 'BAR'은 스윙 강습이 이뤄지는 동호회와 바의 기본적인 정적인 정보를 취급하고 있습니다.</p>
                                    <p>- 'TEAM'은 스윙 팀을 소개하며, 팀의 정보가 노출되기를 원하는 팀만 기본 정보를 받아서 노출 시키고 있습니다.</p>
                                    <p>- 'Class' / 'Team' / 'Workshop' / 'Event' / 'Festival' 모집 페이지는 sns 및 동호회 카페에 업로드되어 있는 내용을 갈무리하여 노출시킵니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <span>03.</span>
                            </div>
                            <div className={styles.right}>
                                <h3>마이페이지</h3>
                                <div className={styles.sub_text}>
                                    <p>스윙데일리는 카카오 로그인을 통해서 최초 1회 가입이 진행되며, 마이페이지 내에서 개인정보를 변경할 수 있습니다.</p>
                                    <p>- Privacy 항목은 유저의 개인 정보를 수정할 수 있습니다.</p>
                                    <p>- Member 항목은 유저의 스윙 정보를 수정할 수 있습니다.</p>
                                    <p>- Awards 항목은 유저의 스윙 수상 경력을 수정할 수 있습니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <span>04.</span>
                            </div>
                            <div className={styles.right}>
                                <h3>정보 업데이트</h3>
                                <div className={styles.sub_text}>
                                    <p>스윙에 대한 다양한 정보를 다루고 있습니다. <a href={process.env.GOOGLE_DATA_FORM} target="_blank">여기</a>를 클릭하셔서 스윙데일리를 업데이트 해주세요.</p>
                                    <p>스윙데일리는 수동으로 개별 데이터를 직접 입력하고 있어서 업데이트가 다소 늦을 수 있는 점 양해바랍니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <span>05.</span>
                            </div>
                            <div className={styles.right}>
                                <h3>기타</h3>
                                <div className={styles.sub_text}>
                                    <p>⚠️ 모집 관련 게시글은 데이터베이스와 실시간으로 연동되고 있습니다.</p>
                                    <p>⚠️ 데이터를 실시간으로 연동하기 때문에 로딩 시간이 발생 수 있습니다.</p>
                                    <p>✅ 속도 개선을 위한 방향은 새롭게 고민하도록 하겠습니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* <div className={styles.item}>
                            <div className={styles.left}>
                                <span>06.</span>
                            </div>
                            <div className={styles.right}>
                                <h3>추후 업데이트 예정</h3>
                                <div className={styles.sub_text}>
                                    <p>🏆 각종 수상 내역과 리스트 페이지</p>
                                    <p>💬 소통할 수 있는 커뮤니티 페이지</p>
                                    <p>🎧 소셜 및 디제이 캘린더 페이지</p>
                                    <p>1️⃣ 외부 모집을 위한 원데이 홍보 페이지</p>
                                    <p>🔔 관심있는 행사 소식 카카오톡 알림 기능</p>
                                </div>
                            </div>
                        </div> */}


                    </div>
                </section>
            </main>
        </Suspense>
    )
}