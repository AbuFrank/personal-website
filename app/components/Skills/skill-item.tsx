interface Skill {
  color: string;
  name: string;
  totalLines: number;
}

export default function SkillItem({ lang }: { lang: Skill }) {
  return (
    <div key={lang.name} className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <div
          className="w-4 h-4 rounded-full mr-2"
          style={{ backgroundColor: lang.color }}
        ></div>
        <span className="font-medium">{lang.name}</span>
      </div>
      <div className="text-sm text-gray-600">
        Total lines: {lang.totalLines.toLocaleString()}
      </div>
    </div>
  );
}