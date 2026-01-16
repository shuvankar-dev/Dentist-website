import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Smile, Shield, Stethoscope, SunMedium, HeartPulse } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CTA } from '@/components/sections/CTA';

const treatments = [
  {
    icon: Stethoscope,
    title: 'General Dentistry',
    description: 'Comprehensive check-ups, fillings, extractions, and preventive care to maintain your oral health and catch issues early.',
    features: ['Regular check-ups', 'Fillings & restorations', 'Tooth extractions', 'Root canal treatment'],
    href: '/treatments/general',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Smile,
    title: 'Invisalign',
    description: 'Transform your smile discreetly with clear, removable aligners. Perfect for adults and teens wanting straighter teeth.',
    features: ['Clear aligners', 'Removable design', 'Custom treatment plan', 'Regular progress checks'],
    href: '/treatments/invisalign',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Shield,
    title: 'Dental Implants',
    description: 'Permanent, natural-looking replacements for missing teeth. Implants restore function and confidence.',
    features: ['Single tooth implants', 'Multiple implants', 'All-on-4 treatment', 'Bone grafting'],
    href: '/treatments/implants',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: SunMedium,
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments that brighten your smile safely and effectively, with lasting results.',
    features: ['In-chair whitening', 'Take-home kits', 'Custom trays', 'Long-lasting results'],
    href: '/treatments/whitening',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: HeartPulse,
    title: 'Oral Hygiene',
    description: 'Expert cleaning, scaling, and polishing to remove plaque and tartar. Essential for gum health.',
    features: ['Professional cleaning', 'Scale & polish', 'Gum disease treatment', 'Hygiene advice'],
    href: '/treatments/hygiene',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description: 'Veneers, bonding, and complete smile makeovers to enhance your natural beauty and confidence.',
    features: ['Porcelain veneers', 'Composite bonding', 'Smile makeovers', 'Gum contouring'],
    href: '/treatments/cosmetic',
    color: 'bg-teal-50 text-teal-600',
  },
];

export default function TreatmentsPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-secondary to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium text-sm tracking-wide uppercase mb-4 block">
              Our Treatments
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6">
              Comprehensive Dental Care
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              From routine check-ups to advanced cosmetic procedures, we offer a full range 
              of treatments tailored to your unique needs. Our experienced team uses the 
              latest technology to deliver exceptional results.
            </p>
            <Button asChild size="lg">
              <Link to="/booking">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Treatments List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-24">
            {treatments.map((treatment, index) => (
              <div 
                key={treatment.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-16 h-16 rounded-2xl ${treatment.color} flex items-center justify-center mb-6`}>
                    <treatment.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-4">
                    {treatment.title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {treatment.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {treatment.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-foreground">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="gap-2">
                    <Link to="/booking">
                      Book This Treatment
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
                <div className={`bg-secondary/50 rounded-3xl aspect-[4/3] flex items-center justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <treatment.icon className={`w-32 h-32 ${treatment.color.replace('bg-', 'text-').split(' ')[1]}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
