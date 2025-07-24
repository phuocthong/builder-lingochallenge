import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Users,
  UserPlus,
  Search,
  Zap,
  Check,
  X,
  Mail,
  Trophy,
  MessageCircle,
  Crown,
  Star,
  Heart,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { FriendChallengeModal } from "../components/friends/FriendChallengeModal";

// Mock data
interface Friend {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
  stats: {
    rank: number;
    totalCorrect: number;
    streak: number;
    accuracy: number;
  };
}

interface FriendRequest {
  id: string;
  name: string;
  username: string;
  avatar: string;
  sentAt: string;
  mutualFriends: number;
}

// Mock friends data
const mockFriends: Friend[] = [
  {
    id: "friend-1",
    name: "Minh Anh",
    username: "minhanh2024",
    email: "minh.anh@email.com",
    avatar: "MA",
    isOnline: true,
    stats: { rank: 12, totalCorrect: 1456, streak: 8, accuracy: 92 },
  },
  {
    id: "friend-2",
    name: "Thành Hòa",
    username: "thanhhoa_vn",
    email: "thanh.hoa@email.com",
    avatar: "TH",
    isOnline: true,
    stats: { rank: 5, totalCorrect: 2195, streak: 23, accuracy: 94 },
  },
  {
    id: "friend-3",
    name: "Thu Trang",
    username: "trang.thu",
    email: "thu.trang@email.com",
    avatar: "TT",
    isOnline: false,
    lastSeen: "2 giờ trước",
    stats: { rank: 8, totalCorrect: 1834, streak: 15, accuracy: 89 },
  },
  {
    id: "friend-4",
    name: "Văn Nam",
    username: "vannam_eng",
    email: "van.nam@email.com",
    avatar: "VN",
    isOnline: false,
    lastSeen: "1 ngày trước",
    stats: { rank: 15, totalCorrect: 1124, streak: 5, accuracy: 87 },
  },
  {
    id: "friend-5",
    name: "Lan Anh",
    username: "lananh.study",
    email: "lan.anh@email.com",
    avatar: "LA",
    isOnline: true,
    stats: { rank: 3, totalCorrect: 2456, streak: 18, accuracy: 96 },
  },
];

// Mock friend requests
const mockFriendRequests: FriendRequest[] = [
  {
    id: "req-1",
    name: "Hoàng Nam",
    username: "hoangnam_dev",
    avatar: "HN",
    sentAt: "2 giờ trước",
    mutualFriends: 3,
  },
  {
    id: "req-2",
    name: "Mai Linh",
    username: "mailinh.english",
    avatar: "ML",
    sentAt: "1 ngày trước",
    mutualFriends: 1,
  },
  {
    id: "req-3",
    name: "Đức Minh",
    username: "ducminh2024",
    avatar: "DM",
    sentAt: "3 ngày trước",
    mutualFriends: 2,
  },
];

