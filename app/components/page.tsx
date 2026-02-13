'use client'

const PaletteButtons = () => {

  const colors = [
    { name: 'blue-900', value: '#0c1437' },
    { name: 'purple-900', value: '#2e1b5a' },
    { name: 'indigo-900', value: '#2d1b69' },
    { name: 'blue-500', value: '#3b82f6' },
    { name: 'purple-500', value: '#8b5cf6' },
    { name: 'indigo-500', value: '#6366f1' },
    { name: 'blue-100', value: '#dbeafe' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Palette Color Buttons</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {colors.map((color) => (
          <button
            key={color.name}
            className="h-32 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 flex flex-col items-center justify-center"
            style={{ backgroundColor: color.value }}
            onClick={() => console.log(`Clicked ${color.name} button`)}
          >
            <span className="text-white font-bold text-lg drop-shadow-md">
              {color.name}
            </span>
            <span className="text-white text-sm drop-shadow-md opacity-80 mt-1">
              {color.value}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaletteButtons;