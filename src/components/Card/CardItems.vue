<template>
  <CardItem
    v-for="task in tasks"
    :key="task.title"
    :task="task"
    draggable="true"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CardItem from "@/components/Card/Carditem.vue";
import ListModels from "@/models/board.models";
import TaskModels from "@/models/task.models";

export default defineComponent({
  name: "CardItems",
  components: { CardItem },
  props: {
    tasks: {
      type: Array as PropType<TaskModels[]>,
      required: true,
    },
  },
  methods: {
    startDrag(event: DragEvent, itemTask: any) {
      console.log("1 emit startDrag", event, itemTask);
      this.$emit("startDrag", event, itemTask);
    },
  },
});
</script>

<style scoped></style>
