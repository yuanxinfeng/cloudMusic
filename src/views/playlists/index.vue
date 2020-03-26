<template>
  <div class="playlists">
    <div class="top-container">
      <img :src="detail.coverImgUrl" alt />
      <div class="top-right">
        <div class="name">
          <span>{{detail.highQuality?'精品歌单':'歌单'}}</span>
          <span>{{detail.name}}</span>
        </div>
        <div class="creator">
          <img :src="creator.avatarUrl" alt @click.stop="clickUser(detail.userId)" />
          <span @click.stop="clickUser(detail.userId)">{{creator.nickname}}</span>
          <span>{{detail.createTime | parseTime}} 创建</span>
        </div>
        <div class="btn">
          <div class="bf">
            <div class="qb">
              <i class="iconfont icon-bofangtb"></i>
              <span>播放全部</span>
            </div>
            <div class="jia">
              <i class="iconfont icon-hao"></i>
            </div>
          </div>
          <div class="sc">
            <i class="iconfont icon-shoucangjia"></i>
            <span>收藏({{detail.subscribedCount | conversionCounts}})</span>
          </div>
          <div class="share">
            <i class="iconfont icon-fenxiang"></i>
            <span>分享({{detail.shareCount}})</span>
          </div>
          <div class="down">
            <i class="iconfont icon-xiazai"></i>
            <span>下载全部</span>
          </div>
        </div>
        <div class="other">
          <div class="bq">
            <span>标&nbsp;签:</span>
            <span v-for="(item,index) in detail.tags" :key="index">
              <span class="tags-name" @click="tagsClick(item)">{{item}}</span>
              <span v-if="detail.tags.length>index+1">&nbsp;/&nbsp;</span>
            </span>
          </div>
          <div class="songs">
            <span>歌曲数量:{{detail.trackCount}}</span>&nbsp;&nbsp;
            <span>播放数:{{detail.playCount | conversionCounts}}</span>
          </div>
          <div class="desc">
            <span>简&nbsp;介:</span>
            <span v-if="!descflag">{{detail.description | splitString}}</span>
            <span v-else class="folding">{{detail.description}}</span>
            <i :class="['iconfont', descflag?'icon-xia-desc':'icon-shang-desc']" @click="descClick"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-container">
      <ul>
        <li>
          <span @click="changeClick('songTable')" :class="[active==='songTable'?'current':'']">歌曲列表</span>
        </li>
        <li>
          <span
            @click="changeClick('comment')"
            :class="[active==='comment'?'current':'']"
          >评论({{detail.commentCount}})</span>
        </li>
        <li>
          <span @click="changeClick('collectors')" :class="[active==='collectors'?'current':'']">收藏者</span>
        </li>
        <li v-if="active==='songTable'" class="search">
          <i class="iconfont icon-fangdajing" v-if="!searchValue"></i>
          <i class="iconfont icon-hao1" v-else @click="clearValue"></i>
          <input
            class="search-input"
            ref="input"
            v-model="searchValue"
            type="text"
            @input="searchSong"
            placeholder="搜索歌单音乐"
          />
        </li>
      </ul>
    </div>
    <component
      :is="active"
      :songs="filterSongs"
      :comments="comments"
      :collectorsList="collectorsList"
      :params="params"
    ></component>
  </div>
</template>
<script>
import { songDetail } from "@/api/songs";
import { detail, playlistsComment, subscribers } from "@/api/playlists";
import songTable from "@/components/songTable";
import comment from "@/components/comment";
import collectors from "@/components/collectors";
export default {
  data() {
    return {
      id: 0,
      detail: {},
      creator: {},
      comments: {},
      songids: [],
      collectorsList: [],
      songs: [],
      filterSongs: [],
      // 歌曲名称
      searchValue: "",
      // 简介默认折叠
      descflag: false,
      active: "songTable",
      params: {
        page: 1,
        limit: 0
      }
    };
  },
  components: {
    songTable,
    comment,
    collectors
  },
  created() {
    this.$nextTick(() => {
      this.id = this.$route.query.id;
      this.getDetail();
    });
  },
  methods: {
    getDetail() {
      detail(this.id)
        .then(res => {
          this.detail = res.playlist;
          this.creator = res.playlist.creator;
        })
        .then(() => {
          this.detail.trackIds.map(n => {
            this.songids.push(n.id);
          });
        })
        .then(() => {
          songDetail({ ids: this.songids.join(",") }).then(res => {
            res.songs.map(n => {
              let obj = {};
              obj.name = n.name;
              obj.id = n.id;
              obj.mvid = n.mv;
              obj.alias = n.alia;
              obj.artists = n.ar;
              obj.album = n.al;
              obj.duration = n.dt;
              this.songs.push(obj);
            });
            this.filterSongs = this.songs;
          });
        });
    },
    getComment() {
      playlistsComment({ id: this.id }).then(res => {
        this.comments = res;
      });
    },
    // 获取收藏者列表
    getSubscribers() {
      subscribers({ id: this.id }).then(res => {
        this.collectorsList = res.subscribers;
      });
    },
    // 跳转到歌单首页
    tagsClick(cat) {
      this.$store.dispatch("cat", cat);
      this.$router.push(`/playlist`);
    },
    // 简介折叠
    descClick() {
      this.descflag = !this.descflag;
    },
    // 切换
    changeClick(active) {
      this.active = active;
      if (active === "comment") {
        this.getComment();
      } else if (active === "collectors") {
        this.getSubscribers();
      } else {
        this.getDetail();
      }
    },
    // 搜索歌单
    searchSong() {
      this.filterSongs = this.songs.filter(n => {
        return n.name.indexOf(this.searchValue) > -1;
      });
    },
    clearValue() {
      this.searchValue = "";
      this.filterSongs = this.songs;
    },
    clickUser(userid) {
      this.$router.push(`/user?userid=${userid}`);
    }
  }
};
</script>

