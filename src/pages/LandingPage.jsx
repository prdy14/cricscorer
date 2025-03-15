import React from "react";
import { Ticket as Cricket, Trophy, Users2, BarChart3 } from "lucide-react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <NavBar />
      {/* Hero Section */}

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              CricScorer
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8">
              Professional Cricket Scoring Made Simple
            </p>
            <Link
              to={"/startmatch"}
              className=" hover:bg-white text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg bg-[#426f51] hover:text-[#083f27] cursor-pointer"
            >
              Start New Match
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Cricket className="w-8 h-8" />}
            title="Live Scoring"
            description="Real-time ball-by-ball scoring with comprehensive match statistics"
          />
          <FeatureCard
            icon={<Trophy className="w-8 h-8" />}
            title="Tournament Management"
            description="Create and manage multiple tournaments with ease"
          />
          <FeatureCard
            icon={<Users2 className="w-8 h-8" />}
            title="Team Management"
            description="Manage teams, players, and their statistics efficiently"
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="Advanced Analytics"
            description="Detailed match analysis and player performance insights"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="c text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Score Your Match?
          </h2>
          <p className="text-lg mb-8">
            Start scoring your cricket match in minutes
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default LandingPage;
