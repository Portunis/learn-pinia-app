<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <Vue3Lottie
        v-if="isLoader"
        :animationData="loader"
        :height="200"
        :width="200"
        class="modal-loader"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import loader from "@/assets/animation/loader.json";
export default defineComponent({
  name: "uiModal",
  components: {
    Vue3Lottie,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    isLoader: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loader,
    };
  },
  methods: {
    hideDialog() {
      this.$emit("update:show", false);
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/mixins.scss";
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.dialog__content {
  padding: 20px;
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  position: relative;
}
.modal-loader {
  @include loaderPlaceholder;
}
</style>
