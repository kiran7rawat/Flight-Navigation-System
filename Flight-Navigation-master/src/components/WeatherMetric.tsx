import React, { ReactNode } from 'react';

interface WeatherMetricProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export const WeatherMetric: React.FC<WeatherMetricProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};