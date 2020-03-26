<template>
  <div class="search-content" v-if="showContent">
    <div class="content hots">
      <div class="title">热门搜索</div>
      <div class="hotsList">
        <ul>
          <li
            v-for="(item,index) in hots"
            @click="searchHots(item.first)"
            :key="index"
          >{{item.first}}</li>
        </ul>
      </div>
    </div>
    <div class="content history">
      <div class="title">搜索历史</div>
      <div class="hotsList historyList">
        <ul v-if="history.length>0">
          <li v-for="(item,index) in history" @click="searchHots(item)" :key="index">
            <span>{{item}}</span>
            <div class="delete" @click.stop="deleteHistory(index)">
              <i class="iconfont icon-hao1"></i>
            </div>
          </li>
        </ul>
        <div v-else class="noHistory">暂无搜索历史</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    showContent: {
      type: Boolean,
      required: true,
      default: false
    },
    hots: {
      type: Array,
      required: true,
      default: []
    }
  },
  computed: {
    ...mapGetters(["history"])
  },
  methods: {
    searchHots(value) {
      this.$emit("hotsValue", value);
    },
    deleteHistory(index) {
      this.$store.dispatch("deleteHistory", index);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-content {
  box-shadow: -1px 0 0 #e5e2e2;
  overflow: auto;
  width: 360px;
  position: fixed;
  height: calc(100vh - 110px);
  background: #ffffff;
  top: 44px;
  right: 0;
  z-index: 3;
  .content {
    width: 100%;
  }
  .title {
    margin: 20px 0 0 20px;
    font-size: 14px;
    color: #797474;
    cursor: default;
  }
  ul {
    height: 180px;
    padding: 15px 20px 0 20px;
    margin: 0;
    li {
      float: left;
      border: 1px solid #d0d0d0;
      border-radius: 20px;
      padding: 0 17px;
      margin: 0 10px 10px 0;
      height: 26px;
      font-size: 12px;
      line-height: 26px;
      &:hover {
        background: #f5f5f5;
        cursor: pointer;
      }
    }
  }
  .history {
    .historyList {
      ul {
        li {
          padding: 0 4px 0 17px;
          .delete {
            height: 13px;
            width: 12px;
            line-height: 13px;
            display: inline-block;
            i {
              font-size: 12px;
              color: rgb(83, 81, 81);
              display: none;
            }
          }
          &:hover i {
            display: inline;
          }
        }
      }
      .noHistory {
        color: #797474;
        text-align: center;
        margin-top: 70px;
      }
    }
  }
}
</style>

