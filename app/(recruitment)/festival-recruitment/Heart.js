'use client'
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function IsLoggined({ id, page: festArray, user_id }) {
    const { data: session, status } = useSession();
    const [heart, setHeart] = useState(false);
    const [uploading, setUploading] = useState(true);

    // 로그인 되어 있을 경우 하트 활성화
    useEffect(() => {
        if (festArray && festArray.some(fest => fest.id === id)) {
            setHeart(true)
        }
    }, []);

    function heartClick() {
        if (uploading) {
            setHeart(!heart)
            updateHeart()
        }
        setUploading(false);
    }

    const updateHeart = async () => {
        const formData = {
            type: heart,
            page_id: id,
            page_type: "festival_recruitment",
            user_id: user_id
        };

        try {
            const postFetch = await fetch('/api/database/notion/updateHeart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });


            const response = await postFetch.json()
            setUploading(response)
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    if (status === "authenticated") {
        return <span onClick={heartClick}>{heart ? <img src="/icons/heart_icon_red.png" /> : <img src="/icons/heart_icon_bl.png" />}</span>;
    }

    // 로그인 되어 있지 않은 경우 하트 비활성화
    else {
        return ""
    }
}

export default function Heart({ id, page, user_id }) {
    return (
        <SessionProvider>
            <IsLoggined id={id} page={page} user_id={user_id} />
        </SessionProvider>
    );
}