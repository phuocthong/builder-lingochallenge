<template>
  <div class="q-gutter-md">
    <!-- Header với điểm -->
    <div class="row items-center justify-between">
      <h3 class="text-h5 text-weight-bold q-ma-none">Nhiệm vụ của tôi</h3>
      <q-chip
        color="yellow-2"
        text-color="yellow-8"
        icon="monetization_on"
        size="lg"
      >
        {{ userPoints.toLocaleString() }} điểm
      </q-chip>
    </div>

    <!-- Tabs cho Daily/Weekly -->
    <q-card>
      <q-tabs
        v-model="activeTaskTab"
        dense
        class="text-grey-6"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="daily" label="Hàng ngày" :badge="dailyTasks.length" />
        <q-tab name="weekly" label="Hàng tuần" :badge="weeklyTasks.length" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTaskTab" animated>
        <!-- Daily Tasks -->
        <q-tab-panel name="daily">
          <div class="q-gutter-md">
            <div v-for="task in dailyTasks" :key="task.id">
              <q-card
                :class="task.completed ? 'bg-green-1 border-green-3' : ''"
                bordered
              >
                <q-card-section>
                  <div class="row items-start justify-between q-gutter-md">
                    <div class="col">
                      <div class="flex items-center q-mb-sm">
                        <q-icon
                          :name="getTaskIcon(task.category)"
                          class="q-mr-sm"
                        />
                        <h4
                          class="text-subtitle1 text-weight-medium q-ma-none"
                          :class="
                            task.completed ? 'text-strike text-grey-6' : ''
                          "
                        >
                          {{ task.title }}
                        </h4>
                        <q-icon
                          v-if="task.completed"
                          name="check_circle"
                          color="green"
                          class="q-ml-sm"
                        />
                      </div>

                      <p class="text-body2 text-grey-6 q-mb-sm">
                        {{ task.description }}
                      </p>

                      <div class="q-mb-sm">
                        <div
                          class="row items-center justify-between text-caption q-mb-xs"
                        >
                          <span
                            >Tiến độ: {{ task.progress }}/{{
                              task.target
                            }}</span
                          >
                          <span
                            >{{
                              Math.round((task.progress / task.target) * 100)
                            }}%</span
                          >
                        </div>
                        <q-linear-progress
                          :value="task.progress / task.target"
                          color="primary"
                          size="8px"
                          rounded
                        />
                      </div>

                      <q-chip
                        color="yellow-2"
                        text-color="yellow-8"
                        size="sm"
                        icon="add"
                      >
                        +{{ task.points }} điểm
                      </q-chip>
                    </div>

                    <div class="col-auto">
                      <div v-if="!task.completed" class="q-gutter-xs">
                        <q-btn
                          size="sm"
                          outline
                          color="primary"
                          label="+1"
                          @click="
                            updateTaskProgress(task.id, task.progress + 1)
                          "
                          :disable="task.progress >= task.target"
                        />
                        <q-btn
                          size="sm"
                          outline
                          color="green"
                          label="Hoàn thành"
                          @click="updateTaskProgress(task.id, task.target)"
                        />
                      </div>
                      <q-btn
                        size="sm"
                        flat
                        color="red"
                        icon="delete"
                        @click="deleteTask(task.id)"
                      >
                        <q-tooltip>Xóa nhiệm vụ</q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>

        <!-- Weekly Tasks -->
        <q-tab-panel name="weekly">
          <div class="q-gutter-md">
            <div v-for="task in weeklyTasks" :key="task.id">
              <q-card
                :class="task.completed ? 'bg-green-1 border-green-3' : ''"
                bordered
              >
                <q-card-section>
                  <div class="row items-start justify-between q-gutter-md">
                    <div class="col">
                      <div class="flex items-center q-mb-sm">
                        <q-icon
                          :name="getTaskIcon(task.category)"
                          class="q-mr-sm"
                        />
                        <h4
                          class="text-subtitle1 text-weight-medium q-ma-none"
                          :class="
                            task.completed ? 'text-strike text-grey-6' : ''
                          "
                        >
                          {{ task.title }}
                        </h4>
                        <q-icon
                          v-if="task.completed"
                          name="check_circle"
                          color="green"
                          class="q-ml-sm"
                        />
                      </div>

                      <p class="text-body2 text-grey-6 q-mb-sm">
                        {{ task.description }}
                      </p>

                      <div class="q-mb-sm">
                        <div
                          class="row items-center justify-between text-caption q-mb-xs"
                        >
                          <span
                            >Tiến độ: {{ task.progress }}/{{
                              task.target
                            }}</span
                          >
                          <span
                            >{{
                              Math.round((task.progress / task.target) * 100)
                            }}%</span
                          >
                        </div>
                        <q-linear-progress
                          :value="task.progress / task.target"
                          color="primary"
                          size="8px"
                          rounded
                        />
                      </div>

                      <q-chip
                        color="yellow-2"
                        text-color="yellow-8"
                        size="sm"
                        icon="add"
                      >
                        +{{ task.points }} điểm
                      </q-chip>
                    </div>

                    <div class="col-auto">
                      <div v-if="!task.completed" class="q-gutter-xs">
                        <q-btn
                          size="sm"
                          outline
                          color="primary"
                          label="+1"
                          @click="
                            updateTaskProgress(task.id, task.progress + 1)
                          "
                          :disable="task.progress >= task.target"
                        />
                        <q-btn
                          size="sm"
                          outline
                          color="green"
                          label="Hoàn thành"
                          @click="updateTaskProgress(task.id, task.target)"
                        />
                      </div>
                      <q-btn
                        size="sm"
                        flat
                        color="red"
                        icon="delete"
                        @click="deleteTask(task.id)"
                      >
                        <q-tooltip>Xóa nhiệm vụ</q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";

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
  completedDate?: Date;
}

