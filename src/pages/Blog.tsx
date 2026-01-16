import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const posts = [
  {
    title: 'The Benefits of Regular Dental Check-ups',
    category: 'Oral Health',
    excerpt: 'Discover why routine visits to your dentist are essential for maintaining a healthy smile and preventing serious issues before they develop.',
    date: 'Dec 15, 2024',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800',
    slug: 'benefits-regular-checkups',
    readTime: '5 min read',
  },
  {
    title: 'Is Invisalign Right for You?',
    category: 'Orthodontics',
    excerpt: 'Learn about the clear aligner treatment that\'s transforming smiles discreetly and comfortably. We cover everything you need to know.',
    date: 'Dec 10, 2024',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800',
    slug: 'invisalign-right-for-you',
    readTime: '7 min read',
  },
  {
    title: 'Foods That Boost Your Dental Health',
    category: 'Nutrition',
    excerpt: 'What you eat affects your oral health more than you might think. Here are the best foods for strong teeth and healthy gums.',
    date: 'Dec 5, 2024',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800',
    slug: 'foods-boost-dental-health',
    readTime: '4 min read',
  },
  {
    title: 'Understanding Dental Implants: A Complete Guide',
    category: 'Treatments',
    excerpt: 'Everything you need to know about dental implants, from the procedure to recovery and long-term care.',
    date: 'Nov 28, 2024',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800',
    slug: 'understanding-dental-implants',
    readTime: '8 min read',
  },
  {
    title: 'How to Overcome Dental Anxiety',
    category: 'Patient Care',
    excerpt: 'Nervous about visiting the dentist? You\'re not alone. Here are our top tips for managing dental anxiety.',
    date: 'Nov 20, 2024',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800',
    slug: 'overcome-dental-anxiety',
    readTime: '6 min read',
  },
  {
    title: 'The Truth About Teeth Whitening',
    category: 'Cosmetic',
    excerpt: 'From over-the-counter products to professional treatments, we separate fact from fiction when it comes to whitening your smile.',
    date: 'Nov 15, 2024',
    image: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?q=80&w=800',
    slug: 'truth-about-teeth-whitening',
    readTime: '5 min read',
  },
];

const categories = ['All', 'Oral Health', 'Treatments', 'Cosmetic', 'Orthodontics', 'Nutrition', 'Patient Care'];

export default function BlogPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-secondary to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium text-sm tracking-wide uppercase mb-4 block">
              Our Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6">
              Dental Insights & Tips
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Stay informed about the latest in dental care, treatments, and tips for 
              maintaining a healthy, beautiful smile.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search articles..." 
                className="pl-12 h-12 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container-custom">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  index === 0 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group bg-card rounded-2xl overflow-hidden card-hover border border-transparent hover:border-primary/20"
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
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
