'use client';

import ProjectCard from '@/app/components/Projects/project-card';
import { useState, useEffect } from 'react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-featured online shopping experience with payment integration and inventory management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team features.',
      technologies: ['Next.js', 'Firebase', 'Tailwind CSS']
    },
    {
      id: 3,
      title: 'Health & Fitness Tracker',
      description: 'Mobile-first application for tracking workouts, nutrition, and health metrics.',
      technologies: ['React Native', 'GraphQL', 'PostgreSQL']
    },
    {
      id: 4,
      title: 'Financial Dashboard',
      description: 'Data visualization platform for financial analytics and reporting.',
      technologies: ['Vue.js', 'D3.js', 'Python', 'Django']
    },
    {
      id: 5,
      title: 'Social Media Analytics',
      description: 'Comprehensive analytics tool for tracking social media performance across platforms.',
      technologies: ['React', 'Express', 'Redis', 'Elasticsearch']
    },
    {
      id: 6,
      title: 'AI Content Generator',
      description: 'Machine learning-powered content creation platform with natural language processing.',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'React']
    }
  ]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div id="projects" className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and expertise in full-stack development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}