import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Smile, Shield, Stethoscope, SunMedium, HeartPulse } from 'lucide-react';

const treatments = [
  {
    icon: Stethoscope,
    title: 'General Dentistry',
    description: 'Comprehensive check-ups, fillings, and preventive care to maintain your oral health.',
    href: '/treatments/general',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Smile,
    title: 'Invisalign',
    description: 'Discreet, comfortable clear aligners to straighten your teeth without traditional braces.',
    href: '/treatments/invisalign',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Shield,
    title: 'Dental Implants',
    description: 'Permanent, natural-looking replacements for missing teeth that restore your smile.',
    href: '/treatments/implants',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: SunMedium,
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments for a brighter, more radiant smile.',
    href: '/treatments/whitening',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: HeartPulse,
    title: 'Oral Hygiene',
    description: 'Expert cleaning and hygiene advice to keep your teeth and gums healthy.',
    href: '/treatments/hygiene',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description: 'Veneers, bonding, and smile makeovers to enhance your natural beauty.',
    href: '/treatments/cosmetic',
    color: 'bg-teal-50 text-teal-600',
  },
];

export function Treatments() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm tracking-wide uppercase mb-4 block">
            Our Treatments
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6">
            Comprehensive Dental Care
          </h2>
          <p className="text-muted-foreground text-lg">
            From routine check-ups to advanced cosmetic procedures, we offer a full range 
            of treatments tailored to your unique needs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment, index) => (
            <Link
              key={treatment.title}
              to={treatment.href}
              className="group bg-card rounded-2xl p-8 card-hover border border-transparent hover:border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl ${treatment.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <treatment.icon className="w-7 h-7" />
              </div>
              
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {treatment.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {treatment.description}
              </p>
              
              <span className="inline-flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/treatments"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View all treatments
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
