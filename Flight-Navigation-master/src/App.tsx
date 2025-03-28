import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import WeatherComparison from './components/WeatherComparison';
import RouteSelector from './components/RouteSelector';
import { City, Route, Weather } from './types';
import { findOptimalRoute } from './utils/astar';
import { fetchWeatherData } from './services/weatherService';
import { calculateWeatherRisk } from './utils/weatherRisk';
import { Plane } from 'lucide-react';

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [sourceWeather, setSourceWeather] = useState<Weather | null>(null);
  const [destWeather, setDestWeather] = useState<Weather | null>(null);
  const [routePath, setRoutePath] = useState<City[]>([]);

  useEffect(() => {
    const mockCities: City[] = [
      { id: '1', name: 'New York', latitude: 40.7128, longitude: -74.0060 },
      { id: '2', name: 'London', latitude: 51.5074, longitude: -0.1278 },
      { id: '3', name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
      { id: '4', name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
      { id: '5', name: 'Dubai', latitude: 25.2048, longitude: 55.2708 },
      { id: '6', name: 'Mumbai', latitude: 19.0902, longitude: 72.8628 },
      { id: '7', name: 'Pune', latitude: 18.5793, longitude: 73.9089 },
      { id: '8', name: 'Delhi', latitude: 28.5561, longitude: 77.1000 },
      { id: '9', name: 'Bengaluru', latitude: 13.1989, longitude: 77.7069},
      { id: '10', name: 'Hyderabad', latitude: 17.2403, longitude: 78.4294},
    ];
    setCities(mockCities);
  }, []);

  const handleCitySelect = async (city: City) => {
    setSelectedCity(city);
    try {
      const weatherData = await fetchWeatherData(city.latitude, city.longitude);
      if (selectedRoute?.sourceCityId === city.id) {
        setSourceWeather(weatherData);
      } else if (selectedRoute?.destinationCityId === city.id) {
        setDestWeather(weatherData);
      }
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  };

  const handleRouteSelect = async (source: City, destination: City) => {
    const weatherRisks: Record<string, number> = {};
    const sourceWeather = await fetchWeatherData(source.latitude, source.longitude);
    const destWeather = await fetchWeatherData(destination.latitude, destination.longitude);

    setSourceWeather(sourceWeather);
    setDestWeather(destWeather);

    weatherRisks[source.id] = calculateWeatherRisk(sourceWeather);
    weatherRisks[destination.id] = calculateWeatherRisk(destWeather);

    const path = findOptimalRoute(cities, source, destination, weatherRisks);
    setRoutePath(path);

    const routeRisk = Math.max(weatherRisks[source.id], weatherRisks[destination.id]);
    setSelectedRoute({
      id: `${source.id}-${destination.id}`,
      sourceCityId: source.id,
      destinationCityId: destination.id,
      distance: 0,
      risk: routeRisk,
    });

    setSelectedCity(source);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <Plane className="h-12 w-12 text-white mx-auto" />
          <h1 className="text-4xl font-bold text-white mt-4 drop-shadow-lg">
            Flight Navigation System
          </h1>
          <p className="text-white mt-2 text-lg">Plan your routes with precision and confidence</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow-xl rounded-xl p-6 transition-transform transform hover:scale-105">
              <RouteSelector cities={cities} onRouteSelect={handleRouteSelect} />
            </div>
            <div className="bg-white shadow-xl rounded-xl p-6 transition-transform transform hover:scale-105">
              <Map
                cities={cities}
                selectedRoute={selectedRoute}
                onCitySelect={handleCitySelect}
                routePath={routePath}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white shadow-xl rounded-xl p-6 transition-transform transform hover:scale-105">
            {selectedRoute && sourceWeather && destWeather && (
              <WeatherComparison
                sourceCity={cities.find(c => c.id === selectedRoute.sourceCityId)!}
                destinationCity={cities.find(c => c.id === selectedRoute.destinationCityId)!}
                sourceWeather={sourceWeather}
                destinationWeather={destWeather}
                routeRisk={selectedRoute.risk}
              />
            )}
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>
          Developed with ❤️ by <span className="font-bold">Tushar Gangurde</span>
        </p>
        <a
          href="https://github.com/Tushar282002"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Visit my GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;

