import { TalkCard } from "@/components/TalkCard";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Talks() {
  const [, navigate] = useLocation();
  const { data: talks, isLoading } = trpc.talks.list.useQuery();

  const handleBookClick = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/SG-speaker-logo.svg" alt="Sujit Gangadharan Speaker" className="w-8 h-8" />
            <span className="text-xl font-bold text-white">Sujit Speaks</span>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <a href="/" className="text-sm text-slate-300 hover:text-white transition-colors hidden sm:block">Home</a>
            <a href="#" className="text-sm text-slate-300 hover:text-white transition-colors hidden sm:block">Speaker Kit</a>
            <Button onClick={handleBookClick} className="bg-blue-600 hover:bg-blue-700 text-sm">
              Book Me
            </Button>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Signature Talks</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore Sujit's most popular speaking topics, each designed for different audiences and event formats.
          </p>
        </div>
      </section>

      {/* Talks Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {isLoading ? (
          <div className="text-center text-slate-400">Loading talks...</div>
        ) : talks && talks.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {talks.map((talk) => (
              <TalkCard
                key={talk.id}
                id={talk.id}
                title={talk.title}
                subtitle={talk.subtitle}
                abstract={talk.abstract}
                keyTakeaways={talk.keyTakeaways}
                audienceFit={talk.audienceFit}
                formatOptions={talk.formatOptions}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400">
            <p className="mb-4">Signature talks coming soon!</p>
            <p className="text-sm">Check back later or contact Sujit directly at speaking@sujitg.com</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book a Talk?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Use our AI-powered booking assistant to find the perfect talk for your event, or reach out directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleBookClick}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with AI Concierge
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-600 text-white hover:bg-slate-800"
            >
              <a href="mailto:speaking@sujitg.com">Email speaking@sujitg.com</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400">
          <p>&copy; 2025 Sujit Gangadharan. Professional Speaking Portfolio.</p>
        </div>
      </footer>
    </div>
  );
}
