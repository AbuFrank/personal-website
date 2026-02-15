import DateDisplay from '@/app/components/Date';
import { ChessStats } from '@/types/chess';

export default async function ChessStatsPage() {

  const username = process.env.CHESS_USERNAME;
  const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`, {
    next: { revalidate: 3600 * 12 }
  });


  if (!response.ok) {
    throw new Error(`Failed to fetch chess stats: ${response.status}`);
  }

  const chessStats: ChessStats = await response.json();

  const { chess_rapid } = chessStats;

  if (!chess_rapid) {
    return <div className="py-20">
      <h1 className="text-center">No Stats for provided userName</h1>
    </div>
  }
  const { last, best, record } = chess_rapid;

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-6">Chess Statistics</h1>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Last Rating */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800">Last Rating</h3>
            <p> <span className="text-2xl font-bold">{last.rating}</span><span> &#40;RD: {last.rd}&#41;</span></p>
            <DateDisplay
              date={last.date * 1000}
              format="short"
              className="text-lg font-semibold text-blue-600"
            />
          </div>

          {/* Best Rating */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800">Best Rating</h3>
            <p className="text-2xl font-bold">{best.rating}</p>
            <DateDisplay
              date={best.date * 1000}
              format="short"
              className="text-lg font-semibold text-blue-600"
            />
            <div>
              <a
                href={best.game}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View Game
              </a>
            </div>

          </div>

          {/* Record */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800">Record</h3>
            <p className="text-lg"><span className='text-green-600'>W:</span> {record.win} | <span className="text-red-600">L:</span> {record.loss} | <span className="text-brown-600">D</span>: {record.draw}</p>
          </div>
        </div>
      </div>
    </div>
  );
}