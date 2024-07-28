const weatherCodes = {
    0: 'day_clear.png',                         // Clear sky
    1: 'day_clear.png',                         // Mainly clear
    2: 'day_partial_cloud.png',                 // Partly cloudy
    3: 'overcast.png',                          // Overcast
    45: 'fog.png',                              // Fog
    48: 'fog.png',                              // Depositing rime fog
    51: 'rain.png',                             // Drizzle: Light
    53: 'rain.png',                             // Drizzle: Moderate
    55: 'rain.png',                             // Drizzle: Dense intensity
    56: 'rain.png',                             // Freezing Drizzle: Light
    57: 'rain.png',                             // Freezing Drizzle: Dense intensity
    61: 'day_rain.png',                         // Rain: Slight
    63: 'day_rain.png',                         // Rain: Moderate
    65: 'day_rain.png',                         // Rain: Heavy intensity
    66: 'day_rain.png',                         // Freezing Rain: Light
    67: 'day_rain.png',                         // Freezing Rain: Heavy intensity
    71: 'day_snow.png',                         // Snow fall: Slight
    73: 'day_snow.png',                         // Snow fall: Moderate
    75: 'day_snow.png',                         // Snow fall: Heavy intensity
    77: 'day_snow.png',                         // Snow grains
    80: 'day_rain.png',                         // Rain showers: Slight
    81: 'day_rain.png',                         // Rain showers: Moderate
    82: 'day_rain.png',                         // Rain showers: Violent
    85: 'day_snow.png',                         // Snow showers: Slight
    86: 'day_snow.png',                         // Snow showers: Heavy
    95: 'thunder.png',                          // Thunderstorm: Slight or moderate
    96: 'rain_thunder.png',                     // Thunderstorm with slight hail
    99: 'rain_thunder.png'                      // Thunderstorm with heavy hail
};


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.search').addEventListener('click', async () => {
        const city = document.querySelector('.city').value;

        if (!city) {
            alert('Please Enter a City Name');
        } else {
            let weatherInfo;
            try {
                weatherInfo = await axios.get(`http://localhost:8000/api/v1/weather/${city}`);
            } catch (error) {
                alert(error.response.data.message);
                return;
            }
            document.querySelector('.weather-img').classList.remove('hidden');
            document.querySelector('.temperature').classList.remove('hidden');
            document.querySelector('.wind-dir-windspeed').classList.remove('hidden');
            const weatherImgSrc = './icons/' + weatherCodes[weatherInfo.data.current_weather.weathercode];
            const temperature = document.querySelector('.temperature');
            temperature.innerHTML = `${Math.round(weatherInfo.data.current_weather.temperature)}` + ` ${weatherInfo.data.current_weather_units.temperature}`;
            const weatherImg = document.querySelector('.weather-img');
            weatherImg.src = weatherImgSrc;
            const windspeed = document.querySelector('.windspeed span');
            windspeed.innerHTML = `${weatherInfo.data.current_weather.windspeed}` + ` ${weatherInfo.data.current_weather_units.windspeed}`;
            const windDir = document.querySelector('.wind-dir span');
            windDir.innerHTML = `${weatherInfo.data.current_weather.winddirection}` + ` ${weatherInfo.data.current_weather_units.winddirection}`;
        }
    });
});