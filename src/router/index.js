import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout/Layout";

export const constantRouterMap = [
  {
    path: "/",
    component: Layout,
    redirect: "recommend",
    children: [
      {
        path: "recommend",
        component: require("@/views/findMusic/recommend/index").default,
        name: "recommend",
        meta: { title: "个性推荐", type: "findMusic" },
      },
      {
        path: "playlist",
        component: require("@/views/findMusic/playlist/index").default,
        name: "playlist",
        meta: { title: "歌单", type: "findMusic" },
      },
      {
        path: "dj",
        component: require("@/views/findMusic/dj/index").default,
        name: "dj",
        meta: { title: "主播电台", type: "findMusic" },
      },
      {
        path: "top",
        component: require("@/views/findMusic/top/index").default,
        name: "top",
        meta: { title: "排行榜", type: "findMusic" },
      },
      {
        path: "singer",
        component: require("@/views/findMusic/singer/index").default,
        name: "singer",
        meta: { title: "歌手", type: "findMusic" },
      },
      {
        path: "newmusic",
        component: require("@/views/findMusic/newmusic/index").default,
        name: "newmusic",
        meta: { title: "最新音乐", type: "findMusic" },
      },
      {
        path: "highquality",
        component: require("@/views/findMusic/playlist/highquality").default,
        name: "highquality",
        meta: { title: "最新音乐", type: "findMusic" },
      },
    ],
  },
  {
    path: "/fm",
    component: Layout,
    redirect: "/fm/index",
    children: [
      {
        path: "/fm/index",
        component: require("@/views/fm/index").default,
        name: "fm",
        meta: { title: "私人FM" },
      },
    ],
  },
  {
    path: "/video",
    component: Layout,
    redirect: "/video",
    children: [
      {
        path: "/video",
        component: require("@/views/video/video/index").default,
        name: "video",
        meta: { title: "视频", type: "video" },
      },
    ],
  },
  {
    path: "/friend",
    component: Layout,
    redirect: "/friend/index",
    children: [
      {
        path: "/friend/index",
        component: require("@/views/friend/index").default,
        name: "friend",
        meta: { title: "朋友" },
      },
    ],
  },

  {
    path: "/search",
    component: Layout,
    redirect: "/search/index",
    children: [
      {
        path: "/search/index",
        component: require("@/views/search/index").default,
        name: "search",
        meta: { title: "搜索" },
      },
    ],
  },
  {
    path: "/artists",
    component: Layout,
    redirect: "/artists/index",
    children: [
      {
        path: "/artists/index",
        component: require("@/views/artists/index").default,
        name: "artists",
        meta: { title: "歌手" },
      },
    ],
  },
  {
    path: "/album",
    component: Layout,
    redirect: "/album/index",
    children: [
      {
        path: "/album/index",
        component: require("@/views/album/index").default,
        name: "album",
        meta: { title: "专辑" },
      },
    ],
  },
  {
    path: "/mvDetails",
    component: Layout,
    redirect: "/mvDetails/index",
    children: [
      {
        path: "/mvDetails/index",
        component: require("@/views/mvDetails/index").default,
        name: "mvDetails",
        meta: { title: "mv详情" ,type:"mv"},
      },
    ],
  },
  {
    path: "/playlists",
    component: Layout,
    redirect: "/playlists/index",
    children: [
      {
        path: "/playlists/index",
        component: require("@/views/playlists/index").default,
        name: "playlists",
        meta: { title: "歌单详情" },
      },
    ],
  },
  {
    path: "/payGiftLists",
    component: Layout,
    redirect: "/payGiftLists/index",
    children: [
      {
        path: "/payGiftLists/index",
        component: require("@/views/payGiftLists/index").default,
        name: "payGiftLists",
        meta: { title: "付费精品" },
      },
    ],
  },
  {
    path: "/payGiftDetails",
    component: Layout,
    redirect: "/payGiftDetails/index",
    children: [
      {
        path: "/payGiftDetails/index",
        component: require("@/views/payGiftDetails/index").default,
        name: "payGiftDetails",
        meta: { title: "付费精品详情" },
      },
    ],
  },

  {
    path: "/djDetails",
    component: Layout,
    redirect: "/djDetails/index",
    children: [
      {
        path: "/djDetails/index",
        component: require("@/views/djDetails/index").default,
        name: "djDetails",
        meta: { title: "dj详情" },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    redirect: "/user/index",
    children: [
      {
        path: "/user/index",
        component: require("@/views/user/index").default,
        name: "user",
        meta: { title: "个人详情" },
      },
    ],
  },
  {
    path: "/404",
    component: require("@/views/errorPage/404").default,
  },
  {
    path: "/login",
    meta: { title: "登录" },
    component: require("@/views/login/index").default,
  },
  // { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});
