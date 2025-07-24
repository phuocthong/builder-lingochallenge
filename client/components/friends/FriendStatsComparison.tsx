import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  Trophy, 
  Target, 
  Flame, 
  Star,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";

interface UserStats {
  rank: number;
  totalCorrect: number;
  streak: number;
  accuracy: number;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  stats: UserStats;
}

interface FriendStatsComparisonProps {
  user: {
    name: string;
    avatar: string;
    stats: UserStats;
  };
  friend: Friend;
}

export function FriendStatsComparison({ user, friend }: FriendStatsComparisonProps) {
  const compareStats = (userValue: number, friendValue: number) => {
    if (userValue > friendValue) return 'better';
    if (userValue < friendValue) return 'worse';
    return 'equal';
  };

  const getComparisonColor = (comparison: string) => {
    switch (comparison) {
      case 'better': return 'text-green-600';
      case 'worse': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getComparisonIcon = (comparison: string) => {
    switch (comparison) {
      case 'better': return '📈';
      case 'worse': return '📉'; 
      default: return '➖';
    }
  };

  const stats = [
    {
      key: 'rank',
      name: 'Xếp hạng',
      icon: Trophy,
      userValue: user.stats.rank,
      friendValue: friend.stats.rank,
      unit: '#',
      reverse: true // Lower rank is better
    },
    {
      key: 'totalCorrect',
      name: 'Câu đúng',
      icon: Target,
      userValue: user.stats.totalCorrect,
      friendValue: friend.stats.totalCorrect,
      unit: ''
    },
    {
      key: 'streak',
      name: 'Streak',
      icon: Flame,
      userValue: user.stats.streak,
      friendValue: friend.stats.streak,
      unit: ''
    },
    {
      key: 'accuracy',
      name: 'Độ chính xác',
      icon: Star,
      userValue: user.stats.accuracy,
      friendValue: friend.stats.accuracy,
      unit: '%'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          <span>So sánh thống kê</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Player Avatars */}
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                {user.avatar}
              </div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <Badge variant="outline" className="text-xs">Bạn</Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-yellow-500" />
              <span className="text-lg font-bold text-gray-600">VS</span>
              <Zap className="h-6 w-6 text-yellow-500" />
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                {friend.avatar}
              </div>
              <p className="font-medium text-gray-900">{friend.name}</p>
              <Badge variant="secondary" className="text-xs">Bạn bè</Badge>
            </div>
          </div>

          {/* Stats Comparison */}
          <div className="space-y-4">
            {stats.map((stat) => {
              const comparison = stat.reverse 
                ? compareStats(stat.friendValue, stat.userValue)
                : compareStats(stat.userValue, stat.friendValue);
              
              const maxValue = Math.max(stat.userValue, stat.friendValue);
              const userPercentage = (stat.userValue / maxValue) * 100;
              const friendPercentage = (stat.friendValue / maxValue) * 100;

              return (
                <div key={stat.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <stat.icon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{stat.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {getComparisonIcon(comparison)}
                      </span>
                      <span className={`text-xs font-medium ${getComparisonColor(comparison)}`}>
                        {comparison === 'better' ? 'Bạn tốt hơn' :
                         comparison === 'worse' ? 'Bạn bè tốt hơn' :
                         'Ngang bằng'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* User Progress */}
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-purple-600 font-medium">
                          {stat.unit === '#' ? `${stat.unit}${stat.userValue}` : `${stat.userValue}${stat.unit}`}
                        </span>
                      </div>
                      <Progress 
                        value={userPercentage} 
                        className="h-2 bg-gray-200" 
                        style={{'--progress-background': 'linear-gradient(to right, #8b5cf6, #3b82f6)'} as any}
                      />
                    </div>
                    
                    {/* Friend Progress */}
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span></span>
                        <span className="text-green-600 font-medium">
                          {stat.unit === '#' ? `${stat.unit}${stat.friendValue}` : `${stat.friendValue}${stat.unit}`}
                        </span>
                      </div>
                      <Progress 
                        value={friendPercentage} 
                        className="h-2 bg-gray-200" 
                        style={{'--progress-background': 'linear-gradient(to right, #10b981, #06b6d4)'} as any}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overall Comparison */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-900">Đánh giá tổng quan</span>
            </div>
            <p className="text-sm text-purple-800">
              {user.stats.rank < friend.stats.rank 
                ? `🎉 Bạn đang dẫn trước ${friend.name} ${friend.stats.rank - user.stats.rank} bậc xếp hạng!`
                : user.stats.rank > friend.stats.rank
                ? `💪 ${friend.name} đang dẫn trước bạn ${user.stats.rank - friend.stats.rank} bậc. Cố gắng lên!`
                : `🤝 Bạn và ${friend.name} đang ngang tài!`
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
