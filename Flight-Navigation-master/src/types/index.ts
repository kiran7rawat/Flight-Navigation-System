export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface Weather {
  id: string;
  cityId: string;
  temperature: number;
  humidity: number;
  visibility: number;
  windSpeed: number;
  timestamp: string;
}

export interface Route {
  id: string;
  sourceCityId: string;
  destinationCityId: string;
  distance: number;
  risk: number;
}