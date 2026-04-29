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
    
    const API_KEY = '20afcdd789fec9a9ef8dd492a92213b6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    
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