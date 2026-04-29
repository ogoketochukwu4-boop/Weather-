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
  const city = data.name;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  let img = document.createElement('img');
  img.src = iconUrl;
  img.alt = description;
  let h2 = document.createElement('h2');
  h2.textContent = city;
  let p = document.createElement('p');
  p.textContent = `${temp}°C — ${description} | Humidity: ${humidity}%`;
  result.textContent = '';
  result.append(img, h2, p);
  document.getElementById('alertSection')
    .style.display = 'block';
}

document.getElementById('alertBtn')
  .addEventListener('click', async () => {
    const phone = document.getElementById('phoneInput').value.trim();
    if (!phone) {
      alert('Enter your phone number first');
      return;
    }
    const response = await fetch('/.netlify/functions/sendAlert', {
      method: 'POST',
      body: JSON.stringify({
        phone,
        city: cityInput.value,
        weather: document.querySelector('p').textContent
      })
    });
    if (response.ok) {
      alert('SMS Sent! 🔥');
    } else {
      alert('SMS failed. Check your number.');
    }
  });
