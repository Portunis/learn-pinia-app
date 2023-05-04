<template>
  <LeftNavBar />
  <div class="container">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LeftNavBar from "@/components/NavBar/LeftNavBar.vue";

export default defineComponent({
  name: "UserProfileLayout",
  components: { LeftNavBar },
});
</script>
<style lang="scss">
.container {
  width: 1400px;
  margin: 0 auto;
}
</style>
