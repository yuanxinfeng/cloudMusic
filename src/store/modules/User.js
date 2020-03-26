import { loginCellphone, loginEmail } from "@/api/login";

const user = {
  state: {
    account: {},
    loginWay: true //true 为手机号登录 false 为邮箱登录
  },

  mutations: {
    SET_LOGIN_WAY: (state, loginWay) => {
      state.loginWay = loginWay;
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account;
    }
  },
  actions: {
    loginWay({ commit }, loginWay) {
      commit("SET_LOGIN_WAY", loginWay);
    },
    // 登录
    Login({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        if (!user.state.loginWay) {
          loginCellphone(loginForm)
            .then((res) => {
              setUserAccount(res, commit);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          loginEmail(loginForm)
            .then((res) => {
              setUserAccount(res, commit);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        resolve();
      });
    }
  }
};

export const setUserAccount = (res, commit) => {
  // 保存登录信息
  commit("SET_ACCOUNT", res.account);
};

export default user;