export default function Friends() {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [friendRequests, setFriendRequests] =
    useState<FriendRequest[]>(mockFriendRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Friend[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🔒 Yêu cầu đăng nhập
            </h2>
            <p className="text-gray-600 mb-6">
              Bạn cần đăng nhập để quản lý bạn bè
            </p>
            <Button
              onClick={() => window.history.back()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Quay lại trang chủ
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    // Simulate API search
    setTimeout(() => {
      const results = [
        {
          id: "search-1",
          name: "Bảo Trân",
          username: "baotran_eng",
          email: "bao.tran@email.com",
          avatar: "BT",
          isOnline: false,
          lastSeen: "5 phút trước",
          stats: { rank: 20, totalCorrect: 856, streak: 3, accuracy: 85 },
        },
        {
          id: "search-2",
          name: "Quốc Duy",
          username: "quocduy_learn",
          email: "quoc.duy@email.com",
          avatar: "QD",
          isOnline: true,
          stats: { rank: 18, totalCorrect: 945, streak: 7, accuracy: 88 },
        },
      ].filter(
        (person) =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.email.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const handleSendFriendRequest = (targetUser: Friend) => {
    // Add to friend requests (simulate)
    alert(`Đã gửi lời mời kết bạn đến ${targetUser.name}!`);
  };

  const handleAcceptFriendRequest = (request: FriendRequest) => {
    // Move from requests to friends
    const newFriend: Friend = {
      id: request.id,
      name: request.name,
      username: request.username,
      email: `${request.username}@email.com`,
      avatar: request.avatar,
      isOnline: Math.random() > 0.5,
      stats: {
        rank: Math.floor(Math.random() * 50) + 1,
        totalCorrect: Math.floor(Math.random() * 2000) + 500,
        streak: Math.floor(Math.random() * 20) + 1,
        accuracy: Math.floor(Math.random() * 30) + 70,
      },
    };

    setFriends((prev) => [...prev, newFriend]);
    setFriendRequests((prev) => prev.filter((req) => req.id !== request.id));
  };

  const handleDeclineFriendRequest = (requestId: string) => {
    setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  const handleChallengeFriend = (friend: Friend) => {
    setSelectedFriend(friend);
    setShowChallengeModal(true);
  };

  const handleSendChallenge = (friend: Friend, settings: any) => {
    alert(
      `Đã gửi thách đấu ${settings.challengeType} đến ${friend.name}! 🎯\n${settings.questionCount} câu hỏi, ${settings.timePerQuestion}s mỗi câu`,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            👥 Bạn bè EnglishBot
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kết nối với bạn bè, thách đấu và cùng nhau học tiếng Anh
          </p>
        </div>

        <Tabs defaultValue="friends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
            <TabsTrigger
              value="friends"
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Bạn bè ({friends.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Lời mời ({friendRequests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Tìm kiếm</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Friends List */}
          <TabsContent value="friends">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Danh sách bạn bè</span>
                  <Badge variant="secondary">{friends.length} người</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {friends.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      Chưa có bạn bè
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Hãy tìm kiếm và kết bạn với người khác!
                    </p>
                    <Button onClick={() => setSearchQuery("")}>
                      <Search className="h-4 w-4 mr-2" />
                      Tìm bạn bè
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {friends.map((friend) => (
                      <Card
                        key={friend.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-6">
                          {/* Avatar and Status */}
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                {friend.avatar}
                              </div>
                              <div
                                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                  friend.isOnline
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {friend.name}
                              </h3>
                              <p className="text-sm text-gray-500 truncate">
                                @{friend.username}
                              </p>
                              <p className="text-xs text-gray-400">
                                {friend.isOnline ? (
                                  <span className="text-green-600">
                                    🟢 Online
                                  </span>
                                ) : (
                                  <span>🔴 {friend.lastSeen}</span>
                                )}
                              </p>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                            <div className="bg-yellow-50 p-2 rounded text-center">
                              <Trophy className="h-3 w-3 text-yellow-500 mx-auto mb-1" />
                              <div className="font-medium">
                                #{friend.stats.rank}
                              </div>
                            </div>
                            <div className="bg-green-50 p-2 rounded text-center">
                              <Star className="h-3 w-3 text-green-500 mx-auto mb-1" />
                              <div className="font-medium">
                                {friend.stats.totalCorrect}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleChallengeFriend(friend)}
                              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                              size="sm"
                            >
                              <Zap className="h-4 w-4 mr-1" />
                              Thử thách
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="px-3"
                            >
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Friend Requests */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5 text-green-600" />
                  <span>Lời mời kết bạn</span>
                  <Badge variant="secondary">
                    {friendRequests.length} lời mời
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {friendRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <UserPlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      Không có lời mời nào
                    </h3>
                    <p className="text-gray-500">
                      Bạn sẽ thấy các lời mời kết bạn ở đây
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {friendRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                            {request.avatar}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {request.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              @{request.username}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-400">
                              <span>📅 {request.sentAt}</span>
                              {request.mutualFriends > 0 && (
                                <span>
                                  👥 {request.mutualFriends} bạn chung
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleAcceptFriendRequest(request)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Chấp nhận
                          </Button>
                          <Button
                            onClick={() =>
                              handleDeclineFriendRequest(request.id)
                            }
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Từ chối
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Search & Add Friends */}
          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-purple-600" />
                  <span>Tìm kiếm & Kết bạn</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search Form */}
                <div className="flex space-x-3">
                  <Input
                    placeholder="Tìm theo tên, username hoặc email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={!searchQuery.trim() || isSearching}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">
                      Kết quả tìm kiếm ({searchResults.length})
                    </h3>
                    <div className="space-y-3">
                      {searchResults.map((person) => (
                        <div
                          key={person.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                {person.avatar}
                              </div>
                              <div
                                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                  person.isOnline
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {person.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                @{person.username}
                              </p>
                              <div className="flex items-center space-x-3 text-xs text-gray-400">
                                <span>🏆 Hạng #{person.stats.rank}</span>
                                <span>✅ {person.stats.totalCorrect} đúng</span>
                                <span>
                                  🔥 {person.stats.accuracy}% chính xác
                                </span>
                              </div>
                            </div>
                          </div>

                          <Button
                            onClick={() => handleSendFriendRequest(person)}
                            className="bg-blue-600 hover:bg-blue-700"
                            size="sm"
                          >
                            <UserPlus className="h-4 w-4 mr-1" />
                            Kết bạn
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Suggestions */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">
                    💡 Gợi ý kết bạn
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                      <div className="flex items-center space-x-3 mb-3">
                        <Crown className="h-8 w-8 text-yellow-500" />
                        <div>
                          <h4 className="font-medium">
                            Kết bạn với Top Players
                          </h4>
                          <p className="text-sm text-gray-600">
                            Học hỏi từ những người giỏi nhất
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        Xem danh sách
                      </Button>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                      <div className="flex items-center space-x-3 mb-3">
                        <Mail className="h-8 w-8 text-green-500" />
                        <div>
                          <h4 className="font-medium">Mời qua Email</h4>
                          <p className="text-sm text-gray-600">
                            Mời bạn bè tham gia EnglishBot
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        Gửi lời mời
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Challenge Modal */}
        <FriendChallengeModal
          isOpen={showChallengeModal}
          onClose={() => {
            setShowChallengeModal(false);
            setSelectedFriend(null);
          }}
          friend={selectedFriend}
          onSendChallenge={handleSendChallenge}
        />
      </div>
    </div>
  );
}
