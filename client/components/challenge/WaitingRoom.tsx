import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Users, 
  Crown, 
  Trophy, 
  Clock, 
  Play, 
  LogOut, 
  UserCheck, 
  UserX,
  Zap,
  Settings
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ChallengeRoom } from "../../pages/ChallengeRoom";

interface WaitingRoomProps {
  room: ChallengeRoom;
  onStartChallenge: () => void;
  onLeaveRoom: () => void;
  onRoomUpdate: (room: ChallengeRoom) => void;
}

export function WaitingRoom({ 
  room, 
  onStartChallenge, 
  onLeaveRoom, 
  onRoomUpdate 
}: WaitingRoomProps) {
  const { user } = useAuth();
  const [readyUsers, setReadyUsers] = useState<Set<string>>(new Set());
  const [countdown, setCountdown] = useState<number | null>(null);
  
  const isHost = room.participants.find(p => p.id === user.id)?.isHost || false;
  const allReady = room.participants.length >= 2 && 
    room.participants.every(p => p.isHost || readyUsers.has(p.id));

  // Simulate other users getting ready
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const notReadyUsers = room.participants.filter(p => 
          !p.isHost && !readyUsers.has(p.id)
        );
        if (notReadyUsers.length > 0) {
          const randomUser = notReadyUsers[Math.floor(Math.random() * notReadyUsers.length)];
          setReadyUsers(prev => new Set([...prev, randomUser.id]));
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [room.participants, readyUsers]);

  // Countdown before starting
  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown === 0) {
      onStartChallenge();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onStartChallenge]);

  const toggleReady = () => {
    if (readyUsers.has(user.id)) {
      setReadyUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(user.id);
        return newSet;
      });
    } else {
      setReadyUsers(prev => new Set([...prev, user.id]));
    }
  };

  const startChallenge = () => {
    setCountdown(5);
  };

  const handleLeaveRoom = () => {
    if (window.confirm('Bạn có chắc muốn rời khỏi phòng?')) {
      onLeaveRoom();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🏠 Phòng chờ
        </h1>
        <h2 className="text-xl text-gray-700 mb-4">{room.name}</h2>
        <div className="flex justify-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Trophy className="h-4 w-4" />
            <span>{room.totalQuestions} câu hỏi</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{room.timePerQuestion}s mỗi câu</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>Tối đa {room.maxParticipants} người</span>
          </div>
        </div>
      </div>

      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <Zap className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Bắt đầu trong...
            </h3>
            <div className="text-6xl font-bold text-purple-600 mb-4">
              {countdown}
            </div>
            <p className="text-gray-600">Chuẩn bị tinh thần!</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Participants List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Người tham gia ({room.participants.length}/{room.maxParticipants})</span>
                </div>
                <Badge variant={allReady ? "default" : "secondary"}>
                  {allReady ? "🟢 Sẵn sàng" : "🟡 Chờ"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.participants.map((participant) => {
                  const isReady = participant.isHost || readyUsers.has(participant.id);
                  const isCurrentUser = participant.id === user.id;
                  
                  return (
                    <div
                      key={participant.id}
                      className={`border rounded-lg p-4 transition-all ${
                        isReady 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-200 bg-white'
                      } ${isCurrentUser ? 'ring-2 ring-purple-500' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {participant.avatar}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900">
                              {participant.name}
                            </h3>
                            {participant.isHost && (
                              <Crown className="h-4 w-4 text-yellow-500" />
                            )}
                            {isCurrentUser && (
                              <Badge variant="outline" className="text-xs">
                                Bạn
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {participant.isHost ? (
                              <Badge variant="default" className="text-xs">
                                <Crown className="h-3 w-3 mr-1" />
                                Chủ phòng
                              </Badge>
                            ) : isReady ? (
                              <Badge variant="default" className="text-xs bg-green-600">
                                <UserCheck className="h-3 w-3 mr-1" />
                                Sẵn sàng
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                <UserX className="h-3 w-3 mr-1" />
                                Chưa sẵn sàng
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Room Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Thông tin phòng</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng số câu:</span>
                  <span className="font-medium">{room.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian/câu:</span>
                  <span className="font-medium">{room.timePerQuestion}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Người chơi:</span>
                  <span className="font-medium">{room.participants.length}/{room.maxParticipants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chủ phòng:</span>
                  <span className="font-medium">{room.hostName}</span>
                </div>
              </CardContent>
            </Card>

            {/* Ready Status */}
            {!isHost && (
              <Card>
                <CardHeader>
                  <CardTitle>Trạng thái của bạn</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={toggleReady}
                    className={`w-full ${
                      readyUsers.has(user.id)
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    size="lg"
                  >
                    {readyUsers.has(user.id) ? (
                      <>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Đã sẵn sàng
                      </>
                    ) : (
                      <>
                        <UserX className="h-4 w-4 mr-2" />
                        Chưa sẵn sàng
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Host Controls */}
            {isHost && (
              <Card>
                <CardHeader>
                  <CardTitle>Điều khiển chủ phòng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={startChallenge}
                    disabled={room.participants.length < 2 || !allReady}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Bắt đầu thử thách
                  </Button>
                  
                  {room.participants.length < 2 && (
                    <p className="text-sm text-gray-500 text-center">
                      Cần ít nhất 2 người để bắt đầu
                    </p>
                  )}
                  
                  {room.participants.length >= 2 && !allReady && (
                    <p className="text-sm text-gray-500 text-center">
                      Đợi tất cả người chơi sẵn sàng
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Leave Room */}
            <Card>
              <CardContent className="pt-6">
                <Button
                  onClick={handleLeaveRoom}
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Rời khỏi phòng
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
