import React from 'react';
import { Weather } from '../types';
import { Cloud, Thermometer, Wind, Eye } from 'lucide-react';
import { WeatherMetric } from './WeatherMetric';

interface WeatherPanelProps {
  weather: Weather;
  cityName: string;
  title?: string;
}

export const WeatherPanel: React.FC<WeatherPanelProps> = ({ weather, cityName, title }) => {
  const metrics = [
    {
      icon: <Thermometer className="text-red-500" />,
      label: "Temperature",
      value: `${weather.temperature.toFixed(1)}°C`,
    },
    {
      icon: <Cloud className="text-blue-500" />,
      label: "Humidity",
      value: `${weather.humidity.toFixed(0)}%`,
    },
    {
      icon: <Wind className="text-green-500" />,
      label: "Wind Speed",
      value: `${weather.windSpeed.toFixed(1)} m/s`,
    },
    {
      icon: <Eye className="text-purple-500" />,
      label: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg p-6 w-full xl:w-full mx-auto pr-4">
      <h3 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-white">
        {title || `Weather in ${cityName}`}
      </h3>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{cityName}</p>

      <div className="grid grid-cols-1 gap-6 -ml-3">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center space-x-3 ">
            <div className="flex items-center justify-center h-12 w-12 bg-white dark:bg-gray-600 rounded-full shadow-md">
              {metric.icon}
            </div>
            <div className="flex-1">
              <p className="text-lg font-medium text-blue-800 dark:text-white truncate">{metric.label}</p>
              <p className="text-lg text-gray-700 dark:text-gray-300">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
