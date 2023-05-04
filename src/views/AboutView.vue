<template>
  <div class="container">
    <div class="header">
      <div class="header__widget">
        <h2 class="header__title">Active Tasks</h2>
        <div class="header__info">
          <div class="filter">Filter</div>
          <div class="datetime">May 18th Today</div>
        </div>
      </div>
      <div class="header__nav">Menu</div>
    </div>
    <div class="boards">
      <div class="board">
        <div class="board__header">
          <div class="board__title">
            <div class="status"></div>
            <h2>Backlog</h2>
          </div>
          <div class="board__option">...</div>
        </div>
        <div class="board__body"></div>
      </div>
    </div>
    <div class=""></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<style lang="scss" scoped>
.container {
  width: 700px;
  margin: 0 auto;
}
.header {
  display: flex;
  justify-content: space-between;
  &__title {
    text-align: left;
  }
  &__info {
    display: flex;
  }
}
.boards {
  display: flex;
}
//components
.filter {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px 20px;
  margin-right: 20px;
}
.datetime {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px 20px;
}
//
//board
.status {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: #ff0000;
  margin-right: 10px;
}
.board {
  width: 300px;
  display: block;
  margin: 60px 60px 20px 0;

  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  &__body {
    width: 280px;
    background: #e5e5e5;
    border-radius: 10px;
    height: auto;
    padding: 10px;
  }
  &__title {
    display: flex;
    align-items: center;
  }
  &__option {
    color: #e5e5e5;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
  }
}
/////
//task
.task {
  width: 280px;
  background: #fff;
  border-radius: 5px;
  height: auto;
  margin-bottom: 20px;
  &__container {
    width: 250px;
    margin: 0 auto;
  }
  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  &__title {
    font-weight: bold;
  }
  &__option {
    color: #e5e5e5;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
  }
  &__body {
  }
  &__description {
    margin: 25px 0;
    text-align: left;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
//
//tag

.tags {
  display: flex;
  &__button {
    cursor: pointer;
    color: #1390e5;
    border-radius: 20px;
    padding: 6px 20px;
    border: dashed 1px #1390e5;
    font-size: 14px;
  }
}
</style>
