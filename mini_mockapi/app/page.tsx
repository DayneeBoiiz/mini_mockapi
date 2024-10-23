"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [showApologyCard, setShowApologyCard] = useState(false);

  useEffect(() => {
    const hasSeenApology = localStorage.getItem("seenApology");
    if (!hasSeenApology) {
      setShowApologyCard(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("seenApology", "true");
    setShowApologyCard(false);
  };

  return (
    <>
      {showApologyCard && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 sm:mx-auto space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Apologies for the Code Quality!
            </h3>
            <p className="text-gray-600">
              I had to complete this project within a short timeframe, so some
              parts of the code may not be as polished as I&apos;d like. Thank
              you for your understanding!
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleDismiss}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md transition duration-200"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
        <section className="w-full py-20 px-6 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight max-w-2xl leading-tight">
            Build Mock APIs Effortlessly
          </h1>
          <p className="text-lg mb-8 max-w-xl leading-relaxed">
            Instantly create, test, and manage mock API endpoints with zero
            setup. Start now, no sign-up required.
          </p>
          <Link href="/projects">
            <button className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium text-base hover:bg-gray-900 transition">
              Get Started
            </button>
          </Link>
        </section>

        <section className="py-16 px-6 bg-gray-100 w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white p-6 shadow-md rounded-lg text-center transition hover:shadow-lg">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Create a Project
              </h3>
              <p className="text-gray-600">
                Organize and manage your mock APIs by creating projects for each
                set of endpoints.
              </p>
            </div>

            <div className="bg-white p-6 shadow-md rounded-lg text-center transition hover:shadow-lg">
              <div className="text-5xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Add Endpoints
              </h3>
              <p className="text-gray-600">
                Define routes, methods, and mock responses for each endpoint in
                your project.
              </p>
            </div>

            <div className="bg-white p-6 shadow-md rounded-lg text-center transition hover:shadow-lg">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Test & Share
              </h3>
              <p className="text-gray-600">
                Instantly test your mock APIs and share them with your team or
                other developers.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
