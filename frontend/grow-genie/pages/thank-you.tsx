
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/router';

const ThankYou = () => {
  const router = useRouter();

  const handleManualRedirect = () => {
    // Ensure it's logging and routing
    console.log('Redirecting to home...');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-xl text-center">
        <CheckCircle className="mx-auto text-green-500" size={60} />
        <h1 className="text-3xl font-bold mt-4 text-green-700">
          Thank You for Submitting Your Details!
        </h1>
        <p className="mt-4 text-gray-600">
          We truly appreciate your interest in{' '}
          <span className="font-semibold text-green-600">Grow Genie</span>.
        </p>
        <p className="mt-2 text-gray-600">
          Our team is analyzing your space and preferences to craft a personalized farming layout for you.
        </p>
        <p className="mt-2 text-gray-800 font-medium">
          You’ll receive your layout within{' '}
          <span className="text-green-700 font-bold">2–3 days</span>.
        </p>
        <p className="mt-6 text-sm text-gray-500 italic">
          🌿 Till then, stay green and stay tuned!
        </p>

        {/* Manual Redirect Button */}
        <button
          onClick={handleManualRedirect}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow transition-all duration-300"
        >
          Go to Home Now
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
