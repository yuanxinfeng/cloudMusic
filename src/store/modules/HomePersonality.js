import { getValue, setValue, removeValue } from "@/utils/localStorage";
const category = {
  state: {
    //用来判断中的标题
    personalizedShow: false,
    // 首页个性化
    personalizedList: getValue("SET_PERSONALIZED")
      ? getValue("SET_PERSONALIZED")
      : [
          { id: 1, name: "推荐歌单", component: "personalized" },
          { id: 2, name: "独家放送", component: "privatecontent" },
          { id: 3, name: "最新音乐", component: "newsong" },
          { id: 4, name: "推荐MV", component: "tjmv" },
          { id: 5, name: "主播电台", component: "djprogram" }
        ],
    defaultConfig: [
      { id: 1, name: "推荐歌单", component: "personalized" },
      { id: 2, name: "独家放送", component: "privatecontent" },
      { id: 3, name: "最新音乐", component: "newsong" },
      { id: 4, name: "推荐MV", component: "tjmv" },
      { id: 5, name: "主播电台", component: "djprogram" }
    ]
  },

  mutations: {
    SET_PERSONALIZEDSHOW: (state, personalizedShow) => {
      state.personalizedShow = personalizedShow;
    },
    SET_PERSONALIZED: (state, personalizedList) => {
      state.personalizedList = personalizedList;
    }
  },
  actions: {
    personalizedShow({ commit }, personalizedShow) {
      commit("SET_PERSONALIZEDSHOW", personalizedShow);
    },
    personalized({ commit }, personalizedList) {
      setValue("SET_PERSONALIZED", personalizedList);
      commit("SET_PERSONALIZED", personalizedList);
    }
  }
};

export default category;
