import React from 'react';
import { Weather, City } from '../types';
import {WeatherPanel }from './WeatherPanel';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface WeatherComparisonProps {
  sourceCity: City;
  destinationCity: City;
  sourceWeather: Weather;
  destinationWeather: Weather;
  routeRisk: number;
}

const WeatherComparison: React.FC<WeatherComparisonProps> = ({
  sourceCity,
  destinationCity,
  sourceWeather,
  destinationWeather,
  routeRisk,
}) => {
  const getSafetyMessage = (risk: number) => {
    if (risk < 1.2) return {
      message: "Conditions are favorable for flight",
      icon: <CheckCircle className="text-green-500 w-6 h-6" />,
      color: "text-green-700"
    };
    if (risk < 1.5) return {
      message: "Exercise caution during flight",
      icon: <Shield className="text-yellow-500 w-6 h-6" />,
      color: "text-yellow-700"
    };
    return {
      message: "Weather conditions may be hazardous",
      icon: <AlertTriangle className="text-red-500 w-6 h-6" />,
      color: "text-red-700"
    };
  };

  const safety = getSafetyMessage(routeRisk);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          {safety.icon}
          <h2 className={`text-xl font-semibold ${safety.color}`}>
            Flight Safety Status
          </h2>
        </div>
        <p className={`text-lg ${safety.color}`}>{safety.message}</p>
        <p className="text-gray-600 mt-2">
          Route Risk Factor: {routeRisk.toFixed(2)}x
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <WeatherPanel
          weather={sourceWeather}
          cityName={sourceCity.name}
          title="Source City Weather"
        />
        <WeatherPanel
          weather={destinationWeather}
          cityName={destinationCity.name}
          title="Destination City Weather"
        />
      </div>
    </div>
  );
};

export default WeatherComparison;