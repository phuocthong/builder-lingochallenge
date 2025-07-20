import { Trophy, TrendingUp } from "lucide-react";

interface LeaderboardUser {
  id: number;
  name: string;
  score: number;
  unit: string;
  avatar: string;
  rank: number;
}

const leaderboardData: LeaderboardUser[] = [
  {
    id: 1,
    name: "Minh Anh",
    score: 245,
    unit: "câu đúng",
    avatar: "MA",
    rank: 1,
  },
  {
    id: 2,
    name: "Thành Hòa",
    score: 195,
    unit: "câu đúng",
    avatar: "TH",
    rank: 2,
  },
  {
    id: 3,
    name: "Văn Nam",
    score: 157,
    unit: "câu đúng",
    avatar: "VN",
    rank: 3,
  },
  {
    id: 4,
    name: "Thu Trang",
    score: 134,
    unit: "câu đúng",
    avatar: "TT",
    rank: 4,
  },
];

const months = ["Tổng", "Tuần", "Tháng", "Năm"];

export function Leaderboard() {
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
          {months.map((month, index) => (
            <button
              key={month}
              className={`px-3 py-1.5 text-xs rounded-md ${
                index === 0
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="p-4 space-y-2">
        {leaderboardData.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-gray-700">
                {user.rank}
              </div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                  user.rank === 1
                    ? "bg-blue-500"
                    : user.rank === 2
                      ? "bg-blue-500"
                      : user.rank === 3
                        ? "bg-blue-500"
                        : "bg-blue-500"
                }`}
              >
                {user.avatar}
              </div>
              <span className="font-medium text-gray-900 text-sm">
                {user.name}
              </span>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900 text-lg">
                {user.score}
              </div>
              <div className="text-xs text-gray-500">{user.unit}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
