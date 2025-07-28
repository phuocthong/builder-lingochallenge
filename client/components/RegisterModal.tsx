import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { VisuallyHidden } from "./ui/visually-hidden";
import { AuthForms } from "./AuthForms";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (userData: { name: string; email: string }) => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
}: RegisterModalProps) {
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">("register");

  const handleLogin = (userData: { name: string; email: string }) => {
    onRegister(userData); // Auto login after register
    onClose();
  };

  const handleRegister = (userData: { name: string; email: string }) => {
    onRegister(userData);
    onClose();
  };

  const handleModeChange = (mode: "login" | "register" | "forgot") => {
    setAuthMode(mode);
    if (mode === "login") {
      onSwitchToLogin();
    }
  };

  const handleClose = () => {
    setAuthMode("register");
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
