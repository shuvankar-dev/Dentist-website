import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, Clock, Heart, Shield } from 'lucide-react';

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Organic Shape Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] transform scale-105" />
              
              {/* Image */}
              <div className="relative rounded-[40%_60%_70%_30%/60%_30%_70%_40%] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop"
                  alt="Happy patient with beautiful smile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6">
              Experience Excellence in Dental Care
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At Beaumont Dental Practice, we combine advanced technology with personalized care 
              to deliver exceptional results. Your comfort and satisfaction are our top priorities.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Award-Winning Practice</h3>
                  <p className="text-muted-foreground text-sm">
                    Recognized for excellence in patient care and innovative treatments
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Flexible Appointments</h3>
                  <p className="text-muted-foreground text-sm">
                    Evening and weekend slots available to fit your busy schedule
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Patient-Centered Care</h3>
                  <p className="text-muted-foreground text-sm">
                    Personalized treatment plans tailored to your unique needs and goals
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Safe & Comfortable</h3>
                  <p className="text-muted-foreground text-sm">
                    State-of-the-art facilities with the highest safety and hygiene standards
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button asChild size="lg" className="gap-2">
              <Link to="/booking">
                Schedule Your Visit
              </Link>
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              New patients welcome • No referral needed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
