import { Award, Users, Sparkles, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized for excellence in patient care and clinical outcomes.',
  },
  {
    icon: Users,
    title: 'Experienced Team',
    description: 'Our dentists have over 50 years of combined experience.',
  },
  {
    icon: Sparkles,
    title: 'Modern Technology',
    description: 'State-of-the-art equipment for precise, comfortable treatments.',
  },
  {
    icon: HeartHandshake,
    title: 'Patient Focused',
    description: 'Your comfort and wellbeing are at the heart of everything we do.',
  },
];

export function About() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=1200"
                alt="Beaumont Dental Practice interior"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Stats Card */}
            <div className="absolute -right-6 -bottom-6 bg-primary text-primary-foreground rounded-2xl p-8 shadow-large">
              <div className="text-4xl font-serif font-bold mb-1">25+</div>
              <div className="text-primary-foreground/80 text-sm">Years of Excellence</div>
            </div>
            
            {/* Decorative */}
            <div className="absolute -left-4 top-1/4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
          </div>

          {/* Content Side */}
          <div>
            <span className="text-primary font-medium text-sm tracking-wide uppercase mb-4 block">
              About Our Practice
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6">
              Where Expertise Meets Compassion
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              At Beaumont Dental Practice, we believe that exceptional dental care goes 
              beyond clinical excellence. It's about creating a welcoming environment where 
              every patient feels valued, understood, and at ease.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Founded in 1998, our practice has grown to become one of London's most trusted 
              dental clinics. We combine traditional values of personal care with the latest 
              advances in dental technology to deliver outstanding results for every smile.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
