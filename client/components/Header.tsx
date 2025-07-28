import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Bot,
  LogOut,
  Trophy,
  Flame,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface UserStats {
  rank: number;
  totalCorrect: number;
  streak: number;
  accuracy: number;
}

interface AuthUser {
  id: string;
  name: string;
  avatar: string;
  isLoggedIn: boolean;
  stats?: UserStats;
}

interface HeaderProps {
  onShowLogin?: () => void;
  onShowRegister?: () => void;
}

export function Header({ onShowLogin, onShowRegister }: HeaderProps) {
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowMobileMenu(false);
  };

  const handleShowLogin = () => {
    if (onShowLogin) {
      onShowLogin();
    }
    setShowMobileMenu(false);
  };

  const handleShowRegister = () => {
    if (onShowRegister) {
      onShowRegister();
    }
    setShowMobileMenu(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              Logo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Giới thiệu
            </Link>
            <Link
              to="/challenge"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Thử thách
            </Link>
          </div>

          {/* Auth Section */}
          {user.isLoggedIn ? (
            <div className="flex items-center space-x-4">
              {/* User Stats - Desktop only */}
              <div className="hidden lg:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600"># {user.stats?.rank || 45}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-green-600 font-medium">
                    {user.stats?.totalCorrect || 523}
                  </span>
                  <span className="text-gray-600">đúng</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-600">Streak:</span>
                  <span className="text-blue-600 font-medium">
                    {user.stats?.streak || 7}
                  </span>
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.avatar}
                    </span>
                  </div>
                  <span className="text-gray-900 font-medium hidden sm:block">
                    {user.name}
                  </span>
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Đăng xuất</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={handleShowLogin}
                className="text-gray-600 hover:text-gray-900"
              >
                Đăng nhập
              </Button>
              <Button
                onClick={handleShowRegister}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Đăng ký
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden"
          >
            {showMobileMenu ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2 mt-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Trang chủ
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-gray-900 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Giới thiệu
              </Link>
              <Link
                to="/challenge"
                className="text-gray-600 hover:text-gray-900 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Thử thách
              </Link>
              {user.isLoggedIn && (
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-gray-900 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Hồ sơ
                </Link>
              )}
            </nav>

            {/* Mobile Auth Section */}
            {user.isLoggedIn ? (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-purple-600">Xem hồ sơ</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-yellow-50 p-2 rounded text-center">
                    <div className="text-sm font-bold text-gray-900">
                      #{user.stats?.rank || 45}
                    </div>
                    <div className="text-xs text-gray-600">Hạng</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded text-center">
                    <div className="text-sm font-bold text-green-600">
                      {user.stats?.totalCorrect || 523}
                    </div>
                    <div className="text-xs text-gray-600">Đúng</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded text-center">
                    <div className="text-sm font-bold text-blue-600">
                      {user.stats?.streak || 7}
                    </div>
                    <div className="text-xs text-gray-600">Streak</div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                <Button
                  variant="outline"
                  onClick={handleShowLogin}
                  className="w-full"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={handleShowRegister}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Đăng ký
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

// Export the handleLogin function for external use
export type { AuthUser };
