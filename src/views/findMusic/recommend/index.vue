<template>
  <div class="recommend">
    <div>
      <banner :banners="banners" @playMusic="playMusic"></banner>
    </div>
    <div class="category">
      <template v-for="item in personalizedList">
        <component :is="item.component" :key="item.id"></component>
      </template>
    </div>
    <div class="adjust">
      <p>现在可以根据个人喜好，自由调整首页栏目顺序啦~</p>
      <div @click="personality">
        <span>调整节目顺序</span>
      </div>
    </div>
  </div>
</template>
<script>
import banner from "@/components/banner";
import { mapGetters } from "vuex";

import djprogram from "./djprogram";
import newsong from "./newsong";
import personalized from "./personalized";
import privatecontent from "./privatecontent";
import tjmv from "./tjmv";
export default {
  components: {
    banner,
    djprogram,
    newsong,
    personalized,
    privatecontent,
    tjmv
  },
  computed: {
    ...mapGetters(["banners", "personalizedList"])
  },
  created() {
    this.$nextTick(() => {
      this.$store.dispatch("getBanner");
    });
  },
  mounted() {},
  methods: {
    playMusic(val) {
      console.log(val);
    },
    // 自由调整顺序
    personality() {
      this.$store.dispatch("personalizedShow", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.recommend {
  padding: 10px 15px;
  overflow: auto;
  height: 100%;
  .adjust {
    cursor: default;
    text-align: center;
    clear: left;
    height: 190px;
    p {
      padding: 70px 0 0px 0;
      font-size: 12px;
      color: #807b7b;
    }
    div {
      border: 1px solid #d13c37;
      width: 125px;
      left: 50%;
      position: relative;
      margin-left: -62px;
      border-radius: 15px;
      height: 30px;
      padding: 3px;
      span {
        font-size: 12px;
        color: #d13c37;
      }
    }
  }
}
</style>

