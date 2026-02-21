import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  featureName: string;
}

export default function ComingSoon({ featureName }: ComingSoonProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div 
          className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center space-y-6"
          style={{
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.2), 0 10px 40px rgba(0, 0, 0, 0.5)"
          }}
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-primary flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-primary bg-clip-text text-transparent">
              Coming Soon
            </h1>
            <p className="text-xl text-white/80">{featureName}</p>
          </div>
          
          <p className="text-white/60">
            This feature is currently under development. Stay tuned for updates!
          </p>
          
          <Button
            onClick={() => navigate({ to: "/" })}
            className="w-full bg-gradient-to-r from-teal-500 to-primary hover:from-teal-600 hover:to-primary/90"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
