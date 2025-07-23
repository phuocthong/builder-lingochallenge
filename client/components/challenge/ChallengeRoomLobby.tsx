import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Users, Plus, Search, Trophy, Clock, Zap, Crown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ChallengeRoom } from "../../pages/ChallengeRoom";

interface ChallengeRoomLobbyProps {
  onRoomCreated: (room: ChallengeRoom) => void;
  onRoomJoined: (room: ChallengeRoom) => void;
}

// Mock existing rooms
const mockRooms: ChallengeRoom[] = [
  {
    id: "room-1",
    name: "🏆 Cuộc thi từ vựng cơ bản",
    hostId: "host1",
    hostName: "Minh Anh",
    participants: [
      { id: "host1", name: "Minh Anh", avatar: "MA", isHost: true },
      { id: "user2", name: "Thu Trang", avatar: "TT", isHost: false },
      { id: "user3", name: "Văn Nam", avatar: "VN", isHost: false },
    ],
    maxParticipants: 6,
    totalQuestions: 15,
    currentQuestion: 0,
    state: 'waiting',
    timePerQuestion: 30,
  },
  {
    id: "room-2", 
    name: "⚡ Thử thách nhanh 10 câu",
    hostId: "host2",
    hostName: "Thành Hòa",
    participants: [
      { id: "host2", name: "Thành Hòa", avatar: "TH", isHost: true },
      { id: "user4", name: "Lan Anh", avatar: "LA", isHost: false },
    ],
    maxParticipants: 4,
    totalQuestions: 10,
    currentQuestion: 0,
    state: 'waiting',
    timePerQuestion: 20,
  },
  {
    id: "room-3",
    name: "🎯 Thách đấu chuyên nghiệp",
    hostId: "host3", 
    hostName: "Hoàng Nam",
    participants: [
      { id: "host3", name: "Hoàng Nam", avatar: "HN", isHost: true },
    ],
    maxParticipants: 8,
    totalQuestions: 25,
    currentQuestion: 0,
    state: 'waiting',
    timePerQuestion: 45,
  }
];

export function ChallengeRoomLobby({ onRoomCreated, onRoomJoined }: ChallengeRoomLobbyProps) {
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(6);
  const [totalQuestions, setTotalQuestions] = useState(15);
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRooms = mockRooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.hostName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateRoom = () => {
    if (!roomName.trim()) return;

    const newRoom: ChallengeRoom = {
      id: `room-${Date.now()}`,
      name: roomName.trim(),
      hostId: user.id,
      hostName: user.name,
      participants: [
        { id: user.id, name: user.name, avatar: user.avatar, isHost: true }
      ],
      maxParticipants,
      totalQuestions,
      currentQuestion: 0,
      state: 'waiting',
      timePerQuestion,
    };

    onRoomCreated(newRoom);
  };

  const handleJoinRoom = (room: ChallengeRoom) => {
    if (room.participants.length >= room.maxParticipants) return;
    
    const updatedRoom: ChallengeRoom = {
      ...room,
      participants: [
        ...room.participants,
        { id: user.id, name: user.name, avatar: user.avatar, isHost: false }
      ]
    };

    onRoomJoined(updatedRoom);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          ⚡ Phòng Thử thách EnglishBot
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2">
          Tham gia hoặc tạo phòng để thử thách kiến thức tiếng Anh với bạn bè và người chơi khác
        </p>
      </div>

      <div className="flex flex-col space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
        {/* Create Room Panel */}
        <div className="order-1 lg:col-span-1">
          <Card className="h-fit">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                <span>Tạo phòng mới</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Tạo phòng thử thách riêng với các cài đặt tùy chỉnh
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {!showCreateForm ? (
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-base"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Tạo phòng thử thách
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Tên phòng
                    </label>
                    <Input
                      placeholder="Ví dụ: Thử thách từ vựng cơ bản"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      className="h-11 text-base"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Số người tối đa: {maxParticipants}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[4, 6, 8, 10].map(num => (
                        <Button
                          key={num}
                          variant={maxParticipants === num ? "default" : "outline"}
                          size="sm"
                          onClick={() => setMaxParticipants(num)}
                          className="h-10 text-sm font-medium"
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Số câu hỏi: {totalQuestions}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[10, 15, 20, 25].map(num => (
                        <Button
                          key={num}
                          variant={totalQuestions === num ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTotalQuestions(num)}
                          className="h-10 text-sm font-medium"
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Thời gian/câu: {timePerQuestion}s
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[20, 30, 45, 60].map(time => (
                        <Button
                          key={time}
                          variant={timePerQuestion === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTimePerQuestion(time)}
                          className="h-10 text-sm font-medium"
                        >
                          {time}s
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={handleCreateRoom}
                      disabled={!roomName.trim()}
                      className="bg-green-600 hover:bg-green-700 h-11 text-base font-medium"
                    >
                      Tạo phòng
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowCreateForm(false)}
                      className="h-11 text-base font-medium"
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Available Rooms */}
        <div className="order-2 lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl mb-3">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                <span>Phòng có sẵn ({filteredRooms.length})</span>
              </CardTitle>
              <div className="w-full">
                <Input
                  placeholder="Tìm kiếm phòng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11 text-base"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {filteredRooms.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <Trophy className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-500 text-sm sm:text-base">Không có phòng nào phù hợp</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {filteredRooms.map((room) => (
                    <div
                      key={room.id}
                      className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-purple-300 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                          <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                            <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                            <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{room.hostName}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            Chủ phòng
                          </Badge>
                        </div>
                        <Badge
                          variant={room.state === 'waiting' ? 'default' : 'destructive'}
                          className="text-xs flex-shrink-0"
                        >
                          {room.state === 'waiting' ? '🟢 Chờ' : '🔴 Đang thi'}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2 leading-tight">
                        {room.name}
                      </h3>

                      <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{room.participants.length}/{room.maxParticipants}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{room.totalQuestions} câu</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{room.timePerQuestion}s/câu</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2 flex-1 min-w-0 mr-3">
                          {room.participants.slice(0, 4).map((participant) => (
                            <div
                              key={participant.id}
                              className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0"
                              title={participant.name}
                            >
                              <span className="text-white text-xs font-medium">
                                {participant.avatar}
                              </span>
                            </div>
                          ))}
                          {room.participants.length > 4 && (
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs">
                                +{room.participants.length - 4}
                              </span>
                            </div>
                          )}
                        </div>

                        <Button
                          onClick={() => handleJoinRoom(room)}
                          disabled={
                            room.participants.length >= room.maxParticipants ||
                            room.participants.some(p => p.id === user.id) ||
                            room.state !== 'waiting'
                          }
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 h-9 text-sm font-medium flex-shrink-0"
                          size="sm"
                        >
                          {room.participants.some(p => p.id === user.id)
                            ? "Đã tham gia"
                            : room.participants.length >= room.maxParticipants
                            ? "Đầy"
                            : "Tham gia"
                          }
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
