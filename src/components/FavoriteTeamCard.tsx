import { useEffect, useState } from 'react';

interface TeamStats {
  rank: number;
  form: string[];
  nextMatch: {
    opponent: string;
    date: string;
    isHome: boolean;
  };
}

interface FavoriteTeamCardProps {
  teamName: string;
  sport: string;
}

export function FavoriteTeamCard({ teamName, sport }: FavoriteTeamCardProps) {
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);

  // In a real application, this would fetch from a sports API
  useEffect(() => {
    // Simulated data for demonstration
    setTeamStats({
      rank: 3,
      form: ['W', 'W', 'L', 'D', 'W'],
      nextMatch: {
        opponent: 'Team B',
        date: '2024-03-20',
        isHome: true
      }
    });
  }, [teamName]);

  if (!teamStats) {
    return <div className="animate-pulse bg-gray-100 h-48 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{teamName}</h3>
          <p className="text-sm text-gray-500">{sport}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current Rank</p>
          <p className="text-2xl font-bold text-blue-600">#{teamStats.rank}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Form</h4>
          <div className="flex space-x-1">
            {teamStats.form.map((result, index) => (
              <span
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                  result === 'W' ? 'bg-green-100 text-green-800' :
                  result === 'L' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}
              >
                {result}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Next Match</h4>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {teamStats.nextMatch.isHome ? 'vs' : '@'} {teamStats.nextMatch.opponent}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(teamStats.nextMatch.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}