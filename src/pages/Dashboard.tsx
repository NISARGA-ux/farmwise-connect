import { useState } from 'react';
import { User, Sprout, MapPin, Calendar, Edit, Plus, LogIn, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock user data
const mockUser = {
  name: 'Ramesh Kumar',
  phone: '+91 98765 43210',
  village: 'Mandya',
  district: 'Mandya',
  state: 'Karnataka',
  landSize: '5 acres',
};

const mockCrops = [
  { id: 1, name: 'Rice', variety: 'Sona Masoori', area: '2 acres', season: 'Kharif 2024', status: 'Growing' },
  { id: 2, name: 'Sugarcane', variety: 'Co 86032', area: '2 acres', season: 'Annual', status: 'Harvested' },
  { id: 3, name: 'Ragi', variety: 'GPU 28', area: '1 acre', season: 'Kharif 2024', status: 'Growing' },
];

const mockSuggestions = [
  {
    title: 'Weather Alert',
    message: 'Heavy rainfall expected in next 3 days. Consider postponing fertilizer application.',
    type: 'warning',
  },
  {
    title: 'Best Selling Time',
    message: 'Rice prices are up 5% this week in Mandya mandi. Good time to sell!',
    type: 'success',
  },
  {
    title: 'Pest Alert',
    message: 'Stem borer activity reported in your area. Monitor rice fields closely.',
    type: 'alert',
  },
];

const Dashboard = () => {
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <div className="bg-primary py-12 md:py-16">
          <div className="container">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-foreground/20">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                  {t('nav.dashboard')}
                </h1>
                <p className="text-primary-foreground/80">
                  Manage your farm and get personalized advice
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8 md:py-12">
          <div className="max-w-md mx-auto">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  {isRegistering ? 'Create Your Account' : 'Login to Your Account'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  {isRegistering && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter your name" className="h-12" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 98765 43210" className="h-12" />
                  </div>

                  {isRegistering && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="village">Village</Label>
                        <Input id="village" placeholder="Enter your village" className="h-12" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="district">District</Label>
                          <Input id="district" placeholder="District" className="h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" placeholder="State" className="h-12" />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP (One-Time Password)</Label>
                    <div className="flex gap-2">
                      <Input id="otp" placeholder="Enter OTP" className="h-12" />
                      <Button type="button" variant="outline">Send OTP</Button>
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full"
                    size="lg"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    {isRegistering ? (
                      <>
                        <UserPlus className="h-5 w-5" />
                        Register
                      </>
                    ) : (
                      <>
                        <LogIn className="h-5 w-5" />
                        Login
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    className="text-primary hover:underline text-sm"
                    onClick={() => setIsRegistering(!isRegistering)}
                  >
                    {isRegistering
                      ? 'Already have an account? Login'
                      : "Don't have an account? Register"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-primary py-8 md:py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground text-2xl font-bold">
                {mockUser.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                  Namaste, {mockUser.name}! 🙏
                </h1>
                <p className="text-primary-foreground/80 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {mockUser.village}, {mockUser.district}
                </p>
              </div>
            </div>
            <Button variant="hero" onClick={() => setIsLoggedIn(false)}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Personalized Suggestions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Today's Suggestions for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockSuggestions.map((suggestion, index) => (
              <Card
                key={index}
                className={`shadow-soft border-l-4 ${
                  suggestion.type === 'warning'
                    ? 'border-l-accent'
                    : suggestion.type === 'success'
                    ? 'border-l-leaf'
                    : 'border-l-destructive'
                }`}
              >
                <CardContent className="p-4">
                  <h4 className="font-semibold text-foreground mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-muted-foreground">{suggestion.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="crops" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid">
            <TabsTrigger value="crops">My Crops</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="crops">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Saved Crops</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  Add Crop
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCrops.map((crop) => (
                    <div
                      key={crop.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Sprout className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{crop.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {crop.variety} • {crop.area}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            crop.status === 'Growing'
                              ? 'bg-leaf/10 text-leaf'
                              : 'bg-accent/10 text-accent-foreground'
                          }`}
                        >
                          {crop.status}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1">
                          <Calendar className="h-3 w-3" />
                          {crop.season}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Profile Details</CardTitle>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium text-foreground">{mockUser.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium text-foreground">{mockUser.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Village</p>
                    <p className="font-medium text-foreground">{mockUser.village}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">District</p>
                    <p className="font-medium text-foreground">{mockUser.district}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">State</p>
                    <p className="font-medium text-foreground">{mockUser.state}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Land</p>
                    <p className="font-medium text-foreground">{mockUser.landSize}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