<style lang="scss" scoped>
$background: #f2f2f2;
.playlists {
  height: 100%;
  overflow: auto;
  padding: 10px 30px;
  .top-container {
    img {
      width: 200px;
      height: 200px;
      border-radius: 10px;
      float: left;
    }
    .top-right {
      width: calc(100% - 200px);
      float: left;
      padding: 0 0 0 30px;
      .name {
        cursor: default;
        padding: 0 0 20px 0;
        span:nth-child(1) {
          padding: 2px 8px;
          border-radius: 5px;
          border: 1px solid #d13c37;
          color: #d13c37;
          font-size: 13px;
        }
        span:nth-child(2) {
          font-weight: 500;
          font-size: 20px;
        }
      }
      .creator {
        cursor: pointer;
        padding: 0 0 20px 0;
        img {
          width: 24px;
          height: 24px;
          border-radius: 12px;
        }
        span {
          font-size: 12px;
          color: #5c5b5b;
          &:nth-child(2) {
            padding: 0 5px;
            color: #2b4e6d;
            &:hover {
              color: #206ba5;
            }
          }
          &:nth-child(3) {
            cursor: default;
          }
        }
      }
      .btn {
        padding: 0 0 20px 0;
        display: inline-block;
        .bf {
          position: relative;
          cursor: default;
          float: left;
          height: 30px;
          border-radius: 15px;
          width: 140px;
          background: linear-gradient(to right, #f8534a, #d33d38);
          i {
            color: #ffffff;
            position: relative;
            font-size: 20px;
            top: 3px;
          }
          .qb {
            display: inline-block;
            height: 30px;
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
            padding: 0 3px 0 10px;
            border-right: 1px solid #c77a7a;
            &:hover {
              background: #bf3633;
            }
            span {
              font-size: 14px;
              padding: 0 5px 0 5px;
              color: #ffffff;
            }
          }
          .jia {
            display: inline-block;
            height: 30px;
            width: 35px;
            position: absolute;
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
            &:hover {
              background: #bf3633;
            }
            .icon-hao {
              top: 5px;
              left: 8px;
              font-size: 13px;
            }
          }
        }
        .sc {
          cursor: default;
          margin-left: 10px;
          width: 105px;
          height: 30px;
          float: left;
          padding: 5px 5px;
          border-radius: 15px;
          border: 1px solid #ddd;
          &:hover {
            background: #f3f3f3;
          }
          i {
            color: #333;
            position: relative;
            font-size: 16px;
            left: 8px;
          }
          span {
            font-size: 14px;
            padding: 0 5px 0 0;
            color: #333;
            position: relative;
            left: 8px;
          }
        }
        .share {
          cursor: default;
          margin-left: 10px;
          width: 105px;
          height: 30px;
          float: left;
          padding: 5px 5px;
          border-radius: 15px;
          border: 1px solid #ddd;
          &:hover {
            background: #f3f3f3;
          }
          i {
            color: #333;
            position: relative;
            font-size: 16px;
            left: 8px;
          }
          span {
            font-size: 14px;
            padding: 0 5px 0 0;
            color: #333;
            position: relative;
            left: 8px;
          }
        }
        .down {
          cursor: default;
          margin-left: 10px;
          width: 105px;
          height: 30px;
          float: left;
          padding: 5px 5px;
          border-radius: 15px;
          border: 1px solid #ddd;
          &:hover {
            background: #f3f3f3;
          }
          i {
            color: #333;
            position: relative;
            font-size: 16px;
            left: 8px;
          }
          span {
            font-size: 14px;
            padding: 0 5px 0 0;
            color: #333;
            position: relative;
            left: 8px;
          }
        }
      }
      .other {
        cursor: default;
        clear: left;
        div {
          padding: 0 0 2px 0;
        }
        span {
          font-size: 12px;
        }
        .tags-name {
          cursor: pointer;
          color: #206ba5;
          &:hover {
            color: #2b4e6d;
          }
        }
        .desc {
          position: relative;
          .folding {
            white-space: pre-line;
          }
          i {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 14px;
            color: #9a9999;
          }
        }
      }
    }
  }
  .bottom-container {
    display: inline-block;
    ul {
      cursor: default;
      padding: 0;
      width: calc(100vw - 260px);
      height: 27px;
      border-bottom: 1px solid #ddd;
      li {
        float: left;
        width: 85px;
        span {
          padding: 7px 0;
          font-size: 14px;
          font-weight: 500;
          &:hover {
            font-weight: bold;
          }
        }
      }
      .search {
        float: right;
        position: relative;
        background: $background;
        width: 130px;
        height: 22px;
        border-radius: 11px;
        i {
          position: absolute;
        }
        .icon-fangdajing {
          top: 5px;
          left: 5px;
          font-size: 13px;
        }
        .icon-hao1 {
          top: 6px;
          left: 5px;
          font-size: 10px;
        }
        .search-input {
          border: none;
          outline: none;
          height: 22px;
          width: 93px;
          line-height: 22px;
          position: absolute;
          background: $background;
          left: 20px;
          &:focus::placeholder {
            color: transparent;
          }
        }
      }
      .current {
        color: #d13c37;
        border-bottom: 2px solid #d13c37;
      }
    }
  }
}
</style>
