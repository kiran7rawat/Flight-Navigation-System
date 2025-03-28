import React, { useEffect, useState } from 'react';
import { Polyline, useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { City } from '../types';

interface AnimatedRouteProps {
  path: City[];
  color?: string;
}

const AnimatedRoute: React.FC<AnimatedRouteProps> = ({ path, color = '#3B82F6' }) => {
  const [progress, setProgress] = useState(0);
  const map = useMap();

  useEffect(() => {
    if (path.length < 2) return;

    // Reset progress when path changes
    setProgress(0);

    // Animate the route
    const duration = 15000; // 15 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);

      if (newProgress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    // Center and zoom the map to show the entire route
    const bounds = path.map(city => [city.latitude, city.longitude]);
    map.fitBounds(bounds);
  }, [path, map]);

  if (path.length < 2) return null;

  // Calculate the visible portion of the path based on progress
  const visiblePath = path.slice(0, Math.max(2, Math.ceil(path.length * progress)));

  return (
    <>
      <Polyline
        positions={visiblePath.map(city => [city.latitude, city.longitude])}
        color={color}
        weight={3}
        opacity={0.7}
      />
      {/* Animated marker */}
      {progress > 0 && progress < 1 && path.length >= 2 && (
        <Polyline
          positions={[
            [path[0].latitude, path[0].longitude],
            [path[path.length - 1].latitude, path[path.length - 1].longitude]
          ]}
          color={color}
          weight={5}
          opacity={0.3}
          dashArray="10, 10"
        />
      )}
    </>
  );
};

export default AnimatedRoute;