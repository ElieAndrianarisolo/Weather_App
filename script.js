const url ='https://api.openweathermap.org/data/2.5/weather';
const apiKey = "OPEN_WEATHER_API_KEY";

$(document).ready(function () {
	weatherFn('Paris');
});

async function weatherFn(cName) {

	const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
	
    try {

		const res = await fetch(temp);
		const data = await res.json();

		if (res.ok) {
			weatherShowFn(data);
		} else {
			alert('City not found. Please try again.');
		}

	} catch (error) {
		console.error('Error fetching weather data:', error);
	}

}

function weatherShowFn(data) {

	$('#city-name').text(data.name);

    
	$('#date').text(moment.unix(Number(data.dt) + Number(data.timezone)).format('MM/DD/YYYY, h:mm:ss a'));

	$('#temperature').html(`${data.main.temp.toFixed(1)}°C`);
    
    let description = data.weather[0].description;
    let capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
	$('#description').text(capitalizedDescription);

	$('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);

	$('#weather-icon').attr('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`); 
	$('#weather-info').fadeIn();
}