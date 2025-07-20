import { Trophy, TrendingUp, Medal, Crown, Star } from "lucide-react";
import { useState } from "react";

interface LeaderboardUser {
  id: string;
  name: string;
  score: number;
  unit: string;
  avatar: string;
  rank: number;
  streak?: number;
  accuracy?: number;
}

interface LeaderboardPeriod {
  id: string;
  name: string;
  users: LeaderboardUser[];
  currentUserRank?: {
    rank: number;
    score: number;
    outOfTotal: number;
  };
}

const leaderboardData: Record<string, LeaderboardPeriod> = {
  total: {
    id: "total",
    name: "Tổng",
    users: [
      { id: "1", name: "Minh Anh", score: 2456, unit: "câu đúng", avatar: "MA", rank: 1, streak: 15, accuracy: 89 },
      { id: "2", name: "Thành Hòa", score: 2195, unit: "câu đúng", avatar: "TH", rank: 2, streak: 23, accuracy: 92 },
      { id: "3", name: "Văn Nam", score: 1957, unit: "câu đúng", avatar: "VN", rank: 3, streak: 12, accuracy: 87 },
      { id: "4", name: "Thu Trang", score: 1834, unit: "câu đúng", avatar: "TT", rank: 4, streak: 8, accuracy: 94 },
      { id: "5", name: "Đức Minh", score: 1672, unit: "câu đúng", avatar: "DM", rank: 5, streak: 5, accuracy: 86 },
      { id: "6", name: "Lan Anh", score: 1589, unit: "câu đúng", avatar: "LA", rank: 6, streak: 18, accuracy: 91 },
      { id: "7", name: "Hoàng Nam", score: 1456, unit: "câu đúng", avatar: "HN", rank: 7, streak: 7, accuracy: 88 },
      { id: "8", name: "Mai Linh", score: 1334, unit: "câu đúng", avatar: "ML", rank: 8, streak: 11, accuracy: 90 },
      { id: "9", name: "Quốc Duy", score: 1289, unit: "câu đúng", avatar: "QD", rank: 9, streak: 4, accuracy: 85 },
      { id: "10", name: "Bảo Trân", score: 1156, unit: "câu đúng", avatar: "BT", rank: 10, streak: 9, accuracy: 93 },
    ],
    currentUserRank: { rank: 45, score: 523, outOfTotal: 1250 }
  },
  week: {
    id: "week",
    name: "Tuần",
    users: [
      { id: "2", name: "Thành Hòa", score: 156, unit: "câu đúng", avatar: "TH", rank: 1, streak: 7, accuracy: 94 },
      { id: "1", name: "Minh Anh", score: 142, unit: "câu đúng", avatar: "MA", rank: 2, streak: 6, accuracy: 91 },
      { id: "4", name: "Thu Trang", score: 138, unit: "câu đúng", avatar: "TT", rank: 3, streak: 5, accuracy: 96 },
      { id: "6", name: "Lan Anh", score: 129, unit: "câu đúng", avatar: "LA", rank: 4, streak: 8, accuracy: 89 },
      { id: "3", name: "Văn Nam", score: 124, unit: "câu đúng", avatar: "VN", rank: 5, streak: 4, accuracy: 87 },
      { id: "8", name: "Mai Linh", score: 118, unit: "câu đúng", avatar: "ML", rank: 6, streak: 6, accuracy: 92 },
      { id: "5", name: "Đức Minh", score: 112, unit: "câu đúng", avatar: "DM", rank: 7, streak: 3, accuracy: 84 },
      { id: "7", name: "Hoàng Nam", score: 106, unit: "câu đúng", avatar: "HN", rank: 8, streak: 5, accuracy: 88 },
      { id: "9", name: "Quốc Duy", score: 98, unit: "câu đúng", avatar: "QD", rank: 9, streak: 2, accuracy: 83 },
      { id: "10", name: "Bảo Trân", score: 94, unit: "câu đúng", avatar: "BT", rank: 10, streak: 4, accuracy: 95 },
    ],
    currentUserRank: { rank: 12, score: 78, outOfTotal: 340 }
  },
  month: {
    id: "month",
    name: "Tháng",
    users: [
      { id: "1", name: "Minh Anh", score: 634, unit: "câu đúng", avatar: "MA", rank: 1, streak: 12, accuracy: 90 },
      { id: "4", name: "Thu Trang", score: 598, unit: "câu đúng", avatar: "TT", rank: 2, streak: 8, accuracy: 95 },
      { id: "2", name: "Thành Hòa", score: 567, unit: "câu đúng", avatar: "TH", rank: 3, streak: 15, accuracy: 93 },
      { id: "6", name: "Lan Anh", score: 523, unit: "câu đúng", avatar: "LA", rank: 4, streak: 10, accuracy: 91 },
      { id: "3", name: "Văn Nam", score: 489, unit: "câu đúng", avatar: "VN", rank: 5, streak: 6, accuracy: 88 },
      { id: "8", name: "Mai Linh", score: 445, unit: "câu đúng", avatar: "ML", rank: 6, streak: 9, accuracy: 92 },
      { id: "5", name: "Đức Minh", score: 423, unit: "câu đúng", avatar: "DM", rank: 7, streak: 4, accuracy: 86 },
      { id: "7", name: "Hoàng Nam", score: 398, unit: "câu đúng", avatar: "HN", rank: 8, streak: 7, accuracy: 89 },
      { id: "9", name: "Quốc Duy", score: 367, unit: "câu đúng", avatar: "QD", rank: 9, streak: 3, accuracy: 84 },
      { id: "10", name: "Bảo Trân", score: 334, unit: "câu đúng", avatar: "BT", rank: 10, streak: 5, accuracy: 94 },
    ],
    currentUserRank: { rank: 23, score: 189, outOfTotal: 580 }
  },
  year: {
    id: "year",
    name: "Năm",
    users: [
      { id: "1", name: "Minh Anh", score: 2456, unit: "câu đúng", avatar: "MA", rank: 1, streak: 15, accuracy: 89 },
      { id: "2", name: "Thành Hòa", score: 2195, unit: "câu đúng", avatar: "TH", rank: 2, streak: 23, accuracy: 92 },
      { id: "3", name: "Văn Nam", score: 1957, unit: "câu đúng", avatar: "VN", rank: 3, streak: 12, accuracy: 87 },
      { id: "4", name: "Thu Trang", score: 1834, unit: "câu đúng", avatar: "TT", rank: 4, streak: 8, accuracy: 94 },
      { id: "5", name: "Đức Minh", score: 1672, unit: "câu đúng", avatar: "DM", rank: 5, streak: 5, accuracy: 86 },
      { id: "6", name: "Lan Anh", score: 1589, unit: "câu đúng", avatar: "LA", rank: 6, streak: 18, accuracy: 91 },
      { id: "7", name: "Hoàng Nam", score: 1456, unit: "câu đúng", avatar: "HN", rank: 7, streak: 7, accuracy: 88 },
      { id: "8", name: "Mai Linh", score: 1334, unit: "câu đúng", avatar: "ML", rank: 8, streak: 11, accuracy: 90 },
      { id: "9", name: "Quốc Duy", score: 1289, unit: "câu đúng", avatar: "QD", rank: 9, streak: 4, accuracy: 85 },
      { id: "10", name: "Bảo Trân", score: 1156, unit: "câu đúng", avatar: "BT", rank: 10, streak: 9, accuracy: 93 },
    ],
    currentUserRank: { rank: 45, score: 523, outOfTotal: 1250 }
  }
};

