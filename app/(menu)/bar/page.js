import BarList from "./bar-list";
import { Suspense } from 'react';
import Loading from '../../(component)/Loading';

export const metadata = {
    title: "바",
    description: "스윙 바 리스트입니다."
};

export default function page() {
    return (
        <Suspense fallback={<Loading />}>
            <BarList />
        </Suspense>
    )
}