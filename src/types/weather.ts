export interface WeatherData {
    coord: {
      lon: number;
      lat: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    base?: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level?: number;
      grnd_level?: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
    rain?: {
      '1h': number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type?: number;
      id?: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }
  


  export const SampleData:WeatherData = {
    coord: { lon: 7.367, lat: 45.133 },
    weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
    main: {
      temp: 284.2,
      feels_like: 282.93,
      temp_min: 283.06,
      temp_max: 286.82,
      pressure: 1021,
      humidity: 60,
      sea_level: 1021,
      grnd_level: 910,
    },
    visibility: 10000,
    wind: { speed: 4.09, deg: 121, gust: 3.47 },
    rain: { '1h': 2.73 },
    clouds: { all: 83 },
    dt: 1726660758,
    sys: { country: 'IT', sunrise: 1726636384, sunset: 1726680975 },
    timezone: 7200,
    id: 3165523,
    name: 'Province of Turin',
    cod: 200,
  };