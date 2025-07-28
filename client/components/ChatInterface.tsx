import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Bot, User, CheckCircle, XCircle, Lock, LogIn } from "lucide-react";
import { cn } from "../lib/utils";
import { Alert, AlertDescription } from "./ui/alert";
import { useAuth } from "../contexts/AuthContext";

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

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isLoggedIn: boolean;
}

interface ChatInterfaceProps {
  onShowLogin?: () => void;
  onShowRegister?: () => void;
}

const QUESTIONS = [
  { question: 'Dịch từ "Beautiful" sang tiếng Việt', answer: 'đẹp' },
  { question: 'Dịch từ "Happy" sang tiếng Việt', answer: 'hạnh phúc' },
  { question: 'Dịch từ "Wonderful" sang tiếng Việt', answer: 'tuyệt vời' },
  { question: 'Dịch từ "Intelligent" sang tiếng Việt', answer: 'thông minh' },
  { question: 'Dịch từ "Friendly" sang tiếng Việt', answer: 'thân thiện' },
  { question: 'D���ch từ "Amazing" sang tiếng Việt', answer: 'tuyệt vời' },
  { question: 'Dịch từ "Confident" sang tiếng Việt', answer: 'tự tin' },
  { question: 'Dịch từ "Creative" sang tiếng Việt', answer: 'sáng tạo' },
];

// Mock other users answering
const MOCK_USERS = [
  { id: "user1", name: "Minh Anh", avatar: "MA" },
  { id: "user2", name: "Thành Hòa", avatar: "TH" },
  { id: "user3", name: "Văn Nam", avatar: "VN" },
  { id: "user4", name: "Thu Trang", avatar: "TT" },
  { id: "user5", name: "Đức Minh", avatar: "DM" },
  { id: "user6", name: "Lan Anh", avatar: "LA" },
  { id: "user7", name: "Hoàng Nam", avatar: "HN" },
  { id: "user8", name: "Mai Linh", avatar: "ML" },
];

