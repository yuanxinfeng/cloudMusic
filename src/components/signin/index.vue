<template>
  <el-form :model="form" :rules="rules" ref="loginForm" label-width="50px" class="demo-ruleForm">
    <el-form-item>
      <el-switch v-model="loginWay" active-text="邮箱登录" @change="clearValidate" inactive-text="手机登录"></el-switch>
    </el-form-item>
    <el-form-item prop="email" v-if="loginWay">
      <el-input v-model="form.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="phone" v-else>
      <el-input v-model="form.phone" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" show-password placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" :loading="loading" size="small" @click="submitForm()">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { validatEmail, validatPhone } from "@/utils/validate";
import { loginCellphone, loginEmail } from "@/api/login";
export default {
  name: "signin",
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!validatPhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (!validatEmail(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      loginWay: true,
      form: {
        phone: "",
        email: "kiss_920410@163.com",
        password: "yuanXINfeng007"
      },
      rules: {
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: ["change", "blur"]
          },
          { validator: checkPhone, trigger: ["change", "blur"] }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: ["change", "blur"]
          },
          { validator: checkEmail, trigger: ["change", "blur"] }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: ["change", "blur"] }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.form)
            .then(() => {
              console.log(111111)
              this.$router.push({ path: "/" });
            })
            .catch(error => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    logined(res) {},
    clearValidate() {
      this.$store.dispatch("loginWay", !this.loginWay);
      this.$refs["loginForm"].clearValidate();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form-item {
  width: 90%;
  .el-button--danger {
    width: 100%;
  }
}
</style>

