'use client'
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';


// Define types for location and weather data
interface Location {
  latitude: number | null;
  longitude: number | null;
}

interface WeatherData {
  name: string; // City name
  sys: {
    country: string; // Country name
  };
  weather: Array<{
    description: string; // Weather description (optional)
  }>;
  main: {
    temp: number; // Temperature
    humidity: number; // Humidity
  };
}

// Function to fetch weather data from OpenWeather API
const fetchLocationData = async (latitude: number, longitude: number, API_KEY: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }
  return response.json();
};

export default function Location() {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [geoError, setGeoError] = useState<string | null>(null);

  const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Replace this with your OpenWeather API key

  // Get the user's geolocation coordinates
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error: GeolocationPositionError) => {
          setGeoError(error.message);
        }
      );
    } else {
      setGeoError('Geolocation is not supported by your browser');
    }
  }, []);

  // Fetch the weather data using useQuery
  const { data, isLoading, isError, error: queryError } = useQuery<WeatherData>({
    queryKey:["location"],
    queryFn:()=>fetchLocationData(location.latitude!, location.longitude!, API_KEY),
 
  }
   
  );

  // Handling loading state
  if (isLoading) {
    return <p>Loading location data...</p>;
  }

  // Handling errors (both from geolocation and API)
  if (isError || geoError) {
    return <p>Error fetching location data: {geoError || (queryError as Error)?.message}</p>;
  }

  return (
    <div>
      <h1>Location Information</h1>
      {data && (
        <div>
          <p>City: {data.name}</p>
          <p>Country: {data.sys.country}</p>
          {data.weather && (
            <p>Weather: {data.weather[0].description}</p>
          )}
          <p>Temperature: {data.main.temp}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
        </div>
      )}
        {data&& <p>
            {JSON.stringify(data)}</p>}
    </div>
  );
}
