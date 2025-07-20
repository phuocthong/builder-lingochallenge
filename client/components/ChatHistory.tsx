import { Clock } from "lucide-react";

interface ChatHistoryItem {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  progress: string;
}

const chatHistory: ChatHistoryItem[] = [
  {
    id: 1,
    title: 'Dịch từ "Beautiful" sang tiếng Việt',
    description: "Bởi anh Duy",
    date: "10:30 - 26/07/2022",
    time: "15 người trả lời đúng",
    progress: "Minh Anh - Thành Hòa - Văn Nam",
  },
  {
    id: 2,
    title: 'Dịch từ "Happy" sang tiếng Việt',
    description: "Bởi anh Vũ Đình phúc",
    date: "10:25 - 26/07/2022",
    time: "12 người trả lời đúng",
    progress: "Thu Trang - Đức Minh",
  },
];

export function ChatHistory() {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Lịch sử câu hỏi</h3>
        </div>
      </div>

      {/* History Items */}
      <div className="p-4 space-y-3">
        {chatHistory.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer border border-blue-100"
          >
            <h4 className="font-semibold text-gray-900 text-sm mb-1">
              {item.title}
            </h4>
            <p className="text-xs text-gray-600 mb-3">{item.description}</p>
            <div className="text-xs text-gray-500 mb-2">
              <div className="mb-1">{item.date}</div>
              <div className="text-green-600 font-medium">{item.time}</div>
            </div>
            <p className="text-xs text-gray-600">{item.progress}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
