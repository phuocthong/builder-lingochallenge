import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star,
  Zap,
  TrendingUp
} from "lucide-react";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
}

interface CurrentAnswerer {
  id: string;
  name: string;
  avatar: string;
  timestamp: Date;
  isCorrect: boolean;
}

interface LiveScoreboardProps {
  participants: Participant[];
  scores: Record<string, number>;
  currentAnswerers: CurrentAnswerer[];
}

export function LiveScoreboard({ 
  participants, 
  scores, 
  currentAnswerers 
}: LiveScoreboardProps) {
  // Sort participants by score (descending) and then by name
  const sortedParticipants = [...participants].sort((a, b) => {
    const scoreA = scores[a.id] || 0;
    const scoreB = scores[b.id] || 0;
    if (scoreB !== scoreA) return scoreB - scoreA;
    return a.name.localeCompare(b.name);
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />;
      case 3:
        return <Medal className="h-4 w-4 text-amber-600" />;
      default:
        return <Star className="h-3 w-3 text-gray-400" />;
    }
  };

  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-500";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400";
      case 3:
        return "bg-gradient-to-r from-amber-500 to-amber-600";
      default:
        return "bg-gradient-to-r from-blue-500 to-purple-500";
    }
  };

  const getScoreDisplay = (participant: Participant) => {
    const score = scores[participant.id] || 0;
    const hasAnsweredCurrent = currentAnswerers.some(a => a.id === participant.id);
    const currentAnswer = currentAnswerers.find(a => a.id === participant.id);
    
    return {
      score,
      hasAnsweredCurrent,
      isCorrectCurrent: currentAnswer?.isCorrect || false,
      timestamp: currentAnswer?.timestamp
    };
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span>Bảng điểm trực tiếp</span>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedParticipants.map((participant, index) => {
            const rank = index + 1;
            const scoreData = getScoreDisplay(participant);
            
            return (
              <div
                key={participant.id}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  scoreData.hasAnsweredCurrent
                    ? scoreData.isCorrectCurrent
                      ? 'border-green-300 bg-green-50 shadow-md'
                      : 'border-red-300 bg-red-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* Rank Icon */}
                  <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
                    {getRankIcon(rank)}
                  </div>
                  
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 ${getRankBgColor(rank)}`}
                  >
                    {participant.avatar}
                  </div>
                  
                  {/* Player Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium text-gray-900 text-sm truncate">
                        {participant.name}
                      </span>
                      {participant.isHost && (
                        <Crown className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-1">
                      {/* Score */}
                      <span className="text-xs text-gray-600">
                        {scoreData.score} điểm
                      </span>
                      
                      {/* Current Answer Status */}
                      {scoreData.hasAnsweredCurrent && (
                        <Badge
                          variant={scoreData.isCorrectCurrent ? "default" : "secondary"}
                          className={`text-xs ${
                            scoreData.isCorrectCurrent 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : 'bg-red-500 hover:bg-red-600 text-white'
                          }`}
                        >
                          {scoreData.isCorrectCurrent ? '✅' : '❌'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Score Display */}
                  <div className="text-right flex-shrink-0">
                    <div className={`text-lg font-bold ${
                      rank === 1 ? 'text-yellow-600' : 
                      rank === 2 ? 'text-gray-600' :
                      rank === 3 ? 'text-amber-600' : 'text-gray-700'
                    }`}>
                      {scoreData.score}
                    </div>
                    {rank === 1 && scoreData.score > 0 && (
                      <div className="text-xs text-yellow-600 font-medium">
                        Dẫn đầu
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Recent Answer Animation */}
                {scoreData.hasAnsweredCurrent && scoreData.timestamp && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-xs">
                      <Zap className="h-3 w-3 text-blue-500" />
                      <span className="text-gray-600">
                        Vừa trả lời • {scoreData.timestamp.toLocaleTimeString('vi-VN', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-lg font-bold text-blue-600">
                {currentAnswerers.length}
              </div>
              <div className="text-xs text-gray-600">Đã trả lời</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-lg font-bold text-green-600">
                {currentAnswerers.filter(a => a.isCorrect).length}
              </div>
              <div className="text-xs text-gray-600">Trả lời đúng</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
