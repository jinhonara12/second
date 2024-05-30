import ClubList from "./club-list";
import { Suspense } from 'react';
import Loading from '../../(component)/Loading';

export const metadata = {
    title: "클럽",
    description: "스윙 동호회 리스트입니다."
};

const structuredData = {
    "@context": "http://schema.org", // 데이터가 Schema.org 어휘를 사용하여 설명되고 있음을 나타냅니다.
    "@type": "Organization",
    name: "스윙댄스 동호회 리스트",
    url: "https://www.daily-swing.com/club",
    description: "스윙댄스 동호회 리스트입니다.",
};

export default function page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Suspense fallback={<Loading />}>
                <ClubList />
            </Suspense>
        </>
    )
}