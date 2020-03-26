<!--
 * @Description: 
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 16:20:44
 * @LastEditors: Jasper
 * @LastEditTime: 2020-03-20 16:38:16
 -->
<template>
  <div class="footer-container">
    <audio-player :url="url" :detail="song_detail"></audio-player>
  </div>
</template>
<script>
import audioPlayer from "@/components/audioPlayer";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["current_music_id", "url", "song_detail"])
  },
  components: {
    audioPlayer
  },
  created() {
    this.$nextTick(() => {
      this.getUrl();
      this.getSongDetail();
    });
  },
  watch: {
    current_music_id(v) {
      this.getUrl();
      this.getSongDetail();
    }
  },
  methods: {
    getUrl() {
      this.$store.dispatch("currentmusicUrl", this.current_music_id);
    },
    getSongDetail() {
      this.$store.dispatch("getSongDetail", this.current_music_id);
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-container {
  height: 100%;
}
</style>
