<template>
  <div class="q-gutter-md">
    <!-- Header -->
    <div class="row items-center justify-between">
      <div>
        <h3 class="text-h5 text-weight-bold q-ma-none">Cửa hàng thẻ cào</h3>
        <p class="text-grey-6 q-ma-none">Đổi điểm tích lũy để nhận thẻ cào điện thoại</p>
      </div>
      <q-chip color="yellow-2" text-color="yellow-8" icon="monetization_on" size="lg">
        {{ userPoints.toLocaleString() }} điểm
      </q-chip>
    </div>

    <!-- Phone Cards Grid -->
    <div class="row q-gutter-md">
      <div class="col-12 col-sm-6 col-lg-4" v-for="card in phoneCards" :key="card.id">
        <q-card :class="card.popular ? 'border-2 border-primary' : ''" class="card-hover">
          <q-card-section class="text-center">
            <!-- Popular Badge -->
            <q-badge v-if="card.popular" color="primary" floating>
              🔥 Phổ biến
            </q-badge>

            <!-- Card Icon -->
            <q-icon name="phone_android" size="3rem" color="grey-6" class="q-mb-md" />
            
            <!-- Provider & Value -->
            <h4 class="text-h6 text-weight-bold q-mb-xs">{{ card.provider }}</h4>
            <p class="text-h4 text-weight-bold text-green-6 q-mb-lg">
              {{ card.value.toLocaleString() }}đ
            </p>

            <!-- Pricing Info -->
            <div class="q-mb-md">
              <div v-if="card.discount" class="row items-center justify-between q-mb-xs">
                <span class="text-caption text-grey-6">Giá gốc:</span>
                <div class="flex items-center q-gutter-xs">
                  <span class="text-caption text-strike text-grey-4">
                    {{ Math.round(card.cost / (1 - card.discount / 100)).toLocaleString() }} điểm
                  </span>
                  <q-badge color="red" text-color="white" class="text-caption">
                    -{{ card.discount }}%
                  </q-badge>
                </div>
              </div>

              <div class="row items-center justify-between">
                <span class="text-body2 text-weight-medium">Giá bán:</span>
                <span class="text-h6 text-weight-bold text-yellow-8">
                  {{ card.cost.toLocaleString() }} điểm
                </span>
              </div>
            </div>

            <!-- Purchase Button -->
            <q-btn
              :color="userPoints >= card.cost ? 'primary' : 'grey-4'"
              :disable="userPoints < card.cost"
              class="full-width"
              @click="purchasePhoneCard(card)"
              :loading="purchasingCard === card.id"
            >
              <q-icon v-if="userPoints >= card.cost" name="redeem" class="q-mr-sm" />
              {{ userPoints >= card.cost ? 'Đổi ngay' : 'Không đủ điểm' }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Purchase History -->
    <q-card v-if="purchaseHistory.length > 0">
      <q-card-section>
        <h4 class="text-h6 text-weight-bold q-mb-md">📋 Lịch sử đổi thưởng</h4>
        
        <q-list separator>
          <q-item v-for="purchase in purchaseHistory" :key="purchase.id">
            <q-item-section avatar>
              <q-icon name="phone_android" color="primary" />
            </q-item-section>
            
            <q-item-section>
              <q-item-label class="text-weight-medium">
                {{ purchase.provider }} {{ purchase.value.toLocaleString() }}đ
              </q-item-label>
              <q-item-label caption>
                {{ formatDate(purchase.purchaseDate) }}
              </q-item-label>
            </q-item-section>
            
            <q-item-section side>
              <div class="text-right">
                <div class="text-weight-bold text-orange-8">
                  -{{ purchase.cost.toLocaleString() }} điểm
                </div>
                <q-badge 
                  :color="getStatusColor(purchase.status)" 
                  :label="purchase.status"
                  class="text-caption"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Empty State -->
    <q-card v-if="purchaseHistory.length === 0">
      <q-card-section class="text-center q-py-xl">
        <q-icon name="shopping_cart" size="4rem" color="grey-4" class="q-mb-md" />
        <h4 class="text-h6 text-grey-6 q-mb-sm">Chưa có giao dịch nào</h4>
        <p class="text-grey-5">Lịch sử đổi thưởng sẽ hiển thị ở đây</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

interface PhoneCard {
  id: string
  provider: string
  value: number
  cost: number
  discount?: number
  popular?: boolean
}

interface PurchaseRecord {
  id: string
  provider: string
  value: number
  cost: number
  purchaseDate: Date
  status: 'Thành công' | 'Đang xử lý' | 'Thất bại'
}

const $q = useQuasar()
const userPoints = ref(1250)
const purchasingCard = ref<string | null>(null)
const phoneCards = ref<PhoneCard[]>([])
const purchaseHistory = ref<PurchaseRecord[]>([])

const purchasePhoneCard = async (card: PhoneCard) => {
  if (userPoints.value < card.cost) {
    $q.notify({
      type: 'negative',
      message: 'Không đủ điểm để mua thẻ này!',
      position: 'top'
    })
    return
  }

  purchasingCard.value = card.id

  // Simulate API call
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Deduct points
    userPoints.value -= card.cost
    
    // Add to purchase history
    const newPurchase: PurchaseRecord = {
      id: Date.now().toString(),
      provider: card.provider,
      value: card.value,
      cost: card.cost,
      purchaseDate: new Date(),
      status: 'Thành công'
    }
    purchaseHistory.value.unshift(newPurchase)

    $q.notify({
      type: 'positive',
      message: `🎉 Đã mua thành công thẻ ${card.provider} ${card.value.toLocaleString()}đ!`,
      position: 'top'
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Có lỗi xảy ra, vui lòng thử lại!',
      position: 'top'
    })
  } finally {
    purchasingCard.value = null
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Thành công': return 'green'
    case 'Đang xử lý': return 'orange'
    case 'Thất bại': return 'red'
    default: return 'grey'
  }
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Initialize data
onMounted(() => {
  const samplePhoneCards: PhoneCard[] = [
    {
      id: '1',
      provider: 'Viettel',
      value: 10000,
      cost: 800,
      popular: true
    },
    {
      id: '2',
      provider: 'Mobifone',
      value: 20000,
      cost: 1500,
      discount: 10
    },
    {
      id: '3',
      provider: 'Vinaphone',
      value: 50000,
      cost: 3800,
      discount: 15
    },
    {
      id: '4',
      provider: 'Viettel',
      value: 100000,
      cost: 7200,
      discount: 20,
      popular: true
    },
    {
      id: '5',
      provider: 'Mobifone',
      value: 200000,
      cost: 14000,
      discount: 25
    },
    {
      id: '6',
      provider: 'Vinaphone',
      value: 500000,
      cost: 32000,
      discount: 30
    }
  ]

  const samplePurchaseHistory: PurchaseRecord[] = [
    {
      id: '1',
      provider: 'Viettel',
      value: 50000,
      cost: 3800,
      purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'Thành công'
    }
  ]

  phoneCards.value = samplePhoneCards
  purchaseHistory.value = samplePurchaseHistory
})
</script>

<style scoped>
.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}
</style>
