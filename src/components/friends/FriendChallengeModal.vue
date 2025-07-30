<template>
  <q-dialog v-model="isVisible" persistent>
    <q-card style="min-width: 500px">
      <q-card-section>
        <div class="text-h6 flex items-center">
          <q-icon name="bolt" color="primary" class="q-mr-sm" />
          Thách đấu với {{ friend?.name }}
        </div>
        <div class="text-subtitle2 text-grey-6">
          Chọn loại thách đấu bạn muốn gửi đến {{ friend?.name }}
        </div>
      </q-card-section>

      <q-card-section v-if="friend">
        <!-- Friend Info -->
        <div class="row items-center q-pa-md bg-grey-1 rounded-borders q-mb-md">
          <q-avatar size="48px" class="q-mr-md">
            <div class="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full w-full h-full flex items-center justify-center">
              {{ friend.avatar }}
            </div>
            <q-badge floating :color="friend.isOnline ? 'green' : 'grey'" rounded />
          </q-avatar>
          
          <div class="col">
            <h3 class="text-subtitle1 text-weight-medium q-ma-none">{{ friend.name }}</h3>
            <p class="text-caption text-grey-6 q-ma-none">{{ friend.username }}</p>
            <div class="row items-center q-gutter-md q-mt-xs">
              <div class="flex items-center text-caption text-grey-6">
                <q-icon name="emoji_events" color="yellow-7" size="xs" class="q-mr-xs" />
                #{{ friend.stats.rank }}
              </div>
              <div class="flex items-center text-caption text-grey-6">
                <q-icon name="star" color="green-7" size="xs" class="q-mr-xs" />
                {{ friend.stats.totalCorrect }}
              </div>
              <div class="flex items-center text-caption text-grey-6">
                <q-icon name="local_fire_department" color="orange-7" size="xs" class="q-mr-xs" />
                {{ friend.stats.accuracy }}%
              </div>
            </div>
          </div>
          
          <q-badge :color="friend.isOnline ? 'green' : 'grey'">
            {{ friend.isOnline ? 'Online' : 'Offline' }}
          </q-badge>
        </div>

        <!-- Challenge Type Selection -->
        <div class="q-mb-md">
          <h4 class="text-subtitle1 text-weight-medium q-mb-md">Chọn loại thách đấu:</h4>
          
          <div class="q-gutter-sm">
            <q-card
              v-for="[type, config] in Object.entries(challengeTypes)"
              :key="type"
              :class="selectedType === type ? 'bg-primary text-white' : 'cursor-pointer'"
              bordered
              clickable
              @click="selectedType = type"
            >
              <q-card-section class="row items-center q-pa-md">
                <div :class="`w-12 h-12 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center text-white text-xl q-mr-md`">
                  {{ config.icon }}
                </div>
                
                <div class="col">
                  <h5 class="text-subtitle2 text-weight-medium q-ma-none">{{ config.name }}</h5>
                  <p class="text-caption q-ma-none" :class="selectedType === type ? 'text-white' : 'text-grey-6'">
                    {{ config.description }}
                  </p>
                </div>
                
                <div class="text-right text-caption" :class="selectedType === type ? 'text-white' : 'text-grey-5'">
                  <div class="flex items-center">
                    <q-icon name="help" size="xs" class="q-mr-xs" />
                    {{ config.questionCount }} câu
                  </div>
                  <div class="flex items-center q-mt-xs">
                    <q-icon name="schedule" size="xs" class="q-mr-xs" />
                    {{ config.timePerQuestion }}s/câu
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Challenge Preview -->
        <div class="q-pa-md bg-blue-1 rounded-borders">
          <h5 class="text-subtitle2 text-weight-medium text-blue-9 q-mb-md">
            📋 Tóm tắt thách đấu:
          </h5>
          <div class="row q-gutter-md text-center">
            <div class="col">
              <div class="text-h6 text-weight-bold text-blue-8">
                {{ challengeTypes[selectedType].questionCount }}
              </div>
              <div class="text-caption text-blue-7">Câu hỏi</div>
            </div>
            <div class="col">
              <div class="text-h6 text-weight-bold text-blue-8">
                {{ challengeTypes[selectedType].timePerQuestion }}s
              </div>
              <div class="text-caption text-blue-7">Mỗi câu</div>
            </div>
            <div class="col">
              <div class="text-h6 text-weight-bold text-blue-8">
                ~{{ Math.ceil((challengeTypes[selectedType].questionCount * challengeTypes[selectedType].timePerQuestion) / 60) }}
              </div>
              <div class="text-caption text-blue-7">Phút</div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Hủy bỏ" @click="close" />
        <q-btn 
          color="primary" 
          icon="bolt" 
          label="Gửi thách đấu"
          @click="sendChallenge"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Friend {
  id: string
  name: string
  username: string
  avatar: string
  isOnline: boolean
  stats: {
    rank: number
    totalCorrect: number
    streak: number
    accuracy: number
  }
}

interface ChallengeSettings {
  questionCount: number
  timePerQuestion: number
  challengeType: string
}

interface Props {
  modelValue: boolean
  friend: Friend | null
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'send-challenge', friend: Friend, settings: ChallengeSettings): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isVisible = ref(false)
const selectedType = ref('standard')

const challengeTypes = {
  quick: {
    name: '⚡ Thách đấu nhanh',
    description: '5 câu hỏi, 15 giây mỗi câu',
    questionCount: 5,
    timePerQuestion: 15,
    icon: '⚡',
    color: 'from-yellow-500 to-orange-500'
  },
  standard: {
    name: '🎯 Thách đấu chuẩn',
    description: '10 câu hỏi, 30 giây mỗi câu',
    questionCount: 10,
    timePerQuestion: 30,
    icon: '🎯',
    color: 'from-blue-500 to-purple-500'
  },
  marathon: {
    name: '🏃 Thách đấu marathon',
    description: '20 câu hỏi, 25 giây mỗi câu',
    questionCount: 20,
    timePerQuestion: 25,
    icon: '🏃',
    color: 'from-green-500 to-blue-500'
  }
}

watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal
})

watch(isVisible, (newVal) => {
  emit('update:modelValue', newVal)
})

const sendChallenge = () => {
  if (!props.friend) return

  const settings: ChallengeSettings = {
    questionCount: challengeTypes[selectedType.value].questionCount,
    timePerQuestion: challengeTypes[selectedType.value].timePerQuestion,
    challengeType: selectedType.value
  }

  emit('send-challenge', props.friend, settings)
  close()
}

const close = () => {
  isVisible.value = false
}
</script>

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(to right, #8b5cf6, #3b82f6);
}
</style>
