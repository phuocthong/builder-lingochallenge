import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Home,
  Users,
  UserPlus,
  FileText,
  CreditCard,
  Calendar,
  Trophy,
  Star,
  Edit,
  Lock,
  Mail,
  Phone,
  LogOut,
  CheckCircle,
  Flame,
  Clock,
  BarChart3
} from "lucide-react";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <p className="text-gray-600">
              Vui lòng đăng nhập để xem hồ sơ cá nhân
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home
    },
    {
      id: "friends",
      label: "Bạn bè",
      icon: Users
    },
    {
      id: "add-friends",
      label: "Thêm bạn bè",
      icon: UserPlus
    },
    {
      id: "tasks",
      label: "Nhiệm vụ",
      icon: FileText
    },
    {
      id: "exchange",
      label: "Đổi điểm",
      icon: CreditCard
    }
  ];

  const stats = [
    {
      icon: "question",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      number: "1,000",
      label: "Tổng câu trả lời"
    },
    {
      icon: "check",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      number: "82%",
      label: "Tỷ lệ chính xác"
    },
    {
      icon: "book",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      number: "2,125",
      label: "Từ đã học"
    },
    {
      icon: "fire",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      number: "28",
      label: "Chuỗi dài nhất"
    }
  ];

  const secondaryStats = [
    {
      icon: Flame,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      number: "15",
      title: "Chuỗi hiện tại",
      subtitle: "Ngày liên tiếp"
    },
    {
      icon: Clock,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      number: "2.5s",
      title: "Thời gian trung bình",
      subtitle: "Mỗi câu hỏi"
    },
    {
      icon: Calendar,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      number: "45",
      title: "Ngày học tập",
      subtitle: "Tổng số ngày"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 p-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-purple-50 text-purple-600 border border-purple-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Profile Header */}
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="w-20 h-20 border-2 border-gray-300">
                    <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-medium text-gray-900 mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  @{user.name.toLowerCase().replace(" ", "")}
                </p>

                <div className="flex items-center text-gray-600 text-sm mb-6">
                  <Calendar className="w-4 h-4 mr-2" />
                  Tham gia từ 1/1/2025
                </div>

                <div className="flex flex-wrap gap-4 justify-center mb-6">
                  <div className="bg-blue-50 rounded-lg px-4 py-2 flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">Cấp độ</span>
                    <span className="text-blue-600 font-bold">Level 10</span>
                  </div>
                  <div className="bg-blue-50 rounded-lg px-4 py-2 flex items-center space-x-2 opacity-50">
                    <Star className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">Điểm kinh nghiệm</span>
                    <span className="text-blue-600 font-bold">1,000 XP</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Edit className="w-4 h-4 mr-2" />
                    Chỉnh sửa thông tin
                  </Button>
                  <Button variant="outline" disabled className="opacity-50">
                    <Lock className="w-4 h-4 mr-2" />
                    Đổi mật khẩu
                  </Button>
                </div>
              </div>
            </Card>

            {/* Main Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className={`w-14 h-14 ${stat.iconBg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    {stat.icon === "question" && <FileText className={`w-6 h-6 ${stat.iconColor}`} />}
                    {stat.icon === "check" && <CheckCircle className={`w-6 h-6 ${stat.iconColor}`} />}
                    {stat.icon === "book" && <FileText className={`w-6 h-6 ${stat.iconColor}`} />}
                    {stat.icon === "fire" && <Flame className={`w-6 h-6 ${stat.iconColor}`} />}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {secondaryStats.map((stat, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`w-11 h-11 ${stat.iconBg} rounded-full flex items-center justify-center mb-3`}>
                        <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {stat.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {stat.subtitle}
                      </div>
                    </div>
                    <div className={`text-2xl font-bold ${stat.iconColor}`}>
                      {stat.number}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Progress Chart */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Biểu đồ tiến bộ
              </h3>
              <div className="h-72 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <p className="text-gray-600">Biểu đồ tiến bộ theo tuần</p>
                  <p className="text-sm text-gray-500 mt-2">Dữ liệu sẽ được hiển thị ở đây</p>
                </div>
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-6">
                Thông tin liên hệ
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">nguoidung@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">12345678910</span>
                </div>
              </div>
            </Card>

            {/* Logout Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Đăng xuất</h4>
                  <p className="text-gray-600">Thoát khỏi tài khoản hiện tại</p>
                </div>
                <Button 
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Other tabs content placeholders */}
        {activeTab === "friends" && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Danh sách bạn bè</h3>
            <p className="text-gray-600">Tính năng đang được phát triển</p>
          </div>
        )}

        {activeTab === "add-friends" && (
          <div className="text-center py-16">
            <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Thêm bạn bè</h3>
            <p className="text-gray-600">Tính năng đang được phát triển</p>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nhiệm vụ</h3>
            <p className="text-gray-600">Tính năng đang được phát triển</p>
          </div>
        )}

        {activeTab === "exchange" && (
          <div className="text-center py-16">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Đổi điểm</h3>
            <p className="text-gray-600">Tính năng đang được phát triển</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
