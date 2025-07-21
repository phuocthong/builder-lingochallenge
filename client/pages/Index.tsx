import { ChatInterface } from "../components/ChatInterface";
import { ChatHistory } from "../components/ChatHistory";
import { Leaderboard } from "../components/Leaderboard";

interface IndexProps {
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export default function Index({ onShowLogin, onShowRegister }: IndexProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Mobile-first responsive container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
        
        {/* Mobile: Single column, Desktop: Grid layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Main Chat Interface */}
          <div className="lg:col-span-2 order-1">
            <div className="h-[60vh] sm:h-[65vh] lg:h-[calc(100vh-140px)]">
              <ChatInterface 
                onShowLogin={onShowLogin}
                onShowRegister={onShowRegister}
              />
            </div>
          </div>

          {/* Right Sidebar - Mobile: Stack below chat */}
          <div className="lg:col-span-1 order-2 space-y-4 sm:space-y-6">
            
            {/* Chat History */}
            <div className="h-[40vh] sm:h-[45vh] lg:h-auto">
              <ChatHistory />
            </div>
            
            {/* Leaderboard */}
            <div className="h-[40vh] sm:h-[45vh] lg:h-auto">
              <Leaderboard />
            </div>
            
          </div>
        </div>

        {/* Mobile bottom spacing */}
        <div className="h-4 lg:hidden"></div>
      </div>
    </div>
  );
}
