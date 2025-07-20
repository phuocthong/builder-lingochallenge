import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { LogIn, Eye, EyeOff } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: { name: string; email: string }) => void;
  onSwitchToRegister: () => void;
}

export function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      onLogin({
        name: email.split('@')[0] || 'Người dùng',
        email: email
      });
      setIsLoading(false);
      onClose();
      
      // Reset form
      setEmail("");
      setPassword("");
    }, 1000);
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <LogIn className="h-5 w-5 text-purple-600" />
            <span>Đăng nhập</span>
          </DialogTitle>
          <DialogDescription>
            Đăng nhập để tham gia trả lời câu hỏi và xem thống kê của bạn.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-purple-600 hover:text-purple-700"
              onClick={() => {
                // Mock forgot password
                alert("Tính năng quên mật khẩu sẽ được cập nhật sớm!");
              }}
            >
              Quên mật khẩu?
            </Button>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-purple-600 hover:text-purple-700"
                onClick={onSwitchToRegister}
              >
                Đăng ký ngay
              </Button>
            </div>
          </div>
        </form>

        {/* Demo Account Info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium mb-1">Demo Account:</p>
          <p className="text-xs text-blue-600">Email: demo@englishbot.com</p>
          <p className="text-xs text-blue-600">Password: demo123</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