const periods = ["total", "week", "month", "year"];

export function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("total");
  const currentData = leaderboardData[selectedPeriod];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />;
      case 3:
        return <Medal className="h-4 w-4 text-amber-600" />;
      default:
        return <Star className="h-3 w-3 text-gray-400" />;
    }
  };

  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-500";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400";
      case 3:
        return "bg-gradient-to-r from-amber-500 to-amber-600";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold text-gray-900">Bảng xếp hạng</h3>
          </div>
          <TrendingUp className="h-4 w-4 text-gray-400" />
        </div>

        {/* Time filters */}
        <div className="flex space-x-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                selectedPeriod === period
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {leaderboardData[period].name}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
        {currentData.users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8">
                {getRankIcon(user.rank)}
              </div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-medium ${getRankBgColor(user.rank)}`}
              >
                {user.avatar}
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  {user.name}
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>Streak: {user.streak}</span>
                  <span>•</span>
                  <span>Độ chính xác: {user.accuracy}%</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900 text-lg">
                {user.score.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">{user.unit}</div>
            </div>
          </div>
        ))}
      </div>

      {/* User Rank Display */}
      {currentData.currentUserRank && (
        <div className="px-4 pb-4">
          <div className="border-t pt-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-medium">ND</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      Hạng của bạn: #{currentData.currentUserRank.rank}
                    </div>
                    <div className="text-xs text-gray-600">
                      {currentData.currentUserRank.score} câu đúng • 
                      Top {Math.round((currentData.currentUserRank.rank / currentData.currentUserRank.outOfTotal) * 100)}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    {currentData.currentUserRank.score.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    / {currentData.currentUserRank.outOfTotal.toLocaleString()} người chơi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
