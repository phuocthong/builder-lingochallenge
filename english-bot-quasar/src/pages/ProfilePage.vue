<template>
  <q-page class="bg-gradient-to-br from-purple-50 to-blue-50">
    <div
      v-if="!authStore.isLoggedIn"
      class="flex flex-center"
      style="height: 70vh"
    >
      <q-card class="q-pa-lg text-center">
        <q-card-section>
          <q-icon name="person" size="xl" color="grey-5" />
          <div class="text-h6 q-mt-md">Vui lòng đăng nhập</div>
          <div class="text-grey-6 q-mt-sm">để xem hồ sơ cá nhân</div>
        </q-card-section>
      </q-card>
    </div>

    <div v-else class="q-pa-md">
      <div class="row q-gutter-md">
        <!-- Left Sidebar - User Profile -->
        <div class="col-12 col-lg-4">
          <div class="column q-gutter-md">
            <!-- Main Profile Card -->
            <q-card class="q-pa-lg">
              <div class="text-center">
                <!-- Avatar -->
                <q-avatar
                  size="80px"
                  color="primary"
                  text-color="white"
                  class="q-mb-md"
                >
                  {{ authStore.user?.avatar }}
                </q-avatar>

                <!-- User Info -->
                <div class="text-h5 text-weight-medium q-mb-xs">
                  {{ authStore.user?.name }}
                </div>
                <div class="text-grey-6 q-mb-md">
                  @{{ authStore.user?.name.toLowerCase().replace(" ", "") }}
                </div>

                <!-- Join Date -->
                <div
                  class="row items-center justify-center text-grey-6 text-caption q-mb-lg"
                >
                  <q-icon name="event" size="sm" class="q-mr-xs" />
                  Tham gia từ 1/1/2025
                </div>

                <!-- Level & XP -->
                <div class="row q-gutter-sm q-mb-lg">
                  <div
                    class="col bg-blue-1 rounded-borders q-pa-sm text-center"
                  >
                    <q-icon name="emoji_events" color="blue" />
                    <div class="text-caption text-grey-7">Cấp độ</div>
                    <div class="text-weight-bold text-blue">Level 10</div>
                  </div>
                  <div
                    class="col bg-blue-1 rounded-borders q-pa-sm text-center"
                  >
                    <q-icon name="star" color="blue" />
                    <div class="text-caption text-grey-7">Điểm XP</div>
                    <div class="text-weight-bold text-blue">1,000</div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="column q-gutter-sm">
                  <q-btn color="blue" icon="edit" label="Chỉnh sửa thông tin" />
                  <q-btn
                    color="grey-5"
                    outline
                    icon="lock"
                    label="Đổi mật khẩu"
                    disabled
                  />
                </div>
              </div>
            </q-card>

            <!-- Contact Info -->
            <q-card class="q-pa-lg">
              <div class="text-h6 q-mb-md text-center">Thông tin liên hệ</div>
              <q-list>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="email" color="grey-6" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ authStore.user?.email }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="phone" color="grey-6" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>12345678910</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </div>

        <!-- Right Content - Tabs -->
        <div class="col-12 col-lg-8">
          <q-card>
            <q-tabs
              v-model="selectedTab"
              class="text-grey-6"
              active-color="primary"
              indicator-color="primary"
              align="justify"
            >
              <q-tab name="profile" label="Profile" />
              <q-tab name="friends" label="Bạn bè" />
              <q-tab name="tasks" label="Nhiệm vụ" />
              <q-tab name="exchange" label="Đổi điểm" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="selectedTab" animated>
              <!-- Profile Tab -->
              <q-tab-panel name="profile">
                <!-- Main Stats Grid -->
                <div class="row q-gutter-md q-mb-lg">
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-card class="text-center q-pa-md">
                      <q-icon
                        name="chat"
                        size="md"
                        color="blue"
                        class="q-mb-sm"
                      />
                      <div class="text-h5 text-weight-bold">1,000</div>
                      <div class="text-caption text-grey-6">
                        Tổng câu trả lời
                      </div>
                    </q-card>
                  </div>
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-card class="text-center q-pa-md">
                      <q-icon
                        name="check_circle"
                        size="md"
                        color="green"
                        class="q-mb-sm"
                      />
                      <div class="text-h5 text-weight-bold">82%</div>
                      <div class="text-caption text-grey-6">
                        Tỷ lệ chính xác
                      </div>
                    </q-card>
                  </div>
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-card class="text-center q-pa-md">
                      <q-icon
                        name="book"
                        size="md"
                        color="purple"
                        class="q-mb-sm"
                      />
                      <div class="text-h5 text-weight-bold">2,125</div>
                      <div class="text-caption text-grey-6">Từ đã học</div>
                    </q-card>
                  </div>
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-card class="text-center q-pa-md">
                      <q-icon
                        name="local_fire_department"
                        size="md"
                        color="orange"
                        class="q-mb-sm"
                      />
                      <div class="text-h5 text-weight-bold">
                        {{ authStore.user?.stats?.streak }}
                      </div>
                      <div class="text-caption text-grey-6">Chuỗi dài nhất</div>
                    </q-card>
                  </div>
                </div>

                <!-- Progress Chart Placeholder -->
                <q-card class="q-pa-lg">
                  <div class="text-h6 q-mb-md">Biểu đồ tiến bộ</div>
                  <div
                    class="bg-gradient-to-br from-purple-100 to-blue-100 rounded-borders q-pa-xl text-center"
                  >
                    <q-icon name="bar_chart" size="xl" color="purple" />
                    <div class="text-grey-6 q-mt-sm">
                      Biểu đồ tiến bộ theo tuần
                    </div>
                  </div>
                </q-card>
              </q-tab-panel>

              <!-- Friends Tab -->
              <q-tab-panel name="friends">
                <div class="row items-center justify-between q-mb-md">
                  <div class="text-h6">
                    Danh sách bạn bè ({{ friends.length }})
                  </div>
                  <q-btn color="primary" icon="person_add" label="Thêm bạn" />
                </div>

                <div class="row q-gutter-md">
                  <div
                    v-for="friend in friends"
                    :key="friend.id"
                    class="col-12 col-sm-6 col-md-4"
                  >
                    <q-card>
                      <q-card-section>
                        <div class="row items-center q-mb-md">
                          <q-avatar
                            color="primary"
                            text-color="white"
                            class="q-mr-sm"
                          >
                            {{ friend.avatar }}
                          </q-avatar>
                          <div class="col">
                            <div class="text-weight-medium">
                              {{ friend.name }}
                            </div>
                            <div class="text-caption text-grey-6">
                              Level {{ friend.level }}
                            </div>
                          </div>
                          <q-chip
                            :color="getStatusColor(friend.status)"
                            text-color="white"
                            size="sm"
                          >
                            {{ getStatusText(friend.status) }}
                          </q-chip>
                        </div>

                        <div class="row q-gutter-xs q-mb-md">
                          <div
                            class="col bg-yellow-1 rounded-borders q-pa-xs text-center"
                          >
                            <div class="text-caption text-grey-6">Điểm</div>
                            <div class="text-weight-bold text-yellow-8">
                              {{ friend.points.toLocaleString() }}
                            </div>
                          </div>
                          <div
                            class="col bg-red-1 rounded-borders q-pa-xs text-center"
                          >
                            <div class="text-caption text-grey-6">Streak</div>
                            <div class="text-weight-bold text-red-8">
                              {{ friend.streak }}
                            </div>
                          </div>
                        </div>

                        <div class="row q-gutter-xs">
                          <q-btn
                            size="sm"
                            outline
                            color="blue"
                            icon="chat"
                            label="Nhắn tin"
                            class="col"
                            @click="sendMessage(friend)"
                          />
                          <q-btn
                            size="sm"
                            outline
                            color="orange"
                            icon="flash_on"
                            label="Thách đấu"
                            class="col"
                            :disable="
                              !friend.isOnline || friend.status === 'in-game'
                            "
                            @click="challengeFriend(friend)"
                          />
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </q-tab-panel>

              <!-- Tasks Tab -->
              <q-tab-panel name="tasks">
                <div class="row items-center justify-between q-mb-md">
                  <div class="text-h6">Nhiệm vụ của tôi</div>
                  <q-chip
                    color="yellow"
                    text-color="dark"
                    icon="monetization_on"
                  >
                    {{ userPoints.toLocaleString() }} điểm
                  </q-chip>
                </div>

                <q-tabs v-model="taskTab" class="q-mb-md">
                  <q-tab name="daily" label="Hàng ngày" />
                  <q-tab name="weekly" label="Hàng tuần" />
                </q-tabs>

                <q-tab-panels v-model="taskTab">
                  <q-tab-panel name="daily">
                    <div class="column q-gutter-sm">
                      <q-card
                        v-for="task in dailyTasks"
                        :key="task.id"
                        :class="task.completed ? 'bg-green-1' : ''"
                      >
                        <q-card-section>
                          <div class="row items-center">
                            <div class="col">
                              <div class="row items-center q-mb-xs">
                                <q-icon
                                  :name="getTaskIcon(task.category)"
                                  class="q-mr-sm"
                                />
                                <div
                                  class="text-weight-medium"
                                  :class="
                                    task.completed
                                      ? 'text-strike text-grey-6'
                                      : ''
                                  "
                                >
                                  {{ task.title }}
                                </div>
                                <q-icon
                                  v-if="task.completed"
                                  name="check_circle"
                                  color="green"
                                  class="q-ml-sm"
                                />
                              </div>
                              <div class="text-caption text-grey-6 q-mb-sm">
                                {{ task.description }}
                              </div>

                              <div class="row items-center q-gutter-md">
                                <div class="col">
                                  <div class="text-caption q-mb-xs">
                                    Tiến độ: {{ task.progress }}/{{
                                      task.target
                                    }}
                                    ({{
                                      Math.round(
                                        (task.progress / task.target) * 100,
                                      )
                                    }}%)
                                  </div>
                                  <q-linear-progress
                                    :value="task.progress / task.target"
                                    color="primary"
                                    size="sm"
                                  />
                                </div>
                                <q-chip
                                  color="yellow"
                                  text-color="dark"
                                  size="sm"
                                >
                                  +{{ task.points }} điểm
                                </q-chip>
                              </div>
                            </div>

                            <div class="col-auto q-ml-md">
                              <div
                                v-if="!task.completed"
                                class="row q-gutter-xs"
                              >
                                <q-btn
                                  size="sm"
                                  outline
                                  label="+1"
                                  @click="
                                    updateTaskProgress(task, task.progress + 1)
                                  "
                                />
                                <q-btn
                                  size="sm"
                                  outline
                                  label="Hoàn thành"
                                  @click="updateTaskProgress(task, task.target)"
                                />
                              </div>
                              <q-btn
                                size="sm"
                                flat
                                color="red"
                                icon="delete"
                                @click="deleteTask(task.id)"
                              />
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="weekly">
                    <div class="column q-gutter-sm">
                      <q-card
                        v-for="task in weeklyTasks"
                        :key="task.id"
                        :class="task.completed ? 'bg-green-1' : ''"
                      >
                        <q-card-section>
                          <div class="row items-center">
                            <div class="col">
                              <div class="row items-center q-mb-xs">
                                <q-icon
                                  :name="getTaskIcon(task.category)"
                                  class="q-mr-sm"
                                />
                                <div
                                  class="text-weight-medium"
                                  :class="
                                    task.completed
                                      ? 'text-strike text-grey-6'
                                      : ''
                                  "
                                >
                                  {{ task.title }}
                                </div>
                                <q-icon
                                  v-if="task.completed"
                                  name="check_circle"
                                  color="green"
                                  class="q-ml-sm"
                                />
                              </div>
                              <div class="text-caption text-grey-6 q-mb-sm">
                                {{ task.description }}
                              </div>

                              <div class="row items-center q-gutter-md q-mb-xs">
                                <div class="col">
                                  <div class="text-caption q-mb-xs">
                                    Tiến độ: {{ task.progress }}/{{
                                      task.target
                                    }}
                                    ({{
                                      Math.round(
                                        (task.progress / task.target) * 100,
                                      )
                                    }}%)
                                  </div>
                                  <q-linear-progress
                                    :value="task.progress / task.target"
                                    color="primary"
                                    size="sm"
                                  />
                                </div>
                                <q-chip
                                  color="yellow"
                                  text-color="dark"
                                  size="sm"
                                >
                                  +{{ task.points }} điểm
                                </q-chip>
                              </div>

                              <div
                                class="row items-center text-caption text-grey-6"
                              >
                                <q-icon
                                  name="schedule"
                                  size="xs"
                                  class="q-mr-xs"
                                />
                                Hạn:
                                {{
                                  new Date(task.dueDate).toLocaleDateString(
                                    "vi-VN",
                                  )
                                }}
                              </div>
                            </div>

                            <div class="col-auto q-ml-md">
                              <div
                                v-if="!task.completed"
                                class="row q-gutter-xs"
                              >
                                <q-btn
                                  size="sm"
                                  outline
                                  label="+1"
                                  @click="
                                    updateTaskProgress(task, task.progress + 1)
                                  "
                                />
                                <q-btn
                                  size="sm"
                                  outline
                                  label="Hoàn thành"
                                  @click="updateTaskProgress(task, task.target)"
                                />
                              </div>
                              <q-btn
                                size="sm"
                                flat
                                color="red"
                                icon="delete"
                                @click="deleteTask(task.id)"
                              />
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </q-tab-panel>

              <!-- Exchange Tab -->
              <q-tab-panel name="exchange">
                <div class="row items-center justify-between q-mb-md">
                  <div>
                    <div class="text-h6">Cửa hàng thẻ cào</div>
                    <div class="text-caption text-grey-6">
                      Đổi điểm tích lũy để nhận thẻ cào điện thoại
                    </div>
                  </div>
                  <q-chip
                    color="yellow"
                    text-color="dark"
                    icon="monetization_on"
                  >
                    {{ userPoints.toLocaleString() }} điểm
                  </q-chip>
                </div>

                <div class="row q-gutter-md">
                  <div
                    v-for="card in phoneCards"
                    :key="card.id"
                    class="col-12 col-sm-6 col-md-4"
                  >
                    <q-card
                      :class="card.popular ? 'border-2 border-blue-500' : ''"
                    >
                      <q-card-section>
                        <q-chip
                          v-if="card.popular"
                          color="blue"
                          text-color="white"
                          class="q-mb-sm"
                        >
                          🔥 Phổ biến
                        </q-chip>

                        <div class="text-center q-mb-md">
                          <q-icon
                            name="phone_android"
                            size="lg"
                            color="grey-6"
                            class="q-mb-sm"
                          />
                          <div class="text-h6 text-weight-bold">
                            {{ card.provider }}
                          </div>
                          <div class="text-h5 text-green text-weight-bold">
                            {{ card.value.toLocaleString() }}đ
                          </div>
                        </div>

                        <div class="q-mb-md">
                          <div
                            class="row items-center justify-between text-caption q-mb-xs"
                          >
                            <span class="text-grey-6">Giá gốc:</span>
                            <div
                              v-if="card.discount"
                              class="row items-center q-gutter-xs"
                            >
                              <span class="text-strike text-grey-4">
                                {{
                                  Math.round(
                                    card.cost / (1 - card.discount / 100),
                                  ).toLocaleString()
                                }}
                                điểm
                              </span>
                              <q-chip color="red" text-color="white" size="sm">
                                -{{ card.discount }}%
                              </q-chip>
                            </div>
                            <span v-else
                              >{{ card.cost.toLocaleString() }} điểm</span
                            >
                          </div>

                          <div class="row items-center justify-between">
                            <span class="text-weight-medium">Giá bán:</span>
                            <span
                              class="text-h6 text-yellow-8 text-weight-bold"
                            >
                              {{ card.cost.toLocaleString() }} điểm
                            </span>
                          </div>
                        </div>

                        <q-btn
                          :color="
                            userPoints >= card.cost ? 'primary' : 'grey-5'
                          "
                          :disable="userPoints < card.cost"
                          @click="purchasePhoneCard(card)"
                          class="full-width"
                        >
                          <q-icon
                            :name="userPoints >= card.cost ? 'redeem' : 'block'"
                            class="q-mr-sm"
                          />
                          {{
                            userPoints >= card.cost
                              ? "Đổi ngay"
                              : "Không đủ điểm"
                          }}
                        </q-btn>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { Notify } from "quasar";

