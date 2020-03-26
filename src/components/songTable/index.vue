
<template>
  <div class="songs-container">
    <el-table
      :data="songs"
      size="mini"
      stripe
      style="width: 100%"
      :cell-style="{'vertical-align':'top'}"
      @row-contextmenu="rightClick"
      @cell-dblclick="dblClick"
    >
      <template slot="empty">
        <div v-loading="loading" style="height:calc(100vh - 222px)"></div>
      </template>
      <el-table-column width="43px">
        <template slot-scope="scope">
          <span v-if="!(current_music_id=== scope.row.id)">{{ indexMethod(scope.$index) }}</span>
          <i
            style="color:#d13c37"
            v-else
            :class="['iconfont',current_music_id=== scope.row.id?'icon-play':'']"
          ></i>
        </template>
      </el-table-column>
      <el-table-column width="35px">
        <template slot-scope="scope">
          <i class="iconfont icon-xihuan" @click="likes(scope.row.id)"></i>
        </template>
      </el-table-column>
      <el-table-column width="30px">
        <template slot-scope="scope">
          <i class="iconfont icon-xiazai" @click="downloads(scope)"></i>
        </template>
      </el-table-column>
      <el-table-column prop="name" min-width="200px" label="音乐标题">
        <template slot-scope="scope">
          <p :title="scope.row.name">
            <span
              class="music-name"
              :style="{color:current_music_id=== scope.row.id?'#d13c37':''}"
            >{{scope.row.name}}</span>
            <span>
              <!-- 这里没有找到这首歌曲是否是sq音乐标识 -->
              <!-- <i class="iconfont icon-sq"></i> -->
              <i
                class="iconfont icon-icon-shiping"
                v-if="scope.row.mvid"
                @click.stop="mvClick(scope.row.mvid)"
              ></i>
              <span style="height: 17px;width: 25px;display: inline-block;">
                <i class="iconfont icon-dian" @click.stop="rightClick(scope.row)"></i>
              </span>
            </span>
          </p>
          <p>{{scope.row.alias[0]}}</p>
        </template>
      </el-table-column>
      <el-table-column label="歌手">
        <template slot-scope="scope">
          <template v-for="(art,index) in scope.row.artists">
            <span :key="index" :title="scope.row.artists|showOverflowToolTip">
              <router-link :to="`/artists?id=${art.id}`">{{art.name}}</router-link>
              <span v-if="scope.row.artists.length> index+1">/</span>
            </span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="专辑">
        <template slot-scope="scope">
          <router-link
            :to="`/album?id=${scope.row.album.id}`"
            :title="scope.row.album.name"
          >{{scope.row.album.name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column width="110px" label="时长">
        <template slot-scope="scope">
          <span>{{scope.row.duration | foramtDuration}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const { remote } = require("electron");
const { Menu, MenuItem } = remote;

import { like } from "@/api/like";
import { music } from "@/api/comment";
import { mapGetters } from "vuex";
import { resolve } from "url";

export default {
  props: {
    songs: {
      type: Array,
      required: true
    },
    params: {
      type: Object
    }
  },
  data() {
    return {
      loading: true,
      rightTemplateMenu: [
        {
          label: "播放"
        },
        {
          label: "查看评论"
        },
        {
          label: "下一首播放"
        },
        { type: "separator" },
        {
          label: "收藏",
          submenu: [
            {
              label: "创建新歌单"
            },
            { type: "separator" },
            {
              label: "我喜欢的音乐"
            }
          ]
        },
        {
          label: "分享..."
        },
        {
          label: "复制链接"
        },
        {
          label: "下载",
          submenu: [
            {
              label: "创建新歌单"
            },
            { type: "separator" },
            {
              label: "我喜欢的音乐"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["current_music_id"])
  },
  created() {
    this.$nextTick(() => {});
  },
  methods: {
    // 数据索引
    indexMethod(number) {
      let index = (this.params.page - 1) * this.params.limit + number + 1;
      if (index < 10) {
        index = `0${index}`;
      }
      return index;
    },
    // 右键点击
    rightClick(row) {
      const menu = new Menu();
      const _this = this;

      let params = {
        limit: 1,
        offset: 1,
        before: "",
        id: row.id
      };
      music(params)
        .then(res => {
          //右键菜单
          this.rightTemplateMenu.map((n, i) => {
            let menuItem = n;
            switch (i) {
              case 1:
                menuItem.click = function() {
                  _this.todoClick(i, row);
                };
                menuItem.label = `查看评论${
                  res.total === 0 ? "" : `(${res.total})`
                }`;
                break;
              case 4:
              case 7:
                menuItem.submenu.map((v, k) => {
                  let childMenuItem = v;
                  childMenuItem.click = function() {
                    _this.todoClick(`${i}0${k}`, row);
                  };
                });
                break;

              default:
                menuItem.click = function() {
                  _this.todoClick(i, row);
                };
                break;
            }
            menu.append(new MenuItem(menuItem));
          });
        })
        .then(() => {
          menu.popup({ window: remote.getCurrentWindow() });
        });
    },
    /**
     * @description: 点击事件处理
     * @param {type} 0:播放 1:查看评论 2:下一首播放 400:收藏-创建新歌单 402:收藏-我喜欢的音乐 5:分享 6:复制链接 700:下载-创建新歌单 702:下载-我喜欢的音乐
     * @return: null
     */
    todoClick(type, row) {
      if (type === 0) {
        this.$store.dispatch("currentSongID", row.id);
      } else {
        console.log(`待开发`);
      }
    },
    // 点击进入mv详情页面
    mvClick(mvid) {
      this.$router.push(`/mvDetails?mvid=${mvid}`);
    },
    // 点击喜欢或取消喜欢
    likes(id) {
      like({ id: id }).then(res => {});
    },
    // 点击下载
    downloads(v) {
      console.log("下载");
    },
    //双击进行播放
    dblClick(row, column, cell, event) {
      this.$store.dispatch("currentSongID", row.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.songs-container {
  width: 100%;
  cursor: default;
  .el-table__row {
    &:hover {
      .icon-dian {
        display: initial;
      }
    }
  }
  p {
    padding: 0;
    margin: 0;
    display: flex;
    .music-name {
      color: #000;
    }
    i {
      padding: 0 0 0 5px;
    }
    .icon-sq {
      color: #fb6839;
    }
    .icon-icon-shiping {
      color: #d13c37;
      cursor: pointer;
    }
    .icon-dian {
      display: none;
      color: #606266;
      &:hover {
        color: #000;
      }
    }
  }
  a {
    text-decoration: none;
    color: #606266;
    &:hover {
      color: #0c0b0b;
    }
  }
  .icon-xihuan,
  .icon-xiazai {
    font-size: 14px;
    cursor: pointer;
    position: absolute;
  }
}
</style>

