<template>
  <div class="wrapper">
    <div class="wrapper__card-hello">
      <div class="info">
        <h2>Привет, я Чопик</h2>
        <img src="../assets/img/pngegg.png" />
        <p>
          Я бомж и я такой пиздатый я тебя всему обучу ты будешь крутым и на
          белом скутере Я бомж и я такой пиздатый я тебя всему обучу ты будешь
          крутым и на белом скутере
        </p>
      </div>
    </div>

    <div class="wrapper__card wrapper__card-icon">Статистика</div>
    <div class="wrapper__card wrapper__card-chart">
      <div class="achievement">
        <h3>Ваши награды</h3>
        <div class="achievements">
          <div>
            <img src="../assets/img/Rectangle30.png" />
            <h4>Мастер побега</h4>
            <p>Похоже что вы смогли удрать от мистера Фермера</p>
          </div>
          <div>
            <img src="../assets/img/Rectangle30.png" />
            <h4>Мастер побега</h4>
            <p>Вы супер бомж</p>
          </div>
          <div>
            <img src="../assets/img/Rectangle30.png" />
            <h4>Мастер побега</h4>
            <p>Вы супер бомж</p>
          </div>
          <div>
            <img src="../assets/img/Rectangle30.png" />
            <h4>Мастер побега</h4>
            <p>Вы супер бомж</p>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper__card">info</div>
    <div class="wrapper__card">info</div>
    <div class="wrapper__card">info</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<style lang="scss" scoped>
@import "../assets/variables";
.wrapper {
  margin: 130px 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 35px;
  grid-row-gap: 35px;
  &__card-hello {
    grid-area: 1 / 1 / 3 / 2;
    width: 425px;
    height: 611px;
    background: linear-gradient(101.84deg, #5c24fc 2.78%, #9d7aff 98.95%);

    box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
  }
  &__card {
    max-height: 282px;
    max-width: 900px;
    background: #ffffff;

    box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
  }
}
.card {
  display: flex;
}
.wrapper__card-icon {
  grid-area: 2 / 2 / 3 / 4;
}
.wrapper__card-chart {
  grid-area: 1 / 2 / 2 / 4;
}
.div4 {
  grid-area: 3 / 1 / 4 / 2;
}
.div5 {
  grid-area: 3 / 2 / 4 / 3;
}
.div6 {
  grid-area: 3 / 3 / 4 / 4;
}
.info {
  h2 {
    font-family: $poppins-font;
    font-weight: $bold-font-weight;
    color: #fff;
    font-size: 28px;
  }
  img {
    width: 250px;
  }
  p {
    color: #fff;
    font-family: $poppins-font;
    width: 300px;
    margin: 10px auto;
  }
}
.achievements {
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  padding: 47px 16px 16px 16px;
}
.achievement {
  h4,
  p {
    color: #707070;
    margin: 10px 0 4px 0;
  }
  p {
    font-family: $poppins-font;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    width: 130px;
  }
  h3 {
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    font-family: $poppins-font;
    text-align: left;
    padding: 16px 16px 8px 16px;
    margin: 0;
  }
}
</style>
