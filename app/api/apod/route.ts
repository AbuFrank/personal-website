import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];

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

    // Ensure we have required fields
    if (!data.url || !data.title) {
      throw new Error('Incomplete APOD data received');
    }

    // Convert date to NASA HTML format: 2026-02-26 → ap260225.html
    if (data.date) {
      const dateParts = data.date.split('-');
      const year = dateParts[0].slice(2); // Get last 2 digits of year
      const month = dateParts[1];
      const day = dateParts[2];

      // Format: apYYMMDD.html
      data.nasa_html_url = `https://apod.nasa.gov/apod/ap${year}${month}${day}.html`;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch APOD data' },
      { status: 500 }
    );
  }
}