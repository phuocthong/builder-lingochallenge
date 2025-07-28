import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Home,
  Users,
  UserPlus,
  ClipboardList,
  CreditCard,
  Search,
  MessageCircle,
  Zap,
  MoreHorizontal,
  Flame
} from "lucide-react";

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  streak: number;
  isOnline: boolean;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    // Sample friends data
    setFriends([
      {
        id: "1",
        name: "Người dùng",
        username: "@nguoidung",
        avatar: "ND",
        streak: 15,
        isOnline: true
      },
      {
        id: "2", 
        name: "Minh Anh",
        username: "@minhanh",
        avatar: "MA",
        streak: 12,
        isOnline: true
      },
      {
        id: "3",
        name: "Thu Hà", 
        username: "@thuha",
        avatar: "TH",
        streak: 8,
        isOnline: false
      },
      {
        id: "4",
        name: "Văn Nam",
        username: "@vannam", 
        avatar: "VN",
        streak: 5,
        isOnline: true
      }
    ]);
  }, []);

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <p className="text-gray-600">
              Vui lòng đăng nhập đ��� xem hồ sơ cá nhân
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleChallenge = (friendName: string) => {
    alert(`Đã gửi lời mời thách đấu cho ${friendName}!`);
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "friends", label: "Bạn bè", icon: Users },
    { id: "add-friends", label: "Thêm bạn bè", icon: UserPlus },
    { id: "tasks", label: "Nhiệm vụ", icon: ClipboardList },
    { id: "exchange", label: "Đổi điểm", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-purple-600 p-2 rounded-lg">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-gray-900">Logo</span>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-sm text-gray-600 cursor-pointer hover:text-gray-900">Trang chủ</span>
              <span className="text-sm text-gray-600 cursor-pointer hover:text-gray-900">Giới thiệu</span>
              <span className="text-sm text-gray-600 cursor-pointer hover:text-gray-900">Thử thách</span>
            </div>

            {/* User Stats */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  <span># 45</span>
                </div>
                <div>
                  <span className="text-green-600 font-medium">523</span>
                  <span className="text-gray-500"> đúng</span>
                </div>
                <div>
                  <span className="text-gray-500">Streak:</span>
                  <span className="text-blue-600 font-medium"> 7</span>
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-purple-600 text-white text-sm">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium text-gray-900">{user.name}</span>
              </div>

              {/* Logout Button */}
              <Button variant="outline" size="sm" className="text-sm">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <div className="w-72 border-r border-gray-200 bg-white min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "friends" && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm bạn bè"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-300"
                />
              </div>

              {/* Friends List */}
              <div className="space-y-3">
                {friends.filter(friend => 
                  friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  friend.username.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((friend) => (
                  <Card key={friend.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {/* Avatar */}
                          <div className="relative">
                            <div className="w-14 h-14 rounded-full border-2 border-gray-300 bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{friend.avatar}</span>
                            </div>
                            {/* Online Status */}
                            {friend.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>

                          {/* User Info */}
                          <div className="space-y-1">
                            <h3 className="font-medium text-gray-900 text-lg">{friend.name}</h3>
                            <p className="text-gray-600 text-sm">{friend.username}</p>
                            <div className="flex items-center space-x-2">
                              <Flame className="w-3 h-3 text-yellow-500" />
                              <span className="text-yellow-600 text-xs font-medium">
                                {friend.streak} ngày • {friend.isOnline ? 'Đang hoạt động' : 'Offline'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                            onClick={() => handleChallenge(friend.name)}
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            Th��� thách
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4 text-yellow-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Chào mừng trở lại, {user.name}!</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Thống kê tổng quan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Xếp hạng:</span>
                        <span className="font-semibold"># 45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Câu đúng:</span>
                        <span className="font-semibold text-green-600">523</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Streak:</span>
                        <span className="font-semibold text-blue-600">7 ngày</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "add-friends" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Thêm bạn bè</h1>
                <p className="text-gray-600">Tìm kiếm và kết bạn với người dùng khác</p>
              </div>
              <div className="text-center py-12">
                <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Tính năng đang được phát triển</p>
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nhiệm vụ</h1>
                <p className="text-gray-600">Hoàn thành nhiệm vụ để nhận điểm thưởng</p>
              </div>
              <div className="text-center py-12">
                <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Tính năng đang được phát triển</p>
              </div>
            </div>
          )}

          {activeTab === "exchange" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Đổi điểm</h1>
                <p className="text-gray-600">Sử dụng điểm để đổi lấy phần thưởng</p>
              </div>
              <div className="text-center py-12">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Tính năng đang được phát triển</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
