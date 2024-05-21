import TeamList from "./Team-list";
import { Suspense } from 'react';
import Loading from '../../(component)/Loading';

export const metadata = {
    title: "팀",
    description: "스윙 팀 리스트입니다."
};

export default function Team() {
    return (
        <Suspense fallback={<Loading />}>
            <TeamList />
        </Suspense>
    )
}