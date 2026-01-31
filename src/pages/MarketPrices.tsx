import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Search, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';

interface MarketPrice {
  crop: string;
  variety: string;
  mandi: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

const marketPrices: MarketPrice[] = [
  { crop: 'Rice', variety: 'Basmati', mandi: 'Karnal', state: 'Haryana', minPrice: 3800, maxPrice: 4200, modalPrice: 4000, trend: 'up', change: 5.2 },
  { crop: 'Rice', variety: 'Sona Masoori', mandi: 'Guntur', state: 'Andhra Pradesh', minPrice: 3200, maxPrice: 3600, modalPrice: 3400, trend: 'stable', change: 0.5 },
  { crop: 'Wheat', variety: 'Sharbati', mandi: 'Dewas', state: 'Madhya Pradesh', minPrice: 2200, maxPrice: 2500, modalPrice: 2350, trend: 'up', change: 3.1 },
  { crop: 'Wheat', variety: 'Lokwan', mandi: 'Indore', state: 'Madhya Pradesh', minPrice: 2100, maxPrice: 2350, modalPrice: 2200, trend: 'down', change: -1.5 },
  { crop: 'Cotton', variety: 'Hybrid', mandi: 'Rajkot', state: 'Gujarat', minPrice: 6800, maxPrice: 7200, modalPrice: 7000, trend: 'up', change: 4.8 },
  { crop: 'Soybean', variety: 'Yellow', mandi: 'Indore', state: 'Madhya Pradesh', minPrice: 4500, maxPrice: 4900, modalPrice: 4700, trend: 'down', change: -2.3 },
  { crop: 'Groundnut', variety: 'Bold', mandi: 'Junagadh', state: 'Gujarat', minPrice: 5200, maxPrice: 5600, modalPrice: 5400, trend: 'up', change: 2.1 },
  { crop: 'Maize', variety: 'Yellow', mandi: 'Davangere', state: 'Karnataka', minPrice: 1800, maxPrice: 2100, modalPrice: 1950, trend: 'stable', change: 0.8 },
  { crop: 'Tomato', variety: 'Local', mandi: 'Kolar', state: 'Karnataka', minPrice: 1500, maxPrice: 2200, modalPrice: 1800, trend: 'down', change: -8.5 },
  { crop: 'Onion', variety: 'Red', mandi: 'Nashik', state: 'Maharashtra', minPrice: 1200, maxPrice: 1600, modalPrice: 1400, trend: 'up', change: 12.3 },
];

const states = [
  'All States',
  'Andhra Pradesh',
  'Gujarat',
  'Haryana',
  'Karnataka',
  'Madhya Pradesh',
  'Maharashtra',
];

const crops = ['All Crops', 'Rice', 'Wheat', 'Cotton', 'Soybean', 'Groundnut', 'Maize', 'Tomato', 'Onion'];

const MarketPrices = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCrop, setSelectedCrop] = useState('All Crops');

  const filteredPrices = marketPrices.filter((price) => {
    const matchesSearch =
      price.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      price.mandi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      price.variety.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'All States' || price.state === selectedState;
    const matchesCrop = selectedCrop === 'All Crops' || price.crop === selectedCrop;
    return matchesSearch && matchesState && matchesCrop;
  });

  const TrendIcon = ({ trend, change }: { trend: string; change: number }) => {
    if (trend === 'up') {
      return (
        <span className="flex items-center gap-1 text-leaf font-medium">
          <TrendingUp className="h-4 w-4" />
          +{change}%
        </span>
      );
    }
    if (trend === 'down') {
      return (
        <span className="flex items-center gap-1 text-destructive font-medium">
          <TrendingDown className="h-4 w-4" />
          {change}%
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-muted-foreground font-medium">
        <Minus className="h-4 w-4" />
        {change}%
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-secondary py-12 md:py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-foreground/20">
              <TrendingUp className="h-8 w-8 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-accent-foreground">
                {t('nav.marketPrices')}
              </h1>
              <p className="text-accent-foreground/80">
                Daily Mandi / APMC prices for major crops
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Filters */}
        <Card className="mb-8 shadow-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crop, mandi, variety..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="h-12">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select Crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Price Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Crops Tracked</p>
              <p className="text-2xl font-bold text-foreground">{crops.length - 1}</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Mandis Covered</p>
              <p className="text-2xl font-bold text-foreground">10</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">States</p>
              <p className="text-2xl font-bold text-foreground">{states.length - 1}</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="text-lg font-bold text-foreground">Today, 10 AM</p>
            </CardContent>
          </Card>
        </div>

        {/* Price Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">Today's Market Prices (₹ per Quintal)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>Variety</TableHead>
                    <TableHead>Mandi</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead className="text-right">Min Price</TableHead>
                    <TableHead className="text-right">Max Price</TableHead>
                    <TableHead className="text-right">Modal Price</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrices.map((price, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{price.crop}</TableCell>
                      <TableCell>{price.variety}</TableCell>
                      <TableCell>{price.mandi}</TableCell>
                      <TableCell>{price.state}</TableCell>
                      <TableCell className="text-right">₹{price.minPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{price.maxPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-semibold">₹{price.modalPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <TrendIcon trend={price.trend} change={price.change} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;
