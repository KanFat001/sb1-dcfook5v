import { useMemo } from 'react';

interface BettingStatsProps {
  bets: any[];
}

export function BettingStats({ bets }: BettingStatsProps) {
  const stats = useMemo(() => {
    const totalBets = bets.length;
    const wonBets = bets.filter(bet => bet.status === 'won').length;
    const winRatio = totalBets > 0 ? (wonBets / totalBets) * 100 : 0;
    const totalProfit = bets.reduce((sum, bet) => sum + (bet.profit_loss || 0), 0);

    return {
      totalBets,
      wonBets,
      winRatio,
      totalProfit
    };
  }, [bets]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Bets</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalBets}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Won Bets</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">{stats.wonBets}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Win Ratio</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">{stats.winRatio.toFixed(1)}%</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Profit/Loss</h3>
        <p className={`mt-2 text-3xl font-bold ${stats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${stats.totalProfit.toFixed(2)}
        </p>
      </div>
    </div>
  );
}