<template>
  <div
    ref="container"
    class="container"
    :tabindex="0"
    @keyup.left="onClick(answerType.Yes)"
    @keyup.right="onClick(answerType.No)"
  >
    <h1 class="title">Drill Mania</h1>
    <div class="time">
      {{elapsedTime}}
      <span class="unit">sec</span>
    </div>
    <div class="score">{{score}}</div>

    <div class="image">
      <img :src="imagePath" :class="{black: isHideImage}">
    </div>
    <div class="ask">{{ isHideImage ? "これはドリルですか？" : currentTarget.answerName }}</div>

    <div class="buttons">
      <div class="yes" @click="onClick(answerType.Yes)">Yes</div>
      <div class="no" @click="onClick(answerType.No)">No</div>
    </div>

    <div class="result" v-if="!isPlaying">
      <div class="result-socre">{{score}}</div>
      <div class="restart" @click="onClickRestart">Restart</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Target, { AnswerType } from "@/models/Taregt";
import { setTimeout } from "timers";

@Component({
  components: {}
})
export default class Index extends Vue {
  isPlaying = true;
  isHideImage = true;
  score = 0;
  time = 0;
  answerType = AnswerType;

  targets: Target[] = [
    new Target("drill1", AnswerType.Yes, "ドリル！"),
    new Target("drill2", AnswerType.Yes, "ドリル！"),
    new Target("takenoko", AnswerType.No, "竹の子"),
    new Target("asupara", AnswerType.No, "アスパラガス")
  ];
  currentTarget: Target = new Target("", AnswerType.Yes, "");

  created() {
    this.setCurrentTarget();
  }

  mounted() {
    (this.$refs.container as HTMLElement).focus();
    this.start();
  }

  start() {
    this.isPlaying = true;
    this.init();
    this.timer();
  }

  timer() {
    setTimeout(() => {
      this.time += 100;
      if (this.time < 30000) {
        this.timer();
      } else {
        this.isPlaying = false;
      }
    }, 100);
  }

  init() {
    this.time = 0;
    this.score = 0;
    this.setCurrentTarget();
  }

  get elapsedTime(): string {
    const add = this.time % 1000 === 0 ? ".0" : "";
    return this.time / 1000 + add;
  }

  get imagePath(): string {
    return require("@/assets/image/" + this.currentTarget.imageName + ".png");
  }

  setCurrentTarget() {
    const index = Math.round(Math.random() * 3);
    this.currentTarget = this.targets[index];
  }

  goNext() {
    this.setCurrentTarget();
    this.isHideImage = true;
  }

  onClick(answerType: AnswerType) {
    if (!this.isPlaying || !this.isHideImage) {
      return;
    }

    if (this.isHideImage && this.currentTarget.answerType === answerType) {
      this.score += 1;
    }
    this.isHideImage = false;
    setTimeout(this.goNext, 500);
  }

  onClickRestart() {
    this.start();
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #718792;
  color: #fff;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}

.title {
  padding-top: 20px;
  font-weight: 900;
  font-size: 50px;
}
.time {
  font-weight: 900;
  font-size: 50px;
}
.unit {
  font-size: 20px;
}

.score {
  font-weight: 900;
  font-size: 60px;
  margin: 0 0 10px 0;
}

.image img {
  height: 200px;
}

.black {
  filter: brightness(0) invert(0);
}

.ask {
  font-size: 20px;
  margin: 20px 0;
}

.buttons {
  display: flex;
  justify-content: center;
}
.yes,
.no {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  margin: 0 10px;
  &:hover {
    opacity: 0.8;
  }
}

.yes {
  background: #1c313a;
  &::after {
    content: "←";
    position: absolute;
    font-size: 100px;
    opacity: 0.1;
  }
}

.no {
  background: #445963;
  &::after {
    content: "→";
    position: absolute;
    font-size: 100px;
    opacity: 0.1;
  }
}

.result {
  top: 0;
  left: calc(50% - 350px);
  width: 700px;
  height: 700px;
  border-radius: 50%;
  position: absolute;
  background: rgba($color: #000, $alpha: 0.8);
}

.result-socre {
  font-weight: 900;
  font-size: 100px;
  margin: 110px 0 10px 0;
}

.restart {
  margin: 60px auto 0 auto;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  color: #1c313a;
  font-size: 30px;
  cursor: pointer;
  background: #718792;
  &:hover {
    opacity: 0.8;
  }
}
</style>
