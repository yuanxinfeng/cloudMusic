<!--
 * @Description: albums 专辑列表
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-12 09:21:27
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-12 14:54:35
 -->
<template>
  <div class="albums">
    <ul>
      <li v-for="(item,index) in datas" :key="index">
        <router-link :to="`/album?id=${item.id}`">
          <div class="header-img">
            <img :src="item.picUrl" alt />
          </div>
          <div class="name">
            <p>{{item.name}}</p>
          </div>
          <div class="right">
            <p>
              <span>{{item.artist.name}}</span>
              <span>{{item.artist.alias | addBracket}}</span>
            </p>
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
        .right {
          position: absolute;
          left: 55%;
          p {
            padding: 0;
            margin: 0;
            line-height: 80px;
            font-size: 13px;
            span:nth-child(1) {
              color: #2b2a2a;
            }
            span:nth-child(2) {
              color: #919192;
            }
          }
        }
      }
    }
  }
}
</style>
