<template>
  <div class="song">
    <div class="match" v-if="false">
      <!-- 这里是最佳匹配 目前不知道怎么得到数据 -->
    </div>
    <song-table :songs="datas" :params="params"></song-table>
  </div>
</template>
<script>
import songTable from "@/components/songTable";
export default {
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
  components: {
    songTable
  }
};
</script>

<style lang="scss" scoped>
ul {
  padding: 0 20px;
  margin: 0;
  bottom: 10px;
  position: absolute;
  li {
    font-size: 14px;
    font-weight: bold;
    cursor: default;
    color: #646464;
    float: left;
    margin: 0 14px;
    &:hover {
      color: #000000;
    }
  }
  .current {
    color: #000000;
  }
}
.el-pagination {
text-align: center
}
</style>
