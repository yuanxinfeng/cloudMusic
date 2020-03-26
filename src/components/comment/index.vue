<template>
  <div class="comment">
    <div class="srk">
      <el-input
        type="textarea"
        placeholder="输入评论或@朋友"
        v-model="commentValue"
        rows="3"
        resize="none"
        maxlength="140"
        show-word-limit
      ></el-input>
      <div class="btn">
        <i class="iconfont icon-qinggan"></i>
        <i class="iconfont icon-aite"></i>
        <i class="iconfont icon-Shape"></i>
        <span>评论</span>
      </div>
    </div>
    <div class="comment-list">
      <h4>精彩评论</h4>
      <list :datas="comments.hotComments" @report="report" @operation="operation"></list>
      <h4>最新评论</h4>
      <list :datas="comments.comments" @report="report" @operation="operation"></list>
    </div>
  </div>
</template>

<script>
import list from "./component/list";
export default {
  props: {
    comments: {
      type: Object,
      required: true,
      defualt: () => {}
    }
  },
  components: {
    list
  },
  data() {
    return { commentValue: "" };
  },
  methods:{
      report(a){
          console.log(a)
      },
      operation(a){
          console.log(a)
      }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  .srk {
    cursor: default;
    .btn {
      position: relative;
      color: #7b7b7b;
      padding: 15px 0;
      i {
        font-size: 18px;
        padding: 0 5px 0 0;
      }
      span {
        position: absolute;
        right: 0;
        padding: 0px 10px;
        border: 1px solid #ddd;
        border-radius: 18px;
        &:hover {
          background: #f3f3f3;
        }
      }
    }
  }
  .comment-list {
  }
}
</style>
