<template>
  <ul>
    <li
      @click="changeCategory('recommend')"
      :class="[currentView === 'recommend'? 'current' : '']"
    >个性推荐</li>
    <li @click="changeCategory('playlist')" :class="[currentView === 'playlist'? 'current' : '']">歌单</li>
    <li @click="changeCategory('dj')" :class="[currentView === 'dj'? 'current' : '']">主播电台</li>
    <li @click="changeCategory('top')" :class="[currentView === 'top'? 'current' : '']">排行榜</li>
    <li @click="changeCategory('singer')" :class="[currentView === 'singer'? 'current' : '']">歌手</li>
    <li
      @click="changeCategory('newmusic')"
      :class="[currentView === 'newmusic'? 'current' : '']"
    >最新音乐</li>
  </ul>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["currentView"])
  },
  methods: {
    changeCategory(category) {
      if (this.currentView === category) return;
      this.$store.dispatch("currentView", category);
      this.$router.push(`/${category}`);
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  margin: 0 18px;
  bottom: 10px;
  position: absolute;
  li {
    font-size: 14px;
    font-weight: bold;
    cursor: default;
    color: #646464;
    float: left;
    margin: 0 14px;
    &:hover {
      color: #000000;
    }
  }
  .current {
    color: #000000;
  }
}
</style>
