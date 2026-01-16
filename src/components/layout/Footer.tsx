import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const quickLinks = [
  { name: 'General Dentistry', href: '/treatments/general' },
  { name: 'Invisalign', href: '/treatments/invisalign' },
  { name: 'Dental Implants', href: '/treatments/implants' },
  { name: 'Teeth Whitening', href: '/treatments/whitening' },
];

const companyLinks = [
  { name: 'About Us', href: '/team' },
  { name: 'Fees & Plans', href: '/fees' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-secondary">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-xl font-bold">B</span>
              </div>
              <div>
                <span className="font-serif text-xl font-semibold text-secondary">Beaumont</span>
                <span className="text-secondary/60 text-sm block -mt-1">Dental Practice</span>
              </div>
            </Link>
            <p className="text-secondary/70 text-sm leading-relaxed mb-6">
              Providing exceptional dental care in a comfortable, modern environment. 
              Your smile is our priority.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-primary transition-colors group">
                <Facebook className="w-5 h-5 text-secondary/70 group-hover:text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-primary transition-colors group">
                <Instagram className="w-5 h-5 text-secondary/70 group-hover:text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-primary transition-colors group">
                <Twitter className="w-5 h-5 text-secondary/70 group-hover:text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-secondary">Treatments</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-secondary">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-secondary">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary/70 text-sm">
                  30 Beaumont Street<br />London, W1G 6EN
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:02012345678" className="text-secondary/70 hover:text-primary transition-colors text-sm">
                  020 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@beaumontdental.co.uk" className="text-secondary/70 hover:text-primary transition-colors text-sm">
                  info@beaumontdental.co.uk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary/70 text-sm">
                  Mon - Fri: 8am - 6pm<br />Sat: 9am - 2pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary/50 text-sm">
            © {new Date().getFullYear()} Beaumont Dental Practice. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-secondary/50 hover:text-secondary/70 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-secondary/50 hover:text-secondary/70 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
