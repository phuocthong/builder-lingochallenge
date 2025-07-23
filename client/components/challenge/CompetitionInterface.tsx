import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { 
  Clock, 
  Send, 
  Trophy, 
  Users, 
  CheckCircle, 
  XCircle,
  Zap,
  Target
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ChallengeRoom } from "../../pages/ChallengeRoom";
import { LiveScoreboard } from "./LiveScoreboard";

interface CompetitionInterfaceProps {
  room: ChallengeRoom;
  onChallengeComplete: () => void;
  onRoomUpdate: (room: ChallengeRoom) => void;
}

interface Question {
  id: number;
  text: string;
  correctAnswer: string;
}

const CHALLENGE_QUESTIONS: Question[] = [
  { id: 1, text: 'Dịch từ "Beautiful" sang tiếng Việt', correctAnswer: 'đẹp' },
  { id: 2, text: 'Dịch từ "Happy" sang tiếng Việt', correctAnswer: 'hạnh phúc' },
  { id: 3, text: 'Dịch từ "Intelligent" sang tiếng Việt', correctAnswer: 'thông minh' },
  { id: 4, text: 'Dịch từ "Friendly" sang tiếng Việt', correctAnswer: 'thân thiện' },
  { id: 5, text: 'Dịch từ "Creative" sang tiếng Việt', correctAnswer: 'sáng tạo' },
  { id: 6, text: 'Dịch từ "Confident" sang tiếng Việt', correctAnswer: 'tự tin' },
  { id: 7, text: 'Dịch từ "Generous" sang tiếng Việt', correctAnswer: 'hào phóng' },
  { id: 8, text: 'Dịch từ "Patient" sang tiếng Việt', correctAnswer: 'kiên nhẫn' },
  { id: 9, text: 'Dịch từ "Honest" sang tiếng Việt', correctAnswer: 'trung thực' },
  { id: 10, text: 'Dịch từ "Brave" sang tiếng Việt', correctAnswer: 'dũng cảm' },
  { id: 11, text: 'Dịch từ "Kind" sang tiếng Việt', correctAnswer: 'tử tế' },
  { id: 12, text: 'Dịch từ "Smart" sang tiếng Việt', correctAnswer: 'thông minh' },
  { id: 13, text: 'Dịch từ "Funny" sang tiếng Việt', correctAnswer: 'hài hước' },
  { id: 14, text: 'Dịch từ "Strong" sang tiếng Việt', correctAnswer: 'mạnh mẽ' },
  { id: 15, text: 'Dịch từ "Fast" sang tiếng Việt', correctAnswer: 'nhanh' },
  { id: 16, text: 'Dịch từ "Careful" sang tiếng Việt', correctAnswer: 'cẩn thận' },
  { id: 17, text: 'Dịch từ "Polite" sang tiếng Việt', correctAnswer: 'lịch sự' },
  { id: 18, text: 'Dịch từ "Helpful" sang tiếng Việt', correctAnswer: 'hữu ích' },
  { id: 19, text: 'Dịch từ "Amazing" sang tiếng Việt', correctAnswer: 'tuyệt vời' },
  { id: 20, text: 'Dịch từ "Wonderful" sang tiếng Việt', correctAnswer: 'tuyệt vời' },
  { id: 21, text: 'Dịch từ "Excellent" sang tiếng Việt', correctAnswer: 'xuất sắc' },
  { id: 22, text: 'Dịch từ "Perfect" sang tiếng Việt', correctAnswer: 'hoàn hảo' },
  { id: 23, text: 'Dịch từ "Fantastic" sang tiếng Việt', correctAnswer: 'tuyệt vời' },
  { id: 24, text: 'Dịch từ "Brilliant" sang tiếng Việt', correctAnswer: 'tài giỏi' },
  { id: 25, text: 'Dịch từ "Outstanding" sang tiếng Việt', correctAnswer: 'xuất sắc' },
];

