import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const posts = [
  {
    title: 'The Benefits of Regular Dental Check-ups',
    category: 'Oral Health',
    excerpt: 'Discover why routine visits to your dentist are essential for maintaining a healthy smile and preventing serious issues.',
    date: 'Dec 15, 2024',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600',
    slug: 'benefits-regular-checkups',
  },
  {
    title: 'Is Invisalign Right for You?',
    category: 'Orthodontics',
    excerpt: 'Learn about the clear aligner treatment that\'s transforming smiles discreetly and comfortably.',
    date: 'Dec 10, 2024',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600',
    slug: 'invisalign-right-for-you',
  },
  {
    title: 'Foods That Boost Your Dental Health',
    category: 'Nutrition',
    excerpt: 'What you eat affects your oral health. Here are the best foods for strong teeth and healthy gums.',
    date: 'Dec 5, 2024',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600',
    slug: 'foods-boost-dental-health',
  },
];

export function Blog() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-primary font-medium text-sm tracking-wide uppercase mb-4 block">
              Latest News
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground">
              From Our Blog
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View all posts
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="group bg-card rounded-2xl overflow-hidden card-hover border border-transparent hover:border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all"
                >
                  Read more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
