import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-purple-600 p-2 rounded-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">EnglishBot</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-600 font-medium"
          >
            Trang chủ
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-purple-600 font-medium"
          >
            Giới thiệu
          </Link>
          <Link
            to="/guide"
            className="text-gray-700 hover:text-purple-600 font-medium"
          >
            Hướng dẫn
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50"
          >
            Đăng nhập
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Đăng ký</Button>
        </div>
      </div>
    </header>
  );
}
