import { banners } from "@/api/banner";
const banner = {
  state: {
    banners: []
  },

  mutations: {
    SET_BANNERS: (state, banners) => {
      state.banners = banners;
    }
  },
  actions: {
    banners({ commit }, banners) {
      commit("SET_BANNERS", banners);
    },
    getBanner({ commit }) {
      new Promise((resolve, reject) => {
        banners()
          .then((res) => {
            commit("SET_BANNERS", res.banners);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  }
};

export default banner;
