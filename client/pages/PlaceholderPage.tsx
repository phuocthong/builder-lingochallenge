import { Button } from "../components/ui/button";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Construction className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">
            Trang này đang được phát triển. Vui lòng quay lại sau hoặc tiếp tục
            trò chuyện với bot để học tiếng Anh.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Quay về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
