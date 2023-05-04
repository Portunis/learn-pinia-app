<template>
  <div>
    <v-date-picker
      v-model="modelCalendar"
      @click="filterDate"
      :model-config="modelConfig"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <UiInput
          :value="inputValue"
          :data="{ type: 'text' }"
          v-on="inputEvents"
        /> </template
    ></v-date-picker>

    <div v-if="modelCalendar">
      <h2 v-if="filteredTask.length">Задачи на: {{ modelCalendar }}</h2>
      <h2 v-if="!filteredTask.length" class="no-content">
        Задач на {{ modelCalendar }} не найдено
      </h2>
      <div class="table">
        <div
          class="table__item"
          v-for="filterItem in filteredTask"
          :key="filterItem.id"
          @click="isActiveInfo = filterItem.id"
        >
          <div class="item__header">
            <p>{{ filterItem.title }}</p>
            <BadgeStatus :status="filterItem.status" class="status-table" />
          </div>
          <transition name="slide-fade">
            <div v-show="isActiveInfo === filterItem.id" class="item__body">
              <div>
                <p>{{ filterItem.description }}</p>
                <p>Выполнить до: {{ filterItem.end_task }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useTaskStore } from "@/store/task";
import UiInput from "@/components/UI/input/UiInput.vue";
import BadgeStatus from "@/components/UI/badge/BadgeStatus.vue";
import moment from "moment";

export default defineComponent({
  name: "CalendarView",
  components: { BadgeStatus, UiInput },
  data() {
    return {
      isActiveInfo: null,
      modelCalendar: "",
      modelConfig: {
        type: "string",
        mask: "DD-MM-YYYY",
      },
    };
  },
  mounted() {
    this.getDateNow();
  },
  computed: {
    ...mapState(useTaskStore, {
      filteredTask: "filteredTasks",
    }),
  },
  methods: {
    ...mapActions(useTaskStore, {
      filter: "filterTasks",
    }),
    getDateNow() {
      const date = new Date(Date.now());
      this.modelCalendar = moment(date).format("DD-MM-YYYY");
      this.filterDate();
    },
    filterDate() {
      this.filter(this.modelCalendar);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../assets/variables";
.table {
  margin: 20px auto;
  width: 1200px;
  &__item {
    padding: 20px;
    margin-bottom: 2px;
    background-color: $gray-100;

    &:hover {
      background-color: $gray-200;
      cursor: pointer;
    }
    &:first-of-type {
      border-radius: 10px 10px 0 0;
    }
    &:last-of-type {
      border-radius: 0 0 10px 10px;
    }
  }
}
.item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

//transition
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.no-content {
  font-size: 32px;
  font-family: $raleway-font;
  font-weight: $bold-font-weight;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
