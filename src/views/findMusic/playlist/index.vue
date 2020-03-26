<template>
  <div class="play-list" ref="play-list">
    <div class="high-quality" v-if="playHigh.name" @click="toHighQuality">
      <img :src="playHigh.coverImgUrl" alt />
      <div class="title">
        <i class="iconfont icon-huangguan"></i>
        <span>精品歌单</span>
      </div>
      <div class="name">{{playHigh.name}}</div>
      <div class="copywriter">{{playHigh.copywriter}}</div>
    </div>
    <div class="list">
      <div class="all-cat-list">
        <div @click="allClick">
          <span>全部歌单</span>
          <i class="iconfont icon-icon-go"></i>
        </div>
        <cat :catList="catList" :cat="params.cat" ref="allcat" @allcatclick="clickCat"></cat>
      </div>
      <div class="hot-list">
        <span v-for="(item,index) in hotList" :key="index" @click="clickCat(item.name)">
          <span :class="[params.cat === item.name?'current':'']">{{item.name}}</span>
          <span v-if="hotList.length > index+1">|</span>
        </span>
      </div>
    </div>
    <div v-loading="loading" style="height: 80vh;top: 30px;" v-if="loading"></div>
    <ul v-else>
      <li
        v-for="(item,index) in playlists"
        :key="index"
        :style="{width:fourWidth+'px',height:(fourWidth+80)+'px'}"
      >
        <router-link :to="`/playlists?id=${item.id}`">
          <div class="header-img">
            <img
              :src="item.coverImgUrl"
              :style="{width:(fourWidth-20)+'px',height:(fourWidth-20)+'px'}"
              alt
            />
            <div class="playTime">
              <i class="iconfont icon-bofang"></i>
              <span>{{ item.playCount | conversionCount}}</span>
            </div>
            <div class="nickname">
              <i class="iconfont icon-ren"></i>
              <span>{{item.creator.nickname}}</span>
            </div>
            <div class="play">
              <i class="iconfont icon-bf"></i>
            </div>
          </div>
          <div class="title" :style="{width:(fourWidth-20)+'px'}">
            <p>{{item.name}}</p>
          </div>
        </router-link>
      </li>
    </ul>
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
</template>

<script>
import { catlist, hotList, highquality, playlist } from "@/api/findMusic";
import cat from "./cat";
import resize from "@/mixins/resize";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: true,
      playHigh: {},
      // 网友精选
      playlists: [],
      // 歌单分类
      catList: {
        all: {},
        categories: {},
        sub: []
      },
      // 热门歌单分类
      hotList: [],
      numbers: 0,
      params: {
        limit: 100,
        offset: 0,
        page: 1,
        cat: ""
      },
      highParams: {
        limit: 1,
        cat: ""
      }
    };
  },
  computed: {
    ...mapGetters(["cat"])
  },
  components: {
    cat
  },
  mixins: [resize],
  created() {
    this.$nextTick(() => {
      this.highParams.cat = this.params.cat = this.cat;
      this.getHighQuality();
      this.getCatlist();
      this.getHotList();
      this.getPlaylist();
    });
  },
  methods: {
    toHighQuality() {
      this.$router.push("/highquality");
    },
    getHighQuality() {
      highquality(this.highParams).then(res => {
        if (res.playlists.length > 0) {
          this.playHigh = res.playlists[0];
        } else {
          this.playHigh = {};
        }
      });
    },
    getCatlist() {
      catlist().then(res => {
        this.catList = res;
      });
    },
    getHotList() {
      hotList().then(res => {
        this.hotList = res.tags;
      });
    },
    getPlaylist() {
      this.playlists = [];
      this.loading = true;
      playlist(this.params).then(res => {
        this.playlists = res.playlists;
        this.numbers = res.total;
        this.loading = false;
      });
    },
    // 选择分类
    clickCat(cat) {
      this.$store.dispatch("cat", cat);
      this.params = {
        limit: 100,
        offset: 0,
        page: 1,
        cat: cat
      };
      this.highParams = {
        limit: 1,
        cat: cat
      };
      this.getPlaylist();
      this.getHighQuality();
      this.c_ScrollTop();
    },
    // 点开全部分类
    allClick() {
      this.$refs.allcat.all = !this.$refs.allcat.all;
    },
    pageChange(e) {
      this.params.offset = (e - 1) * this.params.limit;
      this.c_ScrollTop();
      this.getPlaylist();
    },
    c_ScrollTop() {
      let timer = null;
      let isTop = false;
      const _this = this;
      timer = setInterval(function() {
        let osTop = document.getElementsByClassName("play-list")[0].scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.getElementsByClassName("play-list")[0].scrollTop =
          osTop + ispeed;
        isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 5);
    }
  }
};
</script>

