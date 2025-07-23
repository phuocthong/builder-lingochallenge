import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star,
  Home,
  Share2,
  Award,
  TrendingUp,
  Zap,
  Target,
  Users,
  Clock,
  Flame,
  Rocket,
  PartyPopper,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ChallengeRoom } from "../../pages/ChallengeRoom";

interface DesktopResultsScreenProps {
  room: ChallengeRoom;
  onReturnToLobby: () => void;
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
}

export function DesktopResultsScreen({ room, onReturnToLobby }: DesktopResultsScreenProps) {
  const { user } = useAuth();
  const [stage, setStage] = useState<'entrance' | 'podium' | 'rankings' | 'celebration'>('entrance');
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [podiumHighlight, setPodiumHighlight] = useState(0);
  
  // Sort participants by score
  const sortedParticipants = [...room.participants].sort((a, b) => {
    const scoreA = a.score || 0;
    const scoreB = b.score || 0;
    return scoreB - scoreA;
  });

  const currentUserRank = sortedParticipants.findIndex(p => p.id === user.id) + 1;
  const currentUserScore = room.participants.find(p => p.id === user.id)?.score || 0;
  const maxScore = Math.max(...room.participants.map(p => p.score || 0));
  const averageScore = room.participants.reduce((sum, p) => sum + (p.score || 0), 0) / room.participants.length;

  // Generate confetti
  useEffect(() => {
    const generateConfetti = () => {
      const newConfetti: Confetti[] = [];
      for (let i = 0; i < 100; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -20,
          color: ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6'][Math.floor(Math.random() * 5)],
          size: Math.random() * 8 + 4,
          speedX: (Math.random() - 0.5) * 4,
          speedY: Math.random() * 3 + 2,
          rotation: Math.random() * 360
        });
      }
      setConfetti(newConfetti);
    };

    generateConfetti();
  }, []);

  // Animate confetti
  useEffect(() => {
    const interval = setInterval(() => {
      setConfetti(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        rotation: particle.rotation + 5
      })).filter(particle => particle.y < window.innerHeight + 20));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Stage progression
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // Entrance -> Podium
    timers.push(setTimeout(() => setStage('podium'), 2000));
    
    // Podium highlighting
    timers.push(setTimeout(() => {
      const podiumInterval = setInterval(() => {
        setPodiumHighlight(prev => {
          if (prev >= 2) {
            clearInterval(podiumInterval);
            setStage('rankings');
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }, 3000));
    
    // Rankings -> Celebration
    timers.push(setTimeout(() => setStage('celebration'), 8000));

    return () => timers.forEach(clearTimeout);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-8 w-8 text-yellow-500" />;
      case 2: return <Medal className="h-8 w-8 text-gray-400" />;
      case 3: return <Medal className="h-8 w-8 text-amber-600" />;
      default: return <Star className="h-6 w-6 text-gray-400" />;
    }
  };

  const getPodiumHeight = (position: number) => {
    switch (position) {
      case 0: return 'h-32'; // 1st place
      case 1: return 'h-24'; // 2nd place  
      case 2: return 'h-20'; // 3rd place
      default: return 'h-16';
    }
  };

  const getPodiumColor = (position: number) => {
    switch (position) {
      case 0: return 'from-yellow-400 to-yellow-500';
      case 1: return 'from-gray-300 to-gray-400';
      case 2: return 'from-amber-500 to-amber-600';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const getPerformanceMessage = () => {
    const percentage = (currentUserScore / room.totalQuestions) * 100;
    if (currentUserRank === 1) return "🎉 CHAMPION! Bạn đã giành chiến thắng!";
    if (currentUserRank <= 3) return "🏆 Xuất sắc! Bạn ��ã lọt vào Top 3!";
    if (percentage >= 80) return "⭐ Tuyệt vời! Hiệu suất cao!";
    if (percentage >= 60) return "👍 Tốt lắm! Tiếp tục phát huy!";
    return "💪 Cố gắng lên! Lần sau sẽ tốt hơn!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Confetti Animation */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {confetti.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-sm"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              transform: `rotate(${particle.rotation}deg)`,
            }}
          />
        ))}
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 animate-pulse" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: '4s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          {stage === 'entrance' && (
            <div className="animate-fade-in">
              <Rocket className="h-24 w-24 text-yellow-400 mx-auto mb-6 animate-bounce" />
              <h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
                THÁCH ĐẤU HOÀN THÀNH!
              </h1>
              <p className="text-2xl text-purple-200">Đang tính toán kết quả...</p>
            </div>
          )}
          
          {stage !== 'entrance' && (
            <div className="animate-slide-down">
              <div className="flex justify-center items-center space-x-4 mb-6">
                <PartyPopper className="h-16 w-16 text-yellow-400" />
                <h1 className="text-5xl font-bold text-white">🏆 KẾT QUẢ THÁCH ĐẤU</h1>
                <Sparkles className="h-16 w-16 text-pink-400" />
              </div>
              <h2 className="text-2xl text-purple-200 mb-2">{room.name}</h2>
              <div className="flex justify-center space-x-8 text-purple-300">
                <span>📝 {room.totalQuestions} câu hỏi</span>
                <span>👥 {room.participants.length} thách thủ</span>
                <span>⏱️ {room.timePerQuestion}s mỗi câu</span>
              </div>
            </div>
          )}
        </div>

        {stage !== 'entrance' && (
          <div className="grid grid-cols-12 gap-8">
            
            {/* Left Panel - Your Results */}
            <div className="col-span-4 space-y-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-xl">
                    <Target className="h-6 w-6 text-purple-400" />
                    <span>Kết quả của bạn</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Rank Display */}
                  <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-white/10">
                    <div className="flex justify-center mb-4">
                      {getRankIcon(currentUserRank)}
                    </div>
                    <div className="text-3xl font-bold mb-2">
                      {currentUserRank === 1 ? '🥇 CHAMPION' :
                       currentUserRank === 2 ? '🥈 Á QUÂN' :
                       currentUserRank === 3 ? '🥉 HẠNG BA' :
                       `#${currentUserRank}`}
                    </div>
                    <div className="text-2xl font-medium mb-2">
                      {currentUserScore}/{room.totalQuestions} điểm
                    </div>
                    <div className="text-purple-200">
                      {Math.round((currentUserScore / room.totalQuestions) * 100)}% chính xác
                    </div>
                  </div>

                  {/* Performance Message */}
                  <div className="p-4 bg-blue-500/20 rounded-lg text-center border border-blue-400/30">
                    <p className="font-medium text-blue-200">
                      {getPerformanceMessage()}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
                      <div className="text-xl font-bold text-yellow-200">{maxScore}</div>
                      <div className="text-xs text-yellow-300">Điểm cao nhất</div>
                    </div>
                    <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-400/30">
                      <div className="text-xl font-bold text-green-200">{averageScore.toFixed(1)}</div>
                      <div className="text-xs text-green-300">Điểm TB</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="pt-6 space-y-4">
                  <Button
                    onClick={onReturnToLobby}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 h-14 text-lg font-medium"
                    size="lg"
                  >
                    <Home className="h-5 w-5 mr-2" />
                    Quay về sảnh
                  </Button>
                  
                  <Button
                    onClick={() => {
                      navigator.share?.({
                        title: 'Kết quả EnglishBot Challenge',
                        text: `Tôi vừa đạt hạng #${currentUserRank} với ${currentUserScore}/${room.totalQuestions} điểm trong thách đấu "${room.name}"!`,
                        url: window.location.href
                      }).catch(() => {
                        navigator.clipboard?.writeText(
                          `Tôi vừa đạt hạng #${currentUserRank} với ${currentUserScore}/${room.totalQuestions} điểm trong thách đấu "${room.name}" trên EnglishBot!`
                        );
                      });
                    }}
                    variant="outline"
                    className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 h-12 font-medium"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Chia sẻ kết quả
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Center Panel - Podium */}
            {(stage === 'podium' || stage === 'rankings' || stage === 'celebration') && (
              <div className="col-span-4">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="text-center text-white text-2xl">
                      🏆 PODIUM VINH DANH
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-center space-x-4 mb-8">
                      {sortedParticipants.slice(0, 3).map((participant, index) => {
                        const actualPosition = index === 0 ? 0 : index === 1 ? 1 : 2; // 1st, 2nd, 3rd
                        const isHighlighted = podiumHighlight >= actualPosition;
                        
                        return (
                          <div
                            key={participant.id}
                            className={`text-center transition-all duration-1000 ${
                              isHighlighted ? 'scale-110' : 'scale-90 opacity-50'
                            }`}
                          >
                            {/* Trophy/Medal */}
                            <div className="mb-4">
                              {actualPosition === 0 && (
                                <div className="relative">
                                  <Crown className="h-16 w-16 text-yellow-400 mx-auto animate-bounce" />
                                  {isHighlighted && (
                                    <div className="absolute inset-0 animate-ping">
                                      <Crown className="h-16 w-16 text-yellow-300 mx-auto opacity-50" />
                                    </div>
                                  )}
                                </div>
                              )}
                              {actualPosition === 1 && (
                                <Medal className="h-14 w-14 text-gray-300 mx-auto animate-pulse" />
                              )}
                              {actualPosition === 2 && (
                                <Medal className="h-12 w-12 text-amber-500 mx-auto animate-pulse" />
                              )}
                            </div>
                            
                            {/* Avatar */}
                            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-xl font-bold mb-3 ${
                              `bg-gradient-to-br ${getPodiumColor(actualPosition)}`
                            } ${isHighlighted ? 'ring-4 ring-white/50' : ''}`}>
                              {participant.avatar}
                            </div>
                            
                            {/* Name */}
                            <h3 className="text-white font-bold text-lg mb-1">
                              {participant.name}
                            </h3>
                            
                            {/* Score */}
                            <div className="text-2xl font-bold text-white mb-2">
                              {participant.score || 0}
                            </div>
                            
                            {/* Podium Base */}
                            <div className={`mx-auto w-24 ${getPodiumHeight(actualPosition)} bg-gradient-to-t ${getPodiumColor(actualPosition)} rounded-t-lg border-t-4 border-white/30 flex items-center justify-center`}>
                              <span className="text-white font-bold text-2xl">
                                {actualPosition + 1}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Right Panel - Full Rankings */}
            {(stage === 'rankings' || stage === 'celebration') && (
              <div className="col-span-4">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6 text-green-400" />
                      <span>Bảng xếp hạng đầy đủ</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {sortedParticipants.map((participant, index) => {
                        const rank = index + 1;
                        const score = participant.score || 0;
                        const isCurrentUser = participant.id === user.id;
                        
                        return (
                          <div
                            key={participant.id}
                            className={`p-3 rounded-lg border transition-all ${
                              isCurrentUser 
                                ? 'border-purple-400 bg-purple-500/20 ring-2 ring-purple-400' 
                                : 'border-white/10 bg-white/5'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-8 h-8">
                                {getRankIcon(rank)}
                              </div>
                              
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                                `bg-gradient-to-br ${getPodiumColor(Math.min(index, 3))}`
                              }`}>
                                {participant.avatar}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-white">
                                    {participant.name}
                                  </span>
                                  {isCurrentUser && (
                                    <Badge className="text-xs bg-purple-600 text-white">
                                      Bạn
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-purple-200">
                                  {Math.round((score / room.totalQuestions) * 100)}% chính xác
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className={`text-xl font-bold ${
                                  rank === 1 ? 'text-yellow-400' : 
                                  rank === 2 ? 'text-gray-300' :
                                  rank === 3 ? 'text-amber-400' : 'text-white'
                                }`}>
                                  {score}
                                </div>
                                <div className="text-sm text-purple-200">
                                  điểm
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
