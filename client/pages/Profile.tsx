import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Calendar, Target, Trophy, CheckCircle, Plus, Clock, Flame, Star } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  completed: boolean;
  progress: number;
  target: number;
  category: 'practice' | 'learning' | 'challenge' | 'social';
  reward: number;
  dueDate: Date;
  completedDate?: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedDate: Date;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskType, setNewTaskType] = useState<'daily' | 'weekly'>('daily');
  const [newTaskCategory, setNewTaskCategory] = useState<Task['category']>('practice');
  const [newTaskTarget, setNewTaskTarget] = useState(1);
  const [showAddTask, setShowAddTask] = useState(false);

  // Initialize with sample tasks
  useEffect(() => {
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Trả lời đúng 10 câu hỏi',
        description: 'Hoàn thành 10 câu trả lời chính xác trong ngày',
        type: 'daily',
        completed: false,
        progress: 7,
        target: 10,
        category: 'practice',
        reward: 50,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Duy trì streak 3 ngày',
        description: 'Chơi liên tục 3 ngày không nghỉ',
        type: 'daily',
        completed: true,
        progress: 3,
        target: 3,
        category: 'practice',
        reward: 100,
        dueDate: new Date(),
        completedDate: new Date()
      },
      {
        id: '3',
        title: 'Thách đấu với 5 bạn bè',
        description: 'Tham gia thách đấu với ít nhất 5 người bạn trong tuần',
        type: 'weekly',
        completed: false,
        progress: 2,
        target: 5,
        category: 'social',
        reward: 200,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: '4',
        title: 'Đạt top 10 leaderboard',
        description: 'Leo lên top 10 bảng xếp hạng tuần này',
        type: 'weekly',
        completed: false,
        progress: 0,
        target: 1,
        category: 'challenge',
        reward: 300,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    ];

    const sampleAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Người m���i bắt đầu',
        description: 'Hoàn thành nhiệm vụ đầu tiên',
        icon: '🌟',
        rarity: 'common',
        unlockedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Streak Master',
        description: 'Duy trì streak 7 ngày liên tiếp',
        icon: '🔥',
        rarity: 'rare',
        unlockedDate: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    ];

    setTasks(sampleTasks);
    setAchievements(sampleAchievements);
  }, []);

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      type: newTaskType,
      completed: false,
      progress: 0,
      target: newTaskTarget,
      category: newTaskCategory,
      reward: newTaskType === 'daily' ? 50 : 200,
      dueDate: new Date(Date.now() + (newTaskType === 'daily' ? 24 : 7 * 24) * 60 * 60 * 1000)
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskTarget(1);
    setShowAddTask(false);
  };

  const updateTaskProgress = (taskId: string, newProgress: number) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const completed = newProgress >= task.target;
        return {
          ...task,
          progress: Math.min(newProgress, task.target),
          completed,
          completedDate: completed ? new Date() : undefined
        };
      }
      return task;
    }));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getTaskCategoryIcon = (category: Task['category']) => {
    switch (category) {
      case 'practice': return <Target className="w-4 h-4" />;
      case 'learning': return <Star className="w-4 h-4" />;
      case 'challenge': return <Trophy className="w-4 h-4" />;
      case 'social': return <Calendar className="w-4 h-4" />;
    }
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
    }
  };

  const dailyTasks = tasks.filter(task => task.type === 'daily');
  const weeklyTasks = tasks.filter(task => task.type === 'weekly');
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  if (!user.isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <p className="text-gray-600">Vui lòng đăng nhập để xem hồ sơ cá nhân</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* User Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Trophy className="w-3 h-3" />
                  <span>Hạng {user.stats?.rank}</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Flame className="w-3 h-3" />
                  <span>Streak {user.stats?.streak}</span>
                </Badge>
                <Badge variant="secondary">
                  Độ chính xác: {user.stats?.accuracy}%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nhiệm vụ hoàn thành</p>
                <p className="text-2xl font-bold">{completedTasks}/{totalTasks}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nhiệm vụ hôm nay</p>
                <p className="text-2xl font-bold">{dailyTasks.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thành tích</p>
                <p className="text-2xl font-bold">{achievements.length}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks and Achievements Tabs */}
      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tasks">Nhiệm vụ</TabsTrigger>
          <TabsTrigger value="achievements">Thành tích</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Nhiệm vụ của tôi</h3>
            <Button onClick={() => setShowAddTask(true)} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Thêm nhiệm vụ</span>
            </Button>
          </div>

          {showAddTask && (
            <Card>
              <CardHeader>
                <CardTitle>Tạo nhiệm vụ mới</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tiêu đề</label>
                  <Input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Nhập tiêu đề nhiệm vụ..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Mô tả</label>
                  <Textarea
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Mô tả chi tiết nhiệm vụ..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Loại nhiệm vụ</label>
                    <select 
                      value={newTaskType} 
                      onChange={(e) => setNewTaskType(e.target.value as 'daily' | 'weekly')}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="daily">Hàng ngày</option>
                      <option value="weekly">Hàng tuần</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Danh mục</label>
                    <select 
                      value={newTaskCategory} 
                      onChange={(e) => setNewTaskCategory(e.target.value as Task['category'])}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="practice">Luyện tập</option>
                      <option value="learning">Học tập</option>
                      <option value="challenge">Thách đấu</option>
                      <option value="social">Xã hội</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Mục tiêu (số lượng)</label>
                  <Input
                    type="number"
                    min="1"
                    value={newTaskTarget}
                    onChange={(e) => setNewTaskTarget(parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={addTask}>Tạo nhiệm vụ</Button>
                  <Button variant="outline" onClick={() => setShowAddTask(false)}>Hủy</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="daily" className="w-full">
            <TabsList>
              <TabsTrigger value="daily">Hàng ngày ({dailyTasks.length})</TabsTrigger>
              <TabsTrigger value="weekly">Hàng tuần ({weeklyTasks.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-3">
              {dailyTasks.map(task => (
                <Card key={task.id} className={task.completed ? 'bg-green-50 border-green-200' : ''}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {getTaskCategoryIcon(task.category)}
                          <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </h4>
                          {task.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Tiến độ: {task.progress}/{task.target}</span>
                              <span>{Math.round((task.progress / task.target) * 100)}%</span>
                            </div>
                            <Progress value={(task.progress / task.target) * 100} />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            +{task.reward} XP
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {!task.completed && (
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => updateTaskProgress(task.id, task.progress + 1)}
                              disabled={task.progress >= task.target}
                            >
                              +1
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => updateTaskProgress(task.id, task.target)}
                            >
                              Hoàn thành
                            </Button>
                          </div>
                        )}
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => deleteTask(task.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {dailyTasks.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">Chưa có nhiệm vụ hàng ngày nào</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="weekly" className="space-y-3">
              {weeklyTasks.map(task => (
                <Card key={task.id} className={task.completed ? 'bg-green-50 border-green-200' : ''}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {getTaskCategoryIcon(task.category)}
                          <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </h4>
                          {task.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Tiến độ: {task.progress}/{task.target}</span>
                              <span>{Math.round((task.progress / task.target) * 100)}%</span>
                            </div>
                            <Progress value={(task.progress / task.target) * 100} />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            +{task.reward} XP
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>Hạn: {task.dueDate.toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {!task.completed && (
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => updateTaskProgress(task.id, task.progress + 1)}
                              disabled={task.progress >= task.target}
                            >
                              +1
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => updateTaskProgress(task.id, task.target)}
                            >
                              Hoàn thành
                            </Button>
                          </div>
                        )}
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => deleteTask(task.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {weeklyTasks.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">Chưa có nhiệm vụ hàng tuần nào</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <h3 className="text-xl font-semibold">Thành tích đã mở khóa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map(achievement => (
              <Card key={achievement.id}>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    <Badge className={`mt-2 ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity === 'common' ? 'Thường' :
                       achievement.rarity === 'rare' ? 'Hiếm' :
                       achievement.rarity === 'epic' ? 'Sử thi' : 'Huyền thoại'}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-2">
                      Mở khóa: {achievement.unlockedDate.toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
