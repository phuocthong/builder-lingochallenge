import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { 
  Bot, 
  Users, 
  Book, 
  Star, 
  Clock, 
  Trophy, 
  Gift,
  Target,
  BarChart3,
  ArrowRight,
  Sparkles,
  Play
} from "lucide-react";

interface IndexProps {
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export default function Index({ onShowLogin, onShowRegister }: IndexProps) {
  const features = [
    {
      icon: Bot,
      title: "AI Chatbot Thông Minh",
      description: "Học tiếng Anh qua trò chuyện tự nhiên với AI bot được thiết kế đặc biệt"
    },
    {
      icon: Users,
      title: "Thách Đấu Bạn Bè", 
      description: "Cạnh tranh với bạn bè trong các cuộc thi tiếng Anh thú vị và hấp dẫn"
    },
    {
      icon: Trophy,
      title: "Hệ Thống Xếp Hạng",
      description: "Theo dõi tiến bộ và cạnh tranh với hàng nghìn người học khác"
    },
    {
      icon: Target,
      title: "Nhiệm Vụ Hàng Ngày",
      description: "Hoàn thành các nhiệm vụ để duy trì động lực và nhận phần thưởng"
    },
    {
      icon: Gift,
      title: "Đổi Thưởng Hấp Dẫn",
      description: "Quy đổi điểm thành thẻ cào điện thoại và nhiều phần quà khác"
    },
    {
      icon: BarChart3,
      title: "Thống Kê Chi Tiết",
      description: "Theo dõi chi tiết quá trình học tập với biểu đồ và báo cáo"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Đăng Ký Miễn Phí",
      description: "Tạo tài khoản chỉ trong 30 giây với email hoặc số điện thoại"
    },
    {
      number: "2", 
      title: "Bắt Đầu Chat",
      description: "Trò chuyện với AI bot và trả lời các câu hỏi tiếng Anh thú vị"
    },
    {
      number: "3",
      title: "Nhận Phần Thưởng", 
      description: "Tích lũy điểm và đổi lấy thẻ cào, quà tặng hấp dẫn"
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "10,000+",
      label: "Người học"
    },
    {
      icon: Book,
      number: "50,000+", 
      label: "Câu hỏi"
    },
    {
      icon: Star,
      number: "95%",
      label: "Hài lòng"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Hỗ trợ"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* AI Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Bot className="w-12 h-12 text-white" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Học Tiếng Anh Thông Qua
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trò Chuyện AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Khám phá cách học tiếng Anh hiệu quả nhất với AI chatbot thông minh, thách đấu bạn bè và hệ thống phần thưởng hấp dẫn.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={onShowRegister}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Bắt Đầu Miễn Phí
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={onShowLogin}
              variant="outline" 
              className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Đăng Nhập
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn EnglishBot?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Những tính năng độc đáo giúp bạn học tiếng Anh hiệu quả và thú vị hơn bao giờ hết
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Cách Thức Hoạt Động
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Chỉ 3 bước đơn giản để bắt đầu hành trình học tiếng Anh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-2xl font-bold">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">
                  English<span className="text-purple-400">Bot</span>
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Nền tảng học tiếng Anh thông minh với AI chatbot, giúp bạn cải thiện kỹ năng tiếng Anh một cách hiệu quả và thú vị.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Facebook
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Instagram
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tính năng</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">AI Chatbot</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Thách đấu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bảng xếp hạng</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Đổi điểm</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Điều khoản</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chính sách</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EnglishBot. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
