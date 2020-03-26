<template>
  <div class="aside-container">
    <div class="user-container">
      <i class="iconfont icon-touxiang"></i>
      <span>{{username}}</span>
      <i class="iconfont icon-sanjiaoxing"></i>
    </div>
    <div class="nav-container">
      <ul>
        <li :class="[currentPath==='/'?'current':'']" @click="clickAside('/')">
          <div>
            <i class="iconfont icon-wangyiyun"></i>
            <span>发现音乐</span>
          </div>
        </li>
        <li :class="[currentPath==='/fm'?'current':'']" @click="clickAside('/fm')">
          <div>
            <i class="iconfont icon-FM"></i>
            <span>私人FM</span>
          </div>
        </li>
        <li :class="[currentPath==='/video'?'current':'']" @click="clickAside('/video')">
          <div>
            <i class="iconfont icon-shiping"></i>
            <span>视频</span>
          </div>
        </li>
        <li :class="[currentPath==='/friend'?'current':'']" @click="clickAside('/friend')">
          <div>
            <i class="iconfont icon-pengyou"></i>
            <span>朋友</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "未登录"
    };
  },
  computed: {
    ...mapGetters(["currentPath"])
  },
  methods: {
    clickAside(path) {
      // this.$store.dispatch('currentPath',path);
      this.$router.push({ path: path });
    }
  }
};
</script>

<style lang="scss" scoped>
.aside-container {
  width: 200px;
  height: calc(100vh - 110px);
  background: #ededed;
  .user-container {
    position: relative;
    height: 60px;
    width: 100%;
    .icon-touxiang {
      margin: 10px;
      position: absolute;
      cursor: pointer;
      font-size: 40px;
      top: -3px;
      color: #e0e0e0;
    }
    .icon-sanjiaoxing {
      position: absolute;
      left: 105px;
      top: 22px;
      color: #8e8e8e;
    }
    & span {
      position: absolute;
      cursor: default;
      font-size: 15px;
      line-height: 60px;
      left: 60px;
    }
  }
  .nav-container {
    ul {
      padding: 0;
      margin: 0;
      li {
        div {
          line-height: 34px;
          margin: 0 13px;
          color: #474747;
          cursor: default;
          i {
            font-size: 18px;
            margin: 0 5px;
          }
          span {
            font-size: 14px;
            font-weight: 500;
            left: 40px;
            position: absolute;
          }
        }
        &:hover {
          background: #d9d9d9;
        }
      }
      .current {
        background: #d9d9d9;
        i,
        span {
          color: #d13c37;
        }
      }
    }
  }
}
</style>

