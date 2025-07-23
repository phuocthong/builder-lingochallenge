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
  Target,
  Flame,
  Star,
  Crown,
  TrendingUp,
  Award,
  Rocket,
  Shield
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ChallengeRoom } from "../../pages/ChallengeRoom";

interface DesktopCompetitionInterfaceProps {
  room: ChallengeRoom;
  onChallengeComplete: () => void;
  onRoomUpdate: (room: ChallengeRoom) => void;
}

interface Question {
  id: number;
  text: string;
  correctAnswer: string;
}

interface ParticipantStatus {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  lastAnswerTime?: number;
  isAnswering: boolean;
  lastResult?: 'correct' | 'incorrect' | null;
  combo?: number;
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
  { id: 9, text: 'Dịch từ "Honest" sang tiếng Vi���t', correctAnswer: 'trung thực' },
  { id: 10, text: 'Dịch từ "Brave" sang tiếng Việt', correctAnswer: 'dũng cảm' },
  { id: 11, text: 'Dịch từ "Kind" sang tiếng Việt', correctAnswer: 'tử tế' },
  { id: 12, text: 'Dịch từ "Smart" sang tiếng Việt', correctAnswer: 'thông minh' },
  { id: 13, text: 'Dịch từ "Funny" sang tiếng Việt', correctAnswer: 'hài hước' },
  { id: 14, text: 'Dịch từ "Strong" sang tiếng Việt', correctAnswer: 'mạnh mẽ' },
  { id: 15, text: 'Dịch từ "Fast" sang tiếng Việt', correctAnswer: 'nhanh' },
];

