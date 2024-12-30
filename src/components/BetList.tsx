import { format } from 'date-fns';

interface BetListProps {
  bets: any[];
}

export function BetList({ bets }: BetListProps) {
  const sortedBets = [...bets].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sport</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bet Type</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Odds</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">P/L</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedBets.map((bet) => (
            <tr key={bet.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(bet.created_at), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bet.sport}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bet.event}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bet.bet_type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                ${bet.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                {bet.odds.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${bet.status === 'won' ? 'bg-green-100 text-green-800' :
                    bet.status === 'lost' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'}`}>
                  {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                </span>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right
                ${bet.profit_loss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {bet.profit_loss >= 0 ? '+' : ''}{bet.profit_loss.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}