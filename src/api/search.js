import request from "@/utils/request";

// 搜索
export function searchList(params) {
  return request({
    url: "/search",
    method: "GET",
    params:{
      keywords:params.keywords,
      limit:params.limit,
      offset:params.offset,
      type:params.type
    }
  });
}

// 热搜列表(简略)
export function searchHots() {
  return request({
    url: "/search/hot",
    method: "GET"
  });
}

// 热搜列表(详细)
export function searchHotDetail() {
  return request({
    url: "/search/hot/detail",
    method: "GET"
  });
}

// 搜索建议
export function searchSuggests(keywords) {
  return request({
    url: "/search/suggest",
    method: "GET",
    params:{
      keywords:keywords
    }
  });
}

// 搜索建议
export function searchMultimatch(keywords) {
  return request({
    url: "/search/multimatch",
    method: "GET",
    params:{
      keywords:keywords
    }
  });
}