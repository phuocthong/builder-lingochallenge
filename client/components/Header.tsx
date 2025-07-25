import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Bot,
  LogIn,
  LogOut,
  User,
  Trophy,
  UserPlus,
  Menu,
  Zap,
  Users,
  Flame,
  Coins,
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
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-1.5 rounded-lg shadow-sm">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 hidden sm:block">
              English<span className="text-purple-600">Bot</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-3 py-1.5 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
            >
              🏠 Trang chủ
            </Link>
            <Link
              to="/challenge"
              className="px-3 py-1.5 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 flex items-center space-x-1"
            >
              <Zap className="h-4 w-4" />
              <span>Thách đấu</span>
            </Link>
            <Link
              to="/friends"
              className="px-3 py-1.5 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 flex items-center space-x-1"
            >
              <Users className="h-4 w-4" />
              <span>Bạn bè</span>
            </Link>
            {user.isLoggedIn && (
              <Link
                to="/profile"
                className="px-3 py-1.5 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 flex items-center space-x-1"
              >
                <User className="h-4 w-4" />
                <span>Hồ sơ</span>
              </Link>
            )}
          </div>

          {/* Auth Section */}
          {user.isLoggedIn ? (
            <div className="flex items-center space-x-2">
              {/* Compact Stats - Desktop only */}
              <div className="hidden lg:flex items-center space-x-3 text-xs bg-gray-50 px-3 py-1.5 rounded-lg">
                <div className="flex items-center space-x-1 text-yellow-600">
                  <Trophy className="h-3 w-3" />
                  <span className="font-medium">#{user.stats?.rank}</span>
                </div>
                <div className="flex items-center space-x-1 text-red-500">
                  <Flame className="h-3 w-3" />
                  <span className="font-medium">{user.stats?.streak}</span>
                </div>
                <div className="text-green-600 font-medium">
                  {user.stats?.totalCorrect}
                </div>
              </div>

              {/* User Profile Link */}
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 hover:bg-gray-50 px-2 py-1.5 rounded-lg transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="text-white text-xs font-bold">
                    {user.avatar}
                  </span>
                </div>
                <span className="text-gray-900 font-medium text-sm hidden sm:block group-hover:text-purple-600 transition-colors">
                  {user.name}
                </span>
              </Link>

              {/* Logout Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShowRegister}
                className="text-sm hover:bg-purple-50 hover:text-purple-600"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Đăng ký</span>
              </Button>

              <Button
                size="sm"
                onClick={handleShowLogin}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm"
              >
                <LogIn className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </Button>
            </div>
          )}

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
          <div className="md:hidden mt-3 pb-3 border-t border-gray-100">
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-1 mt-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium text-sm py-2 px-3 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                🏠 Trang chủ
              </Link>
              <Link
                to="/challenge"
                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium text-sm py-2 px-3 rounded-lg transition-colors flex items-center space-x-2"
                onClick={() => setShowMobileMenu(false)}
              >
                <Zap className="h-4 w-4" />
                <span>⚡ Thách đấu</span>
              </Link>
              <Link
                to="/friends"
                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium text-sm py-2 px-3 rounded-lg transition-colors flex items-center space-x-2"
                onClick={() => setShowMobileMenu(false)}
              >
                <Users className="h-4 w-4" />
                <span>👥 Bạn bè</span>
              </Link>
              {user.isLoggedIn && (
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium text-sm py-2 px-3 rounded-lg transition-colors flex items-center space-x-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <User className="h-4 w-4" />
                  <span>👤 Hồ sơ</span>
                </Link>
              )}
            </nav>

            {/* Mobile Auth Section */}
            {user.isLoggedIn ? (
              <div className="space-y-3 mt-4">
                {/* User Info */}
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:from-purple-100 hover:to-blue-100 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-purple-600">
                      Xem hồ sơ →
                    </div>
                  </div>
                </Link>

                {/* Compact Mobile Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-yellow-50 p-2 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Trophy className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-sm font-bold text-gray-900">
                        #{user.stats?.rank}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">Hạng</div>
                  </div>
                  <div className="bg-red-50 p-2 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Flame className="h-3 w-3 text-red-500 mr-1" />
                      <span className="text-sm font-bold text-red-600">
                        {user.stats?.streak}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">Streak</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg text-center">
                    <div className="text-sm font-bold text-green-600">
                      {user.stats?.totalCorrect}
                    </div>
                    <div className="text-xs text-gray-600">Đúng</div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Đăng xuất</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-3 mt-4">
                <div className="text-center text-sm text-gray-600 p-3 bg-purple-50 rounded-lg">
                  🎯 Tham gia ngay để học tiếng Anh!
                </div>

                <div className="grid grid-cols-2 gap-2">
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
