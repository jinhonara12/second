import fetchData from '../lib/database/club';
import ExternalLink from '../ExternalLink';

// next js 14부터 SSR(Server Side Rendering)은 fetch 함수로 진행
// 개발문서 링크 : https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
const getData = async () => {
    const result = await fetchData()
    return result;
}

export default async function ClubData() {
    const data = await getData()
    return (
        <>
            <h3>Club data</h3>
            <ul>
                {data.map((club, index) => (
                    <li key={index}>
                        <p>{club.name}</p>
                        <p>{club.locaiton && `위치 : ${club.locaiton}`}</p>
                        <p>{club.address && `상세주소 : ${club.address}`}</p>
                        {club.address && <p> <ExternalLink href={`https://map.naver.com/p/search/${club.address}`} text="네이버 지도" /></p>}
                        <div>
                            <p>활동요일</p>
                            {club.mainday.map((day, idx) => (
                                <ul key={idx}>
                                    <li>{day.name}</li>
                                </ul>
                            ))}
                        </div>
                        {club.facebook && <p> <ExternalLink href={club.facebook} text="페이스북" /></p>}
                        {club.instagram && <p> <ExternalLink href={club.instagram} text="인스타그램" /></p>}
                        {club.linktree && <p> <ExternalLink href={club.linktree} text="링크트리" /></p>}
                        {club.cafe && <p> <ExternalLink href={club.cafe} text="카페" /></p>}
                        {club.youtube1 && <p> <ExternalLink href={club.youtube1} text="유튜브" /></p>}
                        {club.youtube2 && <p> <ExternalLink href={club.youtube2} text="유튜브" /></p>}
                        {club.homepage && <p> <ExternalLink href={club.homepage} text="홈페이지" /></p>}
                    </li>
                ))}
            </ul>
        </>
    )
}