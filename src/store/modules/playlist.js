const playlist = {
  state: {
    // 歌单分类
    cat: ""
  },

  mutations: {
    SET_CAT: (state, cat) => {
      state.cat = cat;
    }
  },
  actions: {
    cat({ commit }, cat) {
      commit("SET_CAT", cat);
    }
  }
};

export default playlist;
