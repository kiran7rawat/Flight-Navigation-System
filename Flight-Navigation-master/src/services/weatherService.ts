import { Weather } from '../types';
import { fetchFromAPI } from './api';
import { getMockWeatherData } from './mockWeatherService';

const API_KEY = 'f93f58c094c3d0295ee111451259b2e6';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeatherData(latitude: number, longitude: number): Promise<Weather> {
  if (!API_KEY) {
    console.warn('No API key provided, using mock data');
    return getMockWeatherData(latitude, longitude);
  }

  try {
    const response = await fetchFromAPI(
      `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return parseWeatherData(data);
  } catch (error) {
    console.warn('Weather API error, falling back to mock data:', error);
    return getMockWeatherData(latitude, longitude);
  }
}

function parseWeatherData(data: any): Weather {
  return {
    id: String(data.id || Date.now()),
    cityId: String(data.id || Date.now()),
    temperature: data.main.temp,
    humidity: data.main.humidity,
    visibility: data.visibility,
    windSpeed: data.wind.speed,
    timestamp: new Date().toISOString(),
  };
}
