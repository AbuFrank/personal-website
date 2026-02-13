import { ChessStats } from '@/types/chess';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChessStats | { error: string }>
) {
  try {
    const username = 'example';
    const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ChessStats = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching chess stats:', error);
    res.status(500).json({ error: 'Failed to fetch chess statistics' });
  }
}