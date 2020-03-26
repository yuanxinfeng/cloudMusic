<!--
 * @Description: 个人详情页面
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-24 16:20:32
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-24 16:21:34
 -->

 <template>
  <div>userid:{{userid}}</div>
</template>
 
 <script>
export default {
  data() {
    return {
      userid: 0
    };
  },
  created() {
    this.userid = this.$route.query.userid;
  }
};
</script>
 
