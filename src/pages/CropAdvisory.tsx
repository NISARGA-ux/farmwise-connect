import { useState } from 'react';
import { Sprout, Droplets, Calendar, ChevronRight, Leaf, Bug, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const crops = [
  { value: 'rice', label: 'Rice (ಅಕ್ಕಿ)' },
  { value: 'wheat', label: 'Wheat (ಗೋಧಿ)' },
  { value: 'cotton', label: 'Cotton (ಹತ್ತಿ)' },
  { value: 'sugarcane', label: 'Sugarcane (ಕಬ್ಬು)' },
  { value: 'maize', label: 'Maize (ಮೆಕ್ಕೆಜೋಳ)' },
  { value: 'groundnut', label: 'Groundnut (ಕಡಲೆಕಾಯಿ)' },
  { value: 'soybean', label: 'Soybean (ಸೋಯಾಬೀನ್)' },
  { value: 'tomato', label: 'Tomato (ಟೊಮೇಟೊ)' },
];

const soilTypes = [
  { value: 'alluvial', label: 'Alluvial Soil' },
  { value: 'black', label: 'Black Soil (Regur)' },
  { value: 'red', label: 'Red Soil' },
  { value: 'laterite', label: 'Laterite Soil' },
  { value: 'sandy', label: 'Sandy Soil' },
  { value: 'clay', label: 'Clay Soil' },
];

const seasons = [
  { value: 'kharif', label: 'Kharif (June - October)' },
  { value: 'rabi', label: 'Rabi (October - March)' },
  { value: 'zaid', label: 'Zaid (March - June)' },
];

interface CropAdvice {
  fertilizers: {
    name: string;
    quantity: string;
    timing: string;
  }[];
  irrigation: {
    method: string;
    frequency: string;
    tips: string[];
  };
  bestPractices: string[];
  pests: {
    name: string;
    solution: string;
  }[];
}

const cropAdviceData: { [key: string]: CropAdvice } = {
  rice: {
    fertilizers: [
      { name: 'Urea', quantity: '100-120 kg/hectare', timing: 'Apply in 3 splits' },
      { name: 'DAP', quantity: '50-60 kg/hectare', timing: 'At transplanting' },
      { name: 'MOP (Potash)', quantity: '40-50 kg/hectare', timing: 'Basal application' },
    ],
    irrigation: {
      method: 'Flooding / Alternate Wetting & Drying (AWD)',
      frequency: 'Maintain 2-5 cm water level',
      tips: [
        'Drain field 10-15 days before harvest',
        'AWD can save 30% water',
        'Critical stages: Tillering, Flowering',
      ],
    },
    bestPractices: [
      'Use certified seeds with 85%+ germination',
      'Transplant 25-30 day old seedlings',
      'Maintain 20x15 cm spacing',
      'Apply organic manure 2 weeks before transplanting',
    ],
    pests: [
      { name: 'Stem Borer', solution: 'Release Trichogramma parasites or apply Carbofuran' },
      { name: 'Brown Plant Hopper', solution: 'Drain water, apply Imidacloprid spray' },
    ],
  },
  wheat: {
    fertilizers: [
      { name: 'Urea', quantity: '80-100 kg/hectare', timing: 'Split in 2-3 doses' },
      { name: 'SSP', quantity: '50 kg/hectare', timing: 'At sowing' },
      { name: 'MOP', quantity: '40 kg/hectare', timing: 'At sowing' },
    ],
    irrigation: {
      method: 'Sprinkler / Flood Irrigation',
      frequency: '4-6 irrigations needed',
      tips: [
        'First irrigation: 20-25 days after sowing (Crown Root)',
        'Critical stages: Tillering, Flowering, Grain filling',
        'Light irrigation at maturity stage',
      ],
    },
    bestPractices: [
      'Sow in October-November for best results',
      'Seed rate: 100-125 kg/hectare',
      'Row spacing: 20-22.5 cm',
      'Seed treatment with Thiram/Carbendazim',
    ],
    pests: [
      { name: 'Aphids', solution: 'Spray Dimethoate 30 EC at 1ml/liter' },
      { name: 'Rust', solution: 'Spray Mancozeb at 2.5g/liter' },
    ],
  },
};

const CropAdvisory = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSoil, setSelectedSoil] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [showAdvice, setShowAdvice] = useState(false);

  const advice = cropAdviceData[selectedCrop] || cropAdviceData.rice;

  const handleGetAdvice = () => {
    if (selectedCrop && selectedSoil && selectedSeason) {
      setShowAdvice(true);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-primary py-12 md:py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-foreground/20">
              <Sprout className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                {t('nav.cropAdvisory')}
              </h1>
              <p className="text-primary-foreground/80">
                Get personalized farming recommendations
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Selection Form */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">Select Your Farming Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('crop.selectCrop')}
                </label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose a crop..." />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop.value} value={crop.value}>
                        {crop.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('crop.selectSoil')}
                </label>
                <Select value={selectedSoil} onValueChange={setSelectedSoil}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose soil type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((soil) => (
                      <SelectItem key={soil.value} value={soil.value}>
                        {soil.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('crop.selectSeason')}
                </label>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose season..." />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season.value} value={season.value}>
                        {season.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGetAdvice}
              className="mt-6"
              size="lg"
              disabled={!selectedCrop || !selectedSoil || !selectedSeason}
            >
              {t('crop.getAdvice')}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Advice Results */}
        {showAdvice && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up">
            {/* Fertilizer Recommendations */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-leaf/10 text-leaf">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Fertilizer Recommendations</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {advice.fertilizers.map((fert, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{fert.name}</h4>
                      <p className="text-sm text-muted-foreground">{fert.quantity}</p>
                      <p className="text-sm text-primary mt-1">{fert.timing}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Irrigation Tips */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky/10 text-sky">
                    <Droplets className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Irrigation Guidelines</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold text-foreground">{advice.irrigation.method}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{advice.irrigation.frequency}</p>
                </div>
                <ul className="space-y-2">
                  {advice.irrigation.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sun/10 text-sun">
                    <Sun className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Best Practices</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {advice.bestPractices.map((practice, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{practice}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pest Control */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                    <Bug className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Pest & Disease Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {advice.pests.map((pest, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground">{pest.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{pest.solution}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropAdvisory;
