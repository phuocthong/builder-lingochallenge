import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { VisuallyHidden } from "./ui/visually-hidden";
import { AuthForms } from "./AuthForms";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: { name: string; email: string }) => void;
  onSwitchToRegister: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
}: LoginModalProps) {
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">("login");

  const handleLogin = (userData: { name: string; email: string }) => {
    onLogin(userData);
    onClose();
  };

  const handleRegister = (userData: { name: string; email: string }) => {
    onLogin(userData); // Auto login after register
    onClose();
  };

  const handleModeChange = (mode: "login" | "register" | "forgot") => {
    setAuthMode(mode);
    if (mode === "register") {
      onSwitchToRegister();
    }
  };

  const handleClose = () => {
    setAuthMode("login");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>
            {authMode === "login" && "Đăng nhập"}
            {authMode === "register" && "Đăng ký tài khoản"}
            {authMode === "forgot" && "Quên mật khẩu"}
          </DialogTitle>
        </VisuallyHidden>
        <div className="p-6">
          <AuthForms
            mode={authMode}
            onModeChange={handleModeChange}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
