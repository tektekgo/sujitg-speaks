import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { MessageCircle, Zap, Brain, Code, Users, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const handleChatClick = () => {
    if (isAuthenticated) {
      navigate("/chat");
    } else {
      window.location.href = getLoginUrl();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">Sujit's AI Portfolio</span>
          </div>
          {isAuthenticated ? (
            <Button onClick={() => navigate("/chat")} className="bg-blue-600 hover:bg-blue-700">
              Open Chat
            </Button>
          ) : (
            <Button onClick={() => (window.location.href = getLoginUrl())} className="bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Meet Sujit
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {" "}AI-Powered Portfolio
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              CIO Candidate & Enterprise Technology Executive with 30+ years of experience. Ask me anything about cloud transformation, AI integration, DevOps, or enterprise leadership.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={handleChatClick}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Chat
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 text-white hover:bg-slate-800"
              >
                Download Resume
              </Button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700/50">
              <div className="space-y-4">
                <div className="h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-16 h-16 text-blue-400/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-sm text-slate-400">Experience</p>
                    <p className="text-2xl font-bold text-white">30+</p>
                    <p className="text-xs text-slate-500">Years</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-sm text-slate-400">Projects</p>
                    <p className="text-2xl font-bold text-white">6+</p>
                    <p className="text-xs text-slate-500">Innovations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Expertise Areas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Cloud & Infrastructure",
              description: "Leading cloud-first transformations with 30% cost reduction and 400-500% speed improvements",
            },
            {
              icon: Brain,
              title: "AI Integration",
              description: "Pioneering AI-powered solutions and automation strategies for enterprise deployment",
            },
            {
              icon: Code,
              title: "DevOps & Automation",
              description: "Built enterprise DevOps practices achieving 50% reduction in deployment time",
            },
            {
              icon: Users,
              title: "Global Team Leadership",
              description: "Scaled high-performing teams across US, Europe, and Asia with proven M&A experience",
            },
            {
              icon: TrendingUp,
              title: "Digital Transformation",
              description: "30+ years driving technology modernization in regulated industries",
            },
            {
              icon: MessageCircle,
              title: "AI Chat Assistant",
              description: "Ask me anything about my background, projects, and expertise in real-time",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-slate-600 transition-colors"
              >
                <Icon className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Learn More?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Chat with the AI assistant to explore Sujit's experience, expertise, and projects. Get instant answers to your questions about enterprise technology leadership.
          </p>
          <Button
            onClick={handleChatClick}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Chatting Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400">
          <p>&copy; 2025 Sujit Gangadharan. AI-Native Portfolio powered by Manus.</p>
        </div>
      </footer>
    </div>
  );
}
