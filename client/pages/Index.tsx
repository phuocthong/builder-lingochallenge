import { ChatInterface } from "../components/ChatInterface";
import { ChatHistory } from "../components/ChatHistory";
import { Leaderboard } from "../components/Leaderboard";

export default function Index() {
  return (
    <div className="min-h-screen bg-purple-50 py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
          {/* Main Chat Interface */}
          <div className="xl:col-span-2 order-1">
            <div className="h-[60vh] md:h-[calc(100vh-140px)]">
              <ChatInterface />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-2 order-2 space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 md:gap-6">
              <ChatHistory />
              <Leaderboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
