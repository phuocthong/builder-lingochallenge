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
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => {
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-purple-50">
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
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
