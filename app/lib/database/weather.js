export default async function getWeather() {
    // const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=37.5665&lon=126.9780&exclude=current,daily,minutely&units=metric&lang=kr&appid=${process.env.WEATHER_EN}`)

    const data = await response.json()
    return data
}