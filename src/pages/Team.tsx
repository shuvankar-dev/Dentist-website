import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CTA } from '@/components/sections/CTA';

const team = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Principal Dentist',
    qualification: 'BDS, MSc, MJDF RCS',
    bio: 'Sarah founded Beaumont Dental Practice over 20 years ago with a vision to provide exceptional dental care in a welcoming environment. She specializes in cosmetic dentistry and smile makeovers, and is passionate about helping patients achieve the smile of their dreams. Sarah regularly attends international conferences to stay at the forefront of dental innovation.',
    specialties: ['Cosmetic Dentistry', 'Smile Makeovers', 'Veneers'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600',
  },
  {
    name: 'Dr. James Chen',
    role: 'Dental Surgeon',
    qualification: 'BDS, MFDS, PhD',
    bio: 'James is our implant specialist with extensive training in oral surgery and rehabilitation. After completing his PhD in implant dentistry, he joined our team to lead our implant services. His gentle approach and meticulous attention to detail ensure outstanding results for every patient.',
    specialties: ['Dental Implants', 'Oral Surgery', 'Bone Grafting'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600',
  },
  {
    name: 'Dr. Emma Thompson',
    role: 'Orthodontist',
    qualification: 'BDS, MSc Orthodontics',
    bio: 'Emma is passionate about creating beautiful smiles through orthodontic treatment. She is a certified Invisalign provider and has helped hundreds of patients achieve straighter teeth. Emma believes that orthodontic treatment should be comfortable and convenient, which is why she loves offering clear aligner solutions.',
    specialties: ['Invisalign', 'Clear Aligners', 'Adult Orthodontics'],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=600',
  },
  {
    name: 'Dr. Michael Park',
    role: 'Associate Dentist',
    qualification: 'BDS, MJDF RCS',
    bio: 'Michael focuses on family dentistry and has a gentle approach that puts patients of all ages at ease. He has a special interest in preventive care and patient education, believing that the best dental treatment is preventing problems before they start.',
    specialties: ['Family Dentistry', 'Preventive Care', 'Restorative Dentistry'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600',
  },
  {
    name: 'Lisa Rodriguez',
    role: 'Dental Hygienist',
    qualification: 'Dip Dental Hygiene',
    bio: 'Lisa has been part of our hygiene team for over 10 years. She is dedicated to helping patients maintain healthy gums and teeth through professional cleaning and personalized hygiene advice. Lisa makes every visit comfortable and informative.',
    specialties: ['Hygiene Treatments', 'Gum Health', 'Patient Education'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600',
  },
  {
    name: 'Tom Williams',
    role: 'Practice Manager',
    qualification: 'Healthcare Management',
    bio: 'Tom ensures the smooth running of our practice and is often the first point of contact for patients. His friendly manner and organizational skills help create a welcoming environment for everyone who visits Beaumont Dental.',
    specialties: ['Patient Care', 'Appointment Scheduling', 'Practice Administration'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600',
  },
];

export default function TeamPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-secondary to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium text-sm tracking-wide uppercase mb-4 block">
              Our Team
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6">
              Meet Your Dental Experts
            </h1>
            <p className="text-muted-foreground text-lg">
              Our skilled team of dental professionals brings together decades of experience 
              and a shared commitment to exceptional patient care. Get to know the people 
              who will be looking after your smile.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {team.map((member) => (
              <div 
                key={member.name}
                className="bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="grid sm:grid-cols-[200px,1fr] lg:grid-cols-[250px,1fr]">
                  <div className="aspect-square sm:aspect-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6 lg:p-8">
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-1">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.qualification}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty) => (
                        <span 
                          key={specialty}
                          className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
              Join Our Team
            </h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for talented dental professionals who share our passion 
              for exceptional patient care. Get in touch to learn about current opportunities.
            </p>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
