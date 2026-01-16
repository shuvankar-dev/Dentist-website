import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, User, Mail, Phone, MessageSquare, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { toast } from '@/hooks/use-toast';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().min(10, 'Please enter a valid phone number').max(20),
  treatment: z.string().min(1, 'Please select a treatment'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  message: z.string().max(500).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const treatments = [
  'General Check-up',
  'Hygiene Appointment',
  'Teeth Whitening',
  'Invisalign Consultation',
  'Dental Implants',
  'Cosmetic Consultation',
  'Emergency Appointment',
  'Other',
];

const timeSlots = [
  { label: '10:00 AM - 12:00 PM', value: '10:00 AM - 12:00 PM' },
  { label: '12:00 PM - 2:00 PM', value: '12:00 PM - 2:00 PM' },
  { label: '6:00 PM - 8:00 PM', value: '6:00 PM - 8:00 PM' },
  { label: '8:00 PM - 10:00 PM', value: '8:00 PM - 10:00 PM' },
];

export default function Booking() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      const response = await fetch('http://localhost/dental-care/api/bookings.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        toast.success("Booking Request Submitted!", {
          description: "We'll contact you shortly to confirm your appointment.",
        });
      } else {
        toast.error("Booking Failed", {
          description: result.error || "Please try again later.",
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error("Booking Failed", {
        description: "Unable to connect to server. Please try again later.",
      });
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="section-padding min-h-[70vh] flex items-center">
          <div className="container-custom">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-serif font-semibold text-foreground mb-4">
                Booking Request Received!
              </h1>
              <p className="text-muted-foreground mb-8">
                Thank you for choosing Beaumont Dental Practice. Our team will review your 
                request and contact you within 24 hours to confirm your appointment.
              </p>
              <Button onClick={() => setIsSubmitted(false)}>
                Book Another Appointment
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm tracking-wide uppercase mb-4 block">
                Book Online
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-4">
                Schedule Your Visit
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you within 24 hours to confirm 
                your appointment.
              </p>
            </div>

            {/* Form */}
            <div className="bg-card rounded-3xl shadow-card p-8 md:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        {...register('name')}
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                          {...register('email')}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="07123 456789"
                          className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
                          {...register('phone')}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Appointment Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="treatment">Treatment Type *</Label>
                      <Select onValueChange={(value) => setValue('treatment', value)}>
                        <SelectTrigger className={errors.treatment ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select a treatment" />
                        </SelectTrigger>
                        <SelectContent>
                          {treatments.map((treatment) => (
                            <SelectItem key={treatment} value={treatment}>
                              {treatment}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.treatment && (
                        <p className="text-sm text-destructive">{errors.treatment.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">Preferred Date *</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className={errors.preferredDate ? 'border-destructive' : ''}
                        {...register('preferredDate')}
                      />
                      {errors.preferredDate && (
                        <p className="text-sm text-destructive">{errors.preferredDate.message}</p>
                      )}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Preferred Time Slot *</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => {
                              setSelectedTime(slot.value);
                              setValue('preferredTime', slot.value);
                            }}
                            className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${
                              selectedTime === slot.value
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border hover:border-primary/50 text-foreground'
                            }`}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                      {errors.preferredTime && (
                        <p className="text-sm text-destructive">{errors.preferredTime.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Additional Information
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about any concerns or specific requirements..."
                      rows={4}
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Request Appointment'}
                  </Button>
                  <p className="text-sm text-muted-foreground self-center">
                    We'll contact you to confirm availability
                  </p>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-2">
                Prefer to speak with someone?
              </p>
              <a href="tel:02012345678" className="text-primary font-semibold text-lg hover:underline">
                Call us on 020 1234 5678
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
