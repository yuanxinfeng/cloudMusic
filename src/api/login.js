import request from "@/utils/request";

// 手机登录
export function loginCellphone(params) {
  return request({
    url: "/login/cellphone",
    method: "GET",
    params: {
      phone: params.phone,
      password: params.password
    }
  });
}

// 邮箱登录
export function loginEmail(params) {
  return request({
    url: "/login",
    method: "GET",
    params: {
      email: params.email,
      password: params.password
    }
  });
}

// 发送验证码
export function sent(params) {
  return request({
    url: "/captcha/sent",
    method: "GET",
    params: {
      phone: params.phone,
      ctcode: params.ctcode
    }
  });
}
