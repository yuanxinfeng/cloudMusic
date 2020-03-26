<template>
  <div class="search-list">
    <div class="header">
      <div class="title">
        <h2>{{params.keywords}}</h2>
        <span>找到{{numbers}}{{title[params.type]}}</span>
      </div>
      <div class="tab">
        <ul>
          <li @click="changeType(1)" :class="[params.type === 1? 'current' : '']">单曲</li>
          <li @click="changeType(100)" :class="[params.type === 100? 'current' : '']">歌手</li>
          <li @click="changeType(10)" :class="[params.type === 10? 'current' : '']">专辑</li>
          <li @click="changeType(1014)" :class="[params.type === 1014? 'current' : '']">视频</li>
          <li @click="changeType(1000)" :class="[params.type === 1000? 'current' : '']">歌单</li>
          <li @click="changeType(1006)" :class="[params.type === 1006? 'current' : '']">歌词</li>
          <li @click="changeType(1009)" :class="[params.type === 1009? 'current' : '']">主播电台</li>
          <li @click="changeType(1002)" :class="[params.type === 1002? 'current' : '']">用户</li>
        </ul>
      </div>
    </div>
    <div class="content" ref="content">
      <component :is="modules[params.type]" :datas="results" :params="params"></component>
      <div class="pagination" v-if="numbers > params.limit">
        <el-pagination
          background
          small
          layout="prev, pager, next"
          :page-size="params.limit"
          :total="numbers"
          :current-page.sync="params.page"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import song from "./module/song";
import artists from "./module/artists";
import albums from "./module/albums";
import videos from "./module/videos";
import playlists from "./module/playlists";
import { searchList } from "@/api/search";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      numbers: 0,
      typeName: "首歌曲",
      results: [],
      //搜索类型:取值 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
      title: {
        1: "首单曲",
        10: "张专辑",
        100: "位歌手",
        1000: "个歌单",
        1002: "位用户",
        1004: "mvs",
        1006: "首歌词",
        1009: "个电台",
        1014: "个视频"
      },
      typeNumbers: {
        1: "songCount",
        10: "albumCount",
        100: "artistCount",
        1000: "playlistCount",
        1002: "userprofileCount",
        1004: "mvCount",
        1006: "songCount",
        1009: "djRadiosCount",
        1014: "videoCount"
      },
      modules: {
        1: "song",
        10: "albums",
        100: "artists",
        1000: "playlists",
        1002: "userprofiles",
        1004: "mvs",
        1006: "lyrics",
        1009: "djRadios",
        1014: "videos"
      },
      params: {
        keywords: this.$route.query.value,
        limit: 100,
        offset: 0,
        page: 1,
        type: 1
      }
    };
  },
  computed: {
    ...mapGetters(["category"])
  },
  components: {
    song,
    artists,
    albums,
    videos,
    playlists
  },
  created() {
    this.$nextTick(() => {
      this.getList();
    });
  },
  methods: {
    getList() {
      searchList(this.params).then(res => {
        const result = res.result;
        this.numbers = result[this.typeNumbers[this.params.type]];
        this.results = result[this.category[this.params.type]];
      });
    },
    changeType(type) {
      this.results = [];
      this.numbers = 0;
      if (type === this.type) return;
      if (type === 1014) this.params.limit = 21;
      else this.params.limit = 100;
      this.params.type = type;
      this.params.offset = 0;
      this.params.page = 1;
      this.getList();
    },
    pageChange(e) {
      this.params.offset = (e - 1) * this.params.limit;
      this.results = [];
      this.c_ScrollTop();
      this.getList();
    },
    c_ScrollTop() {
      let timer = null;
      let isTop = false;
      const _this = this;
      timer = setInterval(function() {
        let osTop = _this.$refs["content"].scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        _this.$refs["content"].scrollTop = osTop + ispeed;
        isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 5);
    }
  },
  watch: {
    "$route.query.value"(value) {
      this.results = [];
      this.params = {
        keywords: value,
        limit: 100,
        offset: 0,
        page: 1,
        type: 1
      };
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.search-list {
  .header {
    position: relative;
    background: #ffffff;
    width: 100%;
    z-index: 2;
    margin-top: -20px;
  }
  .title {
    padding: 0 30px;
    margin-top: 20px;
    h2 {
      margin: 0;
      cursor: default;
      display: inline;
      font-size: 1.4em;
    }
    span {
      font-size: 13px;
      color: rgb(94, 92, 92);
    }
  }
  .tab {
    height: 47px;
    border-bottom: rgb(197, 197, 197) solid 1px;
    ul {
      padding: 0 15px;
      margin-top: 20px;
      bottom: 10px;
      position: absolute;
      top: 30px;
      li {
        font-size: 14px;
        font-weight: bold;
        cursor: default;
        color: #646464;
        float: left;
        margin: 0 16px;
        &:hover {
          color: #000000;
        }
      }
      .current {
        color: #000000;
      }
    }
  }
  .content {
    overflow: auto;
    height: calc(100vh - 207px);
    width: 100%;
    .pagination {
      padding: 20px 0;
      clear: left;
      text-align: center;
    }
  }
}
</style>
