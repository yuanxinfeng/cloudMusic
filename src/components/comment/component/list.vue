<template>
  <ul>
    <li v-for="(item,index) in datas" :key="index">
      <div class="avatar">
        <img :src="item.user.avatarUrl" alt />
      </div>
      <div class="c">
        <span class="nickname">{{item.user.nickname}}:</span>
        <span class="content">{{item.content}}</span>
        <ul v-if="item.beReplied.length>0">
          <li v-for="(items,indexs) in item.beReplied" :key="indexs">
            <span class="nickname">@{{items.user.nickname}}:</span>
            <span class="content">{{items.content}}</span>
          </li>
        </ul>
        <p class="time">
          <span class="t">{{item.time | formatTime}}</span>
          <span class="btn">
            <span class="j" @click="reportClick(item.user.userId)">举报</span>
            <i
              class="iconfont icon-zan"
              @click="operationClick(1,item)"
            >{{item.likedCount?item.likedCount:''}}</i>
            <i class="iconfont icon-fenxiang" @click="operationClick(2,item)"></i>
            <i class="iconfont icon-pinglun" @click="operationClick(3,item)"></i>
          </span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
const { remote } = require("electron");
const { Menu, MenuItem } = remote;
export default {
  props: {
    datas: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      reportList: [
        {
          label: "段子或无意义的评论"
        },
        {
          label: "广告或营销信息"
        },
        {
          label: "恶意人身攻击"
        },
        {
          label: "色情、低俗或有害内容"
        },
        {
          label: "政治敏感言论"
        },
        { type: "separator" },
        {
          label: "其他原因>"
        }
      ]
    };
  },
  methods: {
    // 举报
    reportClick(userid) {
      const menu = new Menu();
      const _this = this;
      //右键菜单
      this.reportList.map((n, i) => {
        let menuItem = n;
        // switch (i) {
        //   case 1:

        //   case 4:
        //   case 7:

        //     break;

        //   default:
        menuItem.click = function() {
          _this.todoClick(i, userid);
        };
        //     break;
        // }
        menu.append(new MenuItem(menuItem));
      });
      menu.popup({ window: remote.getCurrentWindow() });
    },
    todoClick(i, userid) {
      this.$emit("report", { i: i, userid: userid });
    },
    operationClick(index,row) {
      this.$emit("operation", {index,row});
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  li {
    padding: 15px 0;
    &:hover {
      .c {
        .time {
          .btn {
            .j {
              font-size: 11px;
              display: inline;
            }
          }
        }
      }
    }
    .avatar {
      width: 36px;
      cursor: pointer;
      float: left;
      img {
        width: 36px;
        height: 36px;
        border-radius: 18px;
      }
    }
    .c {
      margin-left: 50px;
      border-bottom: 1px solid #f5f5f5;
      li {
        background: #f5f5f5;
        padding: 5px;
        border-radius: 6px;
      }
      span {
        font-size: 13px;
      }
      .nickname {
        cursor: pointer;
        color: #206ba5;
        &:hover {
          color: #2b4e6d;
        }
      }
      .time {
        padding: 0;
        color: #9a9898;
        font-size: 12px;
        cursor: default;
        .btn {
          float: right;
          span,
          i {
            font-size: 13px;
            padding: 0 10px;
            border-right: 1px solid #ddd;
          }
          i {
            &:hover {
              color: #333333;
            }
          }
          .j {
            display: none;
          }
          i:nth-child(4) {
            border: none;
          }
        }
      }
    }
  }
}
</style>
