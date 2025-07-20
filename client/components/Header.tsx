import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Bot, LogIn, LogOut, User, Trophy } from "lucide-react";
import { useState } from "react";

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

export function Header() {
  const [user, setUser] = useState<AuthUser>({
    id: 'user-123',
    name: 'Người dùng',
    avatar: 'ND',
    isLoggedIn: true,
    stats: {
      rank: 45,
      totalCorrect: 523,
      streak: 7,
      accuracy: 89
    }
  });

  const handleLogin = () => {
    // Mock login - in real app this would integrate with auth system
    setUser({
      id: 'user-123',
      name: 'Người dùng',
      avatar: 'ND',
      isLoggedIn: true,
      stats: {
        rank: 45,
        totalCorrect: 523,
        streak: 7,
        accuracy: 89
      }
    });
  };

  const handleLogout = () => {
    setUser({
      id: '',
      name: '',
      avatar: '',
      isLoggedIn: false
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-purple-600 p-2 rounded-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">EnglishBot</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-600 font-medium text-sm xl:text-base"
          >
            Trang chủ
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-purple-600 font-medium text-sm xl:text-base"
          >
            Giới thiệu
          </Link>
          <Link
            to="/guide"
            className="text-gray-700 hover:text-purple-600 font-medium text-sm xl:text-base"
          >
            Hướng dẫn
          </Link>
        </nav>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          {user.isLoggedIn ? (
            <div className="flex items-center space-x-3">
              {/* User Stats (Desktop) */}
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-gray-600">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>#{user.stats?.rank}</span>
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
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{user.avatar}</span>
                </div>
                <span className="hidden sm:block text-gray-900 font-medium">{user.name}</span>
              </div>

              {/* Logout Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1 text-xs"
              >
                <LogOut className="h-3 w-3" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">
                Đăng nhập để tham gia trả lời câu hỏi
              </div>
              <Button
                onClick={handleLogin}
                className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-1"
                size="sm"
              >
                <LogIn className="h-4 w-4" />
                <span>Đăng nhập</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile User Stats */}
      {user.isLoggedIn && user.stats && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-1 text-gray-600">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span>Hạng #{user.stats.rank}</span>
            </div>
            <div className="text-gray-600">
              <span className="font-medium text-green-600">{user.stats.totalCorrect}</span> câu đúng
            </div>
            <div className="text-gray-600">
              Streak: <span className="font-medium text-blue-600">{user.stats.streak}</span>
            </div>
            <div className="text-gray-600">
              Độ chính xác: <span className="font-medium text-purple-600">{user.stats.accuracy}%</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
