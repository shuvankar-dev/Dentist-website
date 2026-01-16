import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export function WhyUs() {
  return (
    <section className="section-padding bg-gradient-to-br from-secondary/20 to-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Collage Side */}
          <div className="relative h-[600px]">
            {/* Main large image - center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[85%] rounded-3xl overflow-hidden shadow-2xl z-10">
              <img
                src="https://images.unsplash.com/photo-1667133295352-ef4c83620e8e?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Happy patient with beautiful smile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top left - small image */}
            <div className="absolute left-0 top-0 w-[45%] h-[35%] rounded-2xl overflow-hidden shadow-xl z-20">
              <img
                src="https://images.unsplash.com/photo-1674775372058-c4c8813c6611?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Family smiling"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top right - medium image */}
            <div className="absolute right-0 top-12 w-[40%] h-[30%] rounded-2xl overflow-hidden shadow-xl z-20">
              <img
                src="https://plus.unsplash.com/premium_photo-1661506315793-524cde93e5a3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Dental consultation"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom left - decorative element */}
            <div className="absolute left-8 bottom-0 w-[35%] h-[25%] rounded-2xl bg-primary/10 backdrop-blur-sm shadow-lg z-20 flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">5000+</p>
                <p className="text-sm text-muted-foreground font-medium">Happy Smiles</p>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -left-4 top-1/3 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -right-4 bottom-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <span className="text-primary font-medium text-sm tracking-wide uppercase mb-4 block">
              Why Choose Us?
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6">
              Creating Smiles, Building Confidence
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Choosing a trusted dental practice is a big decision. At Beaumont Dental, we pride ourselves 
              in delivering a world-class experience with the most up-to-date and patient-centered care.
            </p>

            {/* Features List */}
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Advanced dental care under one roof</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    From routine check-ups to complex procedures, we offer comprehensive dental services 
                    using the latest technology. Our all-in-one approach means you get the care you need 
                    without being referred elsewhere.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Leaders in digital dentistry</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We use the latest technology, including digital scans and advanced imaging, to 
                    ensure precise, efficient care. Modern tools mean better outcomes and a more 
                    comfortable experience for you.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Experience tailored environment</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We don't just fix teeth; we create a welcoming atmosphere where you feel like 
                    family. Our team takes time to understand your concerns and craft personalized 
                    treatment plans just for you.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Family-focused care</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our dental practice caters to all ages, delivering care that's safe for the 
                    whole family. Keeping everyone's smiles healthy, comfortable and bright is 
                    what we do best.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button asChild size="lg" className="gap-2">
              <Link to="/booking">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
