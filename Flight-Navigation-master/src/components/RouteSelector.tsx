import React from 'react';
import { City } from '../types';
import { Navigation } from 'lucide-react';

interface RouteSelectorProps {
  cities: City[];
  onRouteSelect: (source: City, destination: City) => void;
}

const RouteSelector: React.FC<RouteSelectorProps> = ({ cities, onRouteSelect }) => {
  const [sourceId, setSourceId] = React.useState<string>('');
  const [destinationId, setDestinationId] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const source = cities.find(c => c.id === sourceId);
    const destination = cities.find(c => c.id === destinationId);
    
    if (source && destination) {
      onRouteSelect(source, destination);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Navigation className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Route Selection</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700">
            Source City
          </label>
          <select
            id="source"
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select source city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
            Destination City
          </label>
          <select
            id="destination"
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select destination city</option>
            {cities.filter(city => city.id !== sourceId).map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!sourceId || !destinationId}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Calculate Route
        </button>
      </form>
    </div>
  );
};

export default RouteSelector;