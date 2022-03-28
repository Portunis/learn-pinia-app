<template>
  <div>
    <v-date-picker
      v-model="modelCalendar"
      @click="filterDate"
      :model-config="modelConfig"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <UiInput
          class="bg-white border px-2 py-1 rounded"
          :value="inputValue"
          v-on="inputEvents"
        /> </template
    ></v-date-picker>

    <div v-if="modelCalendar">
      <h2 v-if="filteredTask.length">Задачи на: {{ modelCalendar }}</h2>
      <h2 v-if="!filteredTask.length">
        Задач на {{ modelCalendar }} не найдено
      </h2>
      <table v-if="filteredTask.length" class="table">
        <thead>
          <tr>
            <th>Задача</th>
            <th>Статус</th>
          </tr>
        </thead>
        <transition-group tag="tbody" name="list-move">
          <tr v-for="filterTask in filteredTask" :key="filterTask.id">
            <td>{{ filterTask.title }}</td>
            <td>{{ filterTask.status }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useTaskStore } from "@/store/task";
import UiInput from "@/components/UI/input/UiInput.vue";

export default defineComponent({
  name: "CalendarView",
  components: { UiInput },
  created() {
    this.initTask();
  },
  data() {
    return {
      modelCalendar: "",
      modelConfig: {
        type: "string",
        mask: "DD-MM-YYYY",
      },
    };
  },
  computed: {
    ...mapState(useTaskStore, {
      filteredTask: "filteredTasks",
    }),
  },
  methods: {
    ...mapActions(useTaskStore, {
      filter: "filterTasks",
      initTask: "initTask",
    }),
    filterDate() {
      this.filter(this.modelCalendar);
    },
  },
});
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
  border: none;
  margin-bottom: 20px;
  thead {
    th {
      font-weight: bold;
      text-align: left;
      border: none;
      padding: 10px 15px;
      background: #d8d8d8;
      font-size: 14px;
    }
    tr {
      th {
        &:first-child {
          border-radius: 8px 0 0 8px;
        }
        &:last-child {
          border-radius: 0 8px 8px 0;
        }
      }
    }
  }
  tbody {
    td {
      text-align: left;
      border: none;
      padding: 10px 15px;
      font-size: 14px;
      vertical-align: top;
    }
    tr {
      &:nth-child(even) {
        background: #f3f3f3;
      }
      td {
        &:first-child {
          border-radius: 8px 0 0 8px;
        }
        &:last-child {
          border-radius: 0 8px 8px 0;
        }
      }
    }
  }
}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
