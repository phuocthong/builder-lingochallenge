import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "../lib/utils";

type AuthMode = "login" | "register" | "forgot";

interface AuthFormsProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onLogin: (userData: { name: string; email: string }) => void;
  onRegister: (userData: { name: string; email: string }) => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export function AuthForms({
  mode,
  onModeChange,
  onLogin,
  onRegister,
}: AuthFormsProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation (for register)
    if (mode === "register" && !formData.name.trim()) {
      newErrors.name = "Tên hiển thị là bắt buộc";
    } else if (mode === "register" && formData.name.length < 2) {
      newErrors.name = "Tên phải có ít nhất 2 ký tự";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Password validation (not for forgot password)
    if (mode !== "forgot") {
      if (!formData.password) {
        newErrors.password = "Mật khẩu là bắt buộc";
      } else if (formData.password.length < 6) {
        newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      }

      // Confirm password (for register)
      if (mode === "register") {
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Mật khẩu không khớp";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (mode === "login") {
        onLogin({
          name: formData.name || formData.email.split("@")[0],
          email: formData.email,
        });
      } else if (mode === "register") {
        onRegister({
          name: formData.name,
          email: formData.email,
        });
      } else if (mode === "forgot") {
        setResetEmailSent(true);
      }
    } catch (error) {
      setErrors({ general: "Có lỗi xảy ra. Vui lòng thử lại." });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setResetEmailSent(false);
  };

  // Reset form when mode changes
  const handleModeChange = (newMode: AuthMode) => {
    resetForm();
    onModeChange(newMode);
  };

  if (mode === "forgot" && resetEmailSent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Email đã được gửi!</CardTitle>
            <CardDescription className="mt-2">
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              Kiểm tra hộp thư đến và thư mục spam của bạn.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Button
              onClick={() => handleModeChange("login")}
              className="w-full"
            >
              Quay lại đăng nhập
            </Button>

            <Button
              variant="outline"
              onClick={() => setResetEmailSent(false)}
              className="w-full"
            >
              Gửi lại email
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          {mode !== "login" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleModeChange("login")}
              className="p-1"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="flex-1">
            <CardTitle className="text-xl">
              {mode === "login" && "Đăng nhập"}
              {mode === "register" && "Đăng ký tài khoản"}
              {mode === "forgot" && "Quên mật khẩu"}
            </CardTitle>
            <CardDescription className="mt-1">
              {mode === "login" && "Chào mừng bạn trở lại"}
              {mode === "register" && "Tạo tài khoản mới để bắt đầu"}
              {mode === "forgot" && "Nhập email để đặt lại mật khẩu"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* General Error */}
          {errors.general && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          {/* Name Field (Register only) */}
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Tên hiển thị</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Nhập tên của bạn"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={cn("pl-10", errors.name && "border-red-500")}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={cn("pl-10", errors.email && "border-red-500")}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Field (not for forgot password) */}
          {mode !== "forgot" && (
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={cn(
                    "pl-10 pr-10",
                    errors.password && "border-red-500",
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          )}

          {/* Confirm Password Field (Register only) */}
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={cn(
                    "pl-10 pr-10",
                    errors.confirmPassword && "border-red-500",
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Đang x��� lý...</span>
              </div>
            ) : (
              <>
                {mode === "login" && "Đăng nhập"}
                {mode === "register" && "Đăng ký"}
                {mode === "forgot" && "Gửi email"}
              </>
            )}
          </Button>

          {/* Action Links */}
          <div className="space-y-3 text-center">
            {mode === "login" && (
              <>
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-gray-600 hover:text-purple-600"
                  onClick={() => handleModeChange("forgot")}
                >
                  Quên mật khẩu?
                </Button>

                <div className="text-sm text-gray-600">
                  Chưa có tài khoản?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="text-purple-600 hover:text-purple-700 p-0 h-auto font-semibold"
                    onClick={() => handleModeChange("register")}
                  >
                    Đăng ký ngay
                  </Button>
                </div>
              </>
            )}

            {mode === "register" && (
              <div className="text-sm text-gray-600">
                Đã có tài khoản?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="text-purple-600 hover:text-purple-700 p-0 h-auto font-semibold"
                  onClick={() => handleModeChange("login")}
                >
                  Đăng nhập
                </Button>
              </div>
            )}

            {mode === "forgot" && (
              <div className="text-sm text-gray-600">
                Nhớ mật khẩu?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="text-purple-600 hover:text-purple-700 p-0 h-auto font-semibold"
                  onClick={() => handleModeChange("login")}
                >
                  Đăng nhập
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
