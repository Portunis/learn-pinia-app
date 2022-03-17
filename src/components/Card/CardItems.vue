<template>
  <div v-if="listOne && listOne.length">
    <CardItem
      v-for="itemTask in listOne"
      :key="itemTask.id"
      :itemTask="itemTask"
      draggable="true"
      @dragstart="startDrag($event, itemTask)"
    />
  </div>
  <div v-if="listTwo && listTwo.length">
    <CardItem
      v-for="itemTask in listTwo"
      :key="itemTask.id"
      :itemTask="itemTask"
      draggable="true"
      @dragstart="startDrag($event, itemTask)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CardItem from "@/components/Card/Carditem.vue";
import ListModels from "@/models/list.models";

export default defineComponent({
  name: "CardItems",
  components: { CardItem },
  props: {
    listOne: {
      type: Array as PropType<ListModels[]>,
      required: true,
    },
    listTwo: {
      type: Array as PropType<ListModels[]>,
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
