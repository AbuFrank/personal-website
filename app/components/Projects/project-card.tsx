'use client';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className="p-6 grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
        <p className="text-gray-600 mb-4 grow">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="px-6 pb-6">
        <a href={`https://github.com/AbuFrank/${project.slug}`} target="_blank" rel="noopener noreferrer">

          <button className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            View Code
          </button>
        </a>
      </div>
    </div>
  );
}