export const input = document.getElementById('input');
export const tempC = document.getElementById('c-select');
export const tempF = document.getElementById('f-select');
export const location = document.getElementById('location');
export const windIcon = document.getElementById('wind-icon');
export const searchBtn = document.querySelector('.btn');
export const moreInfo = document.getElementById('more-info');
export const goBack = document.getElementById('go-back');
export const addToFavouritesButton = document.getElementById('my-fav');
export const spinner = document.getElementById("spinner");

const weatherCard1 = document.getElementById('weather-card1');
const feelsLike = document.getElementById('feelslike');
const weatherText = document.getElementById('weather-text');
const tempValue = document.getElementById('temp-value');
const suggestionsCard = document.querySelector('#suggestions');
const time = document.getElementById('time');
const humidity = document.getElementById('humid-value');
const wind = document.getElementById('wind-value');
const error = document.querySelector('.error-msg');

/*MORE INFO CARD*/
const weatherCard2 = document.getElementById('weather-card2');
const moreInfoLT = document.getElementById('moreinfo-lt');
const latlong = document.getElementById('moreinfo-latlong');
const condition = document.getElementById('moreinfo-condition');
const windMPH = document.getElementById('moreinfo-wind-mph');
const windKPH = document.getElementById('moreinfo-wind-kph');
const pressure = document.getElementById('moreinfo-pressure');
const windDir = document.getElementById('moreinfo-wind-dir');
const card2humidity = document.getElementById('moreinfo-humidity');
const card2feelslikeC = document.getElementById('moreinfo-feelslike-c');
const card2feelslikeF = document.getElementById('moreinfo-feelslike-f');
const visibility = document.getElementById('moreinfo-vis');
const uv = document.getElementById('moreinfo-uv');
const gustMPH = document.getElementById('moreinfo-gust-mph');
const gustKPH = document.getElementById('moreinfo-gust-kph');

tempC.style.color = 'white';

export function initCard(){
  error.classList.add('hide')
  weatherCard1.classList.remove('hide')
  addToFavouritesButton.classList.remove('my-fav-onclick')
}

export function disableCard(){
  weatherCard1.classList.add('hide')
}

export function displayData(data) {
    /* MAIN CARD */
    const temperatureC = data.current.temp_c
    const temperatureF = data.current.temp_f
    if (tempC.style.color === 'white') {
      tempValue.innerHTML = `${temperatureC}°`;
      feelsLike.innerHTML = data.current.feelslike_c + "°"
    } else {
      tempValue.innerHTML = `${temperatureF}°`;
      feelsLike.innerHTML = data.current.feelslike_f + "°"
    }

    const timeValue = "TODAY: " + new Date().getHours() + ":" + new Date().getMinutes();
    time.innerHTML = `${timeValue}`

    const locationValue = data.location.name.toUpperCase();
    location.innerHTML = locationValue
    
    const weatherTextValue = data.current.condition.text.toUpperCase();
    weatherText.innerHTML = `${weatherTextValue}`
    
    const humidityValue = data.current.humidity;
    humidity.innerHTML = humidityValue + " %"
    
    const windValue = data.current.wind_mph;
    wind.innerHTML = windValue + " mph"
    
    displayIcon(data, data.current.is_day);

    /* MORE INFO CARD */
    const localtimeValue = data.location.localtime.split(" ")[1];
    moreInfoLT.innerHTML = localtimeValue 

    const latlongValue = `${data.location.lat} / ${data.location.lon}` ;
    latlong.innerHTML = latlongValue

    const conditionText = data.current.condition.text;
    condition.innerHTML = conditionText.toUpperCase()

    windMPH.innerHTML = windValue
    const windKPHvalue = data.current.wind_kph;
    windKPH.innerHTML = windKPHvalue

    const pressureValue = data.current.pressure_mb;
    pressure.innerHTML = pressureValue

    const windDirValue = data.current.wind_dir;
    windDir.innerHTML = `${windDirValue} (${data.current.wind_degree})`

    card2humidity.innerHTML = humidityValue

    card2feelslikeC.innerHTML = temperatureC + "°";
    card2feelslikeF.innerHTML = data.current.feelslike_c + "°";

    const visibilityValue = data.current.vis_km;
    visibility.innerHTML = visibilityValue

    const uvValue = data.current.uv;
    uv.innerHTML = uvValue

    const gustMPHValue = data.current.gust_mph;
    gustMPH.innerHTML = gustMPHValue

    const gustKPHValue = data.current.gust_kph;
    gustKPH.innerHTML = gustKPHValue
}
  
export function displayIcon(data, isDay){
    const imgFileRegex = /\d{3}\.png/
    const url = data.current.condition.icon.match(imgFileRegex)[0];
    if (isDay === 0){
      document.getElementById('tempLogo').src = `./night/${url}`
    } else {
      document.getElementById('tempLogo').src = `./day/${url}`
    }
}  

export function displaySuggestions(data,favs) {
  const suggestionsList = [];
  for (let city of data) {
    if(city.city) {
      city = city.city;
    }
    const newSuggestion = document.createElement('div');
    suggestionsList.push(newSuggestion);
    newSuggestion.textContent= city;
    newSuggestion.classList.add('div_hover');
    if(favs){
      newSuggestion.classList.add('fav');
    }

    suggestionsCard.appendChild(newSuggestion);
  }
  return suggestionsList;
}

export function deleteSuggestions() {
  suggestionsCard.innerHTML = '';
}

export function changeBackground(image) {
	document.body.style.backgroundImage = `url('${image.src.large2x}')`;
}

export function inputBarAutocomplete(text) {
  const inputBar = document.querySelector('#input');
  inputBar.value = text;
}

export function getTempBySelection(data,tempType) {
  if (tempType.innerText.trim() === "C"){
    tempValue.innerText = data.current.temp_c + "°"
    feelsLike.innerHTML = data.current.feelslike_c + "°"
    tempF.style.color = "gray"
    tempC.style.color = "white"
  }else {
    tempValue.innerText = data.current.temp_f + "°"
    feelsLike.innerHTML = data.current.feelslike_f + "°"
    tempC.style.color = "gray"
    tempF.style.color = "white"
  }
}

export function convertWind(data, windmph){
  if(wind.innerHTML === windmph + " mph"){
    wind.innerHTML = data.current.wind_kph + " kph"
  } else {
    wind.innerHTML = data.current.wind_mph + " mph"
  }
}

export function toggleSearchBar(){
  input.classList.toggle('active');
  input.classList[1]=="active" ? input.focus() : input.blur();
}

export function toggleMoreInfoCard(){
  weatherCard1.classList.add('hide');
  weatherCard2.classList.remove('hide');
}

export function goBackToMainCard(){
  weatherCard1.classList.remove('hide');
  weatherCard2.classList.add('hide');
}

export function changeHeartColor(){
  addToFavouritesButton.classList.contains('my-fav-onclick') ? addToFavouritesButton.classList.remove('my-fav-onclick') : addToFavouritesButton.classList.add('my-fav-onclick');
}

export function displayErrorMessage(){
  error.classList.remove('hide');
}