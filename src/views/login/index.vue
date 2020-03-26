<template>
  <div class="login">
    <div class="login-form">
      <!-- <signin/> -->
      <component :is="currentView"></component>
      <div class="login-footer">
        <span>{{currentView==='signin'?'没有账号？':'已有帐号？'}}</span>
        <el-button type="text" @click="sgin">{{currentView==='signin'?'注册':'登录'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import signin from "@/components/signin";
import signup from "@/components/signup";
export default {
  components: {
    signin,
    signup
  },
  data(){
    return {
      currentView:'signin'
    }
  },
  methods:{
    sgin(){
      this.currentView = this.currentView === 'signin'?'signup':'signin'
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e0075a;
  background-size: 100% auto;
  height: 100vh;
  .login-form {
    position: relative;
    width: 432px;
    height: 366px;
    padding: 74px 0 0 0;
    border-radius: 10px;
    background: #ffffff;
    -webkit-box-shadow: 0 10px 35px rgba(0, 0, 0, 0.2);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.2);
    .el-input {
      height: 40px;
      input {
        height: 40px;
      }
    }
    .login-footer {
      position: absolute;
      width: 100%;
      height: 60px;
      bottom: 0;
      text-align: center;
      background: #ebebeb;
      span {
        line-height: 60px;
        font-size: 15px;
      }
    }
  }
}
</style>
