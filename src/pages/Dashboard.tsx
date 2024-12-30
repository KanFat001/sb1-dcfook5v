import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { BettingStats } from '@/components/BettingStats';
import { BetHistoryChart } from '@/components/charts/BetHistoryChart';
import { BetList } from '@/components/BetList';
import { FavoriteTeamCard } from '@/components/FavoriteTeamCard';
import { TeamSelector } from '@/components/TeamSelector';
import toast from 'react-hot-toast';

export function Dashboard() {
  const { profile } = useAuthStore();
  const [bets, setBets] = useState<any[]>([]);
  const [showNewBetForm, setShowNewBetForm] = useState(false);
  const [showTeamSelector, setShowTeamSelector] = useState(false);
  const [newBet, setNewBet] = useState({
    sport: '',
    event: '',
    bet_type: '',
    amount: '',
    odds: ''
  });

  useEffect(() => {
    async function loadBets() {
      const { data } = await supabase
        .from('bets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setBets(data);
    }

    loadBets();
  }, []);

  const handleNewBet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const amount = parseFloat(newBet.amount);
      const odds = parseFloat(newBet.odds);
      
      const { error } = await supabase
        .from('bets')
        .insert([{
          user_id: profile?.id,
          sport: newBet.sport,
          event: newBet.event,
          bet_type: newBet.bet_type,
          amount,
          odds,
          profit_loss: -amount // Initial loss is the bet amount
        }]);

      if (error) throw error;

      toast.success('Bet recorded successfully');
      setShowNewBetForm(false);
      setNewBet({ sport: '', event: '', bet_type: '', amount: '', odds: '' });
      
      // Reload bets
      const { data } = await supabase
        .from('bets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setBets(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleTeamSelect = async (teamName: string, sport: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          favorite_team: teamName,
          favorite_sport: sport
        })
        .eq('id', profile?.id);

      if (error) throw error;

      toast.success('Favorite team updated');
      setShowTeamSelector(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome back, {profile?.username}!</h1>
        <Button onClick={() => setShowNewBetForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Record Bet
        </Button>
      </div>

      <BettingStats bets={bets} />

      {profile?.favorite_team ? (
        <div className="flex justify-between items-start">
          <FavoriteTeamCard
            teamName={profile.favorite_team}
            sport={profile.favorite_sport || ''}
          />
          <Button
            variant="outline"
            onClick={() => setShowTeamSelector(true)}
          >
            Change Team
          </Button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-4">Select your favorite team to get personalized updates</p>
          <Button onClick={() => setShowTeamSelector(true)}>
            Choose Team
          </Button>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Balance History</h2>
        <BetHistoryChart bets={bets} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Bets</h2>
        <BetList bets={bets} />
      </div>

      {/* New Bet Modal */}
      {showNewBetForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Record New Bet</h2>
            <form onSubmit={handleNewBet} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Sport</label>
                <input
                  type="text"
                  required
                  value={newBet.sport}
                  onChange={(e) => setNewBet({ ...newBet, sport: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Event</label>
                <input
                  type="text"
                  required
                  value={newBet.event}
                  onChange={(e) => setNewBet({ ...newBet, event: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bet Type</label>
                <input
                  type="text"
                  required
                  value={newBet.bet_type}
                  onChange={(e) => setNewBet({ ...newBet, bet_type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  value={newBet.amount}
                  onChange={(e) => setNewBet({ ...newBet, amount: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Odds</label>
                <input
                  type="number"
                  required
                  min="1.01"
                  step="0.01"
                  value={newBet.odds}
                  onChange={(e) => setNewBet({ ...newBet, odds: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit">Record Bet</Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowNewBetForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Team Selector Modal */}
      {showTeamSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Select Your Favorite Team</h2>
            <TeamSelector onSelect={handleTeamSelect} />
            <div className="mt-4">
              <Button
                variant="secondary"
                onClick={() => setShowTeamSelector(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}