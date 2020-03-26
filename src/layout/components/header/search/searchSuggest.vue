<template>
  <div class="search-suggest" v-if="showSuggest">
    <ul>
      <li v-for="(item,index) in suggest.order" @click="searchSuggest(item)" :key="index">
        <i :class="['iconfont',classs[item]]"></i>
        <span>{{title[item]}}</span>
        <ul class="child-ul">
          <div
            v-for="(items,indexs) in suggest[item]"
            @click="searchSuggest(item)"
            :key="indexs"
            class="child-div"
          >
            <li>{{items | songerName(item)}}</li>
          </div>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: {
        albums: "专辑",
        artists: "歌手",
        songs: "单曲",
        playlists: "歌单",
        mvs: "视频"
      },
      classs: {
        albums: "icon-bofangye-caozuolan-zhuanji",
        artists: "icon-flyme_icon-",
        songs: "icon-yinle",
        playlists: "icon-gedan",
        mvs: "icon-icon-shiping"
      }
    };
  },
  props: {
    showSuggest: {
      type: Boolean,
      required: true,
      default: false
    },
    suggest: {
      type: Object,
      required: true,
      default: []
    }
  },
  filters: {
    songerName(item, index) {
      let title = item.name;
      if (index === "songs") {
        let name = "";
        item.artists.forEach(element => {
          name += ` ${element.name} `;
        });
        title = `${title} - ${name}`;
      } else if (index === "albums") {
        title = `${title} - ${item.artist.name}`;
      } else if (index === "mvs") {
        title = `${title} - ${item.artistName}`;
      }
      return title;
    }
  },
  methods: {
    searchSuggest(value) {
      this.$emit("suggestValue", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-suggest {
  box-shadow: -1px 0 0 #e5e2e2;
  width: 360px;
  position: fixed;
  height: calc(100vh - 110px);
  background: #ffffff;
  overflow: auto;
  top: 44px;
  right: 0;
  z-index: 3;
  ul {
    padding: 20px 0;
    margin: 0;
    li {
      position: relative;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 10px;
      i {
        font-size: 22px;
        line-height: 22px;
        color: #868585;
      }
      span {
        line-height: 22px;
        font-size: 13px;
        position: absolute;
        color: #868585;
      }
    }
    .child-ul {
      padding: 0 22px;
    }
    .child-div {
      font-size: 13px;
      left: 0;
      margin: 0px -32px;
      padding: 10px 32px;
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>

