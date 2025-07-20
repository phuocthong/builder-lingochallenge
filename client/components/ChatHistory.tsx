import { Clock, Users, Trophy } from "lucide-react";
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
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Lịch sử câu hỏi</h3>
        </div>
        <p className="text-xs text-gray-500 mt-1">20 câu hỏi gần nhất</p>
      </div>

      {/* History Items */}
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {chatHistory.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100"
          >
            <div 
              className="cursor-pointer"
              onClick={() => toggleExpanded(item.id)}
            >
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {item.question}
              </h4>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-green-600 font-medium">
                  Đáp án: "{item.correctAnswer}"
                </div>
                <div className="text-xs text-gray-500">
                  {item.timestamp} - {item.date}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-600">
                  <Users className="h-3 w-3 mr-1" />
                  <span className="text-green-600 font-medium">{item.totalCorrect} đúng</span>
                  <span className="mx-1">/</span>
                  <span>{item.totalAnswered} trả lời</span>
                </div>
                <div className="text-xs text-blue-600">
                  {expandedItem === item.id ? '▲ Thu gọn' : '▼ Xem chi tiết'}
                </div>
              </div>
            </div>

            {/* Expanded User List */}
            {expandedItem === item.id && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <div className="flex items-center mb-2">
                  <Trophy className="h-3 w-3 text-yellow-500 mr-1" />
                  <span className="text-xs font-medium text-gray-700">
                    Danh sách trả lời đúng (Top {Math.min(item.correctUsers.length, 50)})
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto">
                  {item.correctUsers.slice(0, 50).map((user) => (
                    <div 
                      key={user.id}
                      className="flex items-center justify-between bg-white rounded px-2 py-1 text-xs"
                    >
                      <div className="flex items-center">
                        <span className="w-6 text-center font-medium text-gray-600">
                          #{user.rank}
                        </span>
                        <span className="ml-2 font-medium text-gray-900">
                          {user.name}
                        </span>
                      </div>
                      <span className="text-gray-500">{user.answeredAt}</span>
                    </div>
                  ))}
                  {item.correctUsers.length > 50 && (
                    <div className="text-xs text-gray-500 text-center py-1">
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
