'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronLeft, LocateFixed, MapPin, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/components/weather/loader'
import { WeatherData } from '@/types/weather'
import WeatherComponent from '@/components/weather/detailsToday'
interface Location {
    latitude: number | null;
    longitude: number | null;
}


  
const page = () => {
    const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
    const [geoError, setGeoError] = useState<string | null>(null);
  
    const router = useRouter()

    function GetUserGeoLocation(){
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

    const fetchLocationData = async (latitude: number, longitude: number) => {
        const {data,status} = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}&units=metric`
        );
        if (status!==200) {
          throw new Error('Failed to fetch location data');
        }
        return data;
      };


      const { data, isLoading, isError, error: queryError } = useQuery<WeatherData>({
        queryKey:["location"],
        queryFn:()=>fetchLocationData(location.latitude!, location.longitude!),
     
      })

    useEffect(() => {
        GetUserGeoLocation()
      }, []);


      if (isLoading) {

        return <Loader />
      }
    
      // Handling errors (both from geolocation and API)
      if (isError || geoError) {
        return <p>Error fetching location data: {geoError || (queryError as Error)?.message}</p>;
      }
    
    
  return (
    <div className='flex flex-col space-y-2 '>
        <div className='flex justify-between items-center px-4 w-[90%] mx-auto border-b pb-2'>
            <div className='flex gap-4'>
                <ArrowLeft className='h-5 w-5 hover:bg-slate-500  rounded-md' onClick={()=>router.back()} />
                <div className='space-x-2 flex items-center'>
                <MapPin />
                    <span>{data?.name}</span>
                </div>
            </div>
            <div>
            <div className="flex items-center">
          <LocateFixed className={`mr-2 w-10 h-10 ${location.latitude ? "text-green-500":"text-red-500"}`} onClick={()=>location.latitude===null&& GetUserGeoLocation} />
          <Input
            type="text"
            placeholder="Search location..."
           
            className="mr-2"
          />
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
            </div>
        </div >

        {data &&
        <div className='w-[90%] mx-auto'>
          <WeatherComponent weatherData={data} />
        </div>}
    </div>
  )
}

export default page