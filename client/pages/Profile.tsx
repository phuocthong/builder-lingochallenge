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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Calendar,
  Target,
  Trophy,
  CheckCircle,
  Clock,
  Flame,
  Star,
  Book,
  Users,
  Gift,
  Coins,
  Zap,
  MessageCircle,
  UserPlus,
  Phone,
  Mail,
  Edit,
  Lock,
  BarChart3,
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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlockedDate: Date;
}

interface Friend {
  id: string;
  name: string;
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
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [phoneCards, setPhoneCards] = useState<PhoneCard[]>([]);
  const [userPoints, setUserPoints] = useState(1250);
  const [selectedTab, setSelectedTab] = useState("profile");

  // Functions for friend interactions
  const sendMessage = (friendId: string, friendName: string) => {
    alert(
      `💬 Gửi tin nhắn cho ${friendName}!\n\nTính năng chat sẽ được phát triển trong phiên bản tiếp theo.`,
    );
  };

  const challengeFriend = (friendId: string, friendName: string) => {
    const friend = friends.find((f) => f.id === friendId);

    if (!friend?.isOnline) {
      alert(
        `😔 ${friendName} hiện đang offline!\n\nBạn có thể gửi lời mời thách đấu và họ sẽ nhận được khi online.`,
      );
      return;
    }

    if (friend.status === "in-game") {
      alert(
        `🎮 ${friendName} đang trong trận đấu khác!\n\nVui lòng thử lại sau.`,
      );
      return;
    }

    const confirm = window.confirm(
      `⚡ Bạn muốn thách đấu với ${friendName}?\n\nThách đấu sẽ bắt đầu ngay lập tức!`,
    );
    if (confirm) {
      alert(
        `✅ Đã gửi lời mời thách đấu cho ${friendName}!\n\nĐang tìm phòng thách đấu...`,
      );
      setTimeout(() => {
        alert(
          `🎮 ${friendName} đã chấp nhận thách đấu!\nĐang chuyển đến phòng thách đấu...`,
        );
      }, 1500);
    }
  };

