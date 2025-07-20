import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Bot, User } from "lucide-react";
import { cn } from "../lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Xin chào! Tôi là EnglishBot. Hãy dịch từ này sang tiếng Việt: "Beautiful"',
      sender: "bot",
      timestamp: "10:30",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        sender: "user",
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b bg-purple-50">
        <div className="bg-purple-600 p-2 rounded-full mr-3">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Trò chuyện với Bot</h3>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start space-x-3",
              message.sender === "user" && "flex-row-reverse space-x-reverse",
            )}
          >
            <div
              className={cn(
                "p-2 rounded-full",
                message.sender === "bot" ? "bg-purple-100" : "bg-blue-100",
              )}
            >
              {message.sender === "bot" ? (
                <Bot className="h-4 w-4 text-purple-600" />
              ) : (
                <User className="h-4 w-4 text-blue-600" />
              )}
            </div>
            <div
              className={cn(
                "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                message.sender === "bot"
                  ? "bg-gray-100 text-gray-900"
                  : "bg-purple-600 text-white",
              )}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={cn(
                  "text-xs mt-1",
                  message.sender === "bot"
                    ? "text-gray-500"
                    : "text-purple-200",
                )}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}

        {/* Response suggestion */}
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            size="sm"
            className="text-sm bg-green-50 border-green-200 text-green-700 hover:bg-green-100 px-4 py-2"
          >
            ✓ Chính xác!
          </Button>
        </div>

        {/* User typing indicator */}
        <div className="text-sm text-gray-500 mt-6">
          <p className="mb-2">Người dùng đang trả lời...</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
              Minh Anh
            </span>
            <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
              Thanh Hòa
            </span>
            <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
              Văn Nam
            </span>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex space-x-3">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập câu trả lời của bạn..."
            className="flex-1 bg-white"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gray-400 hover:bg-gray-500 px-4"
            disabled={!inputText.trim()}
          >
            Gửi
          </Button>
        </div>
        <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Vui lòng đáng nhập 462 thảm gia tối lại
        </div>
      </div>
    </div>
  );
}
