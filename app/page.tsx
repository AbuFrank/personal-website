import Hero from '@/app/components/Hero';
import Skills from '@/app/components/Skills';
import Projects from '@/app/components/Projects';
import Contact from '@/app/components/Contact';

export const revalidate = 86400; // 24 hours in seconds

export default function Home() {
  return (
    <main>
      <Hero />
      <div id="skills" className="min-h-screen max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">My Skills</h1>
        <Skills />
      </div>
      <Projects />
      <Contact />
    </main>
  );
}