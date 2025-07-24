import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import {
  Zap,
  Trophy,
  Clock,
  Target,
  Users,
  Crown,
  Star,
  Flame,
} from "lucide-react";

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  stats: {
    rank: number;
    totalCorrect: number;
    streak: number;
    accuracy: number;
  };
}

interface FriendChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  friend: Friend | null;
  onSendChallenge: (friend: Friend, settings: ChallengeSettings) => void;
}

interface ChallengeSettings {
  questionCount: number;
  timePerQuestion: number;
  challengeType: "quick" | "standard" | "marathon";
}

const challengeTypes = {
  quick: {
    name: "⚡ Thách đấu nhanh",
    description: "5 câu hỏi, 15 giây mỗi câu",
    questionCount: 5,
    timePerQuestion: 15,
    icon: "⚡",
    color: "from-yellow-500 to-orange-500",
  },
  standard: {
    name: "🎯 Thách đấu chuẩn",
    description: "10 câu hỏi, 30 giây mỗi câu",
    questionCount: 10,
    timePerQuestion: 30,
    icon: "🎯",
    color: "from-blue-500 to-purple-500",
  },
  marathon: {
    name: "🏃 Thách đấu marathon",
    description: "20 câu hỏi, 25 giây mỗi câu",
    questionCount: 20,
    timePerQuestion: 25,
    icon: "🏃",
    color: "from-green-500 to-blue-500",
  },
};

export function FriendChallengeModal({
  isOpen,
  onClose,
  friend,
  onSendChallenge,
}: FriendChallengeModalProps) {
  const [selectedType, setSelectedType] = useState<
    "quick" | "standard" | "marathon"
  >("standard");

  if (!friend) return null;

  const handleSendChallenge = () => {
    const settings: ChallengeSettings = {
      questionCount: challengeTypes[selectedType].questionCount,
      timePerQuestion: challengeTypes[selectedType].timePerQuestion,
      challengeType: selectedType,
    };

    onSendChallenge(friend, settings);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <span>Thách đấu với {friend.name}</span>
          </DialogTitle>
          <DialogDescription>
            Chọn loại thách đấu bạn muốn gửi đến {friend.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Friend Info */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                {friend.avatar}
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  friend.isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{friend.name}</h3>
              <p className="text-sm text-gray-500">@{friend.username}</p>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1 text-xs text-gray-600">
                  <Trophy className="h-3 w-3 text-yellow-500" />
                  <span>#{friend.stats.rank}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-600">
                  <Star className="h-3 w-3 text-green-500" />
                  <span>{friend.stats.totalCorrect}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-600">
                  <Flame className="h-3 w-3 text-orange-500" />
                  <span>{friend.stats.accuracy}%</span>
                </div>
              </div>
            </div>
            <Badge variant={friend.isOnline ? "default" : "secondary"}>
              {friend.isOnline ? "Online" : "Offline"}
            </Badge>
          </div>

          {/* Challenge Type Selection */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Chọn loại thách đấu:</h4>
            {Object.entries(challengeTypes).map(([type, config]) => (
              <div
                key={type}
                onClick={() => setSelectedType(type as any)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedType === type
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center text-white text-xl`}
                    >
                      {config.icon}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">
                        {config.name}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {config.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Target className="h-3 w-3" />
                      <span>{config.questionCount} câu</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{config.timePerQuestion}s/câu</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Challenge Preview */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="font-medium text-blue-900 mb-2">
              📋 Tóm tắt thách đấu:
            </h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-700">
                  {challengeTypes[selectedType].questionCount}
                </div>
                <div className="text-xs text-blue-600">Câu hỏi</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-700">
                  {challengeTypes[selectedType].timePerQuestion}s
                </div>
                <div className="text-xs text-blue-600">Mỗi câu</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-700">
                  ~
                  {Math.ceil(
                    (challengeTypes[selectedType].questionCount *
                      challengeTypes[selectedType].timePerQuestion) /
                      60,
                  )}
                </div>
                <div className="text-xs text-blue-600">Phút</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Hủy bỏ
            </Button>
            <Button
              onClick={handleSendChallenge}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Zap className="h-4 w-4 mr-2" />
              Gửi thách đấu
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
