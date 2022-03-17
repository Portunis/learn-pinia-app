<template>
  <div class="card">
    <CardItems :listOne="listOne" :listTwo="listTwo" @startDrag="startDrag" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CardItems from "@/components/Card/CardItems.vue";
import ListModels from "@/models/board.models";

export default defineComponent({
  name: "GlobalCard",
  components: { CardItems },
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
    startDrag(event: DragEvent, item: any) {
      console.log("2 emit startDrag", event, item);
      this.$emit("startDrag", event, item);
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  width: 250px;
  border: 1px solid black;
  max-height: 900px;
}
</style>
