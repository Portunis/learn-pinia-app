<template>
  <div class="dots-menu">
    <BootstrapIcon
      icon="three-dots"
      class="three-dots"
      :class="{ disabled: isDisabled }"
      @click="openDotModal"
    />

    <div
      class="menu"
      v-click-outside="close"
      v-if="isDotMenuOpen && idElement === clickElement"
    >
      <div
        v-for="item in menuItems"
        :key="item.label"
        class="menu__item"
        @click="item.onClickHandler"
      >
        <fa class="menu__icon" :icon="item.icon" />
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import vClickOutside from "click-outside-vue3";

export default {
  name: "DotMenu",
  components: {
    BootstrapIcon,
  },
  emits: ["open", "close"],
  directives: {
    ClickOutside: vClickOutside.directive,
  },
  props: {
    clickElement: {
      type: Number || String,
    },
    idElement: {
      type: Number || String,
    },
    menuItems: {
      type: Object,
    },
    isDotMenuOpen: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  // mounted() {},
  // beforeDestroy() {},
  methods: {
    close() {
      this.$emit("close");
    },
    openDotModal(el) {
      console.log("Я нажал");
      if (!this.isDisabled) {
        this.$emit("open", el);
      }
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.dots-menu {
  position: relative;
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 120%;

  .three-dots {
    cursor: pointer;
    color: $gray-700;
    transition: color 0.07s;
    font-size: 24px;

    &:hover {
      color: $dark;
    }

    &.disabled {
      color: $dark;
    }
  }

  .menu {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 3;
    padding: 12px;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 0px 0px 1px rgba(12, 26, 75, 0.24),
      0px 3px 8px -1px rgba(50, 50, 71, 0.05);
    border-radius: 8px;
    width: 158px;

    &.hidden {
      display: none;
    }

    &__item {
      display: flex;
      color: #2d3748;
      padding: 9px 8px;
      border-radius: 4px;

      &:hover {
        background-color: #edf2f7;
        cursor: pointer;
      }
    }

    &__icon {
      margin-right: 8px;
    }
  }
}
</style>
