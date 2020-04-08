<template>
  <div class="tj-mv">
    <div class="title-c" @click="clickToDo">
      <span>推荐MV</span>
      <i class="iconfont icon-icon-go"></i>
    </div>
    <ul>
      <li v-for="(item,index) in tjmvList" :key="index" :style="{width:fourWidth+'px'}">
        <router-link :to="`/mvDetails?mvid=${item.id}`">
          <div class="header-img">
            <img
              :src="item.picUrl"
              :style="{width:(fourWidth-20)+'px',height:((fourWidth-20)*0.55)+'px'}"
              alt
            />
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
  </div>
</template>

<script>
import { tjmv } from "@/api/findMusic";
import resize from "@/mixins/resize";
export default {
  data() {
    return {
      tjmvList: []
    };
  },
  mixins: [resize],
  created() {
    tjmv().then(res => {
      this.tjmvList.push(...res.result.splice(0, 4));
    });
  },
  methods: {
    clickToDo() {
      return;
    }
  }
};
</script>

<style lang="scss" scoped>
.tj-mv {
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
      height: 180px;
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
            width: 170.5px;
            height: 93.5px;
            border-radius: 5px;
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
              left: 10px;
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
      }
    }
  }
}
</style>