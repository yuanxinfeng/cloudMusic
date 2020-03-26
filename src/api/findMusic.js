/*
 * @Description: 发现所有接口
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-15 10:07:31
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-16 14:51:59
 */

import request from "@/utils/request";

// 推荐歌单
export function personalized() {
  return request({
    url: "/personalized",
    method: "GET"
  });
}

// 独家放送
export function privatecontent() {
  return request({
    url: "/personalized/privatecontent",
    method: "GET"
  });
}

// 最新音乐
export function newsong() {
  return request({
    url: "/personalized/newsong",
    method: "GET"
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
    params:{
      cat:params.cat,
      limit:params.limit,
      offset:params.offset,
      order:'hot'
    }
  });
}

// 获取精品歌单
export function highquality(params) {
  return request({
    url: "/top/playlist/highquality",
    method: "GET",
    params:{
      cat:params.cat,
      limit:params.limit,
      before:params.before
    }
  });
}

