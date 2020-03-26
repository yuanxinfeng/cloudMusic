const aside = {
  state: {
    currentPath: "/"
  },

  mutations: {
    SET_CURRENT_PATH: (state, currentPath) => {
      state.currentPath = currentPath;
    }
  },
  actions: {
    currentPath({ commit }, currentPath) {
      commit("SET_CURRENT_PATH", currentPath);
    }
  }
};

export default aside;