export function ChatInterface({ onShowLogin, onShowRegister }: ChatInterfaceProps) {
  const { user, updateStats } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Xin chào! 👋 Tôi là EnglishBot. Tôi sẽ đưa ra câu hỏi tiếng Anh để các bạn trả lời. Hãy sẵn sàng!',
      sender: "bot",
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [waitingForAnswer, setWaitingForAnswer] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [answeredUsers, setAnsweredUsers] = useState<Array<{userId: string, userName: string, timestamp: string}>>([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [lastClickTime, setLastClickTime] = useState<number>(0);

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

  // Simulate other users answering questions
  useEffect(() => {
    if (waitingForAnswer && currentQuestionId) {
      const interval = setInterval(() => {
        // Randomly add mock users who "answered"
        if (Math.random() < 0.3 && answeredUsers.length < 8) {
          const availableUsers = MOCK_USERS.filter(
            user => !answeredUsers.some(answered => answered.userId === user.id)
          );
          
          if (availableUsers.length > 0) {
            const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
            const newAnsweredUser = {
              userId: randomUser.id,
              userName: randomUser.name,
              timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
            };
            
            setAnsweredUsers(prev => [newAnsweredUser, ...prev].slice(0, 10));
          }
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [waitingForAnswer, currentQuestionId, answeredUsers]);

  const askNewQuestion = () => {
    const randomQuestion = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    const questionMessage: Message = {
      id: Date.now(),
      text: `📚 ${randomQuestion.question}`,
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
      text: `✅ Đáp án đúng: "${correctAnswer}"`,
      sender: "system",
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };
    
    setMessages(prev => [...prev, answerMessage]);
    setCurrentQuestionId(null);
    setWaitingForAnswer(false);
    
    // Ask next question after 8 seconds
    setTimeout(() => {
      askNewQuestion();
    }, 8000);
  };

  const handleInputClick = () => {
    if (!user.isLoggedIn) {
      const now = Date.now();
      // Prevent spam clicking
      if (now - lastClickTime > 1000) {
        setShowLoginPrompt(true);
        setLastClickTime(now);
        
        // Auto hide prompt after 4 seconds
        setTimeout(() => {
          setShowLoginPrompt(false);
        }, 4000);
      }
    }
  };

  const handleSendMessage = () => {
    if (!user.isLoggedIn) {
      handleInputClick();
      return;
    }

    if (inputText.trim() && user.isLoggedIn) {
      const userAnswer = inputText.trim().toLowerCase();
      const currentQuestion = messages.find(msg => msg.id === currentQuestionId);
      
      if (currentQuestion && currentQuestion.isQuestion) {
        const isCorrect = userAnswer === currentQuestion.correctAnswer?.toLowerCase();
        
        // Add user to answered users list
        const newAnsweredUser = {
          userId: user.id,
          userName: user.name,
          timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
        };

        setAnsweredUsers(prev => {
          const filtered = prev.filter(answeredUser => answeredUser.userId !== user.id);
          return [newAnsweredUser, ...filtered].slice(0, 10);
        });

        // Update user stats on correct answer
        if (isCorrect && user.stats) {
          updateStats({
            totalCorrect: user.stats.totalCorrect + 1,
            streak: user.stats.streak + 1,
            accuracy: Math.round(((user.stats.totalCorrect + 1) / (user.stats.totalCorrect + 1)) * 100)
          });
        } else if (!isCorrect && user.stats) {
          updateStats({
            streak: 0
          });
        }

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
              `🎉 Chính xác! "${currentQuestion.correctAnswer}" là đáp án đúng.` : 
              `❌ Không chính xác. Đáp án đúng là: "${currentQuestion.correctAnswer}"`,
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
      {/* Chat Header - Mobile Optimized */}
      <div className="flex items-center p-3 sm:p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="bg-white p-2 rounded-lg mr-3 shadow-sm">
          <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white text-sm sm:text-base">
            🤖 EnglishBot
          </h3>
          <p className="text-xs text-purple-100">Câu hỏi mỗi 30-60 giây</p>
        </div>
        <div className="text-xs text-purple-100 bg-white/20 px-2 py-1 rounded">
          {waitingForAnswer ? "⏰ Đang chờ" : "💭 Chuẩn bị"}
        </div>
      </div>

      {/* Login Prompt Alert - Mobile Optimized */}
      {showLoginPrompt && (
        <div className="p-3 border-b bg-yellow-50">
          <Alert className="border-yellow-200 bg-yellow-50">
            <Lock className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <span className="text-sm">Đăng nhập để tham gia trả lời!</span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onShowRegister}
                    className="text-xs border-yellow-300 text-yellow-700 hover:bg-yellow-100 flex-1 sm:flex-none"
                  >
                    Đăng ký
                  </Button>
                  <Button
                    size="sm"
                    onClick={onShowLogin}
                    className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white flex-1 sm:flex-none"
                  >
                    <LogIn className="h-3 w-3 mr-1" />
                    Đăng nhập
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Messages - Mobile Optimized (AI left, User right) */}
      <div className="flex-1 p-2 sm:p-4 space-y-2 sm:space-y-3 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-full",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "flex items-start max-w-[85%] sm:max-w-[75%]",
                message.sender === "user" ? "flex-row-reverse space-x-reverse space-x-2" : "space-x-2"
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "p-1.5 sm:p-2 rounded-full flex-shrink-0 mt-0.5",
                  message.sender === "bot" ? "bg-purple-100" :
                  message.sender === "system" ? "bg-green-100" :
                  "bg-blue-100",
                )}
              >
                {message.sender === "bot" ? (
                  <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                ) : message.sender === "system" ? (
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                ) : (
                  <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={cn(
                  "px-3 py-2 rounded-lg break-words",
                  message.sender === "bot"
                    ? "bg-gray-100 text-gray-900 rounded-tl-sm"
                    : message.sender === "system"
                    ? "bg-green-100 text-green-800 border border-green-200 rounded-tl-sm"
                    : message.isCorrect === true
                    ? "bg-green-500 text-white rounded-tr-sm"
                    : message.isCorrect === false
                    ? "bg-red-500 text-white rounded-tr-sm"
                    : "bg-blue-500 text-white rounded-tr-sm",
                )}
              >
                <div className="flex items-start">
                  <p className="text-sm leading-relaxed flex-1">{message.text}</p>
                  {message.sender === "user" && message.isCorrect !== undefined && (
                    <div className={cn("ml-2 flex-shrink-0", message.sender === "user" ? "mr-0" : "ml-0")}>
                      {message.isCorrect ? (
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </div>
                  )}
                </div>
                <p
                  className={cn(
                    "text-xs mt-1 opacity-75",
                    message.sender === "bot"
                      ? "text-gray-500"
                      : message.sender === "system"
                      ? "text-green-600"
                      : "text-white",
                  )}
                >
                  {message.timestamp}
                </p>
                {message.isQuestion && (
                  <div className="mt-2 p-2 bg-yellow-100 rounded-lg text-xs text-yellow-800 border">
                    ⏰ Câu hỏi đang chờ trả lời...
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Current question active users - Mobile Optimized */}
        {waitingForAnswer && answeredUsers.length > 0 && (
          <div className="text-sm text-gray-500 mt-4 p-2 sm:p-3 bg-blue-50 rounded-lg mx-2">
            <p className="mb-2 font-medium text-xs sm:text-sm">👥 Đã trả lời ({answeredUsers.length}):</p>
            <div className="flex flex-wrap gap-1">
              {answeredUsers.slice(0, 10).map((user, index) => (
                <span key={`${user.userId}-${index}`} className="text-blue-600 bg-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                  {user.userName}
                </span>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input - Mobile Optimized for 440px */}
      <div className="p-2 sm:p-4 border-t bg-gray-50">
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            onClick={handleInputClick}
            placeholder={
              user.isLoggedIn
                ? "Nhập câu trả lời..."
                : "Đăng nhập để trả lời..."
            }
            className={cn(
              "flex-1 text-sm h-9",
              user.isLoggedIn ? "bg-white" : "bg-gray-100 cursor-pointer"
            )}
            disabled={!user.isLoggedIn || !waitingForAnswer}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-3 h-9"
            disabled={!inputText.trim() || !user.isLoggedIn || !waitingForAnswer}
            size="sm"
          >
            {user.isLoggedIn ? <Send className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
          <div className={cn(
            "w-1.5 h-1.5 rounded-full mr-1.5",
            user.isLoggedIn ? "bg-green-500" : "bg-red-500"
          )}></div>
          <span className="truncate">
            {user.isLoggedIn ?
              `✅ ${user.name}` :
              "❌ Chưa đăng nhập"
            }
          </span>
        </div>

        {/* Call to action for non-logged-in users - Mobile Optimized */}
        {!user.isLoggedIn && (
          <div className="mt-2 flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onShowRegister}
              className="text-xs border-purple-200 text-purple-700 hover:bg-purple-50 flex-1 h-8"
            >
              🎯 Đăng ký
            </Button>
            <Button
              size="sm"
              onClick={onShowLogin}
              className="text-xs bg-purple-600 hover:bg-purple-700 flex-1 h-8"
            >
              <LogIn className="h-3 w-3 mr-1" />
              Đăng nhập
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
