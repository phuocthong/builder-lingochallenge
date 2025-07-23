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
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex justify-center mb-3 sm:mb-4">
          <PartyPopper className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          🎊 Kết quả thử thách
        </h1>
        <h2 className="text-lg sm:text-xl text-gray-700 mb-3 sm:mb-4 px-2">{room.name}</h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-gray-600">
          <div className="bg-gray-50 px-2 py-1 rounded">📝 {room.totalQuestions} câu hỏi</div>
          <div className="bg-gray-50 px-2 py-1 rounded">👥 {room.participants.length} người chơi</div>
          <div className="bg-gray-50 px-2 py-1 rounded">⏱️ {room.timePerQuestion}s mỗi câu</div>
        </div>
      </div>

      <div className="flex flex-col space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
        {/* Your Result */}
        <div className="order-1 lg:col-span-1">
          <Card className="h-fit">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                <span>Kết quả của bạn</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {/* Your Rank */}
              <div className="text-center p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="flex justify-center mb-3 sm:mb-4">
                  {getRankIcon(currentUserRank)}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {getRankText(currentUserRank)}
                </div>
                <div className="text-base sm:text-lg text-gray-700 mb-2">
                  {currentUserScore}/{room.totalQuestions} điểm
                </div>
                <div className="text-sm text-gray-600">
                  {Math.round((currentUserScore / room.totalQuestions) * 100)}% chính xác
                </div>
              </div>

              {/* Performance Message */}
              <div className="p-3 sm:p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-blue-800 font-medium text-sm sm:text-base">
                  {getPerformanceMessage()}
                </p>
              </div>

              {/* Stats Comparison */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Điểm cao nhất:</span>
                  <span className="font-medium">{maxScore}/{room.totalQuestions}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Điểm trung bình:</span>
                  <span className="font-medium">{averageScore.toFixed(1)}/{room.totalQuestions}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Hạng của bạn:</span>
                  <span className="font-medium">{currentUserRank}/{room.participants.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="mt-4 sm:mt-6">
            <CardContent className="pt-4 sm:pt-6 space-y-3">
              <Button
                onClick={onReturnToLobby}
                className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-base font-medium"
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
                className="w-full h-11 text-base font-medium"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Chia sẻ kết quả
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Final Rankings */}
        <div className="order-2 lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                <div className="flex items-center space-x-2 min-w-0">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span className="truncate">🏆 Bảng xếp hạng cuối cùng</span>
                </div>
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  {room.participants.length} người chơi
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 sm:space-y-4">
                {sortedParticipants.map((participant, index) => {
                  const rank = index + 1;
                  const score = participant.score || 0;
                  const percentage = Math.round((score / room.totalQuestions) * 100);
                  const isCurrentUser = participant.id === user.id;

                  return (
                    <div
                      key={participant.id}
                      className={`p-3 sm:p-4 rounded-lg border transition-all ${
                        isCurrentUser
                          ? 'border-purple-300 bg-purple-50 ring-2 ring-purple-500'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        {/* Rank Icon */}
                        <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                          {getRankIcon(rank)}
                        </div>

                        {/* Avatar */}
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 text-sm sm:text-base ${getRankBgColor(rank)}`}
                        >
                          {participant.avatar}
                        </div>

                        {/* Player Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                              {participant.name}
                            </h3>
                            {participant.isHost && (
                              <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                            )}
                            {isCurrentUser && (
                              <Badge variant="outline" className="text-xs flex-shrink-0">
                                Bạn
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                            <Badge
                              variant={rank <= 3 ? "default" : "secondary"}
                              className={`text-xs self-start ${
                                rank === 1 ? 'bg-yellow-600' :
                                rank === 2 ? 'bg-gray-600' :
                                rank === 3 ? 'bg-amber-600' : ''
                              }`}
                            >
                              {getRankText(rank)}
                            </Badge>
                            <span className="text-xs sm:text-sm text-gray-600">
                              {percentage}% chính xác
                            </span>
                          </div>
                        </div>

                        {/* Score Display */}
                        <div className="text-right flex-shrink-0">
                          <div className={`text-xl sm:text-2xl font-bold ${
                            rank === 1 ? 'text-yellow-600' :
                            rank === 2 ? 'text-gray-600' :
                            rank === 3 ? 'text-amber-600' : 'text-gray-700'
                          }`}>
                            {score}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            /{room.totalQuestions}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Stats */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="text-center p-3 sm:p-4 bg-yellow-50 rounded-lg">
                    <div className="text-lg sm:text-2xl font-bold text-yellow-600">
                      {maxScore}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Điểm cao nhất</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg sm:text-2xl font-bold text-blue-600">
                      {averageScore.toFixed(1)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Điểm trung bình</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                    <div className="text-lg sm:text-2xl font-bold text-green-600">
                      {room.participants.length}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Người tham gia</div>
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
