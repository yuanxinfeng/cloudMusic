<!--
 * @Description: 首页栏目自定义
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-17 09:48:42
 * @LastEditors: Jasper
 * @LastEditTime: 2020-03-20 16:36:26
 -->
<template>
  <el-dialog
    title="提示"
    custom-class="home-p"
    :visible.sync="personalizedShow"
    :show-close="false"
    width="30%"
    center
  >
    <div slot="title" class="title">
      <i class="iconfont icon-hao1" @click="close"></i>
      <span>调整栏目顺序</span>
      <p>想调整首页栏目的顺序？按住右边按钮拖动即可</p>
    </div>
    <draggable :list="curList">
      <transition-group>
        <div v-for="element in curList" :key="element.id" class="name">
          <div>
            <span>{{element.name}}</span>
            <i class="iconfont icon-menu"></i>
          </div>
        </div>
      </transition-group>
    </draggable>
    <span slot="footer" class="dialog-footer">
      <p @click="defaultSort">恢复默认排序</p>
      <el-button type="primary" size="small" @click="save">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";

import draggable from "vuedraggable";
export default {
  data() {
    return {
      curList: []
    };
  },
  computed: {
    ...mapGetters(["personalizedShow", "personalizedList", "defaultConfig"])
  },
  components: { draggable },
  created() {
    this.$nextTick(() => {
      this.personalizedList.map(n => {
        this.curList.push(n);
      });
    });
  },
  methods: {
    close() {
      this.$store.dispatch("personalizedShow", false);
    },
    // 恢复默认排序
    defaultSort() {
      this.curList = [];
      this.defaultConfig.map(n => {
        this.curList.push(n);
      });
    },
    // 调整排序
    save() {
      this.$store.dispatch("personalized", this.curList).then(() => {
        this.curList = [];
        this.close();
      });
    }
  }
};
</script>

<style lang="scss">
.home-p {
  border-radius: 0.5em !important;
  width: 330px !important;
  cursor: default;
  .el-dialog__header {
    padding: 0 !important;
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    height: 80px;
    .title {
      .icon-hao1 {
        left: 12px;
        position: absolute;
        top: 10px;
        font-size: 24px;
        color: #b3b3b9;
        &:hover {
          color: #6e6d6d;
        }
      }
      span {
        line-height: 48px;
        font-size: 17px;
        font-weight: 500;
      }
      p {
        font-size: 12px;
        color: #888383;
        padding: 18px 0;
        margin: 0;
      }
    }
  }
  .el-dialog__body {
    height: 185px;
    text-align: initial;
    padding: 15px 0 30px !important;
    .name {
      height: 35px;
      div {
        margin: 0 15px 0 15px;
        border-bottom: 1px #f5f5f5 solid;
        position: relative;
        span {
          line-height: 35px;
          font-size: 13px;
          color: #393939;
          font-weight: 500;
        }
        i {
          cursor: move;
          position: absolute;
          right: 0;
          font-size: 20px;
          color: #8e8e8e;
          top: 7px;
        }
      }
      &:hover {
        background: #f5f5f5;
      }
      &:active {
        box-shadow: 0px 0px 5px #b9b8b8;
        background: #ffffff;
        div {
          border: none;
        }
      }
    }
  }
  .el-dialog__footer {
    height: 135px;
    p {
      font-size: 13px;
      color: #777575;
      text-decoration: underline;
      padding: 0;
      margin: 20px 0 30px 0;
    }
    .el-button {
      cursor: default;
      width: 85px;
      font-size: 15px;
      border-radius: 20px;
      height: 30px;
      line-height: 10px;
      background: linear-gradient(to right, #ed4f46, #ca3a35);
      &:hover {
        background: linear-gradient(to right, #ca3a35, #ca3a35);
      }
    }
  }
}
</style>
