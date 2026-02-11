'use client';

interface Skill {
  name: string;
  level: number;
}

export default function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div className="mb-6 w-full">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium text-gray-900">{skill.name}</h3>
        <span className="font-semibold text-blue-600">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-linear-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );
}