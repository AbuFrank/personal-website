import { Button } from '@/app/components/Button';
import DateDisplay from '@/app/components/Date';
import { fetchChessStats } from './data';

const chessStats = await fetchChessStats('example');

export default function ChessStatsPage() {

  // "chess_rapid": {
  //   "last": {
  //     "rating": 1653, "date": 1770763303, "rd": 21
  //   },
  //   "best": {
  //     "rating": 1764, "date": 1758886532, "game": "https://www.chess.com/game/live/143584448296"
  //   },
  //   "record": { "win": 4933, "loss": 4853, "draw": 398 }
  // },

  const { chess_rapid } = chessStats;
  const { last, best, record } = chess_rapid;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chess Statistics</h1>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Last Rating */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800">Last Rating</h3>
            <p className="text-2xl font-bold">{last.rating}</p>

            <p className="text-sm text-gray-600">RD: {last.rd}</p>
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
              {/* 
              <Button variant="primary" href={best.game} target="_blank" rel="noopener noreferrer">
                View Game
              </Button> */}
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