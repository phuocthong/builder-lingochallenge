<template>
  <q-page class="bg-gradient-to-br from-purple-50 to-blue-50">
    <!-- Kiểm tra đăng nhập -->
    <div
      v-if="!authStore.isLoggedIn"
      class="flex items-center justify-center min-h-screen"
    >
      <q-card class="max-w-md mx-auto">
        <q-card-section class="text-center">
          <q-icon name="lock" size="xl" color="grey-5" class="q-mb-md" />
          <h2 class="text-h5 q-mb-md">🔒 Yêu cầu đăng nhập</h2>
          <p class="text-grey-6 q-mb-lg">
            Bạn cần đăng nhập để truy cập cửa hàng
          </p>
          <q-btn
            color="primary"
            label="Quay lại trang chủ"
            @click="$router.push('/')"
          />
        </q-card-section>
      </q-card>
    </div>

    <!-- Shop Interface -->
    <div v-else class="max-w-6xl mx-auto q-pa-md">
      <!-- Header -->
      <div class="text-center q-mb-lg">
        <h1 class="text-h3 text-weight-bold text-grey-9 q-mb-md">
          🛒 Cửa hàng EnglishBot
        </h1>
        <p class="text-h6 text-grey-6 max-w-2xl mx-auto">
          Đổi điểm thành thẻ cào điện thoại và nhiều phần quà hấp dẫn khác
        </p>
      </div>

      <!-- Current Points -->
      <q-card class="q-mb-lg">
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="col">
              <h3 class="text-h6 text-weight-medium q-mb-sm">
                💰 Điểm của bạn
              </h3>
              <div class="text-h4 text-weight-bold text-primary">
                {{ currentPoints }} điểm
              </div>
              <p class="text-grey-6">
                Kiếm thêm điểm bằng cách trả lời đúng câu hỏi!
              </p>
            </div>
            <div class="col-auto">
              <q-icon name="star" size="3rem" color="yellow" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Shop Categories -->
      <q-tabs
        v-model="activeCategory"
        dense
        class="text-grey-6 q-mb-lg"
        active-color="primary"
        indicator-color="primary"
        align="left"
      >
        <q-tab name="phone-cards" icon="phone" label="Thẻ cào điện thoại" />
        <q-tab name="gifts" icon="redeem" label="Quà tặng khác" />
        <q-tab name="premium" icon="star" label="Tính năng Premium" />
      </q-tabs>

      <!-- Phone Cards Tab -->
      <div v-if="activeCategory === 'phone-cards'">
        <div class="row q-gutter-md">
          <div
            class="col-12 col-md-6 col-lg-4"
            v-for="card in phoneCards"
            :key="card.id"
          >
            <q-card class="card-hover">
              <q-card-section>
                <!-- Provider Logo -->
                <div class="text-center q-mb-md">
                  <div class="provider-logo">
                    {{ card.provider }}
                  </div>
                  <h3 class="text-h6 text-weight-medium q-mt-sm">
                    {{ card.name }}
                  </h3>
                </div>

                <!-- Card Details -->
                <div class="card-details q-mb-md">
                  <div class="row justify-between">
                    <span class="text-weight-medium">Mệnh giá:</span>
                    <span class="text-weight-bold text-green-6"
                      >{{ card.value.toLocaleString() }}đ</span
                    >
                  </div>
                  <div class="row justify-between">
                    <span class="text-weight-medium">Giá điểm:</span>
                    <span class="text-weight-bold text-orange-6"
                      >{{ card.points }} điểm</span
                    >
                  </div>
                  <div class="row justify-between">
                    <span class="text-weight-medium">Tiết kiệm:</span>
                    <span class="text-weight-bold text-purple-6"
                      >{{ card.discount }}%</span
                    >
                  </div>
                </div>

                <!-- Buy Button -->
                <q-btn
                  color="primary"
                  :label="canAfford(card.points) ? 'Đổi ngay' : 'Không đủ điểm'"
                  :disable="!canAfford(card.points)"
                  @click="purchaseItem(card)"
                  class="full-width"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Gifts Tab -->
      <div v-else-if="activeCategory === 'gifts'">
        <div class="row q-gutter-md">
          <div
            class="col-12 col-md-6 col-lg-4"
            v-for="gift in gifts"
            :key="gift.id"
          >
            <q-card class="card-hover">
              <q-card-section>
                <div class="text-center q-mb-md">
                  <q-icon :name="gift.icon" size="3rem" :color="gift.color" />
                  <h3 class="text-h6 text-weight-medium q-mt-sm">
                    {{ gift.name }}
                  </h3>
                  <p class="text-grey-6">{{ gift.description }}</p>
                </div>

                <div class="text-center q-mb-md">
                  <div class="text-h5 text-weight-bold text-orange-6">
                    {{ gift.points }} điểm
                  </div>
                </div>

                <q-btn
                  color="primary"
                  :label="canAfford(gift.points) ? 'Đổi ngay' : 'Không đủ điểm'"
                  :disable="!canAfford(gift.points)"
                  @click="purchaseItem(gift)"
                  class="full-width"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Premium Tab -->
      <div v-else-if="activeCategory === 'premium'">
        <div class="row q-gutter-md">
          <div
            class="col-12 col-md-6"
            v-for="feature in premiumFeatures"
            :key="feature.id"
          >
            <q-card class="card-hover premium-card">
              <q-card-section>
                <div class="row items-center q-mb-md">
                  <q-icon
                    :name="feature.icon"
                    size="2rem"
                    color="yellow"
                    class="q-mr-md"
                  />
                  <div>
                    <h3 class="text-h6 text-weight-medium">
                      {{ feature.name }}
                    </h3>
                    <p class="text-grey-6 q-ma-none">
                      {{ feature.description }}
                    </p>
                  </div>
                </div>

                <ul class="feature-list q-mb-md">
                  <li v-for="benefit in feature.benefits" :key="benefit">
                    <q-icon
                      name="check"
                      color="green"
                      size="sm"
                      class="q-mr-xs"
                    />
                    {{ benefit }}
                  </li>
                </ul>

                <div class="text-center q-mb-md">
                  <div class="text-h5 text-weight-bold text-orange-6">
                    {{ feature.points }} điểm/tháng
                  </div>
                </div>

                <q-btn
                  color="yellow"
                  text-color="black"
                  :label="
                    canAfford(feature.points) ? 'Kích hoạt' : 'Không đủ điểm'
                  "
                  :disable="!canAfford(feature.points)"
                  @click="purchaseItem(feature)"
                  class="full-width"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Purchase History -->
      <q-card class="q-mt-xl">
        <q-card-section>
          <h3 class="text-h6 text-weight-medium q-mb-md">
            📋 Lịch sử đổi điểm
          </h3>

          <div v-if="purchaseHistory.length === 0" class="text-center q-py-md">
            <q-icon name="receipt" size="2rem" color="grey-4" />
            <p class="text-grey-5 q-mt-md">Chưa có giao dịch nào</p>
          </div>

          <div v-else>
            <q-list separator>
              <q-item v-for="purchase in purchaseHistory" :key="purchase.id">
                <q-item-section avatar>
                  <q-icon :name="purchase.icon" :color="purchase.color" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ purchase.item }}</q-item-label>
                  <q-item-label caption>{{ purchase.date }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-weight-bold text-orange-6">
                    -{{ purchase.points }} điểm
                  </q-item-label>
                  <q-item-label
                    caption
                    :class="getStatusColor(purchase.status)"
                  >
                    {{ purchase.status }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Purchase Confirmation Dialog -->
    <q-dialog v-model="showPurchaseDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">🛒 Xác nhận đổi điểm</div>
        </q-card-section>

        <q-card-section v-if="selectedItem">
          <p>
            Bạn có muốn đổi <strong>{{ selectedItem.points }} điểm</strong> để
            nhận:
          </p>
          <div class="bg-blue-50 p-4 rounded-lg q-my-md">
            <h4 class="text-weight-medium">{{ selectedItem.name }}</h4>
            <p class="text-grey-6 q-ma-none" v-if="selectedItem.description">
              {{ selectedItem.description }}
            </p>
          </div>
          <p class="text-grey-6">
            Sau giao dịch, bạn sẽ còn lại:
            <strong class="text-primary"
              >{{ currentPoints - selectedItem.points }} điểm</strong
            >
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Hủy" @click="showPurchaseDialog = false" />
          <q-btn color="primary" label="Xác nhận" @click="confirmPurchase" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "../stores/auth";

interface ShopItem {
  id: string;
  name: string;
  points: number;
  icon?: string;
  color?: string;
  description?: string;
}

interface PhoneCard extends ShopItem {
  provider: string;
  value: number;
  discount: number;
}

interface PremiumFeature extends ShopItem {
  benefits: string[];
}

interface PurchaseRecord {
  id: string;
  item: string;
  points: number;
  date: string;
  status: string;
  icon: string;
  color: string;
}

const $q = useQuasar();
const authStore = useAuthStore();

const activeCategory = ref("phone-cards");
const currentPoints = ref(2450);
const showPurchaseDialog = ref(false);
const selectedItem = ref<ShopItem | null>(null);
const purchaseHistory = ref<PurchaseRecord[]>([]);

const phoneCards: PhoneCard[] = [
  {
    id: "viettel-50k",
    name: "Thẻ Viettel 50K",
    provider: "Viettel",
    value: 50000,
    points: 500,
    discount: 15,
  },
  {
    id: "vinaphone-100k",
    name: "Thẻ VinaPhone 100K",
    provider: "VinaPhone",
    value: 100000,
    points: 950,
    discount: 18,
  },
  {
    id: "mobifone-200k",
    name: "Thẻ MobiFone 200K",
    provider: "MobiFone",
    value: 200000,
    points: 1800,
    discount: 20,
  },
  {
    id: "viettel-500k",
    name: "Thẻ Viettel 500K",
    provider: "Viettel",
    value: 500000,
    points: 4200,
    discount: 25,
  },
];

const gifts: ShopItem[] = [
  {
    id: "notebook",
    name: "Sổ tay học tiếng Anh",
    description: "Sổ tay cao cấp với các mẫu câu thường dùng",
    points: 300,
    icon: "book",
    color: "blue",
  },
  {
    id: "mug",
    name: "Cốc EnglishBot",
    description: "Cốc sứ cao cấp với logo EnglishBot",
    points: 450,
    icon: "local_cafe",
    color: "brown",
  },
  {
    id: "tshirt",
    name: "Áo thun EnglishBot",
    description: "Áo thun cotton 100% với thiết kế độc quyền",
    points: 800,
    icon: "checkroom",
    color: "purple",
  },
];

const premiumFeatures: PremiumFeature[] = [
  {
    id: "premium-basic",
    name: "Premium Basic",
    description: "Nâng cao trải nghiệm học tập với các tính năng cơ bản",
    points: 200,
    icon: "star",
    color: "yellow",
    benefits: [
      "Loại bỏ quảng cáo",
      "Truy cập câu hỏi nâng cao",
      "Thống kê chi tiết",
      "Hỗ trợ ưu tiên",
    ],
  },
  {
    id: "premium-pro",
    name: "Premium Pro",
    description: "Trải nghiệm học tập tối ưu với đầy đủ tính năng",
    points: 350,
    icon: "diamond",
    color: "purple",
    benefits: [
      "Tất cả tính năng Basic",
      "AI Coach cá nhân",
      "Lộ trình học tùy chỉnh",
      "Thách đấu không giới hạn",
      "Tải xuống offline",
    ],
  },
];

const canAfford = (points: number) => {
  return currentPoints.value >= points;
};

const purchaseItem = (item: ShopItem | PhoneCard | PremiumFeature) => {
  selectedItem.value = item;
  showPurchaseDialog.value = true;
};

const confirmPurchase = () => {
  if (!selectedItem.value) return;

  const item = selectedItem.value;
  currentPoints.value -= item.points;

  // Add to purchase history
  const purchase: PurchaseRecord = {
    id: Date.now().toString(),
    item: item.name,
    points: item.points,
    date: new Date().toLocaleDateString("vi-VN"),
    status: "Đang xử lý",
    icon: item.icon || "phone",
    color: item.color || "primary",
  };

  purchaseHistory.value.unshift(purchase);

  $q.notify({
    type: "positive",
    message: `Đã đổi ${item.points} điểm thành ${item.name}!`,
    position: "top",
  });

  showPurchaseDialog.value = false;
  selectedItem.value = null;

  // Simulate processing
  setTimeout(() => {
    const index = purchaseHistory.value.findIndex((p) => p.id === purchase.id);
    if (index !== -1) {
      purchaseHistory.value[index].status = "Hoàn thành";
    }
  }, 3000);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Hoàn thành":
      return "text-green-6";
    case "Đang xử lý":
      return "text-orange-6";
    case "Thất bại":
      return "text-red-6";
    default:
      return "text-grey-6";
  }
};

// Initialize sample purchase history
onMounted(() => {
  const sampleHistory: PurchaseRecord[] = [
    {
      id: "1",
      item: "Thẻ Viettel 50K",
      points: 500,
      date: "25/07/2024",
      status: "Hoàn thành",
      icon: "phone",
      color: "green",
    },
    {
      id: "2",
      item: "Premium Basic",
      points: 200,
      date: "20/07/2024",
      status: "Hoàn thành",
      icon: "star",
      color: "yellow",
    },
  ];

  purchaseHistory.value = sampleHistory;
});
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #f3e8ff, #dbeafe);
}

.card-hover {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.provider-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.card-details {
  background: #f8fafc;
  padding: 12px;
  border-radius: 8px;
}

.premium-card {
  border: 2px solid #fbbf24;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #374151;
}
</style>