export function DesktopCompetitionInterface({ 
  room, 
  onChallengeComplete, 
  onRoomUpdate 
}: DesktopCompetitionInterfaceProps) {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(room.timePerQuestion);
  const [userAnswer, setUserAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [participants, setParticipants] = useState<ParticipantStatus[]>(
    room.participants.map(p => ({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      score: 0,
      streak: 0,
      isAnswering: false,
      combo: 0
    }))
  );
  const [userStreak, setUserStreak] = useState(0);
  const [userCombo, setUserCombo] = useState(0);
  const [flashEffect, setFlashEffect] = useState<'correct' | 'incorrect' | null>(null);
  const [showTimeCritical, setShowTimeCritical] = useState(false);

  const currentQuestion = CHALLENGE_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex >= room.totalQuestions - 1;
  const progressPercentage = ((currentQuestionIndex + 1) / room.totalQuestions) * 100;

  // Timer countdown with effects
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!hasAnswered) {
        handleTimeUp();
      }
      return;
    }

    // Show time critical warning
    if (timeLeft <= 5 && !showTimeCritical) {
      setShowTimeCritical(true);
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, hasAnswered, showTimeCritical]);

  // Simulate other participants answering
  useEffect(() => {
    if (showResult) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setParticipants(prev => {
          const availableParticipants = prev.filter(p => 
            p.id !== user.id && !p.isAnswering
          );
          
          if (availableParticipants.length > 0) {
            const randomParticipant = availableParticipants[Math.floor(Math.random() * availableParticipants.length)];
            const isCorrectAnswer = Math.random() < 0.7;
            const answerTime = room.timePerQuestion - timeLeft;
            
            return prev.map(p => {
              if (p.id === randomParticipant.id) {
                const newStreak = isCorrectAnswer ? p.streak + 1 : 0;
                const speedBonus = answerTime < 5 ? 2 : answerTime < 10 ? 1 : 0;
                const streakBonus = newStreak >= 3 ? Math.floor(newStreak / 3) : 0;
                const scoreIncrease = isCorrectAnswer ? (1 + speedBonus + streakBonus) : 0;
                
                return {
                  ...p,
                  isAnswering: true,
                  lastAnswerTime: answerTime,
                  lastResult: isCorrectAnswer ? 'correct' : 'incorrect',
                  score: p.score + scoreIncrease,
                  streak: newStreak,
                  combo: isCorrectAnswer ? (p.combo || 0) + 1 : 0
                };
              }
              return p;
            });
          }
          return prev;
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, room.timePerQuestion, timeLeft, user.id, showResult]);

  const handleSubmitAnswer = () => {
    if (hasAnswered || !userAnswer.trim()) return;

    const correct = userAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    const answerTime = room.timePerQuestion - timeLeft;
    
    setIsCorrect(correct);
    setHasAnswered(true);
    setShowResult(true);
    setFlashEffect(correct ? 'correct' : 'incorrect');

    // Update user stats
    if (correct) {
      const newStreak = userStreak + 1;
      const speedBonus = answerTime < 5 ? 2 : answerTime < 10 ? 1 : 0;
      const streakBonus = newStreak >= 3 ? Math.floor(newStreak / 3) : 0;
      const newCombo = userCombo + 1;
      
      setUserStreak(newStreak);
      setUserCombo(newCombo);
      
      // Update user in participants
      setParticipants(prev => prev.map(p => {
        if (p.id === user.id) {
          return {
            ...p,
            score: p.score + 1 + speedBonus + streakBonus,
            streak: newStreak,
            combo: newCombo,
            isAnswering: true,
            lastAnswerTime: answerTime,
            lastResult: 'correct'
          };
        }
        return p;
      }));
    } else {
      setUserStreak(0);
      setUserCombo(0);
      setParticipants(prev => prev.map(p => {
        if (p.id === user.id) {
          return {
            ...p,
            streak: 0,
            combo: 0,
            isAnswering: true,
            lastAnswerTime: answerTime,
            lastResult: 'incorrect'
          };
        }
        return p;
      }));
    }

    // Clear flash effect
    setTimeout(() => setFlashEffect(null), 1000);

    // Move to next question
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const handleTimeUp = () => {
    if (hasAnswered) return;
    
    setIsCorrect(false);
    setHasAnswered(true);
    setShowResult(true);
    setFlashEffect('incorrect');
    setUserStreak(0);
    setUserCombo(0);

    setTimeout(() => setFlashEffect(null), 1000);
    setTimeout(() => nextQuestion(), 3000);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      // Complete challenge
      const finalParticipants = participants.map(p => ({
        ...room.participants.find(rp => rp.id === p.id)!,
        score: p.score
      }));
      
      const updatedRoom: ChallengeRoom = {
        ...room,
        participants: finalParticipants,
        currentQuestion: room.totalQuestions,
        state: 'results'
      };
      
      onRoomUpdate(updatedRoom);
      onChallengeComplete();
    } else {
      // Next question
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(room.timePerQuestion);
      setUserAnswer("");
      setHasAnswered(false);
      setShowResult(false);
      setIsCorrect(null);
      setShowTimeCritical(false);
      
      // Reset participant answering status
      setParticipants(prev => prev.map(p => ({
        ...p,
        isAnswering: false,
        lastResult: null
      })));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !hasAnswered) {
      handleSubmitAnswer();
    }
  };

  const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);
  const userRank = sortedParticipants.findIndex(p => p.id === user.id) + 1;

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      flashEffect === 'correct' ? 'bg-green-100' :
      flashEffect === 'incorrect' ? 'bg-red-100' :
      'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold text-gray-900">{room.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>Câu {currentQuestionIndex + 1}/{room.totalQuestions}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{room.participants.length} thách thủ</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* User stats */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">Hạng #{userRank}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Streak: {userStreak}</span>
              </div>
              {userCombo > 2 && (
                <div className="flex items-center space-x-1 bg-purple-100 px-2 py-1 rounded">
                  <Star className="h-4 w-4 text-purple-500" />
                  <span className="font-medium text-purple-700">Combo x{userCombo}</span>
                </div>
              )}
            </div>
            
            {/* Timer */}
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              showTimeCritical ? 'bg-red-100 border-2 border-red-300 animate-pulse' : 'bg-gray-100'
            }`}>
              <Clock className={`h-5 w-5 ${showTimeCritical ? 'text-red-500' : 'text-blue-500'}`} />
              <span className={`text-2xl font-bold ${showTimeCritical ? 'text-red-500' : 'text-blue-600'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="max-w-7xl mx-auto mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Tiến độ thách đấu</span>
            <span>{Math.round(progressPercentage)}% hoàn thành</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Main Question Area */}
          <div className="col-span-8">
            <Card className="h-full shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Câu hỏi {currentQuestionIndex + 1}</h2>
                      <p className="text-sm text-gray-500">Thời gian: {room.timePerQuestion} giây</p>
                    </div>
                  </div>
                  
                  {showTimeCritical && (
                    <Badge variant="destructive" className="animate-pulse">
                      <Shield className="h-3 w-3 mr-1" />
                      Time Critical!
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Question */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                    📝 {currentQuestion.text}
                  </h3>
                  
                  {/* Answer Input */}
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <Input
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Nhập câu trả lời của bạn..."
                        disabled={hasAnswered}
                        className="flex-1 text-xl py-6 border-2 border-purple-200 focus:border-purple-500"
                        autoFocus
                      />
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={hasAnswered || !userAnswer.trim()}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8 py-6 text-lg font-medium"
                        size="lg"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Gửi đáp án
                      </Button>
                    </div>

                    {/* Result Display */}
                    {showResult && (
                      <div className={`p-6 rounded-xl border-2 ${
                        isCorrect 
                          ? 'bg-green-50 border-green-300' 
                          : 'bg-red-50 border-red-300'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {isCorrect ? (
                              <>
                                <CheckCircle className="h-8 w-8 text-green-600" />
                                <div>
                                  <span className="text-xl font-bold text-green-800">🎉 Chính xác!</span>
                                  {userStreak > 1 && (
                                    <p className="text-sm text-green-700 mt-1">
                                      🔥 Streak {userStreak}! Bonus +{Math.floor(userStreak / 3)} điểm
                                    </p>
                                  )}
                                </div>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-8 w-8 text-red-600" />
                                <div>
                                  <span className="text-xl font-bold text-red-800">❌ Sai rồi!</span>
                                  <p className="text-sm text-red-700 mt-1">
                                    Đáp án đúng: <strong>"{currentQuestion.correctAnswer}"</strong>
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                          
                          {isCorrect && (
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">+{1 + (userStreak >= 3 ? Math.floor(userStreak / 3) : 0)}</div>
                              <div className="text-sm text-green-700">điểm</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-medium text-gray-900 mb-3">🔴 Hoạt động trực tiếp</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {participants
                      .filter(p => p.isAnswering)
                      .sort((a, b) => (a.lastAnswerTime || 0) - (b.lastAnswerTime || 0))
                      .map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between bg-white rounded px-3 py-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                              {participant.avatar}
                            </div>
                            <span className="font-medium">{participant.name}</span>
                            <Badge variant={participant.lastResult === 'correct' ? 'default' : 'secondary'} className="text-xs">
                              {participant.lastResult === 'correct' ? '✅' : '❌'}
                            </Badge>
                          </div>
                          <span className="text-gray-500 text-xs">{participant.lastAnswerTime}s</span>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Leaderboard */}
          <div className="col-span-4">
            <Card className="h-full shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Bảng xếp hạng</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {sortedParticipants.map((participant, index) => {
                    const rank = index + 1;
                    const isCurrentUser = participant.id === user.id;
                    
                    return (
                      <div
                        key={participant.id}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          isCurrentUser ? 'border-purple-300 bg-purple-50 ring-2 ring-purple-500' :
                          participant.isAnswering ? 
                            participant.lastResult === 'correct' ? 'border-green-300 bg-green-50' :
                            'border-red-300 bg-red-50' :
                          'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {/* Rank */}
                          <div className="flex items-center justify-center w-8 h-8">
                            {rank === 1 ? <Crown className="h-5 w-5 text-yellow-500" /> :
                             rank === 2 ? <Award className="h-5 w-5 text-gray-400" /> :
                             rank === 3 ? <Award className="h-5 w-5 text-amber-600" /> :
                             <span className="text-sm font-medium text-gray-500">#{rank}</span>}
                          </div>
                          
                          {/* Avatar */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                            rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                            rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                            rank === 3 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                            'bg-gradient-to-r from-blue-500 to-purple-500'
                          }`}>
                            {participant.avatar}
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900 text-sm truncate">
                                {participant.name}
                              </span>
                              {isCurrentUser && (
                                <Badge variant="outline" className="text-xs">Bạn</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-600">{participant.score} điểm</span>
                              {participant.streak > 0 && (
                                <div className="flex items-center space-x-1">
                                  <Flame className="h-3 w-3 text-orange-500" />
                                  <span className="text-xs text-orange-600">{participant.streak}</span>
                                </div>
                              )}
                              {(participant.combo || 0) > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  x{participant.combo}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Score */}
                          <div className="text-right">
                            <div className={`text-lg font-bold ${
                              rank === 1 ? 'text-yellow-600' : 
                              rank === 2 ? 'text-gray-600' :
                              rank === 3 ? 'text-amber-600' : 'text-gray-700'
                            }`}>
                              {participant.score}
                            </div>
                            {participant.isAnswering && (
                              <div className="text-xs text-green-600 animate-pulse">
                                Đang trả lời...
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Critical time warning overlay */}
      {showTimeCritical && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-red-500 text-white px-8 py-4 rounded-lg shadow-2xl animate-bounce">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold">⚠️ THỜI GIAN SẮP HẾT!</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
