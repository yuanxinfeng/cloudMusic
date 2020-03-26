/*
 * @Description: 音乐接口
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-14 12:45:49
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-14 15:26:06
 */
import request from "@/utils/request";

// 通过id 获取音乐播放链接
export function songs(params) {
  return request({
    url: "/song/url",
    method: "GET",
    params: {
      id: params.id,
      br:999000
    }
  });
}

// 通过id 获取歌曲详情
export function songDetail(params) {
  return request({
    url: "/song/detail",
    method: "GET",
    params: {
      ids: params.ids
    }
  });
}

// 通过id 判断音乐是否可用
export function checkMusic(params) {
  return request({
    url: "/check/music",
    method: "GET",
    params: {
      id: params.id
    }
  });
}
