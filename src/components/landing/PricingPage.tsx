// src/components/landing/PricingPage.tsx
import { Check } from 'lucide-react';
import { StripeCheckout } from '../payments/StripeCheckout';
import { SUBSCRIPTION_TIERS } from '../../lib/stripe';
import { useAuthStore } from '../../store/authStore';

export function PricingPage() {
  const { user } = useAuthStore();
  const tiers = Object.values(SUBSCRIPTION_TIERS);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div key={tier.id} className={`bg-white p-8 rounded-lg shadow-sm ${
              tier.id === 'pro' ? 'border-2 border-blue-500 relative' : ''
            }`}>
              {tier.id === 'pro' && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm">
                  Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-4">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${tier.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <StripeCheckout 
                tier={tier}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
