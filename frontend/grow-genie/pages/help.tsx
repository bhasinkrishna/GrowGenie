import React, { useState } from "react";
import { useRouter } from "next/router";

const faqs = [
  {
    question: "How do I upload my gardening space image?",
    answer: "Go to the 'Upload Space' page after logging in and choose your image. Make sure the image clearly shows your balcony or gardening area.",
  },
  {
    question: "Why do I need to enter climate and soil information?",
    answer: "This helps Grow Genie personalize your layout and plant suggestions based on your region’s weather and soil type.",
  },
  {
    question: "How can I update my profile details?",
    answer: "Visit the 'Profile' page and click on 'Edit Profile' to update your inputs. Don’t forget to click 'Save Changes'.",
  },
  {
    question: "What if I forget to log out?",
    answer: "For your safety, we recommend logging out after use. If you forget, your session may expire automatically after a while.",
  },
];

export default function HelpPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="Grow Genie Logo" className="w-10 h-10" />
            <h1 className="text-xl sm:text-2xl font-bold text-green-700">Grow Genie</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-green-700 hover:underline">Home</a>
            <a href="/about" className="text-green-700 hover:underline">About</a>
            <a href="/help" className="text-green-700 font-semibold underline">Help</a>
          </div>
        </div>
      </header>

      {/* Main Help Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-800">How can we help you?</h2>

        {/* FAQs */}
        <section className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-green-300 rounded-xl p-4 bg-white shadow">
              <button
                className="w-full text-left text-lg font-medium flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{activeIndex === index ? "−" : "+"}</span>
              </button>
              {activeIndex === index && (
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
