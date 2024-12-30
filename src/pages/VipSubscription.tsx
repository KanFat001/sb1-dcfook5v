import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Crown, Check } from 'lucide-react';

export function VipSubscription() {
  const { profile } = useAuthStore();

  const features = [
    'Expert betting tips and analysis',
    'Advanced statistics and trends',
    'Early access to new features',
    'Priority support',
    'Exclusive community access',
    'Monthly betting strategy sessions'
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">VIP Subscription</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {profile?.is_vip ? (
          <div className="p-8 text-center">
            <Crown className="mx-auto h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You're a VIP Member!</h2>
            <p className="text-gray-600">
              Thank you for being a valued member of our VIP community.
              Enjoy your exclusive benefits and premium features.
            </p>
          </div>
        ) : (
          <div className="p-8">
            <div className="text-center mb-8">
              <Crown className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to VIP</h2>
              <p className="text-gray-600">
                Get access to exclusive features and premium betting advice
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Monthly Subscription</h3>
                  <div className="text-right">
                    <p className="text-3xl font-bold">$29.99</p>
                    <p className="text-sm text-gray-500">per month</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Now
                </Button>
              </div>

              <p className="text-sm text-gray-500 text-center">
                Cancel anytime. No long-term commitment required.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}