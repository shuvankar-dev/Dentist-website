import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    daysAgo: '2 days ago',
    rating: 5,
    text: 'Always on time, clean and efficient. Dr Vallis listened to my concerns and acted on them, carefully...',
    verified: true,
  },
  {
    name: 'Rajesh Kumar',
    daysAgo: '1 week ago',
    rating: 5,
    text: 'As always the experience of dental treatment with Joel Winter was exceptional. One hour of comple...',
    verified: true,
  },
  {
    name: 'Ananya Patel',
    daysAgo: '2 weeks ago',
    rating: 5,
    text: "Mr Winter's sense of humour is as brilliant as his dentistry. I was also glad this time to see beautiful...",
    verified: true,
  },
  {
    name: 'Arjun Mehta',
    daysAgo: '3 weeks ago',
    rating: 5,
    text: 'I have been using this practice for 42 years I have always been looked after and have no complaints yet !!',
    verified: true,
  },
];

export function CTA() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Google Reviews Header */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-semibold text-gray-900 text-lg">Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-900">4.9</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(144)</span>
              </div>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
              Review us on Google
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{testimonial.daysAgo}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                {testimonial.text}
              </p>

              {/* Read More Link */}
              <button className="text-primary text-sm font-medium hover:underline">
                Read more
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
