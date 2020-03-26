<template>
  <div class="highQuality" v-infinite-scroll="upload">
    <div class="title-name">精品歌单</div>
    <div class="sx">
      <el-popover placement="bottom-end" width="515" trigger="click" v-model="visible">
        <div class="all">
          <div @click="clickCat('')" :class="[cat === ''?'current':'']">
            <span>全部歌单</span>
          </div>
        </div>
        <div class="categroy">
          <ul class="categories">
            <li v-for="(item,index) in hotList" :key="index">
              <span
                @click="clickCat(item.name)"
                :class="[cat === item.name?'current':'']"
              >{{item.name}}</span>
            </li>
          </ul>
        </div>
        <span slot="reference" class="btn">{{cat?cat:'筛选'}}</span>
      </el-popover>
    </div>
    <ul>
      <li
        v-for="(item,index) in playHigh"
        :key="index"
        @click.stop="clickPlaylists(item.id)"
        :style="{width:twoWidth+'px'}"
      >
        <div class="header-img">
          <img :src="item.coverImgUrl" />
          <div class="high" v-if="item.highQuality">
            <div class="tr">
              <i class="iconfont icon-huangguan"></i>
            </div>
          </div>
          <div class="playTime">
            <i class="iconfont icon-bofang"></i>
            <span>{{ item.playCount | conversionCount}}</span>
          </div>
          <div class="play">
            <i class="iconfont icon-bf"></i>
          </div>
        </div>
        <div class="title">
          <p>{{item.name}}</p>
          <span @click.stop="clickUser(item.userId)">
            by {{item.creator.nickname}}
            <i class="iconfont icon-xing"></i>
          </span>
        </div>
        <div class="tags">
          <span class="tag">{{item.tag}}</span>
          <span class="copywriter">{{item.copywriter}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { highquality } from "@/api/findMusic";
import resize from "@/mixins/resize";
export default {
  data() {
    return {
      playHigh: [],
      hotList: [
        { name: "华语" },
        { name: "欧美" },
        { name: "韩语" },
        { name: "日语" },
        { name: "粤语" },
        { name: "小语种" },
        { name: "运动" },
        { name: "ACG" },
        { name: "影视原声" },
        { name: "流行" },
        { name: "摇滚" },
        { name: "后摇" },
        { name: "古风" },
        { name: "民谣" },
        { name: "轻音乐" },
        { name: "电子" },
        { name: "器乐" },
        { name: "说唱" },
        { name: "古典" },
        { name: "爵士" }
      ],
      page: 1,
      cat: "",
      visible: false,
      highParams: {
        limit: 20,
        cat: "",
        before: ""
      }
    };
  },
  mixins: [resize],
  created() {},
  methods: {
    init() {
      this.highParams = {
        limit: 20,
        cat: this.cat,
        before: ""
      };
      this.page = 1;
      this.playHigh = [];
      this.getHighQuality();
    },
    getHighQuality() {
      highquality(this.highParams).then(res => {
        this.playHigh = this.playHigh.concat(...res.playlists);
      });
    },
    clickCat(cat) {
      this.cat = cat;
      this.visible = false;
      this.init();
    },
    upload() {
      // 获取每次数据中的最后一个得到他的updateTime
      let before_i = this.highParams.limit * (this.page - 1) - 1;
      let before_data = this.playHigh[before_i] || {};
      let before_updateTime = before_data.updateTime;
      this.page++;
      this.highParams.before = before_updateTime;
      this.highParams.cat = this.cat;
      this.getHighQuality();
    },
    clickPlaylists(id) {
      this.$router.push(`/playlists?id=${id}`);
    },
    clickUser(userid){
      this.$router.push(`/user?userid=${userid}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.highQuality {
  padding: 10px 20px;
  height: 100%;
  overflow: auto;
  .title-name {
    padding: 0 10px;
    float: left;
    width: 100px;
  }
  .sx {
    float: right;
    width: 100px;
    .btn {
      cursor: pointer;
      border: 1px solid #ddd;
      padding: 2px 15px;
      border-radius: 15px;
      &:hover {
        background: #f3f3f3;
      }
    }
  }
  ul {
    padding: 0;
    margin: 0;
    width: 100%;
    clear: left;
    cursor: default;
    li {
      position: relative;
      height: 155px;
      width: 50%;
      float: left;
      border-radius: 5px;
      padding: 0 10px;

      .icon-icon-shiping {
        color: #d13c37;
        position: relative;
        top: 30px;
        right: 0px;
        cursor: pointer;
      }
      .header-img {
        position: relative;
        cursor: pointer;
        float: left;
        top: 10px;
        &:hover {
          .play {
            display: block;
          }
        }
        img {
          width: 135px;
          border-radius: 5px;
        }
        .high {
          position: absolute;
          border-top-left-radius: 4px;
          width: 0;
          height: 0;
          top: 0;
          left: 0;
          border-width: 20px;
          border-style: solid;
          border-color: #f1af6e transparent transparent #f1af6e;
          .tr {
            transform: rotate(-45deg);
            i {
              color: #ffffff;
              position: relative;
              top: -20px;
              left: -3px;
              font-size: 18px;
            }
          }
        }
        .play {
          position: absolute;
          display: none;
          bottom: 10px;
          right: 10px;
          font-size: 13px;
          color: #ffffff;
          width: 34px;
          height: 34px;
          border-radius: 17px;
          background: rgba(255, 255, 255, 0.5);
          i {
            font-size: 15px;
            color: #d13c37;
            position: relative;
            top: 10px;
            left: 10px;
          }
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
        .price {
          position: absolute;
          left: 0;
          top: 0;
          width: 61%;
          font-size: 12px;
          font-weight: 500;
          height: auto;
          border-bottom-right-radius: 8px;
          color: #ffffff;
          background: #d13c37;
          border-top-left-radius: 5px;
          height: 20px;
          padding: 1px 3px;
        }
      }
      .title {
        float: left;
        width: calc(100% - 150px);
        padding: 0 0 0 20px;
        span {
          font-size: 12px;
          cursor: pointer;
          color: #797878;
          &:hover {
            color: #222121;
          }
          i {
            color: #e6c405;
          }
        }
        p {
          padding: 1px 0;
          margin: 0;
          padding: 35px 0 5px 0;
          font-size: 15px;
          color: #222121;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .tags {
        position: relative;
        bottom: -20px;
        float: left;
        width: calc(100% - 150px);
        padding: 0 0 0 20px;
        .tag {
          border: 1px solid #d13c37;
          color: #d13c37;
          border-radius: 3px;
          font-size: 10px;
        }
        .copywriter {
          width: calc(100% - 20px);
          color: #797878;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          position: absolute;
          font-size: 13px;
          padding: 2px 8px;
        }
      }
    }
  }
}
.all {
  border-bottom: 1px solid #cac8c8;
  height: 55px;
  cursor: pointer;
  &:hover {
    span {
      color: #d13c37;
    }
  }
  div {
    width: 85px;
    border-radius: 15px;
    top: 10px;
    left: 20px;
    position: relative;
    height: 30px;
    text-align: center;
    span {
      font-size: 14px;
      line-height: 30px;
    }
  }
}
.current {
  color: #d13c37;
  background: #faf0f0;
}
.categroy {
  .categories {
    padding: 0;
    li {
      float: left;
      padding: 5px 0 25px 15px;
      width: 97px;
      cursor: pointer;
      span {
        padding: 5px 10px;
        border-radius: 15px;
      }
      &:hover {
        span {
          color: #d13c37;
        }
      }
    }
  }
}
</style>
