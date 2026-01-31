import { CloudSun, Droplets, Wind, Thermometer, Eye, Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const currentWeather = {
  location: 'Bengaluru, Karnataka',
  temperature: 28,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  visibility: 10,
  pressure: 1012,
  feelsLike: 30,
  uvIndex: 6,
};

const forecast = [
  { day: 'Today', high: 30, low: 22, condition: 'Partly Cloudy', icon: '⛅', rain: 20 },
  { day: 'Tomorrow', high: 31, low: 23, condition: 'Sunny', icon: '☀️', rain: 5 },
  { day: 'Wednesday', high: 29, low: 21, condition: 'Light Rain', icon: '🌧️', rain: 60 },
  { day: 'Thursday', high: 27, low: 20, condition: 'Rainy', icon: '🌧️', rain: 80 },
  { day: 'Friday', high: 28, low: 21, condition: 'Cloudy', icon: '☁️', rain: 30 },
];

const farmingTips = [
  {
    condition: 'Rain Expected',
    tip: 'Complete fertilizer application today before rainfall',
  },
  {
    condition: 'High Humidity',
    tip: 'Monitor crops for fungal diseases, consider fungicide spray',
  },
  {
    condition: 'UV Index High',
    tip: 'Best time for transplanting is early morning or late evening',
  },
];

const Weather = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky to-primary py-12 md:py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-foreground/20">
              <CloudSun className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                {t('nav.weather')}
              </h1>
              <p className="text-primary-foreground/80">
                Plan your farming activities with accurate forecasts
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Current Weather */}
        <Card className="mb-8 shadow-card overflow-hidden">
          <div className="bg-gradient-to-r from-sky/10 to-primary/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-muted-foreground mb-1">{currentWeather.location}</p>
                <div className="flex items-center gap-4">
                  <span className="text-6xl md:text-7xl font-bold text-foreground">
                    {currentWeather.temperature}°C
                  </span>
                  <div>
                    <p className="text-xl font-medium text-foreground">{currentWeather.condition}</p>
                    <p className="text-muted-foreground">Feels like {currentWeather.feelsLike}°C</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 bg-card rounded-lg p-4">
                  <Droplets className="h-6 w-6 text-sky" />
                  <div>
                    <p className="text-sm text-muted-foreground">Humidity</p>
                    <p className="font-semibold text-foreground">{currentWeather.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg p-4">
                  <Wind className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Wind</p>
                    <p className="font-semibold text-foreground">{currentWeather.windSpeed} km/h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg p-4">
                  <Eye className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Visibility</p>
                    <p className="font-semibold text-foreground">{currentWeather.visibility} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg p-4">
                  <Gauge className="h-6 w-6 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pressure</p>
                    <p className="font-semibold text-foreground">{currentWeather.pressure} hPa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 5-Day Forecast */}
        <h2 className="text-2xl font-bold text-foreground mb-6">5-Day Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {forecast.map((day, index) => (
            <Card key={index} className={`shadow-card ${index === 0 ? 'border-primary border-2' : ''}`}>
              <CardContent className="p-5 text-center">
                <p className="font-semibold text-foreground mb-2">{day.day}</p>
                <div className="text-4xl mb-2">{day.icon}</div>
                <p className="text-sm text-muted-foreground mb-3">{day.condition}</p>
                <div className="flex justify-center gap-2 text-sm">
                  <span className="font-semibold text-foreground">{day.high}°</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-muted-foreground">{day.low}°</span>
                </div>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-sky">
                  <Droplets className="h-3 w-3" />
                  <span>{day.rain}% rain</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Farming Tips Based on Weather */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-secondary" />
              Weather-Based Farming Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {farmingTips.map((item, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50">
                  <p className="font-semibold text-foreground mb-1">{item.condition}</p>
                  <p className="text-sm text-muted-foreground">{item.tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weather;
