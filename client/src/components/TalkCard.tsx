import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface TalkCardProps {
  id: number;
  title: string;
  subtitle: string;
  abstract: string;
  keyTakeaways: string;
  audienceFit: string;
  formatOptions: string;
}

export function TalkCard({
  id,
  title,
  subtitle,
  abstract,
  keyTakeaways,
  audienceFit,
  formatOptions,
}: TalkCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Parse JSON arrays from strings
  let takeaways: string[] = [];
  let formats: string[] = [];
  
  try {
    takeaways = JSON.parse(keyTakeaways);
  } catch {
    takeaways = [keyTakeaways];
  }
  
  try {
    formats = JSON.parse(formatOptions);
  } catch {
    formats = [formatOptions];
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-4 italic">{subtitle}</p>
      
      <p className="text-slate-300 text-sm mb-4 line-clamp-2">{abstract}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {formats.map((format, idx) => (
          <span key={idx} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
            {format}
          </span>
        ))}
      </div>

      {isExpanded && (
        <div className="space-y-4 mb-4 pb-4 border-t border-slate-700/50 pt-4">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Key Takeaways</h4>
            <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
              {takeaways.map((takeaway, idx) => (
                <li key={idx}>{takeaway}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Ideal For</h4>
            <p className="text-sm text-slate-300">{audienceFit}</p>
          </div>
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-400 hover:text-blue-300 p-0 h-auto"
      >
        {isExpanded ? "Show Less" : "View Details"}
        <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
      </Button>
    </div>
  );
}
