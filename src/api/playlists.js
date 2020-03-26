/*
 * @Description: 歌单接口
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-23 15:48:36
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-24 16:12:07
 */

import request from "@/utils/request";

// 歌单详情
export function detail(id) {
  return request({
    url: "/playlist/detail",
    method: "GET",
    params: {
      id: id
    }
  });
}

// 歌单评论
export function playlistsComment(params) {
  return request({
    url: "/comment/playlist",
    method: "GET",
    params: {
      id: params.id,
      offset: params.offset,
      limit: params.limit,
      before: params.before
    }
  });
}

// 最新音乐
export function subscribers(params) {
  return request({
    url: "/playlist/subscribers",
    method: "GET",
    params: {
      id: params.id,
      offset: params.offset,
      limit: params.limit
    }
  });
}

// 推荐mv
export function tjmv() {
  return request({
    url: "/personalized/mv",
    method: "GET"
  });
}

// 推荐电台
export function djprogram() {
  return request({
    url: "/personalized/djprogram",
    method: "GET"
  });
}

// 获取歌单分类
export function catlist() {
  return request({
    url: "/playlist/catlist",
    method: "GET"
  });
}

// 获取热门歌单分类
export function hotList() {
  return request({
    url: "/playlist/hot",
    method: "GET"
  });
}

// 获取歌单 ( 网友精选碟 )
export function playlist(params) {
  return request({
    url: "/top/playlist",
    method: "GET",
    params: {
      cat: params.cat,
      limit: params.limit,
      offset: params.offset,
      order: "hot"
    }
  });
}

// 获取精品歌单
export function highquality(params) {
  return request({
    url: "/top/playlist/highquality",
    method: "GET",
    params: {
      cat: params.cat,
      limit: params.limit,
      before: params.before
    }
  });
}
