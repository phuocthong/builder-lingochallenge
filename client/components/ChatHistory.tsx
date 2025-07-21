import { Clock, Users, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ChatHistoryItem {
  id: number;
  question: string;
  correctAnswer: string;
  timestamp: string;
  date: string;
  correctUsers: Array<{
    id: string;
    name: string;
    answeredAt: string;
    rank: number;
  }>;
  totalCorrect: number;
  totalAnswered: number;
}

const chatHistory: ChatHistoryItem[] = [
  {
    id: 1,
    question: 'Dịch từ "Beautiful" sang tiếng Việt',
    correctAnswer: "đẹp",
    timestamp: "10:30",
    date: "26/07/2024",
    correctUsers: [
      { id: "1", name: "Minh Anh", answeredAt: "10:31", rank: 1 },
      { id: "2", name: "Thành Hòa", answeredAt: "10:31", rank: 2 },
      { id: "3", name: "Văn Nam", answeredAt: "10:32", rank: 3 },
      { id: "4", name: "Thu Trang", answeredAt: "10:32", rank: 4 },
      { id: "5", name: "Đức Minh", answeredAt: "10:33", rank: 5 },
      { id: "6", name: "Lan Anh", answeredAt: "10:33", rank: 6 },
      { id: "7", name: "Hoàng Nam", answeredAt: "10:34", rank: 7 },
      { id: "8", name: "Mai Linh", answeredAt: "10:34", rank: 8 },
    ],
    totalCorrect: 15,
    totalAnswered: 23,
  },
  {
    id: 2,
    question: 'Dịch từ "Happy" sang tiếng Việt',
    correctAnswer: "hạnh phúc",
    timestamp: "10:25",
    date: "26/07/2024",
    correctUsers: [
      { id: "2", name: "Thành Hòa", answeredAt: "10:26", rank: 1 },
      { id: "1", name: "Minh Anh", answeredAt: "10:26", rank: 2 },
      { id: "4", name: "Thu Trang", answeredAt: "10:27", rank: 3 },
      { id: "5", name: "Đức Minh", answeredAt: "10:27", rank: 4 },
      { id: "3", name: "Văn Nam", answeredAt: "10:28", rank: 5 },
    ],
    totalCorrect: 12,
    totalAnswered: 18,
  },
  {
    id: 3,
    question: 'Dịch từ "Wonderful" sang tiếng Việt',
    correctAnswer: "tuyệt vời",
    timestamp: "10:20",
    date: "26/07/2024",
    correctUsers: [
      { id: "1", name: "Minh Anh", answeredAt: "10:21", rank: 1 },
      { id: "3", name: "Văn Nam", answeredAt: "10:21", rank: 2 },
      { id: "2", name: "Thành Hòa", answeredAt: "10:22", rank: 3 },
      { id: "6", name: "Lan Anh", answeredAt: "10:22", rank: 4 },
      { id: "7", name: "Hoàng Nam", answeredAt: "10:23", rank: 5 },
    ],
    totalCorrect: 18,
    totalAnswered: 25,
  },
  {
    id: 4,
    question: 'Dịch từ "Intelligent" sang tiếng Việt',
    correctAnswer: "thông minh",
    timestamp: "10:15",
    date: "26/07/2024",
    correctUsers: [
      { id: "2", name: "Thành Hòa", answeredAt: "10:16", rank: 1 },
      { id: "4", name: "Thu Trang", answeredAt: "10:16", rank: 2 },
      { id: "1", name: "Minh Anh", answeredAt: "10:17", rank: 3 },
      { id: "5", name: "Đức Minh", answeredAt: "10:17", rank: 4 },
    ],
    totalCorrect: 9,
    totalAnswered: 16,
  },
  {
    id: 5,
    question: 'Dịch từ "Friendly" sang tiếng Việt',
    correctAnswer: "thân thiện",
    timestamp: "10:10",
    date: "26/07/2024",
    correctUsers: [
      { id: "3", name: "Văn Nam", answeredAt: "10:11", rank: 1 },
      { id: "1", name: "Minh Anh", answeredAt: "10:11", rank: 2 },
      { id: "2", name: "Thành Hòa", answeredAt: "10:12", rank: 3 },
      { id: "6", name: "Lan Anh", answeredAt: "10:12", rank: 4 },
      { id: "7", name: "Hoàng Nam", answeredAt: "10:13", rank: 5 },
      { id: "8", name: "Mai Linh", answeredAt: "10:13", rank: 6 },
    ],
    totalCorrect: 14,
    totalAnswered: 22,
  }
];

export function ChatHistory() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleExpanded = (itemId: number) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
      {/* Header - Mobile Optimized */}
      <div className="p-3 sm:p-4 border-b bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          <h3 className="font-semibold text-white text-sm sm:text-base">📚 Lịch sử câu hỏi</h3>
        </div>
        <p className="text-xs text-purple-100 mt-1">20 câu hỏi gần nhất</p>
      </div>

      {/* History Items - Mobile Optimized */}
      <div className="flex-1 p-3 sm:p-4 space-y-2 sm:space-y-3 overflow-y-auto">
        {chatHistory.map((item) => (
          <div
            key={item.id}
            className="p-3 sm:p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border border-blue-100 shadow-sm"
          >
            <div 
              className="cursor-pointer"
              onClick={() => toggleExpanded(item.id)}
            >
              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-2 leading-tight">
                📝 {item.question}
              </h4>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
                <div className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full inline-block">
                  ✅ "{item.correctAnswer}"
                </div>
                <div className="text-xs text-gray-500">
                  🕐 {item.timestamp} - {item.date}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs">
                  <Users className="h-3 w-3 mr-1 text-gray-400" />
                  <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">
                    {item.totalCorrect} đúng
                  </span>
                  <span className="mx-1 text-gray-400">/</span>
                  <span className="text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                    {item.totalAnswered} trả lời
                  </span>
                </div>
                <div className="flex items-center text-xs text-blue-600 font-medium">
                  {expandedItem === item.id ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Thu gọn</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Chi tiết</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Expanded User List - Mobile Optimized */}
            {expandedItem === item.id && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <div className="flex items-center mb-2">
                  <Trophy className="h-3 w-3 text-yellow-500 mr-1" />
                  <span className="text-xs font-medium text-gray-700">
                    🏆 Top {Math.min(item.correctUsers.length, 50)} trả lời đúng
                  </span>
                </div>
                <div className="space-y-1.5 max-h-24 sm:max-h-32 overflow-y-auto">
                  {item.correctUsers.slice(0, 50).map((user) => (
                    <div 
                      key={user.id}
                      className="flex items-center justify-between bg-white rounded-lg px-2 sm:px-3 py-1.5 text-xs shadow-sm"
                    >
                      <div className="flex items-center">
                        <span className="w-5 sm:w-6 text-center font-bold text-yellow-600 bg-yellow-100 rounded px-1">
                          #{user.rank}
                        </span>
                        <span className="ml-2 font-medium text-gray-900 truncate">
                          {user.name}
                        </span>
                      </div>
                      <span className="text-gray-500 text-xs">🕐 {user.answeredAt}</span>
                    </div>
                  ))}
                  {item.correctUsers.length > 50 && (
                    <div className="text-xs text-gray-500 text-center py-1 bg-gray-50 rounded">
                      ... và {item.correctUsers.length - 50} người khác
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
