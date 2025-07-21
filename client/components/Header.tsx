import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Bot, LogIn, LogOut, User, Trophy, UserPlus, Menu } from "lucide-react";
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
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg shadow-sm">
              <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              English<span className="text-purple-600">Bot</span>
            </span>
          </Link>

          {/* Desktop Navigation & Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 font-medium text-sm transition-colors"
              >
                🏠 Trang chủ
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-purple-600 font-medium text-sm transition-colors"
              >
                ℹ️ Giới thiệu
              </Link>
              <Link
                to="/guide"
                className="text-gray-700 hover:text-purple-600 font-medium text-sm transition-colors"
              >
                📖 Hướng dẫn
              </Link>
            </nav>

            {/* Auth Section */}
            {user.isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* User Stats */}
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">#{user.stats?.rank}</span>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium text-green-600">{user.stats?.totalCorrect}</span> đúng
                  </div>
                  <div className="text-gray-600">
                    Streak: <span className="font-medium text-blue-600">{user.stats?.streak}</span>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{user.avatar}</span>
                  </div>
                  <span className="text-gray-900 font-medium text-sm">{user.name}</span>
                </div>

                {/* Logout Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-xs"
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-600">
                  Tham gia ngay để học!
                </div>
                
                <Button
                  variant="outline"
                  onClick={handleShowRegister}
                  className="flex items-center space-x-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                  size="sm"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Đăng ký</span>
                </Button>

                <Button
                  onClick={handleShowLogin}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center space-x-1"
                  size="sm"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Đăng nhập</span>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-3 mb-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 font-medium text-sm py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                🏠 Trang chủ
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-purple-600 font-medium text-sm py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                ℹ️ Giới thiệu
              </Link>
              <Link
                to="/guide"
                className="text-gray-700 hover:text-purple-600 font-medium text-sm py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                📖 Hướng dẫn
              </Link>
            </nav>

            {/* Mobile Auth Section */}
            {user.isLoggedIn ? (
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{user.avatar}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">Người dùng đã đăng nhập</div>
                  </div>
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-yellow-50 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-lg font-bold text-gray-900">#{user.stats?.rank}</span>
                    </div>
                    <div className="text-xs text-gray-600">Xếp hạng</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600">{user.stats?.totalCorrect}</div>
                    <div className="text-xs text-gray-600">Câu đúng</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-600">{user.stats?.streak}</div>
                    <div className="text-xs text-gray-600">Streak</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-purple-600">{user.stats?.accuracy}%</div>
                    <div className="text-xs text-gray-600">Độ chính xác</div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Đăng xuất</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-center text-sm text-gray-600 p-3 bg-purple-50 rounded-lg">
                  🎯 Tham gia ngay để học tiếng Anh và cạnh tranh!
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={handleShowRegister}
                    className="flex items-center justify-center space-x-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Đăng ký</span>
                  </Button>

                  <Button
                    onClick={handleShowLogin}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center justify-center space-x-2"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Đăng nhập</span>
                  </Button>
                </div>
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
