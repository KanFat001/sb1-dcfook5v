import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Trophy, Award, Medal } from 'lucide-react';

export function Rankings() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function loadRankings() {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('points', { ascending: false });
      
      if (data) setUsers(data);
    }

    loadRankings();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Leaderboard</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {users.slice(0, 3).map((user, index) => (
              <div key={user.id} className="bg-gray-50 p-6 rounded-lg text-center">
                {index === 0 && <Trophy className="mx-auto h-8 w-8 text-yellow-400 mb-2" />}
                {index === 1 && <Award className="mx-auto h-8 w-8 text-gray-400 mb-2" />}
                {index === 2 && <Medal className="mx-auto h-8 w-8 text-orange-400 mb-2" />}
                <h3 className="text-lg font-medium">{user.username}</h3>
                <p className="text-2xl font-bold text-blue-600">{user.points} pts</p>
              </div>
            ))}
          </div>

          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Rank</th>
                <th className="text-left py-3 px-4">Username</th>
                <th className="text-right py-3 px-4">Points</th>
                <th className="text-center py-3 px-4">VIP Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4 text-right">{user.points}</td>
                  <td className="py-3 px-4 text-center">
                    {user.is_vip && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        VIP
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}