import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const treatments = [
  { name: 'General Dentistry', href: '/treatments/general' },
  { name: 'Invisalign', href: '/treatments/invisalign' },
  { name: 'Dental Implants', href: '/treatments/implants' },
  { name: 'Teeth Whitening', href: '/treatments/whitening' },
  { name: 'Oral Hygiene', href: '/treatments/hygiene' },
  { name: 'Cosmetic Dentistry', href: '/treatments/cosmetic' },
];

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Treatments', href: '/treatments', hasDropdown: true },
  { name: 'Fees & Plans', href: '/fees' },
  { name: 'Meet the Team', href: '/team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setTreatmentsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif text-xl font-bold">B</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-xl font-semibold text-foreground">Beaumont</span>
              <span className="text-muted-foreground text-sm block -mt-1">Dental Practice</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <button
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      location.pathname.startsWith('/treatments')
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                    onMouseEnter={() => setTreatmentsOpen(true)}
                    onMouseLeave={() => setTreatmentsOpen(false)}
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-colors block',
                      location.pathname === item.href
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown */}
                {item.hasDropdown && (
                  <div
                    className={cn(
                      'absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'
                    )}
                    onMouseEnter={() => setTreatmentsOpen(true)}
                    onMouseLeave={() => setTreatmentsOpen(false)}
                  >
                    <div className="bg-card rounded-xl shadow-medium border border-border p-2 min-w-[220px] animate-slide-down">
                      {treatments.map((treatment) => (
                        <Link
                          key={treatment.name}
                          to={treatment.href}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                          {treatment.name}
                        </Link>
                      ))}
                      <div className="border-t border-border mt-2 pt-2">
                        <Link
                          to="/treatments"
                          className="block px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        >
                          View All Treatments →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+441onal234567890"
              className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>020 1234 5678</span>
            </a>
            <Button asChild className="hidden sm:inline-flex">
              <Link to="/booking">Book Appointment</Link>
            </Button>
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-fade-in">
            <div className="py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setTreatmentsOpen(!treatmentsOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 text-foreground"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={cn('w-4 h-4 transition-transform', treatmentsOpen && 'rotate-180')} />
                      </button>
                      {treatmentsOpen && (
                        <div className="pl-4 pb-2 space-y-1 animate-fade-in">
                          {treatments.map((treatment) => (
                            <Link
                              key={treatment.name}
                              to={treatment.href}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary"
                            >
                              {treatment.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        'block px-4 py-3',
                        location.pathname === item.href ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-4 pt-4">
                <Button asChild className="w-full">
                  <Link to="/booking">Book Appointment</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
