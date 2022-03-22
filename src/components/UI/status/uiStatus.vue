<template>
  <div class="status" :class="isStatus">{{ status }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Badge } from "@/typescript/enum/badge";

export default defineComponent({
  name: "uiStatus",
  props: {
    status: String,
  },
  computed: {
    isStatus(): string {
      return this.status == Badge.Completed
        ? "completed"
        : this.status === Badge.Active
        ? "active"
        : this.status === Badge.Created
        ? "created"
        : "";
    },
  },
});
</script>

<style lang="scss" scoped>
.status {
  position: absolute;
  border-radius: 4px;
  top: 4px;
  left: 5px;
  padding: 5px 7px;
  color: #fff;
}
.completed {
  background: #88c269;
}
.active {
  background: #5967ff;
}
.created {
  background: rgba(85, 80, 80, 0.5);
}
</style>
