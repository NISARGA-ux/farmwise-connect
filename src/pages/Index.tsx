import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, CloudSun, TrendingUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-farm.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Indian farmland at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-2xl space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm border border-accent/30">
            <Sprout className="h-4 w-4" />
            <span>Empowering 10 Lakh+ Indian Farmers</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            {t('hero.tagline')}
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-xl">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/crop-advisory" className="gap-2">
                <Sprout className="h-5 w-5" />
                {t('hero.cropAdvice')}
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/market-prices" className="gap-2">
                <TrendingUp className="h-5 w-5" />
                {t('hero.marketPrices')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col gap-4">
        <div className="glass-card rounded-xl p-4 animate-float" style={{ animationDelay: '0s' }}>
          <div className="text-2xl font-bold text-primary">15+</div>
          <div className="text-sm text-muted-foreground">Crops Supported</div>
        </div>
        <div className="glass-card rounded-xl p-4 animate-float" style={{ animationDelay: '2s' }}>
          <div className="text-2xl font-bold text-primary">500+</div>
          <div className="text-sm text-muted-foreground">Mandis Covered</div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, link }: {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
}) => (
  <Link
    to={link}
    className="group relative rounded-2xl bg-card p-6 shadow-card border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
      <Icon className="h-7 w-7" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
    <div className="mt-4 flex items-center gap-2 text-primary font-medium">
      <span>Learn More</span>
      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </div>
  </Link>
);

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Sprout,
      title: t('features.cropAdvisory.title'),
      description: t('features.cropAdvisory.desc'),
      link: '/crop-advisory',
    },
    {
      icon: CloudSun,
      title: t('features.weather.title'),
      description: t('features.weather.desc'),
      link: '/weather',
    },
    {
      icon: TrendingUp,
      title: t('features.market.title'),
      description: t('features.market.desc'),
      link: '/market-prices',
    },
    {
      icon: FileText,
      title: t('features.schemes.title'),
      description: t('features.schemes.desc'),
      link: '/schemes',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access smart tools and real-time data to improve your farming practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { value: '10 Lakh+', label: 'Farmers Connected' },
    { value: '500+', label: 'Mandis Covered' },
    { value: '15+', label: 'Major Crops' },
    { value: '28', label: 'States Served' },
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
    </div>
  );
};

export default Index;