<style lang="scss" scoped>
.play-list {
  cursor: default;
  height: 100%;
  overflow: auto;
  .high-quality {
    position: relative;
    cursor: pointer;
    margin-left: 10px;
    width: calc(100% - 20px);
    height: 170px;
    border-radius: 10px;
    background: url("../../../../public/image/high_b.png") no-repeat fixed;
    img {
      position: absolute;
      top: 15px;
      left: 15px;
      border-radius: 5px;
      width: 140px;
    }
    .title {
      width: 103px;
      position: absolute;
      left: 165px;
      border: 1px solid #fbc01b;
      padding: 5px 10px;
      border-radius: 16px;
      top: 35px;
      font-size: 14px;
      color: #fbc01b;
      i {
        color: #fbc01b;
      }
    }
    .name {
      position: absolute;
      width: 50%;
      top: 85px;
      left: 165px;
      font-size: 18px;
      color: #ffffff;
    }
    .copywriter {
      position: absolute;
      top: 115px;
      font-size: 12px;
      color: #d3d3d6;
      left: 165px;
    }
  }
  .list {
    padding: 15px 10px;
    .all-cat-list {
      width: 100px;
      float: left;
      line-height: 26px;
      border: 1px solid #d5d5d6;
      height: 30px;
      border-radius: 16px;
      cursor: default;
      &:hover {
        background: #ececec;
      }
      span {
        font-size: 14px;
        padding: 0 0 0 15px;
      }
      i {
        margin-left: -3px;
        color: #656565;
      }
    }
    .hot-list {
      text-align: right;
      font-size: 12px;
      float: right;
      span {
        position: relative;
        top: 6px;
        color: #656565;
        &:hover {
          color: #222121;
        }
        .current {
          background: #faf0f0;
          color: #d13c37;
        }
        span:nth-child(1) {
          padding: 2px 6px;
          border-radius: 15px;
        }
        span:nth-child(2) {
          padding: 0 3px;
        }
      }
    }
  }

  ul {
    padding: 15px 0;
    margin: 0;
    clear: left;
    li {
      position: relative;
      height: 250px;
      width: 190.5px;
      float: left;
      a {
        text-decoration: none;
        position: absolute;
        padding: 0 10px;
        &:nth-child(2n) {
          background: #fafafa;
        }
        .header-img {
          position: relative;
          &:hover {
            .play {
              display: block;
            }
          }
          img {
            width: 170.5px;
            height: 170.5px;
            border-radius: 5px;
          }
          .playTime {
            position: absolute;
            top: 5px;
            right: 10px;
            font-size: 13px;
            color: #ffffff;
            i {
              font-size: 13px;
            }
          }
          .nickname {
            position: absolute;
            bottom: 10px;
            left: 10px;
            font-size: 13px;
            color: #ffffff;
            width: 100px;
            border-radius: 20px;
            span {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
          .play {
            position: absolute;
            display: none;
            bottom: 10px;
            right: 10px;
            font-size: 13px;
            color: #ffffff;
            width: 40px;
            height: 40px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.5);
            i {
              font-size: 24px;
              color: #d13c37;
              position: relative;
              top: 7px;
              left: 10px;
            }
          }
        }
        .title {
          width: 170.5px;
          p {
            padding: 1px 0;
            margin: 0;
            font-size: 13px;
            color: #2b2a2a;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
        .by {
          p {
            padding: 1px 0;
            margin: 0;
            font-size: 12px;
            color: #919192;
          }
        }
      }
    }
  }

  .pagination {
    padding: 20px 0;
    clear: left;
    text-align: center;
  }
}
</style>
