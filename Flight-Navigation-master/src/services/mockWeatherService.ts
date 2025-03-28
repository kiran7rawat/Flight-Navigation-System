import { Weather } from '../types';

export function getMockWeatherData(latitude: number, longitude: number): Weather {
  // Generate realistic mock data based on latitude
  const baseTemp = getBaseTemperature(latitude);
  
  return {
    id: `mock_${Date.now()}`,
    cityId: `city_${Date.now()}`,
    temperature: baseTemp + (Math.random() * 10 - 5),
    humidity: 60 + (Math.random() * 20 - 10),
    visibility: 10000 - (Math.random() * 2000),
    windSpeed: 5 + (Math.random() * 5),
    timestamp: new Date().toISOString(),
  };
}

function getBaseTemperature(latitude: number): number {
  // Simulate temperature variation based on latitude
  const absLat = Math.abs(latitude);
  if (absLat > 60) return 5;  // Polar regions
  if (absLat > 40) return 15; // Temperate regions
  return 25; // Tropical regions
}