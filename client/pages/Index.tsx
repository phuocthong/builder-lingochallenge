import { useState } from "react";
import { ChatInterface } from "../components/ChatInterface";
import { ChatHistory } from "../components/ChatHistory";
import { Leaderboard } from "../components/Leaderboard";
import { LoginModal } from "../components/LoginModal";
import { RegisterModal } from "../components/RegisterModal";

export default function Index() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState<{name: string; email: string} | null>(null);

  const handleLogin = (userData: {name: string; email: string}) => {
    setUser(userData);
    setShowLoginModal(false);
    console.log("User logged in:", userData);
  };

  const handleRegister = (userData: {name: string; email: string}) => {
    setUser(userData);
    setShowRegisterModal(false);
    console.log("User registered:", userData);
  };

  const handleShowLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleShowRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  return (
    <div className="min-h-screen bg-purple-50 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <div className="h-[calc(100vh-160px)]">
              <ChatInterface 
                onShowLogin={handleShowLogin}
                onShowRegister={handleShowRegister}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ChatHistory />
            <Leaderboard />
          </div>
        </div>
      </div>

      {/* Authentication Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSwitchToRegister={handleShowRegister}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegister}
        onSwitchToLogin={handleShowLogin}
      />
    </div>
  );
}
