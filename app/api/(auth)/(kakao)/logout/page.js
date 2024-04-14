export default async function logout() {
    const url = 'https://kapi.kakao.com/v1/user/logout'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer token}`,
        }
    });

    console.log(await response.json())

}