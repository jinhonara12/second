import styles from './page.module.scss';
import { Suspense } from 'react';
import Loading from '../../(component)/Loading';

export const metadata = {
    title: "소개",
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
                                    <p>스윙데일리는 '동호회'와 '팀', '바' 그리고 각종 '대회', '행사' 소식을 전달하기 위하여 만들어진 커뮤니티 사이트입니다.</p>
                                    <p> * 스윙데일리는 린디합 위주의 정보만 다루고 있습니다.</p>
                                    <p> * 다른 장르에 대한 내용은 추후 데이터 관리 방침이 정리되면 확장할 예정입니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <span>02.</span>
                            </div>
                            <div className={styles.right}>
                                <h3>홈페이지 구성</h3>
                                <div className={styles.sub_text}>
                                    <p>동호회와 팀과 바에 대한 기본적인 소개와 각 주체가 모집하는 내용 및 스윙 대회와 행사 정보를 다루고 있습니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <span>03.</span>
                            </div>
                            <div className={styles.right}>
                                <h3>페이지 안내</h3>
                                <div className={styles.sub_text}>
                                    <p>- 'HOME'에서는 7일 이내 마감되는 모든 모집글과 최근에 업데이트 또는 작성된 모집글이 각 10개 / 5개 노출 됩니다.</p>
                                    <p>- 'ABOUT'은 스윙데일리의 구성과 설명 그리고 앞으로 업데이트될 내용을 전달합니다.</p>
                                    <p>- 'CLUB', 'BAR'은 스윙 강습이 이뤄지는 동호회와 바의 기본적인 정적인 정보를 취급하고 있습니다.</p>
                                    <p>- 'TEAM'은 스윙 팀을 소개하며, 팀의 정보가 노출되기를 원하는 팀만 기본 정보를 받아서 노출 시키고 있습니다.</p>
                                    <p>- 'Class' / 'Team' / 'Workshop' / 'Event' / 'Festival' 모집 페이지는 sns 및 동호회 카페에 업로드되어 있는 내용을 갈무리하여 노출시킵니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <span>04.</span>
                            </div>
                            <div className={styles.right}>
                                <h3>마이페이지</h3>
                                <div className={styles.sub_text}>
                                    <p>스윙데일리는 카카오 로그인을 통해서 최초 1회 가입이 진행됩니다. 고유 카카오ID 값으로 가입이 완료되며, 마이페이지 내에서 개인정보를 변경할 수 있습니다.</p>
                                    <p>* (개발중) 스윙과 관련된 정보를 남겨놓을 수 있으며 좋아하는 소식을 받아보기 위하여 좋아하는 바와 클럽을 저장할 수 있고 개별 모집 글에서 '좋아요'를 선택한 행사와 대회를 확인 할 수 있습니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <span>05.</span>
                            </div>
                            <div className={styles.right}>
                                <h3>정보 업데이트</h3>
                                <div className={styles.sub_text}>
                                    <p>스윙에 대한 다양한 정보를 다루고 있습니다. <a href={process.env.GOOGLE_DATA_FORM} target="_blank">여기</a>를 클릭하셔서 스윙데일리를 업데이트 해주세요.</p>
                                    <p>스윙데일리는 수동으로 개별 데이터를 직접 입력합니다. 업데이트가 다소 늦을 수 있는 점 양해바랍니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <span>06.</span>
                            </div>
                            <div className={styles.right}>
                                <h3>추후 업데이트 예정</h3>
                                <div className={styles.sub_text}>
                                    <p>💬 홈페이지 내에서 주고받을 수 있는 채팅 페이지</p>
                                    <p>🏆 마이페이지에서 스윙데일리에 등록된 대회 기준으로 수상 정보 기입</p>
                                    <p>🏅 수상한 인원을 확인할 수 있는 리스트 페이지</p>
                                    <p>1️⃣ 스윙을 처음 접하는 인원을 대상으로 하는 원데이 홍보 페이지</p>
                                    <p>🎧 스윙데일리에 등록된 바에서 진행되는 소셜 디제이 캘린더 페이지</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.left}>
                                <span>07.</span>
                            </div>
                            <div className={styles.right}>
                                <h3>기타</h3>
                                <div className={styles.sub_text}>
                                    <p>⚠️ 홈페이지의 내용은 모두 데이터베이스와 실시간으로 연동되고 있습니다.</p>
                                    <p>⚠️ 새로운 데이터가 입력되고 있을 때 홈페이지 접속에 오류가 있을 수 있습니다.</p>
                                    <p>⚠️ 데이터를 실시간으로 연동하기 때문에 로딩에 시간이 오래 걸릴 수 있습니다.</p>
                                    <p>✅ 속도 개선을 위한 방향은 새롭게 고민하도록 하겠습니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Suspense>
    )
}