import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/sections/Hero';
import { Treatments } from '@/components/sections/Treatments';
import { About } from '@/components/sections/About';
import { Team } from '@/components/sections/Team';
import { Blog } from '@/components/sections/Blog';
import { CTA } from '@/components/sections/CTA';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Treatments />
      <About />
      <Team />
      <Blog />
      <CTA />
    </Layout>
  );
};

export default Index;
