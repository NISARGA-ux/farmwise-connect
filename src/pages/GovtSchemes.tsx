import { FileText, ExternalLink, CheckCircle, IndianRupee, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface Scheme {
  id: string;
  name: string;
  nameKn: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  amount: string;
  deadline: string;
  ministry: string;
  link: string;
  status: 'active' | 'upcoming' | 'closed';
}

const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    nameKn: 'ಪಿಎಂ-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ',
    description: 'Direct income support of ₹6,000 per year to farmer families for purchasing farm inputs.',
    benefits: [
      '₹6,000 per year in 3 equal installments',
      'Direct bank transfer to farmer account',
      'Covers cultivation expenses, seeds, fertilizers',
    ],
    eligibility: [
      'All landholding farmer families',
      'Family with cultivable land',
      'Must have Aadhaar-linked bank account',
    ],
    amount: '₹6,000/year',
    deadline: 'Ongoing',
    ministry: 'Ministry of Agriculture',
    link: 'https://pmkisan.gov.in',
    status: 'active',
  },
  {
    id: 'pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    nameKn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬೀಮಾ ಯೋಜನೆ',
    description: 'Comprehensive crop insurance scheme to protect farmers against crop loss due to natural calamities.',
    benefits: [
      'Insurance coverage for all food and oilseed crops',
      'Low premium: 2% for Kharif, 1.5% for Rabi',
      'Coverage for pre-sowing to post-harvest losses',
    ],
    eligibility: [
      'All farmers growing notified crops',
      'Loanee and non-loanee farmers eligible',
      'Must enroll before sowing deadline',
    ],
    amount: 'Varies by crop',
    deadline: 'Before sowing season',
    ministry: 'Ministry of Agriculture',
    link: 'https://pmfby.gov.in',
    status: 'active',
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card (KCC)',
    nameKn: 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್',
    description: 'Provides farmers with timely access to credit for agricultural and allied activities.',
    benefits: [
      'Credit limit up to ₹3 lakh at 4% interest',
      'Interest subvention of 3%',
      'Personal accident insurance up to ₹50,000',
    ],
    eligibility: [
      'All farmers - owner cultivators, tenant farmers',
      'Self Help Groups, Joint Liability Groups',
      'Fisheries and animal husbandry farmers',
    ],
    amount: 'Up to ₹3 Lakh',
    deadline: 'Ongoing',
    ministry: 'Ministry of Finance',
    link: 'https://www.nabard.org/kcc',
    status: 'active',
  },
  {
    id: 'smam',
    name: 'Sub-Mission on Agricultural Mechanization',
    nameKn: 'ಕೃಷಿ ಯಾಂತ್ರೀಕರಣ ಉಪ ಯೋಜನೆ',
    description: 'Subsidized farm machinery and equipment to boost farm productivity.',
    benefits: [
      '40-50% subsidy on farm machinery',
      'Custom Hiring Centres for small farmers',
      'Training on modern equipment usage',
    ],
    eligibility: [
      'Individual farmers',
      'Farmer Producer Organizations (FPOs)',
      'Custom Hiring Centres run by cooperatives',
    ],
    amount: '40-50% subsidy',
    deadline: 'Application based',
    ministry: 'Ministry of Agriculture',
    link: 'https://agrimachinery.nic.in',
    status: 'active',
  },
  {
    id: 'pkvy',
    name: 'Paramparagat Krishi Vikas Yojana',
    nameKn: 'ಪರಂಪರಾಗತ ಕೃಷಿ ವಿಕಾಸ ಯೋಜನೆ',
    description: 'Promotes organic farming through cluster-based approach with certification support.',
    benefits: [
      '₹50,000 per hectare over 3 years',
      'Free organic certification (PGS-India)',
      'Support for organic inputs and marketing',
    ],
    eligibility: [
      'Farmers willing to adopt organic farming',
      'Cluster of 50+ farmers with 50 hectares',
      'Located in identified organic clusters',
    ],
    amount: '₹50,000/hectare',
    deadline: 'Cluster formation based',
    ministry: 'Ministry of Agriculture',
    link: 'https://pgsindia-ncof.gov.in',
    status: 'active',
  },
  {
    id: 'pmksy',
    name: 'Pradhan Mantri Krishi Sinchai Yojana',
    nameKn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಕೃಷಿ ಸಿಂಚಾಯಿ ಯೋಜನೆ',
    description: 'Har Khet Ko Pani - Extends irrigation coverage and improves water use efficiency.',
    benefits: [
      '55-75% subsidy on micro-irrigation systems',
      'Drip and sprinkler system installation',
      'Water conservation and management support',
    ],
    eligibility: [
      'All farmer categories',
      'Priority to small and marginal farmers',
      'SC/ST farmers get higher subsidy',
    ],
    amount: 'Up to 75% subsidy',
    deadline: 'Ongoing',
    ministry: 'Ministry of Jal Shakti',
    link: 'https://pmksy.gov.in',
    status: 'active',
  },
];

const GovtSchemes = () => {
  const { t, language } = useLanguage();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-leaf text-leaf-foreground">Active</Badge>;
      case 'upcoming':
        return <Badge className="bg-accent text-accent-foreground">Upcoming</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-earth py-12 md:py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-foreground/20">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                {t('nav.schemes')}
              </h1>
              <p className="text-primary-foreground/80">
                Government schemes to support Indian farmers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Schemes</p>
                <p className="text-xl font-bold text-foreground">{schemes.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <IndianRupee className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Max Benefit</p>
                <p className="text-xl font-bold text-foreground">₹50,000</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-leaf/10 text-leaf">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">PM-KISAN Beneficiaries</p>
                <p className="text-xl font-bold text-foreground">11 Cr+</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky/10 text-sky">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Updated</p>
                <p className="text-xl font-bold text-foreground">Jan 2025</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schemes List */}
        <div className="space-y-6">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">
                        {language === 'kn' ? scheme.nameKn : scheme.name}
                      </CardTitle>
                      {getStatusBadge(scheme.status)}
                    </div>
                    <p className="text-muted-foreground">{scheme.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant="outline" className="text-primary border-primary">
                      {scheme.amount}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-leaf" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {scheme.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-leaf mt-1">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Eligibility
                    </h4>
                    <ul className="space-y-2">
                      {scheme.eligibility.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Ministry:</span> {scheme.ministry} |{' '}
                    <span className="font-medium">Deadline:</span> {scheme.deadline}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="gap-2">
                      Apply Now
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovtSchemes;
