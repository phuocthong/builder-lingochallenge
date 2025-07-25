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
  Plus,
  Clock,
  Flame,
  Star,
  Users,
  Gift,
  Coins,
  Zap,
  MessageCircle,
  UserPlus,
  Phone,
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
  points: number; // Added points system
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
  const [userPoints, setUserPoints] = useState(1250); // Current user points

  const [selectedTab, setSelectedTab] = useState("tasks");

  // Functions for friend interactions
  const sendMessage = (friendId: string, friendName: string) => {
    alert(`💬 Gửi tin nhắn cho ${friendName}!\n\nTính năng chat sẽ được phát triển trong phiên bản tiếp theo.`);
  };

  const challengeFriend = (friendId: string, friendName: string) => {
    const friend = friends.find(f => f.id === friendId);

    if (!friend?.isOnline) {
      alert(`😔 ${friendName} hiện đang offline!\n\nBạn có thể gửi lời mời thách đấu và họ sẽ nhận được khi online.`);
      return;
    }

    if (friend.status === 'in-game') {
      alert(`🎮 ${friendName} đang trong trận đấu khác!\n\nVui lòng thử lại sau.`);
      return;
    }

    const confirm = window.confirm(`⚡ Bạn muốn thách đấu với ${friendName}?\n\nThách đấu sẽ bắt đầu ngay lập tức!`);
    if (confirm) {
      alert(`✅ Đã gửi lời mời thách đấu cho ${friendName}!\n\nĐang tìm phòng thách đấu...`);
      // Here you would typically navigate to challenge room or show challenge modal
      setTimeout(() => {
        alert(`🎮 ${friendName} đã chấp nhận thách đấu!\nĐang chuyển đến phòng thách đấu...`);
        // Navigate to challenge room in future implementation
        // window.location.href = '/challenge';
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
      {
        id: "4",
        title: "Đạt top 10 leaderboard",
        description: "Leo lên top 10 bảng xếp hạng tuần này",
        type: "weekly",
        completed: false,
        progress: 0,
        target: 1,
        category: "challenge",
        reward: 300,
        points: 150,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    ];

    const sampleAchievements: Achievement[] = [
      {
        id: "1",
        title: "Người mới bắt đầu",
        description: "Hoàn thành nhiệm vụ đầu tiên",
        icon: "🌟",
        rarity: "common",
        unlockedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "2",
        title: "Streak Master",
        description: "Duy trì streak 7 ngày liên tiếp",
        icon: "🔥",
        rarity: "rare",
        unlockedDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
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
      {
        id: "4",
        name: "Quang Nam",
        avatar: "QN",
        level: 12,
        points: 1920,
        status: "online",
        streak: 15,
        isOnline: true,
      },
      {
        id: "5",
        name: "Lan Anh",
        avatar: "LA",
        level: 25,
        points: 5800,
        status: "offline",
        streak: 20,
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
      {
        id: "5",
        provider: "Vietnamobile",
        value: 30000,
        cost: 2300,
      },
      {
        id: "6",
        provider: "Gmobile",
        value: 15000,
        cost: 1200,
      },
    ];

    setTasks(sampleTasks);
    setAchievements(sampleAchievements);
    setFriends(sampleFriends);
    setPhoneCards(samplePhoneCards);
  }, []);

  const updateTaskProgress = (taskId: string, newProgress: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const completed = newProgress >= task.target;
          const wasCompleted = task.completed;

          // Award points when task is completed for the first time
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

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800";
      case "rare":
        return "bg-blue-100 text-blue-800";
      case "epic":
        return "bg-purple-100 text-purple-800";
      case "legendary":
        return "bg-yellow-100 text-yellow-800";
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

  const getStatusText = (status: Friend["status"]) => {
    switch (status) {
      case "online":
        return "Trực tuyến";
      case "in-game":
        return "Đang chơi";
      case "offline":
        return "Ngoại tuyến";
    }
  };

  const dailyTasks = tasks.filter((task) => task.type === "daily");
  const weeklyTasks = tasks.filter((task) => task.type === "weekly");
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const onlineFriends = friends.filter((friend) => friend.isOnline).length;

  if (!user.isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
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
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* User Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <Trophy className="w-3 h-3" />
                  <span>Hạng {user.stats?.rank}</span>
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <Flame className="w-3 h-3" />
                  <span>Streak {user.stats?.streak}</span>
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <Coins className="w-3 h-3" />
                  <span>{userPoints.toLocaleString()} điểm</span>
                </Badge>
                <Badge variant="secondary">
                  Độ chính xác: {user.stats?.accuracy}%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nhiệm vụ hoàn thành</p>
                <p className="text-2xl font-bold">
                  {completedTasks}/{totalTasks}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Điểm tích lũy</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {userPoints.toLocaleString()}
                </p>
              </div>
              <Coins className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bạn bè</p>
                <p className="text-2xl font-bold">{friends.length}</p>
                <p className="text-xs text-green-600">
                  {onlineFriends} đang online
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thành tích</p>
                <p className="text-2xl font-bold">{achievements.length}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks">Nhiệm vụ</TabsTrigger>
          <TabsTrigger value="achievements">Thành tích</TabsTrigger>
          <TabsTrigger value="friends">Bạn bè</TabsTrigger>
          <TabsTrigger value="shop">Cửa hàng</TabsTrigger>
        </TabsList>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Nhiệm vụ của tôi</h3>
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
                          <Badge variant="outline" className="text-xs">
                            +{task.reward} XP
                          </Badge>
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
                                updateTaskProgress(task.id, task.progress + 1)
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
                          <Badge variant="outline" className="text-xs">
                            +{task.reward} XP
                          </Badge>
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
                            Hạn: {task.dueDate.toLocaleDateString("vi-VN")}
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
                                updateTaskProgress(task.id, task.progress + 1)
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
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <h3 className="text-xl font-semibold">Thành tích đã mở khóa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {achievement.description}
                    </p>
                    <Badge
                      className={`mt-2 ${getRarityColor(achievement.rarity)}`}
                    >
                      {achievement.rarity === "common"
                        ? "Thường"
                        : achievement.rarity === "rare"
                          ? "Hiếm"
                          : achievement.rarity === "epic"
                            ? "Sử thi"
                            : "Huyền thoại"}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-2">
                      Mở khóa:{" "}
                      {achievement.unlockedDate.toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Friends Tab */}
        <TabsContent value="friends" className="space-y-4">
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
                  <div className="flex items-center space-x-3">
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
                      <p className="text-xs text-gray-500">
                        {getStatusText(friend.status)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-center">
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

                  <div className="flex space-x-2 mt-4">
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
                      className="flex-1 hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-200"
                      onClick={() => challengeFriend(friend.id, friend.name)}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Thách đấu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Shop Tab */}
        <TabsContent value="shop" className="space-y-4">
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
                    <h4 className="font-semibold text-lg">{card.provider}</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {card.value.toLocaleString()}đ
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Giá gốc:</span>
                      {card.discount ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm line-through text-gray-400">
                            {Math.round(
                              card.cost / (1 - card.discount / 100),
                            ).toLocaleString()}{" "}
                            điểm
                          </span>
                          <Badge variant="destructive" className="text-xs">
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
                      <span className="text-sm font-medium">Giá bán:</span>
                      <span className="text-lg font-bold text-yellow-600">
                        {card.cost.toLocaleString()} điểm
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4"
                    onClick={() => purchasePhoneCard(card.id)}
                    disabled={userPoints < card.cost}
                    variant={userPoints >= card.cost ? "default" : "secondary"}
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
      </Tabs>
    </div>
  );
};

export default Profile;
