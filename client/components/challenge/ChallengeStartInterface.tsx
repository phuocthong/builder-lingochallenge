import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  Zap, 
  Trophy, 
  Clock, 
  Users, 
  Target,
  Crown,
  Flame,
  Star,
  Rocket,
  Award,
  TrendingUp
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ChallengeRoom } from "../../pages/ChallengeRoom";

interface ChallengeStartInterfaceProps {
  room: ChallengeRoom;
  onStartChallenge: () => void;
}

export function ChallengeStartInterface({ room, onStartChallenge }: ChallengeStartInterfaceProps) {
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(10);
  const [stage, setStage] = useState<'intro' | 'rules' | 'participants' | 'countdown' | 'start'>('intro');
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
  const [participantHighlight, setParticipantHighlight] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  const rules = [
    "🎯 Trả lời chính xác để ghi điểm",
    "⚡ Thời gian có hạn cho mỗi câu hỏi", 
    "🏆 Người nhanh nhất sẽ được điểm cao hơn",
    "🔥 Streak cao = Bonus điểm",
    "👑 Người chiến thắng sẽ được danh hiệu Champion"
  ];

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  // Stage progression
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Intro stage
    timers.push(setTimeout(() => setStage('rules'), 2000));
    
    // Rules stage - cycle through rules
    timers.push(setTimeout(() => {
      const ruleInterval = setInterval(() => {
        setCurrentRuleIndex(prev => {
          if (prev >= rules.length - 1) {
            clearInterval(ruleInterval);
            setStage('participants');
            return prev;
          }
          return prev + 1;
        });
      }, 800);
    }, 2500));

    // Participants stage
    timers.push(setTimeout(() => {
      const participantInterval = setInterval(() => {
        setParticipantHighlight(prev => (prev + 1) % room.participants.length);
      }, 500);
      
      setTimeout(() => {
        clearInterval(participantInterval);
        setStage('countdown');
      }, room.participants.length * 500 + 1000);
    }, 7000));

    return () => timers.forEach(clearTimeout);
  }, [room.participants.length, rules.length]);

  // Final countdown
  useEffect(() => {
    if (stage === 'countdown') {
      const countdownTimer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            setStage('start');
            setTimeout(() => onStartChallenge(), 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [stage, onStartChallenge]);

  const getStageContent = () => {
    switch (stage) {
      case 'intro':
        return (
          <div className="text-center space-y-6 animate-pulse">
            <div className="relative">
              <Rocket className="h-24 w-24 text-purple-500 mx-auto animate-bounce" />
              <div className="absolute -top-2 -right-2">
                <Zap className="h-8 w-8 text-yellow-500 animate-spin" />
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              CHALLENGE STARTING!
            </h1>
            <p className="text-2xl text-gray-600 font-medium">
              Chuẩn bị tinh thần để bước vào cuộc thách đấu!
            </p>
          </div>
        );

      case 'rules':
        return (
          <div className="text-center space-y-8">
            <div className="flex justify-center items-center space-x-4">
              <Award className="h-16 w-16 text-yellow-500" />
              <h2 className="text-4xl font-bold text-gray-900">LUẬT CHƠI</h2>
              <Award className="h-16 w-16 text-yellow-500" />
            </div>
            
            <div className="max-w-2xl mx-auto space-y-4">
              {rules.map((rule, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg transition-all duration-500 ${
                    index === currentRuleIndex
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-400 shadow-lg scale-105'
                      : index < currentRuleIndex
                      ? 'bg-green-50 border border-green-300 opacity-70'
                      : 'bg-gray-50 border border-gray-200 opacity-30'
                  }`}
                >
                  <p className="text-lg font-medium text-gray-900">{rule}</p>
                  {index === currentRuleIndex && (
                    <div className="mt-2">
                      <Progress value={100} className="h-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'participants':
        return (
          <div className="text-center space-y-8">
            <div className="flex justify-center items-center space-x-4">
              <Users className="h-16 w-16 text-blue-500" />
              <h2 className="text-4xl font-bold text-gray-900">THÁCH THỦ</h2>
              <Crown className="h-16 w-16 text-yellow-500" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {room.participants.map((participant, index) => (
                <div
                  key={participant.id}
                  className={`relative p-6 rounded-xl transition-all duration-500 ${
                    index === participantHighlight
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500 shadow-2xl scale-110 text-white'
                      : 'bg-white border-2 border-gray-200 shadow-md'
                  }`}
                >
                  {/* Spotlight effect for highlighted participant */}
                  {index === participantHighlight && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-400/20 animate-pulse" />
                  )}
                  
                  <div className="relative z-10 text-center space-y-3">
                    <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-lg font-bold ${
                      index === participantHighlight
                        ? 'bg-white text-purple-600'
                        : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                    }`}>
                      {participant.avatar}
                    </div>
                    
                    <div>
                      <h3 className={`font-bold text-lg ${
                        index === participantHighlight ? 'text-white' : 'text-gray-900'
                      }`}>
                        {participant.name}
                      </h3>
                      {participant.isHost && (
                        <Badge variant="secondary" className="mt-1">
                          <Crown className="h-3 w-3 mr-1" />
                          Chủ phòng
                        </Badge>
                      )}
                    </div>
                    
                    {/* Status indicators */}
                    <div className="flex justify-center space-x-2">
                      <Flame className={`h-5 w-5 ${
                        index === participantHighlight ? 'text-yellow-300' : 'text-orange-500'
                      }`} />
                      <Star className={`h-5 w-5 ${
                        index === participantHighlight ? 'text-yellow-300' : 'text-yellow-500'
                      }`} />
                      <Target className={`h-5 w-5 ${
                        index === participantHighlight ? 'text-yellow-300' : 'text-green-500'
                      }`} />
                    </div>
                  </div>
                  
                  {/* Particle effects for highlighted participant */}
                  {index === participantHighlight && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                          style={{
                            left: `${20 + (i * 10)}%`,
                            top: `${20 + (i * 8)}%`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'countdown':
        return (
          <div className="text-center space-y-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">BẮT ĐẦU TRONG...</h2>
            
            {/* Main countdown circle */}
            <div className="relative w-64 h-64 mx-auto">
              <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="8"
                />
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="url(#countdown-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - countdown / 10)}`}
                  className="transition-all duration-1000 ease-linear"
                />
                <defs>
                  <linearGradient id="countdown-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-8xl font-bold transition-all duration-300 ${
                  countdown <= 3 ? 'text-red-500 animate-pulse scale-125' : 'text-purple-600'
                }`}>
                  {countdown}
                </span>
              </div>
              
              {/* Pulse rings */}
              {countdown <= 3 && (
                <>
                  <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-ping opacity-30" />
                  <div className="absolute inset-4 border-4 border-red-400 rounded-full animate-ping opacity-20" style={{animationDelay: '0.2s'}} />
                </>
              )}
            </div>
            
            {/* Challenge info */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Câu hỏi</p>
                <p className="text-xl font-bold">{room.totalQuestions}</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Thời gian/câu</p>
                <p className="text-xl font-bold">{room.timePerQuestion}s</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Thách thủ</p>
                <p className="text-xl font-bold">{room.participants.length}</p>
              </div>
            </div>
          </div>
        );

      case 'start':
        return (
          <div className="text-center space-y-8">
            <div className="relative">
              <h1 className="text-8xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent animate-bounce">
                START!
              </h1>
              
              {/* Explosion effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                    style={{
                      left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 100}px`,
                      top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 100}px`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <TrendingUp className="h-12 w-12 text-green-500 animate-bounce" style={{animationDelay: '0.1s'}} />
              <Zap className="h-12 w-12 text-yellow-500 animate-bounce" style={{animationDelay: '0.2s'}} />
              <Flame className="h-12 w-12 text-red-500 animate-bounce" style={{animationDelay: '0.3s'}} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10" />
      
      {/* Main content */}
      <Card className="relative z-10 w-full max-w-6xl mx-8 bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
        <CardContent className="p-12">
          {/* Room header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">{room.name}</h2>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>🏆 {room.totalQuestions} câu hỏi</span>
              <span>⏱️ {room.timePerQuestion}s mỗi câu</span>
              <span>👥 {room.participants.length} thách thủ</span>
            </div>
          </div>
          
          {/* Dynamic content based on stage */}
          <div className="min-h-[400px] flex items-center justify-center">
            {getStageContent()}
          </div>
          
          {/* Progress indicator */}
          <div className="mt-12">
            <div className="flex justify-center space-x-2 mb-4">
              {['intro', 'rules', 'participants', 'countdown', 'start'].map((stageName, index) => (
                <div
                  key={stageName}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    stageName === stage
                      ? 'bg-purple-600 scale-125'
                      : ['intro', 'rules', 'participants', 'countdown', 'start'].indexOf(stage) > index
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 capitalize">
              {stage === 'intro' && 'Khởi động...'}
              {stage === 'rules' && 'Ôn lại luật chơi...'}
              {stage === 'participants' && 'Giới thiệu thách thủ...'}
              {stage === 'countdown' && 'Đếm ngược...'}
              {stage === 'start' && 'Bắt đầu!'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
