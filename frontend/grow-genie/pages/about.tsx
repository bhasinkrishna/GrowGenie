import React from "react";

export default function AboutPage() {
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
            <a href="/about" className="text-green-700 font-semibold underline">About</a>
            <a href="/help" className="text-green-700 hover:underline">Help</a>
          </div>
        </div>
      </header>

      {/* About Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-800">About Grow Genie</h2>

        <section className="bg-white p-6 rounded-2xl shadow space-y-6">
          <p className="text-lg leading-relaxed">
            <strong>Grow Genie</strong> is your smart gardening companion designed for modern urban living.
            Whether you're living in a cozy apartment or a compact flat, our platform helps you transform
            your balcony or small space into a flourishing green haven.
          </p>

          <p className="text-lg leading-relaxed">
            With our space-based suggestions, we make it easier than ever to
            choose the right plants, organize your garden, and make the most of your space. Just upload a
            photo, provide a few preferences, and let Grow Genie do the magic!
          </p>

          <p className="text-lg leading-relaxed">
            Our mission is to promote sustainability, self-sufficiency, and a love for nature by helping
            city-dwellers reconnect with the joy of growing their own food and plants.
          </p>

          <p className="text-lg leading-relaxed">
            No AI, no IoT – just simple, thoughtful recommendations and layouts tailored to your lifestyle.
          </p>
        </section>
      </main>
    </div>
  );
}
