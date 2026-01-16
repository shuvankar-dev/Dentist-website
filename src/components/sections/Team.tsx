import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const team = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Principal Dentist',
    qualification: 'BDS, MSc, MJDF RCS',
    bio: 'Sarah has over 20 years of experience and specializes in cosmetic dentistry and smile makeovers.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400',
  },
  {
    name: 'Dr. James Chen',
    role: 'Dental Surgeon',
    qualification: 'BDS, MFDS, PhD',
    bio: 'James is our implant specialist with extensive training in oral surgery and rehabilitation.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400',
  },
  {
    name: 'Dr. Emma Thompson',
    role: 'Orthodontist',
    qualification: 'BDS, MSc Orthodontics',
    bio: 'Emma is passionate about creating beautiful smiles with Invisalign and traditional braces.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400',
  },
  {
    name: 'Dr. Michael Park',
    role: 'Associate Dentist',
    qualification: 'BDS, MJDF RCS',
    bio: 'Michael focuses on family dentistry and has a gentle approach that puts patients at ease.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400',
  },
];

export function Team() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm tracking-wide uppercase mb-4 block">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6">
            Meet Your Dental Experts
          </h2>
          <p className="text-muted-foreground text-lg">
            Our skilled team of dental professionals is dedicated to providing you with 
            exceptional care in a warm, friendly environment.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="group bg-card rounded-2xl overflow-hidden card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-1">{member.role}</p>
                <p className="text-muted-foreground text-xs mb-3">{member.qualification}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View full team
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
