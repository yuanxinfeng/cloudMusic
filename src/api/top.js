/*
 * @Description: 排行榜
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 16:19:17
 * @LastEditors: Jasper
 * @LastEditTime: 2020-03-30 08:33:49
 */
import request from "@/utils/request";

// 所有榜单
export function topList() {
  return request({
    url: "/toplist",
    method: "GET"
  });
}

// 排行榜
export function top_list(params) {
  return request({
    url: "/top/list",
    method: "GET",
    params: params
  });
}

// 所有榜单内容摘要
export function topListDetail(){
  return request({
    url: "toplist/detail",
    method: "GET"
  });
}
