import { Fragment } from 'react';
import fetchData from '../lib/database/club';

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
                        <p>이름 : {club.name}</p>
                        <p>{club.address}</p>
                        <div>
                            <p>활동요일</p>
                            {club.mainday.map((day, idx) => (
                                <ul key={idx}>
                                    <li>{day.name}</li>
                                </ul>
                            ))}
                        </div>
                        <p>{club.facebook && `페이스북 : ${club.facebook}`}</p>
                        <p>{club.instagram && `인스타그램 : ${club.instagram}`}</p>
                        <p>{club.linktree && `링크트리 : ${club.linktree}`}</p>
                        <p>{club.cafe && `카페 : ${club.cafe}`}</p>
                        <p>{club.youtube1 && `유튜브 : ${club.youtube1}`}</p>
                        <p>{club.youtube2 && `유튜브 : ${club.youtube2}`}</p>
                        <p>{club.homepage && `홈페이지 : ${club.homepage}`}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}