const authStore = useAuthStore();

const selectedTab = ref("profile");
const taskTab = ref("daily");
const userPoints = ref(1250);

interface Task {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly";
  completed: boolean;
  progress: number;
  target: number;
  category: "practice" | "learning" | "challenge" | "social";
  reward: number;
  points: number;
  dueDate: Date;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  level: number;
  points: number;
  status: "online" | "offline" | "in-game";
  streak: number;
  isOnline: boolean;
}

interface PhoneCard {
  id: string;
  provider: string;
  value: number;
  cost: number;
  discount?: number;
  popular?: boolean;
}

const tasks = ref<Task[]>([]);
const friends = ref<Friend[]>([]);
const phoneCards = ref<PhoneCard[]>([]);

const dailyTasks = computed(() =>
  tasks.value.filter((task) => task.type === "daily"),
);
const weeklyTasks = computed(() =>
  tasks.value.filter((task) => task.type === "weekly"),
);

onMounted(() => {
  // Initialize sample data
  tasks.value = [
    {
      id: "1",
      title: "Trả lời đúng 10 câu hỏi",
      description: "Hoàn thành 10 câu trả lời chính xác trong ngày",
      type: "daily",
      completed: false,
      progress: 7,
      target: 10,
      category: "practice",
      reward: 50,
      points: 25,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      title: "Duy trì streak 3 ngày",
      description: "Chơi liên tục 3 ngày không nghỉ",
      type: "daily",
      completed: true,
      progress: 3,
      target: 3,
      category: "practice",
      reward: 100,
      points: 50,
      dueDate: new Date(),
    },
    {
      id: "3",
      title: "Thách đấu với 5 bạn bè",
      description: "Tham gia thách đấu với ít nhất 5 người bạn trong tuần",
      type: "weekly",
      completed: false,
      progress: 2,
      target: 5,
      category: "social",
      reward: 200,
      points: 100,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  ];

  friends.value = [
    {
      id: "1",
      name: "Minh Anh",
      avatar: "MA",
      level: 15,
      points: 2850,
      status: "online",
      streak: 12,
      isOnline: true,
    },
    {
      id: "2",
      name: "Đức Huy",
      avatar: "DH",
      level: 22,
      points: 4200,
      status: "in-game",
      streak: 8,
      isOnline: true,
    },
    {
      id: "3",
      name: "Thu Hà",
      avatar: "TH",
      level: 18,
      points: 3150,
      status: "offline",
      streak: 5,
      isOnline: false,
    },
  ];

  phoneCards.value = [
    {
      id: "1",
      provider: "Viettel",
      value: 10000,
      cost: 800,
      popular: true,
    },
    {
      id: "2",
      provider: "Mobifone",
      value: 20000,
      cost: 1500,
      discount: 10,
    },
    {
      id: "3",
      provider: "Vinaphone",
      value: 50000,
      cost: 3800,
      discount: 15,
    },
  ];
});

function getTaskIcon(category: string) {
  switch (category) {
    case "practice":
      return "target";
    case "learning":
      return "star";
    case "challenge":
      return "emoji_events";
    case "social":
      return "people";
    default:
      return "task";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "online":
      return "green";
    case "in-game":
      return "blue";
    case "offline":
      return "grey";
    default:
      return "grey";
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "online":
      return "Online";
    case "in-game":
      return "Đang chơi";
    case "offline":
      return "Offline";
    default:
      return "Unknown";
  }
}

function updateTaskProgress(task: Task, newProgress: number) {
  const wasCompleted = task.completed;
  task.progress = Math.min(newProgress, task.target);
  task.completed = task.progress >= task.target;

  if (task.completed && !wasCompleted) {
    userPoints.value += task.points;
    Notify.create({
      type: "positive",
      message: `Hoàn thành nhiệm vụ! +${task.points} điểm`,
      position: "top",
    });
  }
}

function deleteTask(taskId: string) {
  const index = tasks.value.findIndex((t) => t.id === taskId);
  if (index > -1) {
    tasks.value.splice(index, 1);
    Notify.create({
      type: "info",
      message: "Đã xóa nhiệm vụ",
      position: "top",
    });
  }
}

function sendMessage(friend: Friend) {
  Notify.create({
    type: "info",
    message: `💬 Gửi tin nhắn cho ${friend.name}!`,
    caption: "Tính năng chat sẽ được phát triển trong phiên bản tiếp theo.",
    position: "top",
  });
}

function challengeFriend(friend: Friend) {
  if (!friend.isOnline) {
    Notify.create({
      type: "warning",
      message: `😔 ${friend.name} hiện đang offline!`,
      caption:
        "Bạn có thể gửi lời mời thách đấu và họ sẽ nhận được khi online.",
      position: "top",
    });
    return;
  }

  if (friend.status === "in-game") {
    Notify.create({
      type: "warning",
      message: `🎮 ${friend.name} đang trong trận đấu khác!`,
      caption: "Vui lòng thử lại sau.",
      position: "top",
    });
    return;
  }

  Notify.create({
    type: "positive",
    message: `⚡ Đã gửi lời mời thách đấu cho ${friend.name}!`,
    caption: "Đang tìm phòng thách đấu...",
    position: "top",
  });
}

function purchasePhoneCard(card: PhoneCard) {
  if (userPoints.value >= card.cost) {
    userPoints.value -= card.cost;
    Notify.create({
      type: "positive",
      message: `Đã mua thành công thẻ ${card.provider} ${card.value.toLocaleString()}đ!`,
      position: "top",
    });
  } else {
    Notify.create({
      type: "negative",
      message: "Không đủ điểm để mua thẻ này!",
      position: "top",
    });
  }
}
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #f3f4f6, #dbeafe);
}

.text-strike {
  text-decoration: line-through;
}
</style>
