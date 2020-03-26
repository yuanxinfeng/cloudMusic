/*
 * @Description: dj
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 16:19:17
 * @LastEditors: Jasper
 * @LastEditTime: 2020-03-23 16:56:36
 */
import request from "@/utils/request";

// 获取dj banner
export function DjBanners() {
  return request({
    url: "dj/banner",
    method: "GET"
  });
}
// 获取电台分类
export function DjCatelist() {
  return request({
    url: "dj/catelist",
    method: "GET"
  });
}
// 获取热门电台
export function DjPaygift(params) {
  return request({
    url: "dj/paygift",
    method: "GET",
    params:{
      limit:params.limit,
      offset:params.offset
    }
  });
}
// 获取电台详情
export function DjDetail(params) {
  return request({
    url: "/dj/detail",
    method: "GET",
    params:{
      rid:params.rid
    }
  });
}
// 获取热门电台
export function DjHot() {
  return request({
    url: "dj/hot",
    method: "GET"
  });
}

