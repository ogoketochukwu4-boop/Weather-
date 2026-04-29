const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const result = document.getElementById('result');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  
  if (!city) {
    result.textContent = 'Please enter a city';
    return;
  }

  getWeather(city);
});
async function getWeather(city) {
  try {
    result.textContent = 'Searching...';

    const response = await fetch(
      `/.netlify/functions/weather?city=${city}`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    displayWeather(data);

  } catch (error) {
    result.textContent = error.message;
  }
}
function displayWeather(data) {
  const temp = Math.round(data.main.temp);
  const city = data.name// you fill this
  const description = data.weather[0].description;// you fill this
  const humidity = data.main.humidity;
  
  const icon = data.weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
let img = document.createElement('img');
img.src = iconUrl;
img.alt = description; // accessibility for your dad ✅// returns something like "04d"
// you fill this
console.log(data)
let h2 = document.createElement('h2');
h2.textContent = city;

let p = document.createElement('p');
  p.textContent =`The temperature is ${temp}°c  ${description} the humidity is ${humidity}%`; 
  result.textContent = '';
  result.append(h2,p,img);// you build this
}
