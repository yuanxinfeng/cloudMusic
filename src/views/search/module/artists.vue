<!--
 * @Description: artists 歌手列表
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-11 17:21:27
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-12 14:54:12
 -->
<template>
  <div class="artists">
    <ul>
      <li v-for="(item,index) in datas" :key="index">
        <router-link :to="`/artists?id=${item.id}`">
          <div class="header-img">
            <img :src="item.picUrl" alt />
          </div>
          <div class="name">
            <p>
              <span>{{item.name}}</span>
              <span>{{item.trans | addBracket}}</span>
            </p>
          </div>
          <div class="right">
            <i class="iconfont icon-touxiang"></i>
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
  },
  created() {
    console.log(this.datas);
  }
};
</script>

<style lang="scss" scoped>
.artists {
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
        cursor: default;
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
            font-size: 15px;
            span:nth-child(1) {
              color: #2b2a2a;
            }
            span:nth-child(2) {
              color: #919192;
            }
          }
        }
        .right {
          position: absolute;
          top: 30px;
          right: 30px;
          color: #d13c37;
        }
      }
    }
  }
}
</style>
