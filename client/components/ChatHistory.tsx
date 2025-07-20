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
    date: "26/07/2022",
    time: "18 nguyên tố đủ đống",
    progress: "Minh Anh - Thành Hòa - 64 khác",
  },
  {
    id: 2,
    title: 'Dịch từ "Happy" sang tiếng Việt',
    description: "Bởi anh Vũ Đình phúc",
    date: "25/07/2022",
    time: "18 nguyên tố đủ đống",
    progress: "Trỗi Vinh - Dức Minh",
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
      <div className="p-4 space-y-4">
        {chatHistory.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
          >
            <h4 className="font-medium text-gray-900 text-sm mb-1">
              {item.title}
            </h4>
            <p className="text-xs text-gray-600 mb-2">{item.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{item.date}</span>
              <span>{item.time}</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">{item.progress}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
