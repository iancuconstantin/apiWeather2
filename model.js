const weatherUrl = "http://api.weatherapi.com/v1/current.json?key="
const WEATHER_API_KEY = "9510a5885bd544ee944184333231605"

async function getCityWeatherData(input){
	const response = await fetch (`${weatherUrl}${WEATHER_API_KEY}&q=${input}`);
	const data = await response.json();
	return data;
}

const citiesOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ed66aa3ec7mshba8466f47ef8dd4p19f548jsndb9f6a291a44',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

async function searchCities(input){
	const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=200000&namePrefix=${input}`,citiesOptions);
  	const data = await response.json();
  	return data;
}

const photosOptions = {
	method: 'GET',
	headers: {
		Authorization: '563492ad6f917000010000012ff3f9350b004d4ca4877940ebbc3731'
	}
}

async function searchPhotos(input) {
	const response = await fetch(`https://api.pexels.com/v1/search?query=${input}`, photosOptions);
	const data = await response.json();
	return data;
}

function addToLocalStorage(city) {
	if (!localStorage.favouriteCities) {
		localStorage.favouriteCities = '[]';
	}
	if (city !== '') {
		const data = JSON.parse(localStorage.favouriteCities);
		data.push(city.toUpperCase());
		const citiesSet = new Set(data);
		localStorage.favouriteCities = JSON.stringify(Array.from(citiesSet));
	}
}

function getFavouriteCities() {
	if (localStorage.favouriteCities) {
		return new Promise((resolve, reject) => {
			const data = JSON.parse(localStorage.favouriteCities);
			resolve(data);
		})
	}
}

function deleteFavouriteCity(city) {
    const data = JSON.parse(localStorage.favouriteCities);
    data.splice(data.indexOf(city), 1);
    localStorage.favouriteCities = JSON.stringify(data);
}

export {
	deleteFavouriteCity,
    getCityWeatherData,
    searchCities,
    searchPhotos,
	addToLocalStorage,
	getFavouriteCities,
}