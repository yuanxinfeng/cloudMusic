/*
 * @Description: 音频播放控制
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-14 10:54:47
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-17 09:47:32
 */
import { songs, songDetail, checkMusic } from "@/api/songs";
const audios = {
  state: {
    music_volume: 3,
    current_music_id: 0,
    coyp_right: false,
    url: "",
    song_detail: { name: "" }
  },
  mutations: {
    SET_VOLUMES: (state, music_volume) => {
      state.music_volume = music_volume;
    },
    SET_COPY_RIGHT: (state, coyp_right) => {
      state.coyp_right = coyp_right;
    },
    SET_CURRENT_music_ID: (state, current_music_id) => {
      state.current_music_id = current_music_id;
    },
    SET_URL: (state, url) => {
      state.url = url;
    },
    SET_SONG_DETAIL: (state, song_detail) => {
      state.song_detail = song_detail;
    }
  },
  actions: {
    musicVolume({ commit }, music_volume) {
      commit("SET_VOLUMES", music_volume);
    },
    currentSongID({ commit }, current_music_id) {
      return new Promise((resolve, reject) => {
        checkMusic({ id: current_music_id }).then((res) => {
          if (res.success) {
            commit("SET_CURRENT_music_ID", current_music_id);
            commit("SET_COPY_RIGHT", false);
          } else {
            commit("SET_COPY_RIGHT", true);
          }
        });
      });
    },
    currentmusicUrl({ commit }, current_music_id) {
      return new Promise((resolve, reject) => {
        songs({ id: current_music_id })
          .then((res) => {
            commit("SET_URL", res.data[0].url);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getSongDetail({ commit }, current_music_id) {
      return new Promise((resolve, reject) => {
        songDetail({ ids: current_music_id })
          .then((res) => {
            commit("SET_SONG_DETAIL", res.songs[0]);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  }
};

export default audios;
