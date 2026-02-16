'use client'
import { useEffect, useState } from "react";

export default function APODContent() {
  const [stars, setStars] = useState<Array<{ x: number, y: number, size: number }>>([]);
  const [apodData, setApodData] = useState<any>(null);
  const [loading, setLoading] = useState(true)

  // const apodData = await getAstronomyPictureOfTheDay();

  useEffect(() => {
    // Fetch apod data
    const fetchData = async () => {
      try {
        const response = await fetch('/api/apod',
          {
            next: {
              revalidate: 43200, // 12 hours in seconds (12 * 60 * 60)
            }
          }
        );
        const data = await response.json();
        setApodData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching APOD data:', error);
      }
    };

    // Generate random stars
    const generateStars = () => {
      const starsArray = [];
      const starCount = 150; // Adjust density as needed

      for (let i = 0; i < starCount; i++) {
        starsArray.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1 // Random size between 1-4px
        });
      }

      setStars(starsArray);
    };

    generateStars();
    fetchData();
  }, []);


  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white pt-20 pb-12">
      {/* Starry background */}
      <div className="absolute inset-0">
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: Math.random() * 0.8 + 0.2, // Random opacity between 0.2-1
              animationDuration: `${Math.random() * 3 + 2}s`, // Random animation duration
            }}
          />
        ))}
      </div>
      {!loading && !!apodData ? <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Astronomy Picture of the Day</h1>
          <p className="text-xl text-gray-300">Explore the wonders of our universe</p>
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                {apodData.media_type === 'image' ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={apodData.url}
                      alt={apodData.title}
                      className="w-full h-auto object-cover"
                      width={600}
                      height={400}
                    />
                    {apodData.copyright && (
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-4">
                        <p className="text-sm text-gray-300">© {apodData.copyright}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden h-96 flex items-center justify-center bg-gray-900">
                    <iframe
                      src={apodData.url}
                      title={apodData.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>

              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-4">{apodData.title}</h2>
                <p className="text-gray-400 mb-6">{apodData.date}</p>

                {apodData.explanation && (
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed">{apodData.explanation}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {apodData.hdurl && (
                        <a
                          href={apodData.hdurl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
                        >
                          View High Resolution
                        </a>
                      )}
                      <a
                        href="https://apod.nasa.gov/apod/calendar/allyears.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg transition-colors duration-300"
                      >
                        View Calendar
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {apodData.service_version && (
              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-500">Service Version: {apodData.service_version}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p>Powered by NASA's Astronomy Picture of the Day API</p>
        </div>
      </div> : <APODLoading />}
    </div>
  );
}

function APODLoading() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse">Astronomy Picture of the Day</h1>
        <div className="h-4 bg-gray-700 rounded w-1/3 mx-auto"></div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <div className="h-96 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>

            <div className="lg:w-1/2">
              <div className="h-8 bg-gray-700 rounded w-3/4 mb-6 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
