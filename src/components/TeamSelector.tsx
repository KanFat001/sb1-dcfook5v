import { useState } from 'react';
import { Search } from 'lucide-react';

interface TeamSelectorProps {
  onSelect: (team: string, sport: string) => void;
}

export function TeamSelector({ onSelect }: TeamSelectorProps) {
  const [search, setSearch] = useState('');
  
  // In a real app, this would be fetched from an API
  const popularTeams = [
    { name: 'Manchester United', sport: 'Soccer' },
    { name: 'Los Angeles Lakers', sport: 'Basketball' },
    { name: 'New York Yankees', sport: 'Baseball' },
    { name: 'Green Bay Packers', sport: 'Football' },
  ];

  const filteredTeams = popularTeams.filter(team =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filteredTeams.map((team) => (
          <button
            key={team.name}
            onClick={() => onSelect(team.name, team.sport)}
            className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900">{team.name}</p>
              <p className="text-sm text-gray-500">{team.sport}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}