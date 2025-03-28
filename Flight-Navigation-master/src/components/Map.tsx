import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { City, Route } from '../types';
import AnimatedRoute from './AnimatedRoute';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface MapProps {
  cities: City[];
  selectedRoute: Route | null;
  routePath: City[];
  onCitySelect: (city: City) => void;
}

// Default Leaflet icon setup
const defaultIcon = new Icon.Default();

const Map: React.FC<MapProps> = ({ cities, selectedRoute, routePath, onCitySelect }) => {
  const center = { lat: 20, lng: 0 };
  const zoom = 2;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-full h-[600px] rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {cities.map((city) => (
        <Marker
          key={city.id}
          position={[city.latitude, city.longitude]}
          icon={defaultIcon}
          eventHandlers={{
            click: () => onCitySelect(city),
          }}
        >
          <Popup>
            <div className="text-sm font-medium">{city.name}</div>
          </Popup>
        </Marker>
      ))}

      {routePath.length > 0 && (
        <AnimatedRoute path={routePath} />
      )}
    </MapContainer>
  );
};

export default Map;
