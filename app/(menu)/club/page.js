import ClubList from "./club-list";

export const metadata = {
    title: "클럽",
    description: "스윙 동호회 리스트입니다."
};

export default function page() {
    return (
        <ClubList />
    )
}