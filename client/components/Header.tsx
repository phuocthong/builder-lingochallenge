import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

export function Header() {
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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">Đ</span>
            </div>
            <span className="text-gray-900 font-medium">Đức Minh</span>
          </div>
        </div>
      </div>
    </header>
  );
}
