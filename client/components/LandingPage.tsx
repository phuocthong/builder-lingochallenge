import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Bot,
  Users,
  Trophy,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Book,
  Target,
  Gift,
  Sparkles,
  MessageCircle,
  BarChart3,
  Clock
} from "lucide-react";

interface LandingPageProps {
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export function LandingPage({ onShowLogin, onShowRegister }: LandingPageProps) {
  const features = [
    {
      icon: <Bot className="h-8 w-8 text-purple-600" />,
      title: "AI Chatbot Thông Minh",
      description: "Học tiếng Anh qua trò chuyện tự nhiên với AI bot được thiết kế đặc biệt"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Thách Đấu Bạn Bè",
      description: "Cạnh tranh với bạn bè trong các cuộc thi tiếng Anh thú vị và hấp dẫn"
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-600" />,
      title: "Hệ Thống Xếp Hạng",
      description: "Theo dõi tiến bộ và cạnh tranh với hàng nghìn người học khác"
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Nhiệm Vụ Hàng Ngày",
      description: "Hoàn thành các nhiệm vụ để duy trì động lực và nhận phần thưởng"
    },
    {
      icon: <Gift className="h-8 w-8 text-red-600" />,
      title: "Đổi Thưởng Hấp Dẫn",
      description: "Quy đổi điểm thành thẻ cào điện thoại và nhiều phần quà khác"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
      title: "Thống Kê Chi Tiết",
      description: "Theo dõi chi tiết quá trình học tập với biểu đồ và báo cáo"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Người học", icon: <Users className="h-5 w-5" /> },
    { number: "50,000+", label: "Câu hỏi", icon: <Book className="h-5 w-5" /> },
    { number: "95%", label: "Hài lòng", icon: <Star className="h-5 w-5" /> },
    { number: "24/7", label: "Hỗ trợ", icon: <Clock className="h-5 w-5" /> }
  ];

  const testimonials = [
    {
      name: "Minh Anh",
      avatar: "MA",
      text: "Ứng dụng tuyệt vời! Tôi đã cải thiện được rất nhiều từ vựng chỉ sau 2 tuần.",
      rating: 5
    },
    {
      name: "Thu Hà", 
      avatar: "TH",
      text: "Thích nhất là tính năng thách đấu với bạn bè. Rất vui và có động lực học.",
      rating: 5
    },
    {
      name: "Đức Huy",
      avatar: "DH", 
      text: "Interface đẹp, dễ sử dụng. Học tiếng Anh chưa bao giờ thú vị đến thế!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main heading */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full shadow-lg">
                <Bot className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Học Tiếng Anh Thông Qua
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
                Trò Chuyện AI
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Khám phá cách học tiếng Anh hiệu quả nhất với AI chatbot thông minh, 
              thách đấu bạn bè và hệ thống phần thưởng hấp dẫn.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={onShowRegister}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Bắt Đầu Miễn Phí
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onShowLogin}
                className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="h-5 w-5 mr-2" />
                Đăng Nhập
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-2 bg-purple-100 rounded-full mr-2">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn EnglishBot?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những tính năng độc đáo giúp bạn học tiếng Anh hiệu quả và thú vị hơn bao giờ hết
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Cách Thức Hoạt Động
            </h2>
            <p className="text-xl text-gray-600">
              Chỉ 3 bước đơn giản để bắt đầu hành trình học tiếng Anh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Đăng Ký Miễn Phí</h3>
              <p className="text-gray-600">
                Tạo tài khoản chỉ trong 30 giây với email hoặc số điện thoại
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bắt Đầu Chat</h3>
              <p className="text-gray-600">
                Trò chuyện với AI bot và trả lời các câu hỏi tiếng Anh thú vị
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nhận Phần Thưởng</h3>
              <p className="text-gray-600">
                Tích lũy điểm và đổi lấy thẻ cào, quà tặng hấp dẫn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Người Dùng Nói Gì Về Chúng Tôi
            </h2>
            <p className="text-xl text-gray-600">
              Hàng nghìn người đã cải thiện tiếng Anh với EnglishBot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Sẵn Sàng Bắt Đầu Hành Trình Học Tiếng Anh?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Tham gia cùng hàng nghìn người học đã cải thiện tiếng Anh mỗi ngày
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onShowRegister}
              className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Đăng Ký Ngay - Miễn Phí
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onShowLogin}
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Đã Có Tài Khoản
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
