/*
 * @Description: dj
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 16:19:17
 * @LastEditors: Jasper
 * @LastEditTime: 2020-04-08 16:35:04
 */
import request from "@/utils/request";

// 获取MV地址
export function mvUrl(params) {
  return request({
    url: "mv/url",
    method: "GET",
    params:{
      id:params.mvid,
    }
  });
}