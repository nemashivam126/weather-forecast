let cityName = 'Indore';
async function FetchData() {
    const { default: WEATHER_API_KEY } = await import('./config.js');
    fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${cityName}`)
        .then(res => res.json())
        .then(weather => {
            // console.log(weather);
                let windDirection;
                switch (weather.current.wind_dir) {
                    case 'N':
                    windDirection = 'North';
                    break;
                    case 'E':
                    windDirection = 'East';
                    break;
                    case 'S':
                    windDirection = 'South';
                    break;
                    case 'W':
                    windDirection = 'West';
                    break;
                    default:
                    windDirection = weather.current.wind_dir;
                }
                document.querySelector('.weather').innerHTML='';
                var card = document.createElement('div');
                card.className = 'card rounded bg-primary text-center';
                card.innerHTML = `  
                                    <span class="text-center"><img src=${weather.current.condition.icon}></span>
                                    <div class="card-header text-center">
                                        <span><h1>${weather.current.temp_c}°C</h1></span><span><h1>${weather.location.name}</h1></span>
                                        <p class='text-center'>${weather.current.condition.text}</p><br>
                                        <div class="row region">
                                            <div class="col text-start">
                                                Region: ${weather.location.region}
                                            </div>
                                            <div class="col text-end">
                                                Country: ${weather.location.country}
                                            </div>
                                        </div><br>
                                    </div>
                                    <div class="row">
                                        <div class="col-3">
                                            <div>${weather.current.wind_mph}mph</div>
                                            <div>wind speed</div>
                                        </div>
                                        <div class="col-3">
                                            <div>${windDirection}</div>
                                            <div>wind direction</div>
                                        </div>
                                        <div class="col-3">
                                            <div>${weather.current.humidity}%</div>
                                            <div>humidity</div>
                                        </div>
                                        <div class="col-3">
                                            <div>${weather.current.cloud}%</div>
                                            <div>cloud</div>
                                        </div>
                                    </div>
                                `
                document.querySelector('.weather').appendChild(card)
            })
}
function handleChange(e) {
    cityName = e.target.value
    console.log(cityName);
}

window.onload = function() {
    FetchData(cityName);
};