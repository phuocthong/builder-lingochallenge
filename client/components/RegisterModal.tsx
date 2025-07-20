import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { UserPlus, Eye, EyeOff, CheckCircle } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (userData: { name: string; email: string }) => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }: RegisterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!name.trim()) {
      newErrors.name = "Tên không được để trống";
    }

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock successful registration
      onRegister({
        name: name.trim(),
        email: email.trim()
      });
      setIsLoading(false);
      onClose();
      
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    }, 1500);
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-purple-600" />
            <span>Đăng ký tài khoản</span>
          </DialogTitle>
          <DialogDescription>
            Tạo tài khoản mới để tham gia học tiếng Anh cùng EnglishBot.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Họ và tên</Label>
            <Input
              id="name"
              type="text"
              placeholder="Nhập họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-red-500 pr-10" : "pr-10"}
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
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? "Đang tạo tài khoản..." : "Đăng ký"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-purple-600 hover:text-purple-700"
                onClick={onSwitchToLogin}
              >
                Đăng nhập ngay
              </Button>
            </div>
          </div>
        </form>

        {/* Benefits */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <p className="text-sm font-medium text-green-800">Lợi ích khi đăng ký:</p>
          </div>
          <ul className="text-xs text-green-700 space-y-1">
            <li>• Tham gia trả lời câu hỏi và kiếm điểm</li>
            <li>• Xem thống kê chi tiết và xếp hạng</li>
            <li>• Theo dõi tiến độ học tập của bạn</li>
            <li>• Cạnh tranh với bạn bè và người chơi khác</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
