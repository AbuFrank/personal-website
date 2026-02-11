import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export const ProjectCard = ({
  id,
  title,
  description,
  technologies,
  githubUrl,
  liveUrl
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {liveUrl && (
            <a href={liveUrl} className="text-blue-600 hover:underline">Live Demo</a>
          )}
          {githubUrl && (
            <a href={githubUrl} className="text-blue-600 hover:underline">GitHub</a>
          )}
        </div>
      </div>
    </motion.div>
  );
};