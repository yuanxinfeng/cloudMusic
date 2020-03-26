const category = {
  state: {
    //用来判断中的标题
    currentNav: "findMusic",
    //用来匹配component
    currentView: "recommend"
  },

  mutations: {
    SET_CURRENT_NAV: (state, currentNav) => {
      state.currentNav = currentNav;
    },
    SET_CURRENT_VIEW: (state, currentView) => {
      state.currentView = currentView;
    }
  },
  actions: {
    currentNav({ commit }, currentNav) {
      commit("SET_CURRENT_NAV", currentNav);
    },
    currentView({ commit }, currentView) {
      commit("SET_CURRENT_VIEW", currentView);
    }
  }
};

export default category;
