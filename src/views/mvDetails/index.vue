<!--
 * @Description: mv详情页面
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-11 15:34:24
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-11 15:37:11
 -->
 <template>
  <div>mvid:{{mvid}}</div>
</template>
 
 <script>
export default {
  data() {
    return {
      mvid: 0
    };
  },
  created() {
    this.mvid = this.$route.query.mvid;
  }
};
</script>
 
