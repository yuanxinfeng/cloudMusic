/*
 * @Description: 喜欢like请求
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-11 16:22:20
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-11 16:35:45
 */

import request from "@/utils/request";

// 喜欢 or 不喜欢
export function like(params) {
  return request({
    url: "/like",
    method: "GET",
    params:{
      like:params.like,
      id:params.id
    }
  });
}
