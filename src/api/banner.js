/*
 * @Description: 
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 16:19:17
 * @LastEditors: Jasper
 * @LastEditTime: 2020-03-23 10:57:04
 */
import request from "@/utils/request";

// 获取banner 目前还无法获取歌曲 没看懂
export function banners(params) {
  return request({
    url: "/banner",
    method: "GET",
    params: {
      type: 2
    }
  });
}
