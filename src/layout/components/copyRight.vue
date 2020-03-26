<!--
 * @Description: 
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 16:20:44
 * @LastEditors: Jasper
 * @LastEditTime: 2020-03-23 10:03:46
 -->
<template>
  <el-dialog
    title="提示"
    custom-class="coyp-right"
    :visible.sync="coyp_right"
    :show-close="false"
    width="30%"
    center
  >
    <i slot="title" class="iconfont icon-hao1" @click="close"></i>
    <div>
      <p>版权方要求，当前专辑需要单独付费，购买数字专辑即可无限畅想</p>
      <p>请登录网易云音乐iPhone客户端进行购买支付</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="close">购买专辑</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["coyp_right"])
  },
  methods: {
    close() {
      this.$store.commit("SET_COPY_RIGHT", false);
    }
  }
};
</script>

<style lang="scss">
.coyp-right {
  border-radius: 1em !important;
  width: 280px !important;
  .el-dialog__header {
    padding: 0 !important;
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    height: 135px;
    background: url("../../../public/image/timg.png") no-repeat center;
    background-size: cover;
    .icon-hao1 {
      left: 12px;
      position: absolute;
      top: 10px;
      font-size: 24px;
      color: #f2f2f3;
      &:hover {
        color: #ffffff;
      }
    }
  }
  .el-dialog__body {
    height: 135px;
    text-align: initial;
    padding: 15px 38px 30px !important;
    p {
      text-align: center;
      margin: 5px 0;
      cursor: default;
      &:nth-child(1) {
        color: #727272;
        font-size: 12px;
        line-height: 22px;
      }
      &:nth-child(2) {
        font-size: 15px;
        color: #000;
        line-height: 22px;
      }
    }
  }
  .el-dialog__footer {
    height: 70px;
    .el-button {
      width: 90%;
      border-radius: 16px;
    }
  }
}
</style>
