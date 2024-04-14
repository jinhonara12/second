export default async function logout() {
    const url = 'https://kapi.kakao.com/v1/user/logout'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer p1kgs7MHwl6AEcz0KQLfxvGaqKA6KOJtE3sKKw0gAAABjtvuZRD6Fwx8Dt1GgQ}`,
        }
    });

    console.log(await response.json())

}