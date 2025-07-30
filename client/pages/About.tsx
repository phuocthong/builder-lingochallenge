import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
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
  MessageCircle,
  CheckCircle,
  Zap,
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Bot,
      title: "AI Chatbot Thông Minh",
      description:
        "Học tiếng Anh qua trò chuyện tự nhiên với AI bot được thiết kế đặc biệt cho người Việt Nam",
    },
    {
      icon: Users,
      title: "Thách Đấu Bạn Bè",
      description:
        "Cạnh tranh với bạn bè trong các cuộc thi tiếng Anh thú vị và h���p dẫn",
    },
    {
      icon: Trophy,
      title: "Hệ Thống Xếp Hạng",
      description:
        "Theo dõi tiến bộ và cạnh tranh với hàng nghìn người học khác",
    },
    {
      icon: Target,
      title: "Nhiệm Vụ Hàng Ngày",
      description:
        "Hoàn thành các nhiệm vụ để duy trì động lực và nhận phần thưởng",
    },
    {
      icon: Gift,
      title: "Đổi Thưởng Hấp Dẫn",
      description:
        "Quy đổi điểm thành thẻ cào điện thoại và nhiều phần quà khác",
    },
    {
      icon: BarChart3,
      title: "Thống Kê Chi Tiết",
      description: "Theo dõi chi tiết quá trình học tập với biểu đồ và báo cáo",
    },
  ];

  const stats = [
    {
      icon: Users,
      number: "10,000+",
      label: "Người học",
    },
    {
      icon: Book,
      number: "50,000+",
      label: "Câu hỏi",
    },
    {
      icon: Star,
      number: "95%",
      label: "Hài lòng",
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Hỗ trợ",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Đăng Ký Miễn Phí",
      description:
        "Tạo tài khoản chỉ trong 30 giây với email hoặc số đi��n thoại",
    },
    {
      number: "2",
      title: "Bắt Đầu Chat",
      description:
        "Trò chuyện với AI bot và trả lời các câu hỏi tiếng Anh thú vị",
    },
    {
      number: "3",
      title: "Nhận Phần Thưởng",
      description: "Tích lũy điểm và đổi lấy thẻ cào, quà tặng hấp dẫn",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Bot className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Về EnglishBot
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Nền tảng học tiếng Anh thông minh sử dụng AI để mang đến trải nghiệm
            học tập hiệu quả và thú vị nhất cho người Việt Nam.
          </p>

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

      {/* Mission Section */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                EnglishBot được tạo ra với mục tiêu giúp người Việt Nam học
                tiếng Anh một cách hiệu quả và thú vị thông qua công nghệ AI
                tiên tiến.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Chúng tôi tin rằng việc học ngôn ngữ không chỉ là ghi nhớ từ
                vựng và ngữ pháp, mà còn là khả năng giao tiếp tự nhiên và tự
                tin trong mọi tình huống.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    Học tập cá nhân hóa với AI
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    Cộng đồng học tập sôi động
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Hệ thống thưởng hấp dẫn</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-purple-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Trò chuyện thông minh
                </h3>
                <p className="text-gray-600">
                  AI của chúng tôi hiểu ngữ cảnh và điều chỉnh bài học phù hợp
                  với trình độ của bạn
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn EnglishBot?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Những tính năng độc đáo giúp bạn học tiếng Anh hiệu quả và thú vị
              hơn bao giờ hết
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm"
              >
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
      <section className="px-4 py-16">
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Tham gia cùng hàng nghìn người học tiếng Anh thông minh với
            EnglishBot
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Đăng ký miễn phí
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Thử ngay
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
