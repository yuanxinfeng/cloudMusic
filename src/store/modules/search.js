import { getValue, setValue, removeValue } from "@/utils/localStorage";
const search = {
  state: {
    history: !getValue("searchHistory") ? [] : getValue("searchHistory"),
    //搜索类型:取值 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
    category: {
      1: "songs",
      10: "albums",
      100: "artists",
      1000: "playlists",
      1002: "userprofiles",
      1004: "mvs",
      1006: "songs",
      1009: "djRadios",
      1014: "videos"
    }
  },

  mutations: {
    SET_HISTORY: (state, history) => {
      state.history = history;
    }
  },
  actions: {
    history({ commit }, history) {
      commit("SET_HISTORY", saveHistory(history));
    },
    deleteHistory({ commit }, index) {
      commit("SET_HISTORY", delHistory(index));
    }
  }
};
function saveHistory(history) {
  if (getValue("searchHistory")) {
    let temp = getValue("searchHistory");
    temp.push(history);
    setValue("searchHistory", temp);
  } else {
    setValue("searchHistory", [history]);
  }
  return getValue("searchHistory");
}
function delHistory(index) {
  search.state.history.splice(index, 1);
  setValue("searchHistory", search.state.history);
  return search.state.history;
}
export default search;
