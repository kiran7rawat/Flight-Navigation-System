# Flight Navigation System

A real-time flight navigation application that helps pilots and flight planners determine optimal routes based on current weather conditions and risk assessments.

![a](https://github.com/user-attachments/assets/09224878-4171-4d44-a9c6-e00ac379c76a)


## Features

- **Interactive Map**: Visual representation of cities and flight routes using OpenStreetMap
- **Real-time Weather Data**: Current weather conditions for each city including:
  - Temperature
  - Humidity
  - Visibility
  - Wind Speed
- **Risk Assessment**: Automatic calculation of route risk levels based on weather conditions
- **Route Planning**: Calculate optimal routes between cities with:
  - Distance calculation using the Haversine formula
  - Weather-based risk level assessment
  - Visual route representation on the map

## Technology Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - Leaflet for maps
  - Lucide React for icons
  - React Hot Toast for notifications

- **Backend**:
  - Supabase for database and real-time updates
  - PostgreSQL with Row Level Security

## Project Structure

```
src/
├── components/          # React components
│   ├── Map.tsx         # Interactive map component
│   ├── RouteSelector.tsx# City selection and route planning
│   └── WeatherCard.tsx # Weather information display
├── lib/
│   ├── hooks/          # Custom React hooks
│   │   ├── useCities.ts# Cities data management
│   │   └── useWeather.ts# Weather data fetching
│   ├── supabase.ts     # Supabase client configuration
│   └── utils.ts        # Utility functions
└── types/              # TypeScript type definitions
```

## Database Schema

### Cities Table
- `id`: UUID (Primary Key)
- `name`: Text
- `latitude`: Float
- `longitude`: Float
- `created_at`: Timestamp

### Weather Table
- `id`: UUID (Primary Key)
- `city_id`: UUID (Foreign Key)
- `temperature`: Float
- `humidity`: Float
- `visibility`: Float
- `wind_speed`: Float
- `timestamp`: Timestamp

### Routes Table
- `id`: UUID (Primary Key)
- `source_city_id`: UUID (Foreign Key)
- `destination_city_id`: UUID (Foreign Key)
- `distance`: Float
- `risk_level`: Enum ('low', 'medium', 'high')
- `created_at`: Timestamp

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Risk Level Calculation

The system calculates risk levels based on the following weather conditions:

- **High Risk**:
  - Visibility < 1000m
  - Wind Speed > 15 m/s
  - Temperature < -10°C or > 40°C

- **Medium Risk**:
  - Visibility < 5000m
  - Wind Speed > 10 m/s
  - Temperature < 0°C or > 35°C

- **Low Risk**:
  - All other conditions

