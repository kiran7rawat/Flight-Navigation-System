import { Weather } from '../types';

export interface WeatherRiskFactors {
  temperature: number;
  windSpeed: number;
  visibility: number;
  humidity: number;
}

export function calculateWeatherRisk({
  temperature,
  windSpeed,
  visibility,
  humidity
}: WeatherRiskFactors): number {
  const risks = [
    getTemperatureRisk(temperature),
    getWindRisk(windSpeed),
    getVisibilityRisk(visibility),
    getHumidityRisk(humidity)
  ];

  const totalRisk = risks.reduce((sum, risk) => sum + risk, 1);
  return Math.min(totalRisk, 2); // Cap at 2x
}

function getTemperatureRisk(temp: number): number {
  if (temp < -10 || temp > 35) return 0.4;
  if (temp < 0 || temp > 30) return 0.2;
  return 0;
}

function getWindRisk(speed: number): number {
  if (speed > 15) return 0.5;
  if (speed > 10) return 0.3;
  return 0;
}

function getVisibilityRisk(visibility: number): number {
  if (visibility < 3000) return 0.5;
  if (visibility < 5000) return 0.3;
  return 0;
}

function getHumidityRisk(humidity: number): number {
  if (humidity > 90) return 0.2;
  if (humidity > 80) return 0.1;
  return 0;
}