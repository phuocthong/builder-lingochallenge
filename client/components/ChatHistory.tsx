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

// Generate dynamic recent history data
const generateRecentHistory = (): ChatHistoryItem[] => {
  const questions = [
    { q: 'Dịch từ "Beautiful" sang tiếng Việt', a: "đẹp" },
    { q: 'Dịch từ "Happy" sang tiếng Việt', a: "hạnh phúc" },
    { q: 'Dịch từ "Wonderful" sang tiếng Việt', a: "tuyệt vời" },
    { q: 'Dịch từ "Intelligent" sang tiếng Việt', a: "thông minh" },
    { q: 'Dịch từ "Friendly" sang tiếng Việt', a: "thân thiện" },
    { q: 'Dịch từ "Amazing" sang tiếng Việt', a: "tuyệt vời" },
    { q: 'Dịch từ "Creative" sang tiếng Việt', a: "sáng tạo" },
    { q: 'Dịch từ "Confident" sang tiếng Việt', a: "tự tin" },
    { q: 'Dịch từ "Generous" sang tiếng Việt', a: "hào phóng" },
    { q: 'Dịch từ "Patient" sang tiếng Việt', a: "kiên nhẫn" },
    { q: 'Dịch từ "Honest" sang tiếng Việt', a: "trung thực" },
    { q: 'Dịch từ "Brave" sang tiếng Việt', a: "dũng cảm" },
    { q: 'Dịch từ "Kind" sang tiếng Việt', a: "tử tế" },
    { q: 'Dịch từ "Smart" sang tiếng Việt', a: "thông minh" },
    { q: 'Dịch từ "Funny" sang tiếng Việt', a: "hài hước" },
    { q: 'Dịch từ "Strong" sang tiếng Việt', a: "mạnh mẽ" },
    { q: 'Dịch từ "Fast" sang tiếng Việt', a: "nhanh" },
    { q: 'Dịch từ "Careful" sang tiếng Việt', a: "cẩn thận" },
    { q: 'Dịch từ "Polite" sang tiếng Việt', a: "lịch sự" },
    { q: 'Dịch từ "Helpful" sang tiếng Việt', a: "hữu ích" }
  ];
  
  const users = [
    "Minh Anh", "Thành Hòa", "Văn Nam", "Thu Trang", "Đức Minh",
    "Lan Anh", "Hoàng Nam", "Mai Linh", "Quốc Duy", "Bảo Trân",
    "Hồng Nhung", "Việt Hùng", "Thanh Tú", "Kim Anh", "Đức Thắng"
  ];
  
  const now = new Date();
  
  return questions.slice(0, 5).map((item, index) => {
    const questionTime = new Date(now.getTime() - (index * 5 * 60 * 1000)); // 5 minutes apart
    const numCorrectUsers = Math.floor(Math.random() * 12) + 3;
    const numTotalUsers = numCorrectUsers + Math.floor(Math.random() * 8) + 2;
    
    const correctUsers = users
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(numCorrectUsers, 5)) // Max 5 for simplified view
      .map((name, userIndex) => ({
        id: `user-${index}-${userIndex}`,
        name,
        answeredAt: new Date(questionTime.getTime() + (userIndex + 1) * 2000).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        rank: userIndex + 1
      }));
    
    return {
      id: questions.length - index,
      question: item.q,
      correctAnswer: item.a,
      timestamp: questionTime.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      date: questionTime.toLocaleDateString("vi-VN"),
      correctUsers,
      totalCorrect: numCorrectUsers,
      totalAnswered: numTotalUsers
    };
  });
};

const chatHistory: ChatHistoryItem[] = generateRecentHistory();

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
        <p className="text-xs text-purple-100 mt-1">5 câu hỏi gần nhất</p>
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
                    🏆 Top {Math.min(item.correctUsers.length, 5)} trả lời đúng sớm nhất
                  </span>
                </div>
                <div className="space-y-1.5 max-h-24 sm:max-h-32 overflow-y-auto">
                  {item.correctUsers.slice(0, 5).map((user) => (
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
                  {item.correctUsers.length > 5 && (
                    <div className="text-xs text-gray-500 text-center py-1 bg-gray-50 rounded">
                      ... và {item.correctUsers.length - 5} người khác
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
