<template>
  <div class="nav-bar">
    <div class="user">
      <div class="user__info">
        <img class="user__avatar" src="../../assets/img/pngegg.png" />
        <p>Chopik_Popik</p>
      </div>
    </div>
    <div class="nav-bar__links">
      <div class="nav-bar__link">
        <fa icon="user" class="icon" />
        <a>Главная</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftNavBar",
};
</script>

<style lang="scss" scoped>
@import "../../assets/variables";
.icon {
  width: 30px;
  height: 30px;
}
.nav-bar {
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 350px;
  background: #ffffff;

  box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
  &__links {
    font-family: $poppins-font;
    font-weight: $regular-font-weight;
    text-align: left;
    margin: 50px 0 0 15px;
  }
  &__link {
    position: relative;
    color: #1657ff;
    font-family: $poppins-font;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 4px;
      height: 35px;
      background: #1657ff;
      box-shadow: -2px 0px 10px 2px rgba(0, 56, 255, 0.15);
      border-radius: 100px;
    }
  }
}
.user {
  &__info {
    margin: 30px 0;
    font-family: $poppins-font;
    font-weight: $regular-font-weight;
  }
  &__avatar {
    img {
      max-width: 150px;
    }
    max-width: 150px;
  }
}
</style>
