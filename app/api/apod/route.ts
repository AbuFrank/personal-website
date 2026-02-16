import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];

    // This will cache the API response for 12 hours across your entire app
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`,
      {
        next: {
          revalidate: 43200, // 12 hours in seconds
          tags: ['apod', 'nasa'] // Cache tags for invalidation
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch APOD data' },
      { status: 500 }
    );
  }
}