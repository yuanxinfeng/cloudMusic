<!--
 * @Description: playlists 歌单
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-12 14:37:59
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-12 14:56:26
 -->
<template>
  <div class="albums">
    <ul>
      <li v-for="(item,index) in datas" :key="index">
        <router-link :to="`/playlists?id=${item.id}`">
          <div class="header-img">
            <img :src="item.coverImgUrl" alt />
          </div>
          <div class="name">
            <p>{{item.name}}</p>
          </div>
          <div class="trackCount">
            <p>{{item.trackCount?item.trackCount+'首':''}}</p>
          </div>
          <div class="right">
            <p>by {{item.creator.nickname?item.creator.nickname:''}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    datas: {
      type: Array,
      default: []
    },
    params: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="scss" scoped>
.albums {
  ul {
    padding: 0;
    margin: 0;
    li {
      position: relative;
      height: 80px;
      &:nth-child(2n) {
        background: #fafafa;
      }
      a {
        text-decoration: none;
        height: 80px;
        position: absolute;
        width: 100%;
        &:hover {
          background: #f2f2f3;
        }
        .header-img {
          position: absolute;
          left: 30px;
          top: 10px;
          img {
            width: 60px;
            height: 60px;
            border-radius: 10px;
          }
        }
        .name {
          position: absolute;
          left: 102px;
          p {
            padding: 0;
            margin: 0;
            line-height: 80px;
            font-size: 14px;
            color: #2b2a2a;
          }
        }
        .trackCount {
          position: absolute;
          left: 70%;
          p {
            padding: 0;
            margin: 0;
            line-height: 80px;
            font-size: 13px;
            color: #919192;
          }
        }
        .right {
          position: absolute;
          right: 30px;
          width: 125px;
          p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0;
            margin: 0;
            line-height: 80px;
            font-size: 13px;
            color: #919192;
          }
        }
      }
    }
  }
}
</style>
