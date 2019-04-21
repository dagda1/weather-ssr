export interface ForecastResponse {
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: number;
    population: number;
  };
}

export interface Weather {
  id: number;
  dateKey: string;
  date: Date;
  outlook: string;
  icon: string;
  time: string;
}

export interface WeatherDate {
  id: string;
  date: string;
}

export interface Forecast {
  city: string;
  dates: WeatherDate[];
  forecasts: Weather[];
}
