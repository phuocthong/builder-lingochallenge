import { ChatInterface } from "../components/ChatInterface";
import { ChatHistory } from "../components/ChatHistory";
import { Leaderboard } from "../components/Leaderboard";
import { LandingPage } from "../components/LandingPage";
import { useAuth } from "../contexts/AuthContext";

interface IndexProps {
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export default function Index({ onShowLogin, onShowRegister }: IndexProps) {
  const { user } = useAuth();

  // Show landing page if user is not logged in
  if (!user.isLoggedIn) {
    return (
      <LandingPage
        onShowLogin={onShowLogin}
        onShowRegister={onShowRegister}
      />
    );
  }

  // Show main app interface if user is logged in
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Mobile-first responsive container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-6">

        {/* Mobile: Single column, Desktop: Grid layout */}
        <div className="flex flex-col xl:grid xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">

          {/* Main Chat Interface */}
          <div className="xl:col-span-2 order-1">
            <div className="h-[55vh] sm:h-[60vh] md:h-[65vh] xl:h-[calc(100vh-140px)]">
              <ChatInterface
                onShowLogin={onShowLogin}
                onShowRegister={onShowRegister}
              />
            </div>
          </div>

          {/* Right Sidebar - Mobile: Stack below chat */}
          <div className="xl:col-span-1 order-2 space-y-3 sm:space-y-4 lg:space-y-6">

            {/* Chat History */}
            <div className="h-[35vh] sm:h-[40vh] md:h-[45vh] xl:h-[calc(50vh-80px)]">
              <ChatHistory />
            </div>

            {/* Leaderboard */}
            <div className="h-[35vh] sm:h-[40vh] md:h-[45vh] xl:h-[calc(50vh-80px)]">
              <Leaderboard />
            </div>

          </div>
        </div>

        {/* Mobile bottom spacing */}
        <div className="h-2 sm:h-4 xl:hidden"></div>
      </div>
    </div>
  );
}