const $q = useQuasar();
const activeTaskTab = ref("daily");
const userPoints = ref(1250);
const tasks = ref<Task[]>([]);

// Computed
const dailyTasks = computed(() =>
  tasks.value.filter((task) => task.type === "daily"),
);
const weeklyTasks = computed(() =>
  tasks.value.filter((task) => task.type === "weekly"),
);

// Methods
const updateTaskProgress = (taskId: string, newProgress: number) => {
  const taskIndex = tasks.value.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) return;

  const task = tasks.value[taskIndex];
  const completed = newProgress >= task.target;
  const wasCompleted = task.completed;

  tasks.value[taskIndex] = {
    ...task,
    progress: Math.min(newProgress, task.target),
    completed,
    completedDate: completed ? new Date() : undefined,
  };

  if (completed && !wasCompleted) {
    userPoints.value += task.points;
    $q.notify({
      type: "positive",
      message: `🎉 Hoàn thành nhiệm vụ! +${task.points} điểm`,
      position: "top",
    });
  }
};

const deleteTask = (taskId: string) => {
  $q.dialog({
    title: "Xác nhận xóa",
    message: "Bạn có chắc chắn muốn xóa nhiệm vụ này?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
    $q.notify({
      type: "info",
      message: "Đã xóa nhiệm vụ",
      position: "top",
    });
  });
};

const getTaskIcon = (category: Task["category"]) => {
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
      return "assignment";
  }
};

// Initialize sample data
onMounted(() => {
  const sampleTasks: Task[] = [
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
      completedDate: new Date(),
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
    {
      id: "4",
      title: "Học 50 từ vựng mới",
      description: "Hoàn thành việc học 50 từ vựng mới trong tuần",
      type: "weekly",
      completed: false,
      progress: 28,
      target: 50,
      category: "learning",
      reward: 150,
      points: 75,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
  ];

  tasks.value = sampleTasks;
});
</script>
