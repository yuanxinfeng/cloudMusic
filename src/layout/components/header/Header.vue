<template>
  <div class="header-container" @dblclick="changeWindows(2)">
    <frame />
    <div class="category-container">
      <component :is="currentNav" v-if="!(currentNav==='notitle')"></component>
    </div>
    <div class="right-container">
      <search></search>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
import { mapGetters } from "vuex";
import { findMusic } from "./categoryNav";
import frame from "./frame";
import search from "./search";
export default {
  computed: {
    ...mapGetters(["currentNav"])
  },
  components: {
    frame,
    findMusic,
    search
  },
  methods: {
    changeWindows(index) {
      let item = ["close", "min", "max"];
      ipcRenderer.send(item[index]);
    }
  },
  watch: {
    $route(v) {
      let WhiteList = ["findMusic"];
      if (WhiteList.indexOf(v.meta.type) === -1) {
        this.$store.dispatch("currentNav", "notitle");
      } else {
        this.$store.dispatch("currentNav", v.meta.type);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$headerHeright: 50px;
.header-container {
  background: #f9f9f9;
  width: 100%;
  height: $headerHeright;
  .category-container {
    height: $headerHeright;
    width: 470px;
    float: left;
    position: relative;
  }
  .right-container {
    position: relative;
    float: right;
    height: $headerHeright;
    width: 310px;
  }
}
</style>
