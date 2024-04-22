import fetchData from '../lib/database/club';

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
                        {club.address && <p> <a href={`https://map.naver.com/p/search/${club.address}`} target="_blank">네이버 지도 <img src="/icons/link_24px.png" /></a></p>}
                        <div>
                            <p>활동요일</p>
                            {club.mainday.map((day, idx) => (
                                <ul key={idx}>
                                    <li>{day.name}</li>
                                </ul>
                            ))}
                        </div>
                        {club.facebook && <p> <a href={club.facebook} title="페이스북 바로가기" target="_blank">페이스북<img src="/icons/link_24px.png" /> </a></p>}
                        {club.instagram && <p> <a href={club.instagram} title="인스타그램 바로가기" target="_blank">인스타그램<img src="/icons/link_24px.png" /> </a></p>}
                        {club.linktree && <p> <a href={club.linktree} title="링크트리 바로가기" target="_blank">링크트리<img src="/icons/link_24px.png" /> </a></p>}
                        {club.cafe && <p> <a href={club.cafe} title="카페 바로가기" target="_blank">카페<img src="/icons/link_24px.png" /> </a></p>}
                        {club.youtube1 && <p> <a href={club.youtube1} title="유튜브 바로가기" target="_blank">유튜브<img src="/icons/link_24px.png" /> </a></p>}
                        {club.youtube2 && <p> <a href={club.youtube2} title="유튜브 바로가기" target="_blank">유튜브<img src="/icons/link_24px.png" /> </a></p>}
                        {club.homepage && <p> <a href={club.homepage} title="홈페이지 바로가기" target="_blank">홈페이지<img src="/icons/link_24px.png" /> </a></p>}
                    </li>
                ))}
            </ul>
        </>
    )
}