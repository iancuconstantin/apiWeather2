import * as model from "./model.js";
import * as view from "./view.js";

async function fetchInformation(inputLocation, spinner) {
    spinner.removeAttribute('hidden');
    const weatherData = await model.getCityWeatherData(inputLocation);
    spinner.setAttribute('hidden', '')
    return [weatherData];
}

function displayContent(weatherData) {
    view.deleteSuggestions();
    view.displayData(weatherData); 
    isCityFavourite(weatherData.location.name)
    view.initCard();
    view.goBackToMainCard();
}

async function isCityFavourite(searchedCity){
	try {
	    const favs = await model.getFavouriteCities()
        favs.includes(searchedCity.toUpperCase()) ?  view.addToFavouritesButton.classList.add('my-fav-onclick') : true;
    } catch (error) {
        console.log(error);
    }
}

export { fetchInformation, displayContent };