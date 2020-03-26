<template>
  <div class="dj-music">
    <div class="title-c" @click="clickToDo">
      <span>主播电台</span>
      <i class="iconfont icon-icon-go"></i>
    </div>
    <ul>
      <li
        v-for="(item,index) in djList"
        :key="index"
        @click.stop="clickRadio(item.program.radio.id)"
      >
        <div class="body-c">
          <div class="header-img">
            <img :src="item.program.radio.picUrl" />
            <div class="price" v-if="item.program.radio.price !== 0">付费精品</div>
          </div>
          <div class="title">
            <p>{{item.name}}</p>
            <span @click.stop="clickRadio(item.program.radio.id)">{{item.program.radio.name}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { djprogram } from "@/api/findMusic";
export default {
  data() {
    return {
      djList: []
    };
  },
  created() {
    djprogram().then(res => {
      this.djList = res.result;
    });
  },
  methods: {
    // 点击
    clickToDo() {
      this.$store.dispatch("currentView", "dj");
    },
    clickRadio(rid) {
      console.log(rid);
      // this.$router.push(`/mvDetails?mvid=${mvid}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.dj-music {
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
    width: 100%;
    li {
      position: relative;
      height: 115px;
      width: 50%;
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
        height: 115px;
        border-top: 1px solid #f2f2f3;
        border-bottom: 1px solid #f2f2f3;
        &:nth-child(2n) {
          background: #fafafa;
        }
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
          img {
            width: 90px;
            border-radius: 5px;
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
          width: calc(100% - 100px);
          padding: 0 0 0 20px;
          span {
            font-size: 12px;
            cursor: pointer;
            color: #797878;
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
      }
    }
  }
}
</style>
