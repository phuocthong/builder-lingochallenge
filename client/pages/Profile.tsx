import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
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
  BarChart3,
  MessageCircle,
  Zap,
  Target,
  Gift,
  Coins,
  Search,
  MoreHorizontal,
  ChevronDown
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly";
  completed: boolean;
  progress: number;
  target: number;
  category: "practice" | "learning" | "challenge" | "social";
  reward: number;
  points: number;
  dueDate: Date;
  completedDate?: Date;
}

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  level: number;
  points: number;
  status: "online" | "offline" | "in-game";
  streak: number;
  isOnline: boolean;
}

interface PhoneCard {
  id: string;
  provider: string;
  value: number;
  cost: number;
  discount?: number;
  popular?: boolean;
}

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [newFriendUsername, setNewFriendUsername] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [phoneCards, setPhoneCards] = useState<PhoneCard[]>([]);
  const [userPoints, setUserPoints] = useState(1250);

  // Initialize sample data
  useEffect(() => {
    const sampleTasks: Task[] = [
      {
        id: "1",
        title: "Trả lời đúng 10 câu hỏi",
        description: "Hoàn thành 10 câu trả lời chính xác trong ngày",
        type: "daily",
        completed: false,
        progress: 7,
        target: 10,
        category: "practice",
        reward: 50,
        points: 25,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      {
        id: "2",
        title: "Duy trì streak 3 ngày",
        description: "Chơi liên tục 3 ngày không nghỉ",
        type: "daily",
        completed: true,
        progress: 3,
        target: 3,
        category: "practice",
        reward: 100,
        points: 50,
        dueDate: new Date(),
        completedDate: new Date(),
      },
      {
        id: "3",
        title: "Thách đấu với 5 bạn bè",
        description: "Tham gia thách đấu với ít nhất 5 người bạn trong tuần",
        type: "weekly",
        completed: false,
        progress: 2,
        target: 5,
        category: "social",
        reward: 200,
        points: 100,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    ];

    const sampleFriends: Friend[] = [
      {
        id: "1",
        name: "Người dùng",
        username: "@nguoidung",
        avatar: "ND",
        level: 15,
        points: 2850,
        status: "online",
        streak: 12,
        isOnline: true,
      },
      {
        id: "2",
        name: "Người dùng",
        username: "@nguoidung",
        avatar: "ND",
        level: 22,
        points: 4200,
        status: "online",
        streak: 8,
        isOnline: true,
      },
      {
        id: "3",
        name: "Người dùng",
        username: "@nguoidung",
        avatar: "ND",
        level: 18,
        points: 3150,
        status: "online",
        streak: 5,
        isOnline: true,
      },
      {
        id: "4",
        name: "Người dùng",
        username: "@nguoidung",
        avatar: "ND",
        level: 14,
        points: 2100,
        status: "online",
        streak: 15,
        isOnline: true,
      },
      {
        id: "5",
        name: "Người dùng",
        username: "@nguoidung",
        avatar: "ND",
        level: 20,
        points: 3800,
        status: "online",
        streak: 9,
        isOnline: true,
      },
      {
        id: "6",
        name: "Người dùng",
        username: "@nguoidung",
        avatar: "ND",
        level: 12,
        points: 1900,
        status: "online",
        streak: 6,
        isOnline: true,
      }
    ];

    const samplePhoneCards: PhoneCard[] = [
      {
        id: "1",
        provider: "Viettel",
        value: 10000,
        cost: 800,
        popular: true,
      },
      {
        id: "2",
        provider: "Mobifone",
        value: 20000,
        cost: 1500,
        discount: 10,
      },
      {
        id: "3",
        provider: "Vinaphone",
        value: 50000,
        cost: 3800,
        discount: 15,
      },
      {
        id: "4",
        provider: "Viettel",
        value: 100000,
        cost: 7200,
        discount: 20,
        popular: true,
      },
    ];

    setTasks(sampleTasks);
    setFriends(sampleFriends);
    setPhoneCards(samplePhoneCards);
  }, []);

  const updateTaskProgress = (taskId: string, newProgress: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const completed = newProgress >= task.target;
          const wasCompleted = task.completed;

          if (completed && !wasCompleted) {
            setUserPoints((prevPoints) => prevPoints + task.points);
          }

          return {
            ...task,
            progress: Math.min(newProgress, task.target),
            completed,
            completedDate: completed ? new Date() : undefined,
          };
        }
        return task;
      }),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const purchasePhoneCard = (cardId: string) => {
    const card = phoneCards.find((c) => c.id === cardId);
    if (card && userPoints >= card.cost) {
      setUserPoints((prev) => prev - card.cost);
      alert(
        `Đã mua thành công thẻ ${card.provider} ${card.value.toLocaleString()}đ!`,
      );
    } else {
      alert("Không đủ điểm để mua thẻ này!");
    }
  };

  const getTaskCategoryIcon = (category: Task["category"]) => {
    switch (category) {
      case "practice":
        return <Target className="w-4 h-4" />;
      case "learning":
        return <Star className="w-4 h-4" />;
      case "challenge":
        return <Trophy className="w-4 h-4" />;
      case "social":
        return <Calendar className="w-4 h-4" />;
    }
  };

  const challengeFriend = (friendId: string, friendName: string) => {
    alert(
      `⚡ Đã gửi lời mời thách đấu cho ${friendName}!\n\nĐang tìm phòng thách đấu...`,
    );
  };

  const addFriend = () => {
    if (newFriendUsername.trim()) {
      const newFriend: Friend = {
        id: Date.now().toString(),
        name: "Người dùng mới",
        username: newFriendUsername,
        avatar: "ND",
        level: 1,
        points: 100,
        status: "offline",
        streak: 0,
        isOnline: false,
      };
      setFriends([...friends, newFriend]);
      setNewFriendUsername("");
      alert(`Đã gửi lời mời kết bạn tới ${newFriendUsername}!`);
    }
  };

  const filteredFriends = friends.filter(
    friend =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dailyTasks = tasks.filter((task) => task.type === "daily");
  const weeklyTasks = tasks.filter((task) => task.type === "weekly");

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
    <div className="min-h-screen bg-white">
      {/* Mobile Navigation Bar */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {sidebarItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-72 bg-white border-r border-gray-200 p-6">
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
        <div className="flex-1 p-3 sm:p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Profile Header */}
              <Card className="p-4 sm:p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-gray-300">
                      <AvatarFallback className="text-lg sm:text-xl font-bold bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-1">
                    {user.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    @{user.name.toLowerCase().replace(" ", "")}
                  </p>

                  <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Tham gia từ 1/1/2025
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-4 sm:mb-6">
                    <div className="bg-blue-50 rounded-lg px-3 py-2 flex items-center space-x-2">
                      <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                      <span className="text-xs sm:text-sm text-gray-700">Cấp độ</span>
                      <span className="text-xs sm:text-sm text-blue-600 font-bold">Level 10</span>
                    </div>
                    <div className="bg-blue-50 rounded-lg px-3 py-2 flex items-center space-x-2 opacity-50">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                      <span className="text-xs sm:text-sm text-gray-700">Điểm kinh nghiệm</span>
                      <span className="text-xs sm:text-sm text-blue-600 font-bold">1,000 XP</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Chỉnh sửa thông tin
                    </Button>
                    <Button variant="outline" disabled className="opacity-50 text-sm">
                      <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Đổi mật khẩu
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Main Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="p-3 sm:p-6 text-center">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 ${stat.iconBg} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3`}>
                      {stat.icon === "question" && <MessageCircle className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.iconColor}`} />}
                      {stat.icon === "check" && <CheckCircle className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.iconColor}`} />}
                      {stat.icon === "book" && <FileText className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.iconColor}`} />}
                      {stat.icon === "fire" && <Flame className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.iconColor}`} />}
                    </div>
                    <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Secondary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {secondaryStats.map((stat, index) => (
                  <Card key={index} className="p-3 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`w-8 h-8 sm:w-11 sm:h-11 ${stat.iconBg} rounded-full flex items-center justify-center mb-2 sm:mb-3`}>
                          <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.iconColor}`} />
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 mb-1">
                          {stat.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {stat.subtitle}
                        </div>
                      </div>
                      <div className={`text-lg sm:text-2xl font-bold ${stat.iconColor}`}>
                        {stat.number}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Progress Chart */}
              <Card className="p-3 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Biểu đồ tiến bộ
                </h3>
                <div className="h-48 sm:h-72 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600 mx-auto mb-4" />
                    <p className="text-sm sm:text-base text-gray-600">Biểu đồ tiến bộ theo tuần</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">Dữ liệu sẽ được hiển thị ở đây</p>
                  </div>
                </div>
              </Card>

              {/* Contact Info */}
              <Card className="p-3 sm:p-6">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6">
                  Thông tin liên hệ
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-3" />
                    <span className="text-sm sm:text-base text-gray-700">nguoidung@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-3" />
                    <span className="text-sm sm:text-base text-gray-700">12345678910</span>
                  </div>
                </div>
              </Card>

              {/* Logout Section */}
              <Card className="p-3 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Đăng xuất</h4>
                    <p className="text-sm sm:text-base text-gray-600">Thoát khỏi tài khoản hiện tại</p>
                  </div>
                  <Button 
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Đăng xuất
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Friends Tab */}
          {activeTab === "friends" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Bạn bè</h1>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm bạn bè..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {filteredFriends.map((friend) => (
                  <Card key={friend.id} className="p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="relative">
                          <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                              {friend.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-medium text-gray-900">{friend.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">{friend.username}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-yellow-600">
                              ⭐ Đang hoạt động
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Button
                          onClick={() => challengeFriend(friend.id, friend.name)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"
                        >
                          <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Thử thách
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Add Friends Tab */}
          {activeTab === "add-friends" && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Thêm bạn bè</h1>
                <p className="text-sm sm:text-base text-gray-600">Tìm và kết bạn với những người học khác</p>
              </div>

              <Card className="p-3 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                  Thêm bạn bằng tên người dùng
                </h3>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Input
                    type="text"
                    placeholder="Nhập tên người dùng (vd: @nguoidung)"
                    value={newFriendUsername}
                    onChange={(e) => setNewFriendUsername(e.target.value)}
                    className="flex-1 text-sm"
                  />
                  <Button 
                    onClick={addFriend}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 sm:py-2.5"
                  >
                    <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Thêm bạn
                  </Button>
                </div>
              </Card>

              <Card className="p-3 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                  Gợi ý bạn bè
                </h3>
                <div className="text-center py-8 sm:py-12">
                  <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm sm:text-base text-gray-500">Chưa có gợi ý nào</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-2">
                    Tham gia thêm các cuộc thi để tìm bạn bè mới
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === "tasks" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3 className="text-xl font-semibold">Nhiệm vụ của tôi</h3>
                <div className="flex items-center space-x-2 bg-yellow-50 px-3 sm:px-4 py-2 rounded-lg">
                  <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                  <span className="text-sm sm:text-base font-semibold text-yellow-600">
                    {userPoints.toLocaleString()} điểm
                  </span>
                </div>
              </div>

              <div className="border-b border-gray-200">
                <nav className="flex space-x-4 sm:space-x-8">
                  <button className="border-b-2 border-blue-600 pb-2 text-blue-600 font-medium text-sm sm:text-base">
                    Hàng ngày ({dailyTasks.length})
                  </button>
                  <button className="pb-2 text-gray-500 hover:text-gray-700 text-sm sm:text-base">
                    Hàng tuần ({weeklyTasks.length})
                  </button>
                </nav>
              </div>

              <div className="space-y-3">
                {dailyTasks.map((task) => (
                  <Card
                    key={task.id}
                    className={
                      task.completed ? "bg-green-50 border-green-200" : ""
                    }
                  >
                    <CardContent className="pt-3 sm:pt-4 p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            {getTaskCategoryIcon(task.category)}
                            <h4
                              className={`text-sm sm:text-base font-medium ${task.completed ? "line-through text-gray-500" : ""}`}
                            >
                              {task.title}
                            </h4>
                            {task.completed && (
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            {task.description}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 gap-2">
                            <div className="flex-1">
                              <div className="flex justify-between text-xs sm:text-sm mb-1">
                                <span>
                                  Tiến độ: {task.progress}/{task.target}
                                </span>
                                <span>
                                  {Math.round(
                                    (task.progress / task.target) * 100,
                                  )}
                                  %
                                </span>
                              </div>
                              <Progress
                                value={(task.progress / task.target) * 100}
                              />
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs bg-yellow-50 text-yellow-700 w-fit"
                            >
                              +{task.points} điểm
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!task.completed && (
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateTaskProgress(
                                    task.id,
                                    task.progress + 1,
                                  )
                                }
                                disabled={task.progress >= task.target}
                                className="text-xs"
                              >
                                +1
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateTaskProgress(task.id, task.target)
                                }
                                className="text-xs"
                              >
                                Hoàn thành
                              </Button>
                            </div>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteTask(task.id)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Exchange Tab */}
          {activeTab === "exchange" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-semibold">Cửa hàng thẻ cào</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Đổi điểm tích lũy để nhận thẻ cào điện thoại
                  </p>
                </div>
                <div className="flex items-center space-x-2 bg-yellow-50 px-3 sm:px-4 py-2 rounded-lg">
                  <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                  <span className="text-sm sm:text-base font-semibold text-yellow-600">
                    {userPoints.toLocaleString()} điểm
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {phoneCards.map((card) => (
                  <Card
                    key={card.id}
                    className={`hover:shadow-md transition-shadow ${card.popular ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <CardContent className="pt-3 sm:pt-4 p-3 sm:p-4">
                      {card.popular && (
                        <Badge className="mb-2 bg-blue-500 text-white text-xs">
                          🔥 Phổ biến
                        </Badge>
                      )}

                      <div className="text-center mb-4">
                        <Phone className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-gray-600" />
                        <h4 className="text-base sm:text-lg font-semibold">
                          {card.provider}
                        </h4>
                        <p className="text-xl sm:text-2xl font-bold text-green-600">
                          {card.value.toLocaleString()}đ
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-600">
                            Giá gốc:
                          </span>
                          {card.discount ? (
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <span className="text-xs sm:text-sm line-through text-gray-400">
                                {Math.round(
                                  card.cost / (1 - card.discount / 100),
                                ).toLocaleString()}{" "}
                                điểm
                              </span>
                              <Badge
                                variant="destructive"
                                className="text-xs"
                              >
                                -{card.discount}%
                              </Badge>
                            </div>
                          ) : (
                            <span className="text-xs sm:text-sm">
                              {card.cost.toLocaleString()} điểm
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium">
                            Giá bán:
                          </span>
                          <span className="text-base sm:text-lg font-bold text-yellow-600">
                            {card.cost.toLocaleString()} điểm
                          </span>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4 text-sm"
                        onClick={() => purchasePhoneCard(card.id)}
                        disabled={userPoints < card.cost}
                        variant={
                          userPoints >= card.cost ? "default" : "secondary"
                        }
                      >
                        {userPoints >= card.cost ? (
                          <>
                            <Gift className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Đổi ngay
                          </>
                        ) : (
                          <>Không đủ điểm</>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
