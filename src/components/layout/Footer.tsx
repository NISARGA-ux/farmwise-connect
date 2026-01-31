import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <span className="text-lg font-bold">KrishiMitra</span>
                <span className="block text-xs opacity-80">ಕೃಷಿ ಮಿತ್ರ</span>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">{t('footer.quickLinks')}</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/crop-advisory" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {t('nav.cropAdvisory')}
              </Link>
              <Link to="/weather" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {t('nav.weather')}
              </Link>
              <Link to="/market-prices" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {t('nav.marketPrices')}
              </Link>
              <Link to="/schemes" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {t('nav.schemes')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">{t('footer.contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm opacity-80">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>1800-180-1551 (Kisan Call Center)</span>
              </div>
              <div className="flex items-center gap-3 text-sm opacity-80">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support@krishimitra.in</span>
              </div>
              <div className="flex items-start gap-3 text-sm opacity-80">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Ministry of Agriculture, New Delhi</span>
              </div>
            </div>
          </div>

          {/* Government Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Government Portals</h4>
            <nav className="flex flex-col gap-2">
              <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                PM-KISAN Portal
              </a>
              <a href="https://pmfby.gov.in" target="_blank" rel="noopener noreferrer" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Crop Insurance Portal
              </a>
              <a href="https://agmarknet.gov.in" target="_blank" rel="noopener noreferrer" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Agmarknet (Market Prices)
              </a>
              <a href="https://farmer.gov.in" target="_blank" rel="noopener noreferrer" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Farmer Portal
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70">
            <p>© 2025 KrishiMitra. Made with ❤️ for Indian Farmers</p>
            <div className="flex gap-6">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
