'use client';

import SkillItem from '@/app/components/Skills/skill-item';
import { useState, useEffect } from 'react';

export default function SkillsPage() {
  const [skills, setSkills] = useState([
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'UI/UX Design', level: 70 },
    { name: 'GraphQL', level: 65 },
    { name: 'AWS', level: 60 },
    { name: 'Docker', level: 55 },
  ]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-linear  -to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Skills</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I've honed my skills over the years to become proficient in various technologies and methodologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <SkillItem skill={skill} />
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About My Approach</h2>
          <p className="text-gray-600 leading-relaxed">
            I believe in continuous learning and staying updated with the latest industry trends.
            My approach combines technical expertise with creative problem-solving to deliver
            high-quality solutions that meet both user needs and business objectives.
          </p>
        </div>
      </div>
    </div>
  );
}