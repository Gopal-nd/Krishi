'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LocateFixed, MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import WeatherComponent from '@/components/weather/detailsToday';
import HourlyWeatherData from '@/components/weather/Hourlydata';
import DailyForecast from '@/components/weather/DailyForcast';
import { useToast } from '@/hooks/use-toast';
import { WeatherData, WeatherDataHour } from '@/types/weather';
import { Skeleton } from '@/components/ui/skeleton';

function debounce(func: (...args: any[]) => void, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}


interface Location {
  latitude: number | null;
  longitude: number | null;
}

const Page = () => {

  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [geoError, setGeoError] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  console.log(place);
  const router = useRouter();
  const { toast } = useToast();

  // Get user geolocation
  function GetUserGeoLocation() {
    if (location.latitude || location.longitude) return; // Prevent repeated calls
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
  }

  // Fetch location data
  const fetchLocationDataPlace = async (place: string) => {
    const { data, status } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}&units=metric`
    );
    if (status !== 200) {
      throw new Error('Failed to fetch location data');
    }

    return data;
  };

  // Fetch hourly weather data
  const fetchWeatherHourlydataPlace = async (place: string) => {
    const { data, status } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}&units=metric`
    );
    if (status !== 200) {
      throw new Error('Failed to fetch hourly data');
    }
    return data.list;
  };
  const fetchLocationData = async (latitude: number, longitude: number) => {
    const { data, status } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}&units=metric`
    );
    if (status !== 200) {
      throw new Error('Failed to fetch location data');
    }
    return data;
  };

  // Fetch hourly weather data
  const fetchWeatherHourlydata = async (latitude: number, longitude: number) => {
    const { data, status } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}&units=metric`
    );
    if (status !== 200) {
      throw new Error('Failed to fetch hourly data');
    }
    return data.list;
  };

  // Queries for location and hourly weather data
  const { data, isLoading, isError, error: queryError } = useQuery<WeatherData>({
    queryKey: ['location', location],
    queryFn: () => {
      if (!location.latitude || !location.longitude) {
        throw new Error('Location is not defined');
      }
      return fetchLocationData(location.latitude!, location.longitude!);
    },
    enabled: !!location.latitude && !!location.longitude, // Only run if location is available
  });

  const { data: Hourdata, isLoading: HourLoading, isError: HourisError } = useQuery<WeatherDataHour[]>({
    queryKey: ['Hourly', location],
    queryFn: () => {
      if (!location.latitude || !location.longitude) {
        throw new Error('Location is not defined');
      }
      return fetchWeatherHourlydata(location.latitude!, location.longitude!);
    },
    enabled: !!location.latitude && !!location.longitude, // Only run if location is available
  });
  const { data:Placedata, isLoading: PlaceLoading,refetch:PlaceRefetch, isError: PlaceisError, error: PlacequeryError } = useQuery<WeatherData>({
    queryKey: ['place', place],
    queryFn: () => {
      if (!place) {
        throw new Error('place is not defined');
      }
      return fetchLocationDataPlace(place);
    },
    enabled: !!place, // Only run if location is available
  });

  const { data: PlaceHourdata, isLoading: PlaceHourLoading, refetch:HourlyPlaceRefetch, isError: PlaceHourisError } = useQuery<WeatherDataHour[]>({
    queryKey: ['place hourly', place],
    queryFn: () => {
      if (!place) {
        throw new Error('place is not defined');
      }
      return fetchWeatherHourlydataPlace(place);
    },
    enabled: !!place, // Only run if location is available
  });

  console.log( "place weatherdata",Placedata);
  console.log("place weatherdata Hourly",PlaceHourdata);

  const searchTheLocation = useCallback(
    debounce(() => {
      if (!place) return;
      HourlyPlaceRefetch();
      PlaceRefetch();
    }, 500), // Debounce with 500ms delay
    [place]
  );
  // Use effect to get geolocation on initial render
  useEffect(() => {
    GetUserGeoLocation();
    
  }, []);

  // Display error messages if geolocation fails
  if (isError) {
    toast({
      title: 'Location Error',
      description: geoError || (queryError as Error)?.message,
      variant: 'destructive',
      duration: 5000,
    });
  }

  return (
    
    <div className='flex flex-col space-y-2'>
      <div className='flex justify-between items-center px-4 w-[90%] mx-auto border-b pb-2'>
        <div className='flex gap-4'>
          <ArrowLeft className='h-5 w-5 hover:bg-slate-500 rounded-md' onClick={() => router.back()} />
          <div className='space-x-2 flex items-center'>
            <MapPin />
            <span>{place ?  Placedata?.name : data?.name}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <LocateFixed
              className={`mr-2 w-10 h-10 ${location.latitude ? 'text-green-500' : 'text-red-500'}`}
              onClick={GetUserGeoLocation}
            />
            <Input type="text" placeholder="Search location..." onChange={(e) => setPlace(e.target.value)} value={place??''} className="mr-2" />
            <Button size="icon" onClick={()=> searchTheLocation()}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>


    {!location.latitude && !location.longitude && !place && (
      <p className='text-center text-xl p-4'>Allow the Loction access or <span className='text-green-500 font-bold'>Search a location</span></p>)}


      {isLoading && <p className='text-center text-xl p-4'>Weather data is loading...</p>}
      {isError && <p className='text-center text-xl p-4'>{geoError || (queryError as Error)?.message}</p>}

      {data && (
        <div className='w-[90%] mx-auto'>
          
          <WeatherComponent weatherData={data} />
        </div>
      )}
      {PlaceLoading && <p className='text-center text-xl p-4'>Place data is loading...</p>}
{    !place &&(<>
      {Placedata && (
        <div className='w-[90%] mx-auto'>
          
          <WeatherComponent weatherData={ Placedata} />
        </div>
      )}
</>)  
} 
     {HourLoading && <p className='text-center text-xl p-4'>Hourly data is loading...</p>}
   { !place && (<>
    {Hourdata && (
      <div className='w-[90%] mx-auto'>
          <HourlyWeatherData HourlyWeatherData={Hourdata} />
        </div>
      )}
      </>) 
      }
      {PlaceHourdata && (
        <div className='w-[90%] mx-auto'>
          <HourlyWeatherData HourlyWeatherData={PlaceHourdata} />
        </div>
      )}

{!place &&(<>
      {(Hourdata || data) && (
        <div className='w-[90%] mx-auto'>
          <DailyForecast />
        </div>
      )}
      </>)
      
      }
      {( PlaceHourdata|| Placedata) && (
        <div className='w-[90%] mx-auto'>
          <DailyForecast />
        </div>
      )}
    </div>


  );
};

export default Page;
