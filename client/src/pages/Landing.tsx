import { Button } from "@/components/ui/button";
import { MessageCircle, Mic, Download, Play } from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const [, navigate] = useLocation();

  const handleChatClick = () => {
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
            <a href="#talks" className="text-sm text-slate-300 hover:text-white transition-colors hidden sm:block">Talks</a>
            <a href="#speaker-kit" className="text-sm text-slate-300 hover:text-white transition-colors hidden sm:block">Speaker Kit</a>
            <Button onClick={handleChatClick} className="bg-blue-600 hover:bg-blue-700 text-sm">
              Book Me
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Practical Transformation.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {" "}Real Engineering.
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              VP of DevOps & Infrastructure Automation at VyStar Credit Union. Speaker on enterprise automation, AI adoption, and technology leadership in regulated industries. 30+ years of hands-on experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleChatClick}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                <Mic className="w-5 h-5 mr-2" />
                Book Sujit
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 text-white hover:bg-slate-800"
              >
                <Download className="w-5 h-5 mr-2" />
                Speaker Kit
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 text-white hover:bg-slate-800"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Clips
              </Button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700/50">
              <div className="space-y-4">
                <div className="h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                  <img src="/SG-speaker-logo.svg" alt="Speaker Logo" className="w-20 h-20 opacity-50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-sm text-slate-400">Experience</p>
                    <p className="text-2xl font-bold text-white">30+</p>
                    <p className="text-xs text-slate-500">Years</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-sm text-slate-400">Talks</p>
                    <p className="text-2xl font-bold text-white">6+</p>
                    <p className="text-xs text-slate-500">Signature</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Organizers Trust Sujit */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Organizers Trust Sujit</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Executive Credentials",
              description: "VP of DevOps & Infrastructure Automation at VyStar Credit Union. 30+ years leading enterprise technology strategy.",
            },
            {
              title: "Speaking Experience",
              description: "Invited speaker at AutoCon 4 and GSDC Global AI Tools Challenge 2025. Recognized for practical, real-world insights.",
            },
            {
              title: "Proven Results",
              description: "Delivered 50% reduction in deployment time, 30% infrastructure cost savings, and 99.99% uptime at scale.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-slate-600 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Signature Talks Preview */}
      <section id="talks" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Signature Talks</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Building an Enterprise Automation Platform in Banking",
              subtitle: "A real-world journey with Red Hat AAP in a regulated financial institution",
            },
            {
              title: "Agentic AI for DevOps & Infrastructure Teams",
              subtitle: "Moving from automation to autonomous systems",
            },
            {
              title: "Developer Platforms: Rebuilding CI/CD for a Modern Enterprise",
              subtitle: "Designing scalable, secure, high-speed pipelines with AI assistance",
            },
            {
              title: "AI in Regulated Industries: How to Adopt Safely and Effectively",
              subtitle: "Practical roadmap for banks, credit unions, and insurance",
            },
          ].map((talk, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{talk.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{talk.subtitle}</p>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0">
                View Details →
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Speaker Kit Section */}
      <section id="speaker-kit" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Speaker Kit & Resources</h2>
          <p className="text-slate-300 mb-8">
            Everything you need to book Sujit: speaker bios, one-pager, host introduction script, photos, and event requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-5 h-5 mr-2" />
              Download Speaker Kit (PDF)
            </Button>
            <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/10">
              View All Resources
            </Button>
          </div>
        </div>
      </section>

      {/* AI Concierge CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">AI-Powered Speaking Concierge</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Ask our AI assistant which talk is right for your event, get recommendations based on your audience, and learn about Sujit's speaking experience and expertise.
          </p>
          <Button
            onClick={handleChatClick}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat with AI Concierge
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Speaking</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Signature Talks</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Speaker Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Book Sujit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="mailto:speaking@sujitg.com" className="hover:text-white transition-colors">speaking@sujitg.com</a></li>
                <li><a href="mailto:events@sujitg.com" className="hover:text-white transition-colors">events@sujitg.com</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">More</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="https://sujitg.com" className="hover:text-white transition-colors">sujitg.com</a></li>
                <li><a href="https://ai-focus.org" className="hover:text-white transition-colors">AI-Focus.org</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Sujit Gangadharan. Professional Speaking Portfolio.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
