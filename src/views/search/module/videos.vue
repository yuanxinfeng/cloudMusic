<!--
 * @Description: video 视频列表
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-12 09:57:49
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-15 15:16:57
 -->
<template>
  <div class="video">
    <ul>
      <li ref="imgBox" v-for="(item,index) in datas" :key="index" :style="{width:liWidth+'px'}">
        <router-link :to="`/video?vid=${item.vid}`">
          <div class="header-img">
            <img :src="item.coverUrl" :style="{width:(liWidth-20)+'px'}" alt />
            <div class="playTime">
              <i class="iconfont icon-bofang"></i>
              <span>{{ item.playTime | conversionCount}}</span>
            </div>
            <div class="durationms">{{ item.durationms | foramtDuration }}</div>
          </div>
          <div class="title" :style="{width:(liWidth-20)+'px'}">
            <p>{{item.title}}</p>
          </div>
          <div class="by">
            <p>by {{item.creator[0].userName}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import resize from "@/mixins/resize";
export default {
  props: {
    datas: {
      type: Array,
      default: []
    },
    params: {
      type: Object,
      default: {}
    }
  },
  mixins: [resize]
};
</script>

<style lang="scss" scoped>
.video {
  ul {
    padding: 20px;
    margin: 0;
    li {
      position: relative;
      height: 210px;
      width: 253px;
      float: left;
      a {
        text-decoration: none;
        position: absolute;
        padding: 0 10px;
        &:nth-child(2n) {
          background: #fafafa;
        }
        .header-img {
          img {
            width: 234px;
            border-radius: 5px;
          }
          .playTime {
            position: absolute;
            top: 5px;
            right: 15px;
            font-size: 13px;
            color: #ffffff;
            i {
              font-size: 13px;
            }
          }
          .durationms {
            position: absolute;
            bottom: 45px;
            right: 15px;
            color: #ffffff;
            font-size: 13px;
          }
        }
        .title {
          p {
            padding: 1px 0;
            margin: 0;
            font-size: 13px;
            color: #2b2a2a;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
