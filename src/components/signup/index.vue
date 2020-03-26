<template>
  <el-form :model="form" :rules="rules" ref="loginForm" label-width="50px" class="demo-ruleForm">
    <el-form-item prop="phone">
      <el-input placeholder="手机号" v-model="form.phone" class="input-with-select">
        <el-select v-model="form.ctcode" slot="prepend" placeholder="请选择">
          <el-option label="中国 +86" value="86"></el-option>
          <el-option label="中国香港 +852" value="852"></el-option>
          <el-option label="中国澳门 +853" value="853"></el-option>
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item prop="phone" style="width:%"></el-form-item>
    <el-form-item prop="captcha">
      <el-input v-model="form.captcha" placeholder="输入6位手机验证码">
        <el-button type="text" slot="append" @click="sendCode">{{captchaMsg}}</el-button>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" size="small" @click="submitForm()">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { validatPhone } from "@/utils/validate";
import { sent } from "@/api/login";
export default {
  name: "signup",
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!validatPhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      form: {
        phone: "",
        ctcode: "86",
        captcha: ""
      },
      captchaMsg: "获取短信验证码",
      rules: {
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: ["change", "blur"]
          },
          { validator: checkPhone, trigger: ["change", "blur"] }
        ],
        captcha: [
          {
            required: true,
            message: "请输入短信验证码",
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  methods: {
    sendCode() {
      sent(this.form).then(() => {});
    },
    submitForm() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form-item {
  width: 90%;
  .el-select {
    width: 145px;
  }
  .el-button--danger {
    width: 100%;
  }
}
</style>
