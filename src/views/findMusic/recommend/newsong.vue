<template>
  <div class="new-music">
    <div class="title-c" @click="clickToDo">
      <span>最新音乐</span>
      <i class="iconfont icon-icon-go"></i>
    </div>
    <ul>
      <li v-for="(item,index) in newsongListTop" :key="index" @dblclick.stop="dblClick(item.id)">
        <div class="body-c">
          <div class="header-img" @click.stop="dblClick(item.id)">
            <img :src="item.song.album.picUrl" alt />
            <div class="play">
              <i class="iconfont icon-bf"></i>
            </div>
          </div>
          <div class="indexs">
            <span>{{ index | indexCount }}</span>
          </div>
          <div class="title">
            <p>{{item.name}}<span>{{item.song.alias[0]}}</span></p>
            <i class="iconfont icon-sq" v-if="item.song.privilege.maxbr === 999000"></i>
            <template v-for="(art,index) in item.song.artists">
              <span :key="index" :title="item.song.artists|showOverflowToolTip">
                <router-link :to="`/artists?id=${art.id}`">{{art.name}}</router-link>
                <span v-if="item.song.artists.length> index+1">/</span>
              </span>
            </template>
          </div>
          <i
            class="iconfont icon-shiping"
            @click="clickMV(item.song.mvid)"
            v-if="item.song.mvid !== 0"
          ></i>
        </div>
      </li>
    </ul>
    <ul>
      <li v-for="(item,index) in newsongListBot" :key="index" @dblclick.stop="dblClick(item.id)">
        <div class="body-c">
          <div class="header-img" @click.stop="dblClick(item.id)">
            <img :src="item.song.album.picUrl" alt />
            <div class="play">
              <i class="iconfont icon-bf"></i>
            </div>
          </div>
          <div class="indexs">
            <span>{{ (index+6) | indexCount }}</span>
          </div>
          <div class="title">
            <p>{{item.name}}<span>{{item.song.alias[0]}}</span></p>
            <i class="iconfont icon-sq" v-if="item.song.privilege.maxbr === 999000"></i>
            <template v-for="(art,index) in item.song.artists">
              <span :key="index" :title="item.song.artists | showOverflowToolTip">
                <router-link :to="`/artists?id=${art.id}`">{{art.name}}</router-link>
                <span v-if="item.song.artists.length > index+1">/</span>
              </span>
            </template>
          </div>
          <i
            class="iconfont icon-shiping"
            @click="clickMV(item.song.mvid)"
            v-if="item.song.mvid !== 0"
          ></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { newsong } from "@/api/findMusic";
export default {
  data() {
    return {
      newsongListTop: [],
      newsongListBot: []
    };
  },
  created() {
    newsong().then(res => {
      this.newsongListTop.push(...res.result.splice(0, 5));
      this.newsongListBot.push(...res.result.splice(0, 5));
    });
  },
  methods: {
    // 点击
    clickToDo() {
      this.$store.dispatch("currentView", "newmusic");
    },
    //双击进行播放 或者点击pic
    dblClick(id) {
      this.$store.dispatch("currentSongID", id);
    },
    clickMV(mvid) {
      this.$router.push(`/mvDetails?mvid=${mvid}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.new-music {
  width: 100%;
  clear: left;
  .title-c {
    cursor: pointer;
    padding: 0 10px;
    span {
      font-weight: 500;
      &:hover {
        font-weight: bold;
      }
    }
  }
  ul {
    padding: 15px 0;
    margin: 0;
    width: 50%;
    float: left;
    li {
      position: relative;
      height: 80px;
      width: 100%;
      float: left;
      border-radius: 5px;
      padding: 0 10px;
      &:hover {
        background: #f5f5f5;
      }
      .body-c {
        position: absolute;
        cursor: default;
        width: 95%;
        height: 80px;
        border-top: 1px solid #f2f2f3;
        border-bottom: 1px solid #f2f2f3;
        &:nth-child(2n) {
          background: #fafafa;
        }
        .icon-shiping {
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
          img {
            width: 60px;
            border-radius: 5px;
          }
          .play {
            position: absolute;
            bottom: 15px;
            right: 13px;
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
              top: 9px;
              left: 9px;
            }
          }
        }
        .indexs {
          width: 40px;
          height: 100%;
          float: left;
          color: #797878;
          text-align: center;
          span {
            line-height: 80px;
          }
        }
        .title {
          float: left;
          width: calc(100% - 130px);
          a {
            text-decoration: none;
            font-size: 12px;
            color: #797878;
            &:hover {
              color: #000;
            }
          }
          span {
            font-size: 12px;
            color: #797878;
          }
          i {
            position: relative;
            top: 2px;
            color: #d13c37;
          }
          p {
            padding: 1px 0;
            margin: 0;
            padding: 20px 0 0 0;
            font-size: 15px;
            color: #222121;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>

