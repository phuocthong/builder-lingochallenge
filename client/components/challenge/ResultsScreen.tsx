import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star,
  Home,
  RotateCcw,
  Share2,
  Download,
  PartyPopper,
  TrendingUp
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ChallengeRoom } from "../../pages/ChallengeRoom";

interface ResultsScreenProps {
  room: ChallengeRoom;
  onReturnToLobby: () => void;
}

export function ResultsScreen({ room, onReturnToLobby }: ResultsScreenProps) {
  const { user } = useAuth();
  
  // Sort participants by score (descending)
  const sortedParticipants = [...room.participants].sort((a, b) => {
    const scoreA = a.score || 0;
    const scoreB = b.score || 0;
    return scoreB - scoreA;
  });

  const currentUserRank = sortedParticipants.findIndex(p => p.id === user.id) + 1;
  const currentUserScore = room.participants.find(p => p.id === user.id)?.score || 0;
  const maxScore = Math.max(...room.participants.map(p => p.score || 0));
  const averageScore = room.participants.reduce((sum, p) => sum + (p.score || 0), 0) / room.participants.length;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <Star className="h-4 w-4 text-gray-400" />;
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

  const getRankText = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇 Quán quân";
      case 2:
        return "🥈 Á quân";
      case 3:
        return "🥉 Hạng ba";
      default:
        return `#${rank}`;
    }
  };

  const getPerformanceMessage = () => {
    const percentage = (currentUserScore / room.totalQuestions) * 100;
    if (percentage >= 90) return "🎉 Xuất sắc! Bạn đã làm rất tốt!";
    if (percentage >= 75) return "👏 Tuyệt vời! Kết quả ấn tượng!";
    if (percentage >= 60) return "👍 Tốt lắm! Tiếp tục phát huy!";
    if (percentage >= 40) return "💪 Không tệ! Hãy cố gắng hơn!";
    return "📚 Cần cố gắng thêm! Đừng bỏ cuộc!";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <PartyPopper className="h-16 w-16 text-yellow-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🎊 Kết quả thử thách
        </h1>
        <h2 className="text-xl text-gray-700 mb-4">{room.name}</h2>
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <div>📝 {room.totalQuestions} câu hỏi</div>
          <div>👥 {room.participants.length} người chơi</div>
          <div>⏱️ {room.timePerQuestion}s mỗi câu</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Your Result */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-purple-600" />
                <span>Kết quả của bạn</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Your Rank */}
              <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="flex justify-center mb-4">
                  {getRankIcon(currentUserRank)}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {getRankText(currentUserRank)}
                </div>
                <div className="text-lg text-gray-700 mb-2">
                  {currentUserScore}/{room.totalQuestions} điểm
                </div>
                <div className="text-sm text-gray-600">
                  {Math.round((currentUserScore / room.totalQuestions) * 100)}% chính xác
                </div>
              </div>

              {/* Performance Message */}
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-blue-800 font-medium">
                  {getPerformanceMessage()}
                </p>
              </div>

              {/* Stats Comparison */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Điểm cao nhất:</span>
                  <span className="font-medium">{maxScore}/{room.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Điểm trung bình:</span>
                  <span className="font-medium">{averageScore.toFixed(1)}/{room.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hạng của bạn:</span>
                  <span className="font-medium">{currentUserRank}/{room.participants.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="mt-6">
            <CardContent className="pt-6 space-y-3">
              <Button
                onClick={onReturnToLobby}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                <Home className="h-4 w-4 mr-2" />
                Quay về sảnh
              </Button>
              
              <Button
                onClick={() => {
                  // Mock functionality
                  navigator.share?.({
                    title: 'Kết quả EnglishBot Challenge',
                    text: `Tôi vừa đạt ${currentUserScore}/${room.totalQuestions} điểm trong thử thách "${room.name}"!`,
                    url: window.location.href
                  }).catch(() => {
                    // Fallback: copy to clipboard
                    navigator.clipboard?.writeText(
                      `Tôi vừa đạt ${currentUserScore}/${room.totalQuestions} điểm trong thử thách "${room.name}" trên EnglishBot!`
                    );
                  });
                }}
                variant="outline"
                className="w-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Chia sẻ kết quả
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Final Rankings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>🏆 Bảng xếp hạng cuối cùng</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {room.participants.length} người chơi
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedParticipants.map((participant, index) => {
                  const rank = index + 1;
                  const score = participant.score || 0;
                  const percentage = Math.round((score / room.totalQuestions) * 100);
                  const isCurrentUser = participant.id === user.id;
                  
                  return (
                    <div
                      key={participant.id}
                      className={`p-4 rounded-lg border transition-all ${
                        isCurrentUser 
                          ? 'border-purple-300 bg-purple-50 ring-2 ring-purple-500' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        {/* Rank Icon */}
                        <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                          {getRankIcon(rank)}
                        </div>
                        
                        {/* Avatar */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 ${getRankBgColor(rank)}`}
                        >
                          {participant.avatar}
                        </div>
                        
                        {/* Player Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {participant.name}
                            </h3>
                            {participant.isHost && (
                              <Crown className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                            )}
                            {isCurrentUser && (
                              <Badge variant="outline" className="text-xs">
                                Bạn
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-3 mt-1">
                            <Badge
                              variant={rank <= 3 ? "default" : "secondary"}
                              className={`text-xs ${
                                rank === 1 ? 'bg-yellow-600' :
                                rank === 2 ? 'bg-gray-600' :
                                rank === 3 ? 'bg-amber-600' : ''
                              }`}
                            >
                              {getRankText(rank)}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {percentage}% chính xác
                            </span>
                          </div>
                        </div>
                        
                        {/* Score Display */}
                        <div className="text-right flex-shrink-0">
                          <div className={`text-2xl font-bold ${
                            rank === 1 ? 'text-yellow-600' : 
                            rank === 2 ? 'text-gray-600' :
                            rank === 3 ? 'text-amber-600' : 'text-gray-700'
                          }`}>
                            {score}
                          </div>
                          <div className="text-sm text-gray-500">
                            /{room.totalQuestions}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {maxScore}
                    </div>
                    <div className="text-sm text-gray-600">Điểm cao nhất</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {averageScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Điểm trung bình</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {room.participants.length}
                    </div>
                    <div className="text-sm text-gray-600">Người tham gia</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
