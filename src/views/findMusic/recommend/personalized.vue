<template>
  <div class="tj-song">
    <div class="title-c" @click="clickToDo">
      <span>推荐歌单</span>
      <i class="iconfont icon-icon-go"></i>
    </div>
    <ul>
      <li :style="{width:fiveWidth+'px'}">
        <router-link :to="`/playlists?id=0`">
          <div class="header-img">
            <img src="/image/rili.png" :style="{width:(fiveWidth-20)+'px'}" alt />
            <div class="masks">
              <span>{{ masks }}</span>
            </div>
            <div class="time">
              <span>{{ current }}</span>
            </div>
            <div class="play">
              <i class="iconfont icon-bf"></i>
            </div>
          </div>
          <div class="title" :style="{width:(fiveWidth-20)+'px'}">
            <p>每日歌曲推荐</p>
          </div>
        </router-link>
      </li>
      <li v-for="(item,index) in personalizedList" :key="index" :style="{width:fiveWidth+'px'}">
        <router-link :to="`/playlists?id=${item.id}`">
          <div class="header-img">
            <img :src="item.picUrl" :style="{width:(fiveWidth-20)+'px'}" alt />
            <div class="playTime">
              <i class="iconfont icon-bofang"></i>
              <span>{{ item.playCount | conversionCount}}</span>
            </div>
            <div class="play">
              <i class="iconfont icon-bf"></i>
            </div>
          </div>
          <div class="title" :style="{width:(fiveWidth-20)+'px'}">
            <p>{{item.name}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { personalized } from "@/api/findMusic";
import resize from "@/mixins/resize";
export default {
  data() {
    return {
      personalizedList: [],
      current: new Date().getDate(),
      masks: "根据您的音乐口味生成每日更新"
    };
  },
  mixins: [resize],
  created() {
    personalized().then(res => {
      this.personalizedList.push(...res.result.splice(0, 9));
    });
  },
  methods: {
    clickToDo() {
      this.$store.dispatch('currentView','playlist');
      this.$router.push(`/playlist`);
    }
  }
};
</script>

<style lang="scss" scoped>
.tj-song {
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
    li {
      position: relative;
      height: 210px;
      width: 152.4px;
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
            .play,
            .masks {
              display: block;
            }
          }
          .masks {
            position: absolute;
            display: none;
            width: 100%;
            top: 0;
            height: 35%;
            background: rgba(85, 84, 84, 0.6);
            padding: 2px 5px;
            span {
              color: #ffffff;
              font-size: 13px;
              line-height: 20px;
            }
          }
          .time {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 35px;
            margin-left: -20px;
            margin-top: -10px;
            color: #ffffff;
          }
          img {
            width: 132.4px;
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
              top: 9px;
              left: 9px;
            }
          }
        }
        .title {
          width: 132.4px;
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
}
</style>

