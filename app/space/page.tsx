
export default async function APODContent() {

  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`,
    {
      next: {
        revalidate: 21600, // every 6 hours in seconds
      }
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const apodData = await response.json();

  // Fallback data in case it's an invalid response or not a typical image
  const fallbackData = {
    "date": "2025-10-07",
    "explanation": "Now a second supernova in this same galaxy is repeating. The cause is the gravitational lens effect of a massive foreground cluster of galaxies (MACS J0138) -- it creates multiple images of a perfectly aligned background galaxy (MRG-M0138). What's particularly interesting is that this background galaxy has young stars that keep blowing up. And images of each supernova explosion keep coming to us multiple times through different paths through the cluster. The original lensed supernova set, shown in the rollover, is called Requiem and was first seen by the Hubble Space Telescope in 2016.  This second lensed supernova set is called Encore and was first seen by the Webb Space Telescope in 2023.  More images from these supernovas are predicted to be on the way, and exactly when they arrive should help humanity to better understand the mass distribution of the galaxy cluster, the supernovas themselves, and possibly even the universe.",
    "hdurl": "https://apod.nasa.gov/apod/image/2510/SupernovaLens_webb_1394.jpg",
    "media_type": "image",
    "service_version": "v1",
    "title": "SN Encore: A Second Supernova Seen Several Times",
    "url": "https://apod.nasa.gov/apod/image/2510/SupernovaLens_webb_960.jpg"
  }

  const isValidVideo = apodData.media_type === 'video' && apodData.url.match(/\.(mp4|webm)$/i);

  const finalData = !!apodData.url && !!apodData.title && (apodData.media_type === 'image' || isValidVideo) ? apodData : fallbackData

  // Convert date to NASA HTML format: 2026-02-26 → ap260225.html
  if (apodData.date) {
    const dateParts = apodData.date.split('-');
    const year = dateParts[0].slice(2); // Get last 2 digits of year
    const month = dateParts[1];
    const day = dateParts[2];

    // Format: apYYMMDD.html
    apodData.nasa_html_url = `https://apod.nasa.gov/apod/ap${year}${month}${day}.html`;
  }

  const stars = [];
  const starCount = 150; // Star density

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1 // Random size between 1-4px
    });
  }

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
      {!!finalData ? <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Astronomy Picture of the Day</h1>
          <p className="text-xl text-gray-300">Explore the wonders of our universe</p>
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6 md:p-8">
            <div className={`flex flex-col ${!isValidVideo ? 'lg:flex-row' : ''} gap-8`}>
              {finalData.media_type === 'image' ? (
                <div className="lg:w-1/2">
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={finalData.url}
                      alt={finalData.title}
                      className="w-full h-auto object-cover"
                      width={600}
                      height={400}
                    />
                    {finalData.copyright && (
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-4">
                        <p className="text-sm text-gray-300">© {finalData.copyright}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Handle video content
                <div className="w-full mb-2">
                  <video
                    src={finalData.url}
                    controls
                    className="w-full h-auto max-w-full"
                    poster={finalData.thumbnail_url || undefined}
                  >
                    Your browser does not support the video tag.
                  </video>

                </div>
              )}

              <div className={!isValidVideo ? "lg:w-1/2" : ''}>
                <h2 className="text-3xl font-bold mb-4">{finalData.title}</h2>
                <p className="text-gray-400 mb-4">{finalData.date}</p>

                {finalData.nasa_html_url && (
                  <div className="mb-4">
                    <a
                      href={finalData.nasa_html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-300 hover:text-blue-100 transition-colors duration-200"
                    >
                      View Full NASA Page
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  </div>
                )}

                {finalData.explanation && (
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed">{finalData.explanation}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {finalData.hdurl && (
                        <a
                          href={finalData.hdurl}
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

            {finalData.service_version && (
              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-500">Service Version: {finalData.service_version}</p>
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
