import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const treatments = [
  {
    title: 'General Dentistry',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
    href: '/treatments/general',
  },
  {
    title: 'Orthodontics',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
    href: '/treatments/orthodontics',
  },
  {
    title: 'Oral Hygiene',
    image: 'https://plus.unsplash.com/premium_photo-1661768571778-52173afa5a74?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: '/treatments/hygiene',
  },
  {
    title: 'Root Canal',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=800&auto=format&fit=crop',
    href: '/treatments/root-canal',
  },
  {
    title: 'Teeth Whitening',
    image: 'https://plus.unsplash.com/premium_photo-1664475354661-4328fbb428ed?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: '/treatments/whitening',
  },
  {
    title: 'Digital Dentistry',
    image: 'https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: '/treatments/digital',
  },
  {
    title: 'Dental Implants',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
    href: '/treatments/implants',
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

        {/* Image Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {treatments.map((treatment, index) => (
            <Link
              key={treatment.title}
              to={treatment.href}
              className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                index === 1 ? 'lg:row-span-2' : 'aspect-[4/3]'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <img
                src={treatment.image}
                alt={treatment.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Title Badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-primary/95 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg">
                  <h3 className="font-semibold text-sm text-center">
                    {treatment.title}
                  </h3>
                </div>
              </div>
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
