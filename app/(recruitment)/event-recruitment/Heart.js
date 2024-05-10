'use client'
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";



function IsLoggined({ id, page: eventArray, user_id }) {
    const { data: session, status } = useSession();
    const [heart, setHeart] = useState(false);
    const [uploading, setUploading] = useState(true);

    // 로그인 되어 있을 경우 하트 활성화
    useEffect(() => {
        if (eventArray && eventArray.some(event => event.id === id)) {
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
            page_type: "event_recruitment",
            user_id: user_id,

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
        return <span onClick={heartClick}>{heart ? "❤️" : "🩶"}</span>;
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