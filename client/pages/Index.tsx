import { ChatInterface } from "../components/ChatInterface";
import { ChatHistory } from "../components/ChatHistory";
import { Leaderboard } from "../components/Leaderboard";

export default function Index() {
  return (
    <div className="min-h-screen bg-purple-50 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <div className="h-[calc(100vh-160px)]">
              <ChatInterface />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ChatHistory />
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}
