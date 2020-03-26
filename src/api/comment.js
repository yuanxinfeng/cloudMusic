/*
 * @Description: 评论接口
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-16 08:19:48
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-16 08:24:55
 */

import request from "@/utils/request";

// 获取歌曲评论
export function music(params) {
  return request({
    url: "/comment/music",
    method: "GET",
    params:{
      limit:params.limit,
      offset:params.offset,
      before:params.before,
      id:params.id
    }
  });
}
