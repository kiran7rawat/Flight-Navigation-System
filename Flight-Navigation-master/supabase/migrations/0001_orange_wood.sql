/*
  # Flight Navigation System Schema

  1. New Tables
    - `cities`
      - `id` (uuid, primary key)
      - `name` (text)
      - `latitude` (float)
      - `longitude` (float)
    
    - `weather_data`
      - `id` (uuid, primary key)
      - `city_id` (uuid, foreign key)
      - `temperature` (float)
      - `humidity` (float)
      - `visibility` (float)
      - `wind_speed` (float)
      - `timestamp` (timestamptz)
    
    - `routes`
      - `id` (uuid, primary key)
      - `source_city_id` (uuid, foreign key)
      - `destination_city_id` (uuid, foreign key)
      - `distance` (float)
      - `risk_factor` (float)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  latitude float NOT NULL,
  longitude float NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Weather data table
CREATE TABLE IF NOT EXISTS weather_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES cities(id) ON DELETE CASCADE,
  temperature float NOT NULL,
  humidity float NOT NULL,
  visibility float NOT NULL,
  wind_speed float NOT NULL,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Routes table
CREATE TABLE IF NOT EXISTS routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_city_id uuid REFERENCES cities(id) ON DELETE CASCADE,
  destination_city_id uuid REFERENCES cities(id) ON DELETE CASCADE,
  distance float NOT NULL,
  risk_factor float NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to cities"
  ON cities
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to weather data"
  ON weather_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to routes"
  ON routes
  FOR SELECT
  TO authenticated
  USING (true);