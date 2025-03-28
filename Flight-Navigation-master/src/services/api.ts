// Base API configuration and utilities
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchFromAPI(url: string): Promise<Response> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response;
}