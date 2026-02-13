export async function fetchChessStats(userName: string) {
  // Replace with your actual API endpoint
  const response = await fetch(`https://api.chess.com/pub/player/${userName}/stats`);
  return response.json();
}