  // Initialize with sample data
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
        name: "Minh Anh",
        avatar: "MA",
        level: 15,
        points: 2850,
        status: "online",
        streak: 12,
        isOnline: true,
      },
      {
        id: "2",
        name: "Đức Huy",
        avatar: "DH",
        level: 22,
        points: 4200,
        status: "in-game",
        streak: 8,
        isOnline: true,
      },
      {
        id: "3",
        name: "Thu Hà",
        avatar: "TH",
        level: 18,
        points: 3150,
        status: "offline",
        streak: 5,
        isOnline: false,
      },
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

  const getStatusColor = (status: Friend["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "in-game":
        return "bg-blue-500";
      case "offline":
        return "bg-gray-400";
    }
  };

  const dailyTasks = tasks.filter((task) => task.type === "daily");
  const weeklyTasks = tasks.filter((task) => task.type === "weekly");
  const completedTasks = tasks.filter((task) => task.completed).length;
  const onlineFriends = friends.filter((friend) => friend.isOnline).length;

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - User Profile */}
          <div className="lg:col-span-1 space-y-4">
            {/* Main Profile Card */}
            <Card className="p-6">
              <div className="text-center">
                {/* Avatar */}
                <div className="relative mx-auto w-20 h-20 mb-4">
                  <Avatar className="w-20 h-20 border-2 border-gray-300">
                    <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* User Info */}
                <h2 className="text-2xl font-medium text-gray-900 mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  @{user.name.toLowerCase().replace(" ", "")}
                </p>

                {/* Join Date */}
                <div className="flex items-center justify-center text-gray-600 text-sm mb-6">
                  <Calendar className="w-4 h-4 mr-2" />
                  Tham gia từ 1/1/2025
                </div>

                {/* Level */}
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-gray-700">Cấp độ</span>
                    </div>
                    <span className="text-blue-600 font-bold">Level 10</span>
                  </div>
                </div>

                {/* Experience Points */}
                <div className="bg-blue-50 rounded-lg p-4 mb-4 opacity-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-gray-700">Điểm kinh nghiệm</span>
                    </div>
                    <span className="text-blue-600 font-bold">1,000 XP</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Edit className="w-4 h-4 mr-2" />
                    Chỉnh sửa thông tin
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full opacity-50"
                    disabled
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Đổi mật khẩu
                  </Button>
                </div>
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-6 text-center">
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
          </div>

          {/* Right Content - Tabs and Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <Tabs
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="w-full"
            >
              <div className="bg-gray-200 p-1 rounded-lg inline-flex">
                <TabsList className="grid grid-cols-4 bg-transparent">
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="friends"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6"
                  >
                    Bạn bè
                  </TabsTrigger>
                  <TabsTrigger
                    value="tasks"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6"
                  >
                    Nhiệm vụ
                  </TabsTrigger>
                  <TabsTrigger
                    value="exchange"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6"
                  >
                    Đổi điểm
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6 mt-6">
                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-6 text-center">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      1,000
                    </div>
                    <div className="text-sm text-gray-600">
                      Tổng câu trả lời
                    </div>
                  </Card>

                  <Card className="p-6 text-center">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      82%
                    </div>
                    <div className="text-sm text-gray-600">Tỷ lệ chính xác</div>
                  </Card>

                  <Card className="p-6 text-center">
                    <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Book className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      2,125
                    </div>
                    <div className="text-sm text-gray-600">Từ đã học</div>
                  </Card>

                  <Card className="p-6 text-center">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Flame className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      2,125
                    </div>
                    <div className="text-sm text-gray-600">Chuỗi dài nhất</div>
                  </Card>
                </div>

                {/* Secondary Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <Flame className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          Chuỗi hiện tại
                        </div>
                        <div className="text-xs text-gray-500">
                          Ngày liên tiếp
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">15</div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center mb-3">
                          <Clock className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          Thời gian trung bình
                        </div>
                        <div className="text-xs text-gray-500">Mỗi câu hỏi</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        2.5s
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="w-11 h-11 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          Ngày học tập
                        </div>
                        <div className="text-xs text-gray-500">
                          Tổng số ngày
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        45
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Progress Chart */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Biểu đồ tiến bộ
                  </h3>
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                      <p className="text-gray-600">Biểu đồ tiến bộ theo tuần</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Friends Tab */}
              <TabsContent value="friends" className="space-y-6 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    Danh sách bạn bè ({friends.length})
                  </h3>
                  <Button className="flex items-center space-x-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Thêm bạn</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {friends.map((friend) => (
                    <Card
                      key={friend.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                {friend.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-white`}
                            ></div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{friend.name}</h4>
                            <p className="text-sm text-gray-600">
                              Level {friend.level}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-center mb-4">
                          <div className="bg-yellow-50 p-2 rounded">
                            <p className="text-xs text-gray-600">Điểm</p>
                            <p className="font-semibold text-yellow-600">
                              {friend.points.toLocaleString()}
                            </p>
                          </div>
                          <div className="bg-red-50 p-2 rounded">
                            <p className="text-xs text-gray-600">Streak</p>
                            <p className="font-semibold text-red-600">
                              {friend.streak}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                            onClick={() => sendMessage(friend.id, friend.name)}
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Nhắn tin
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className={`flex-1 ${
                              friend.isOnline && friend.status !== "in-game"
                                ? "hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-200"
                                : "opacity-60 cursor-not-allowed"
                            }`}
                            onClick={() =>
                              challengeFriend(friend.id, friend.name)
                            }
                            disabled={
                              !friend.isOnline || friend.status === "in-game"
                            }
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            {friend.status === "in-game"
                              ? "Đang chơi"
                              : !friend.isOnline
                                ? "Offline"
                                : "Thách đấu"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Tasks Tab */}
              <TabsContent value="tasks" className="space-y-6 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Nhiệm vụ c��a tôi</h3>
                  <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-lg">
                    <Coins className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-600">
                      {userPoints.toLocaleString()} điểm
                    </span>
                  </div>
                </div>

                <Tabs defaultValue="daily" className="w-full">
                  <TabsList>
                    <TabsTrigger value="daily">
                      Hàng ngày ({dailyTasks.length})
                    </TabsTrigger>
                    <TabsTrigger value="weekly">
                      Hàng tuần ({weeklyTasks.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="daily" className="space-y-3">
                    {dailyTasks.map((task) => (
                      <Card
                        key={task.id}
                        className={
                          task.completed ? "bg-green-50 border-green-200" : ""
                        }
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                {getTaskCategoryIcon(task.category)}
                                <h4
                                  className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}
                                >
                                  {task.title}
                                </h4>
                                {task.completed && (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {task.description}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <div className="flex-1">
                                  <div className="flex justify-between text-sm mb-1">
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
                                  className="text-xs bg-yellow-50 text-yellow-700"
                                >
                                  +{task.points} điểm
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
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
                                  >
                                    +1
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      updateTaskProgress(task.id, task.target)
                                    }
                                  >
                                    Hoàn thành
                                  </Button>
                                </div>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteTask(task.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Xóa
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="weekly" className="space-y-3">
                    {weeklyTasks.map((task) => (
                      <Card
                        key={task.id}
                        className={
                          task.completed ? "bg-green-50 border-green-200" : ""
                        }
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                {getTaskCategoryIcon(task.category)}
                                <h4
                                  className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}
                                >
                                  {task.title}
                                </h4>
                                {task.completed && (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {task.description}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <div className="flex-1">
                                  <div className="flex justify-between text-sm mb-1">
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
                                  className="text-xs bg-yellow-50 text-yellow-700"
                                >
                                  +{task.points} điểm
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>
                                  Hạn:{" "}
                                  {task.dueDate.toLocaleDateString("vi-VN")}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
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
                                  >
                                    +1
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      updateTaskProgress(task.id, task.target)
                                    }
                                  >
                                    Hoàn thành
                                  </Button>
                                </div>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteTask(task.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Xóa
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>

                <Card className="mt-6">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3">💡 Cách tích điểm:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Hoàn thành nhiệm vụ hàng ngày: 25-50 điểm</li>
                      <li>• Hoàn thành nhiệm vụ hàng tuần: 100-150 điểm</li>
                      <li>• Thách đấu với bạn bè và thắng: 20-30 điểm</li>
                      <li>• Duy trì streak liên tục: 10 điểm/ngày</li>
                      <li>• Đạt thành tích đặc biệt: 50-200 điểm</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Exchange Tab */}
              <TabsContent value="exchange" className="space-y-6 mt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">Cửa hàng thẻ cào</h3>
                    <p className="text-sm text-gray-600">
                      Đổi điểm tích lũy để nhận thẻ cào điện thoại
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-lg">
                    <Coins className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-600">
                      {userPoints.toLocaleString()} điểm
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {phoneCards.map((card) => (
                    <Card
                      key={card.id}
                      className={`hover:shadow-md transition-shadow ${card.popular ? "ring-2 ring-blue-500" : ""}`}
                    >
                      <CardContent className="pt-4">
                        {card.popular && (
                          <Badge className="mb-2 bg-blue-500 text-white">
                            🔥 Phổ biến
                          </Badge>
                        )}

                        <div className="text-center mb-4">
                          <Phone className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                          <h4 className="font-semibold text-lg">
                            {card.provider}
                          </h4>
                          <p className="text-2xl font-bold text-green-600">
                            {card.value.toLocaleString()}đ
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Giá gốc:
                            </span>
                            {card.discount ? (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm line-through text-gray-400">
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
                              <span className="text-sm">
                                {card.cost.toLocaleString()} điểm
                              </span>
                            )}
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              Giá bán:
                            </span>
                            <span className="text-lg font-bold text-yellow-600">
                              {card.cost.toLocaleString()} điểm
                            </span>
                          </div>
                        </div>

                        <Button
                          className="w-full mt-4"
                          onClick={() => purchasePhoneCard(card.id)}
                          disabled={userPoints < card.cost}
                          variant={
                            userPoints >= card.cost ? "default" : "secondary"
                          }
                        >
                          {userPoints >= card.cost ? (
                            <>
                              <Gift className="w-4 h-4 mr-2" />
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
