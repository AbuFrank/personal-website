import Hero from '@/app/components/Hero';
import Skills from '@/app/components/Skills';
import Projects from '@/app/components/Projects';
import Contact from '@/app/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}