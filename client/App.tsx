import "./global.css";

import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import ChallengeRoom from "./pages/ChallengeRoom";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const AppContent = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { login } = useAuth();

  const handleLogin = (userData: {name: string; email: string}) => {
    login({ name: userData.name, email: userData.email });
    setShowLoginModal(false);
    console.log("User logged in:", userData);
  };

  const handleRegister = (userData: {name: string; email: string}) => {
    login({ name: userData.name, email: userData.email });
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
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            <Header 
              onShowLogin={handleShowLogin}
              onShowRegister={handleShowRegister}
            />
            <Routes>
              <Route 
                path="/" 
                element={
                  <Index 
                    onShowLogin={handleShowLogin}
                    onShowRegister={handleShowRegister}
                  />
                } 
              />
              <Route
                path="/about"
                element={<PlaceholderPage title="Giới thiệu" />}
              />
              <Route
                path="/guide"
                element={<PlaceholderPage title="Hướng dẫn" />}
              />
              <Route
                path="/challenge"
                element={<ChallengeRoom />}
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Global Authentication Modals */}
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
        </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
