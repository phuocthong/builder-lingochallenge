import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Bot, User, CheckCircle, XCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user" | "system";
  timestamp: string;
  isQuestion?: boolean;
  isCorrect?: boolean;
  correctAnswer?: string;
  userResponses?: Array<{
    userId: string;
    userName: string;
    answer: string;
    timestamp: string;
    isCorrect?: boolean;
  }>;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  isLoggedIn: boolean;
}

const QUESTIONS = [
  { question: 'Dịch từ "Beautiful" sang tiếng Việt', answer: 'đẹp' },
  { question: 'Dịch từ "Happy" sang tiếng Việt', answer: 'hạnh phúc' },
  { question: 'Dịch từ "Wonderful" sang tiếng Việt', answer: 'tuyệt vời' },
  { question: 'Dịch từ "Intelligent" sang tiếng Việt', answer: 'thông minh' },
  { question: 'Dịch từ "Friendly" sang tiếng Việt', answer: 'thân thiện' },
  { question: 'Dịch từ "Amazing" sang tiếng Việt', answer: 'tuyệt vời' },
  { question: 'Dịch từ "Confident" sang tiếng Việt', answer: 'tự tin' },
  { question: 'Dịch từ "Creative" sang tiếng Việt', answer: 'sáng tạo' },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Xin chào! Tôi là EnglishBot. Tôi sẽ đưa ra các câu hỏi tiếng Anh định kỳ để các bạn trả lời.',
      sender: "bot",
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [currentUser] = useState<User>({
    id: 'user-123',
    name: 'Người dùng',
    avatar: 'ND',
    isLoggedIn: true
  });
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [waitingForAnswer, setWaitingForAnswer] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [answeredUsers, setAnsweredUsers] = useState<Array<{userId: string, userName: string, timestamp: string}>>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Start first question after 3 seconds
    const timer = setTimeout(() => {
      askNewQuestion();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const askNewQuestion = () => {
    const randomQuestion = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    const questionMessage: Message = {
      id: Date.now(),
      text: randomQuestion.question,
      sender: "bot",
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      isQuestion: true,
      correctAnswer: randomQuestion.answer,
      userResponses: []
    };
    
    setMessages(prev => [...prev, questionMessage]);
    setCurrentQuestionId(questionMessage.id);
    setWaitingForAnswer(true);
    setQuestionStartTime(new Date());
    setAnsweredUsers([]);

    // Auto-reveal answer after 30 seconds
    setTimeout(() => {
      revealAnswer(questionMessage.id, randomQuestion.answer);
    }, 30000);
  };

  const revealAnswer = (questionId: number, correctAnswer: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === questionId) {
        return {
          ...msg,
          isQuestion: false
        };
      }
      return msg;
    }));
    
    const answerMessage: Message = {
      id: Date.now() + 1,
      text: `Đáp án đúng là: "${correctAnswer}"`,
      sender: "system",
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };
    
    setMessages(prev => [...prev, answerMessage]);
    setCurrentQuestionId(null);
    setWaitingForAnswer(false);
    
    // Ask next question after 10 seconds
    setTimeout(() => {
      askNewQuestion();
    }, 10000);
  };

  const handleSendMessage = () => {
    if (inputText.trim() && currentUser.isLoggedIn) {
      const userAnswer = inputText.trim().toLowerCase();
      const currentQuestion = messages.find(msg => msg.id === currentQuestionId);
      
      if (currentQuestion && currentQuestion.isQuestion) {
        const isCorrect = userAnswer === currentQuestion.correctAnswer?.toLowerCase();
        
        // Add user to answered users list
        const newAnsweredUser = {
          userId: currentUser.id,
          userName: currentUser.name,
          timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
        };
        
        setAnsweredUsers(prev => {
          const filtered = prev.filter(user => user.userId !== currentUser.id);
          return [newAnsweredUser, ...filtered].slice(0, 10);
        });

        const newMessage: Message = {
          id: Date.now(),
          text: inputText,
          sender: "user",
          timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
          isCorrect
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Bot responds after 2 seconds
        setTimeout(() => {
          const responseMessage: Message = {
            id: Date.now() + 1,
            text: isCorrect ? 
              `Chính xác! 🎉 "${currentQuestion.correctAnswer}" là đáp án đúng.` : 
              `Không chính xác. Đáp án đúng là: "${currentQuestion.correctAnswer}"`,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
          };
          setMessages(prev => [...prev, responseMessage]);
          
          // End current question and start new one
          setCurrentQuestionId(null);
          setWaitingForAnswer(false);
          
          setTimeout(() => {
            askNewQuestion();
          }, 5000);
        }, 2000);
      }
      
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
      <div className="flex items-center p-4 border-b bg-white">
        <div className="bg-purple-600 p-2 rounded-lg mr-3">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-base">
            Trò chuyện với Bot
          </h3>
          <p className="text-xs text-gray-500">Bot sẽ đưa ra câu hỏi mỗi 30-60 giây</p>
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
                message.sender === "bot" ? "bg-purple-100" : 
                message.sender === "system" ? "bg-green-100" :
                "bg-blue-100",
              )}
            >
              {message.sender === "bot" ? (
                <Bot className="h-4 w-4 text-purple-600" />
              ) : message.sender === "system" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <User className="h-4 w-4 text-blue-600" />
              )}
            </div>
            <div
              className={cn(
                "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                message.sender === "bot"
                  ? "bg-gray-100 text-gray-900"
                  : message.sender === "system"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : message.isCorrect === true
                  ? "bg-green-600 text-white"
                  : message.isCorrect === false
                  ? "bg-red-600 text-white"
                  : "bg-purple-600 text-white",
              )}
            >
              <div className="flex items-center">
                <p className="text-sm flex-1">{message.text}</p>
                {message.sender === "user" && message.isCorrect !== undefined && (
                  <div className="ml-2">
                    {message.isCorrect ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                  </div>
                )}
              </div>
              <p
                className={cn(
                  "text-xs mt-1",
                  message.sender === "bot"
                    ? "text-gray-500"
                    : message.sender === "system"
                    ? "text-green-600"
                    : "text-purple-200",
                )}
              >
                {message.timestamp}
              </p>
              {message.isQuestion && (
                <div className="mt-2 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
                  ⏰ Câu hỏi đang chờ trả lời...
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Current question active users */}
        {waitingForAnswer && answeredUsers.length > 0 && (
          <div className="text-sm text-gray-500 mt-6">
            <p className="mb-2">Đã trả lời ({answeredUsers.length}):</p>
            <div className="flex flex-wrap gap-2">
              {answeredUsers.slice(0, 10).map((user, index) => (
                <span key={`${user.userId}-${index}`} className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
                  {user.userName} ({user.timestamp})
                </span>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
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
            disabled={!currentUser.isLoggedIn || !waitingForAnswer}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-purple-600 hover:bg-purple-700 px-4"
            disabled={!inputText.trim() || !currentUser.isLoggedIn || !waitingForAnswer}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
          <div className={cn(
            "w-2 h-2 rounded-full mr-2",
            currentUser.isLoggedIn ? "bg-green-500" : "bg-red-500"
          )}></div>
          {currentUser.isLoggedIn ? 
            `Đăng nhập với tên: ${currentUser.name}` : 
            "Vui lòng đăng nhập để tham gia trả lời"
          }
        </div>
      </div>
    </div>
  );
}
