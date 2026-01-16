import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CTA } from '@/components/sections/CTA';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Essential Care',
    price: '15.50',
    period: '/month',
    description: 'Perfect for maintaining good oral health with regular check-ups.',
    features: [
      '2 dental check-ups per year',
      '2 hygiene appointments per year',
      '10% off all treatments',
      'Emergency appointments',
      'No waiting periods',
    ],
    popular: false,
  },
  {
    name: 'Complete Care',
    price: '25.00',
    period: '/month',
    description: 'Comprehensive coverage for the whole family with added benefits.',
    features: [
      'Everything in Essential Care',
      'Dental x-rays included',
      'Fluoride treatments',
      '20% off all treatments',
      'Priority booking',
      'Family discount available',
    ],
    popular: true,
  },
  {
    name: 'Premium Care',
    price: '45.00',
    period: '/month',
    description: 'Full protection including cosmetic treatments and specialist care.',
    features: [
      'Everything in Complete Care',
      'One whitening session per year',
      '25% off cosmetic treatments',
      'Orthodontic consultations',
      'Dedicated care coordinator',
      'Extended opening hours',
    ],
    popular: false,
  },
];

const treatments = [
  { name: 'New patient examination', price: '75' },
  { name: 'Routine examination', price: '55' },
  { name: 'Hygiene appointment', price: '85' },
  { name: 'White filling (per surface)', price: 'From £95' },
  { name: 'Root canal treatment', price: 'From £350' },
  { name: 'Tooth extraction', price: 'From £120' },
  { name: 'Teeth whitening', price: 'From £350' },
  { name: 'Porcelain veneer', price: 'From £750' },
  { name: 'Dental implant', price: 'From £2,500' },
  { name: 'Invisalign treatment', price: 'From £3,500' },
];

export default function FeesPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-secondary to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium text-sm tracking-wide uppercase mb-4 block">
              Fees & Plans
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6">
              Transparent Pricing
            </h1>
            <p className="text-muted-foreground text-lg">
              We believe in transparent, fair pricing for all our treatments. Choose from 
              our dental plans for regular care, or pay per treatment as needed.
            </p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
              Dental Care Plans
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Spread the cost of your dental care with our monthly plans. No hidden fees, 
              no surprises – just great value dental care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`bg-card rounded-3xl p-8 relative ${plan.popular ? 'ring-2 ring-primary shadow-large' : 'shadow-card'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-foreground">£{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant={plan.popular ? 'default' : 'outline'} className="w-full">
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price List */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                Treatment Prices
              </h2>
              <p className="text-muted-foreground">
                Pay-as-you-go pricing for individual treatments. All prices include VAT.
              </p>
            </div>

            <div className="bg-card rounded-2xl overflow-hidden shadow-card">
              <div className="divide-y divide-border">
                {treatments.map((treatment) => (
                  <div 
                    key={treatment.name}
                    className="flex justify-between items-center px-6 py-4 hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-foreground">{treatment.name}</span>
                    <span className="font-semibold text-foreground">
                      {treatment.price.startsWith('From') ? treatment.price : `£${treatment.price}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm mb-4">
                * Prices are subject to change. A full treatment plan with costs will be 
                provided after your initial consultation.
              </p>
              <Button asChild variant="outline">
                <Link to="/booking">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
