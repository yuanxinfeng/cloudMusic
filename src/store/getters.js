const getters = {
  currentNav: (state) => state.categoryNav.currentNav,
  currentView: (state) => state.categoryNav.currentView,
  personalizedList: (state) => state.HomePersonality.personalizedList,
  defaultConfig: (state) => state.HomePersonality.defaultConfig,
  personalizedShow: (state) => state.HomePersonality.personalizedShow,
  banners: (state) => state.banner.banners,
  history: (state) => state.search.history,
  category: (state) => state.search.category,
  currentPath: (state) => state.aside.currentPath,
  music_volume: (state) => state.audio.music_volume,
  current_music_id: (state) => state.audio.current_music_id,
  url: (state) => state.audio.url,
  song_detail: (state) => state.audio.song_detail,
  coyp_right: (state) => state.audio.coyp_right,
  cat: (state) => state.playlist.cat
};
export default getters;