export function CompetitionInterface({ 
  room, 
  onChallengeComplete, 
  onRoomUpdate 
}: CompetitionInterfaceProps) {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(room.timePerQuestion);
  const [userAnswer, setUserAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [participantScores, setParticipantScores] = useState(
    room.participants.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {} as Record<string, number>)
  );
  const [currentAnswerers, setCurrentAnswerers] = useState<Array<{
    id: string;
    name: string;
    avatar: string;
    timestamp: Date;
    isCorrect: boolean;
  }>>([]);

  const currentQuestion = CHALLENGE_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex >= room.totalQuestions - 1;

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!hasAnswered) {
        handleTimeUp();
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, hasAnswered]);

  // Simulate other users answering
  useEffect(() => {
    if (showResult) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.4) {
        const notAnsweredUsers = room.participants.filter(p => 
          p.id !== user.id && !currentAnswerers.some(a => a.id === p.id)
        );
        
        if (notAnsweredUsers.length > 0) {
          const randomUser = notAnsweredUsers[Math.floor(Math.random() * notAnsweredUsers.length)];
          const isCorrectAnswer = Math.random() < 0.7; // 70% chance of correct answer
          
          setCurrentAnswerers(prev => [...prev, {
            id: randomUser.id,
            name: randomUser.name,
            avatar: randomUser.avatar,
            timestamp: new Date(),
            isCorrect: isCorrectAnswer
          }]);

          if (isCorrectAnswer) {
            setParticipantScores(prev => ({
              ...prev,
              [randomUser.id]: prev[randomUser.id] + 1
            }));
          }
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, room.participants, user.id, currentAnswerers, showResult]);

  const handleSubmitAnswer = () => {
    if (hasAnswered || !userAnswer.trim()) return;

    const correct = userAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setHasAnswered(true);
    setShowResult(true);

    // Add user to current answerers
    setCurrentAnswerers(prev => [...prev, {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      timestamp: new Date(),
      isCorrect: correct
    }]);

    // Update score if correct
    if (correct) {
      setParticipantScores(prev => ({
        ...prev,
        [user.id]: prev[user.id] + 1
      }));
    }

    // Show result for 3 seconds, then move to next question
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const handleTimeUp = () => {
    if (hasAnswered) return;
    
    setIsCorrect(false);
    setHasAnswered(true);
    setShowResult(true);

    // Show result for 3 seconds, then move to next question
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      // Update room with final scores and complete challenge
      const updatedRoom: ChallengeRoom = {
        ...room,
        participants: room.participants.map(p => ({
          ...p,
          score: participantScores[p.id] || 0
        })),
        currentQuestion: room.totalQuestions,
        state: 'results'
      };
      onRoomUpdate(updatedRoom);
      onChallengeComplete();
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(room.timePerQuestion);
      setUserAnswer("");
      setHasAnswered(false);
      setShowResult(false);
      setIsCorrect(null);
      setCurrentAnswerers([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !hasAnswered) {
      handleSubmitAnswer();
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / room.totalQuestions) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header with Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            ⚡ {room.name}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span>Câu {currentQuestionIndex + 1}/{room.totalQuestions}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{room.participants.length} người chơi</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tiến độ</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question Panel */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span>Câu hỏi {currentQuestionIndex + 1}</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Clock className={`h-5 w-5 ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`} />
                  <span className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-600'}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  📝 {currentQuestion.text}
                </h2>
                
                {/* Answer Input */}
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <Input
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nh���p câu trả lời của bạn..."
                      disabled={hasAnswered}
                      className="flex-1 text-lg"
                    />
                    <Button
                      onClick={handleSubmitAnswer}
                      disabled={hasAnswered || !userAnswer.trim()}
                      className="bg-green-600 hover:bg-green-700 px-6"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Gửi
                    </Button>
                  </div>

                  {/* Result Display */}
                  {showResult && (
                    <div className={`p-4 rounded-lg ${
                      isCorrect 
                        ? 'bg-green-100 border border-green-300' 
                        : 'bg-red-100 border border-red-300'
                    }`}>
                      <div className="flex items-center space-x-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className={`font-medium ${
                          isCorrect ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {isCorrect ? '🎉 Chính xác!' : '❌ Sai rồi!'}
                        </span>
                      </div>
                      <p className={`mt-2 ${
                        isCorrect ? 'text-green-700' : 'text-red-700'
                      }`}>
                        Đáp án đúng: <strong>"{currentQuestion.correctAnswer}"</strong>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Question Answerers */}
              {currentAnswerers.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">
                    👥 Đã trả lời ({currentAnswerers.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentAnswerers.map((answerer) => (
                      <Badge
                        key={answerer.id}
                        variant={answerer.isCorrect ? "default" : "secondary"}
                        className={`${
                          answerer.isCorrect 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-gray-500'
                        }`}
                      >
                        {answerer.isCorrect ? '✅' : '❌'} {answerer.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Live Scoreboard */}
        <div className="lg:col-span-1">
          <LiveScoreboard 
            participants={room.participants}
            scores={participantScores}
            currentAnswerers={currentAnswerers}
          />
        </div>
      </div>
    </div>
  );
}
