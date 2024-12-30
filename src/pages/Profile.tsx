import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export function Profile() {
  const navigate = useNavigate();
  const { profile, signOut } = useAuthStore();
  const [username, setUsername] = useState(profile?.username || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', profile?.id);

      if (error) throw error;

      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Profile Settings</h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          {isEditing ? (
            <div className="mt-1 flex space-x-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <Button onClick={handleUpdateProfile}>Save</Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          ) : (
            <div className="mt-1 flex justify-between items-center">
              <p className="text-gray-900">{profile?.username}</p>
              <Button variant="secondary" onClick={() => setIsEditing(true)}>Edit</Button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-gray-900">{profile?.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Membership Status</label>
          <p className="mt-1">
            {profile?.is_vip ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                VIP Member
              </span>
            ) : (
              <span className="text-gray-500">Standard Member</span>
            )}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Points</label>
          <p className="mt-1 text-gray-900">{profile?.points || 0} points</p>
        </div>

        <div className="pt-4 border-t">
          <Button variant="outline" onClick={handleSignOut} className="text-red-600 hover:text-red-700">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}