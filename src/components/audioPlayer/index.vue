<template>
  <div class="audio-player">
    <div class="top">
      <el-slider v-model="time" v-if="music_show" :max="timeMax" @change="changeCurrentTime" :show-tooltip="false"></el-slider>
    </div>
    <div class="bottom">
      <div class="left">
        <template v-if="music_show">
          <div @mouseleave="show=false" @mousemove="show=true">
            <el-image :src="detail.al.picUrl">
              <div slot="placeholder" class="image-slot">
                <i class="iconfont icon-changpian"></i>
              </div>
            </el-image>
            <div class="image-mask" v-if="show">
              <div></div>
              <i class="iconfont icon-shang"></i>
              <i class="iconfont icon-xia"></i>
            </div>
          </div>
          <div class="title-time">
            <p>{{detail.name}}{{detail.alia[0]?`( ${detail.alia[0]} )`:''}}</p>
            <p>{{this.audio.currentTime | foramtDuration }} / {{this.audio.maxTime | foramtDuration}}</p>
          </div>
          <div class="ar-name">
            <p>-{{detail.ar[0].name}}</p>
          </div>
        </template>
      </div>
      <div class="center">
        <div class="like">
          <i class="iconfont icon-xihuan"></i>
        </div>
        <div class="play">
          <i class="iconfont icon-shangyishou"></i>
          <div class="plays" @click="startPlayOrPause">
            <i :class="['iconfont',audio.playing?'icon-zanting':'icon-bf']"></i>
          </div>
          <i class="iconfont icon-xiayishou"></i>
        </div>
        <div class="share">
          <i class="iconfont icon-fenxiang"></i>
        </div>
      </div>
      <div class="right">
        <el-tooltip effect="light" visible-arrow content="顺序播放" placement="top">
          <i class="iconfont icon-shuixubofang"></i>
        </el-tooltip>
        <i class="iconfont icon-bofangliebiao"></i>
        <i class="iconfont icon-geci"></i>
        <el-tooltip effect="light" placement="top">
          <div slot="content">
            <el-slider
              v-model="volume"
              style="padding: 10px 0;"
              vertical
              :max="10"
              @input="changeVolume"
              height="100px"
              :show-tooltip="false"
            ></el-slider>
          </div>
          <i class="iconfont icon-yinliang" @click="clickVolume"></i>
        </el-tooltip>
        <i class="iconfont icon-hao1" v-if="volume===0"></i>
      </div>
    </div>

    <audio
      ref="audioPlay"
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      :src="url"
    ></audio>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    url: {
      type: String,
      default: ""
    },
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      time: 0,
      music_show: false,
      timeMax: 0,
      volume: 3,
      curVolume: 3,
      show: false,
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false
      }
    };
  },
  computed: {
    ...mapGetters(["music_volume"])
  },
  created() {
    this.$nextTick(() => {
      this.volume = this.music_volume;
    });
  },
  watch: {
    detail(v) {
      this.music_show = v ? true : false;
    },
    url(v) {
      if (v) {
        let _this = this;
        // 切换音乐url 进行播放 添加定时器 等发放以后移除定时器
        let Interval = null;
        Interval = setInterval(() => {
          _this.play();
          if (_this.audio.playing) {
            clearInterval(Interval);
          }
        }, 100);
      }
    }
  },
  methods: {
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      // console.log("timeupdate");
      // console.log(res);
      this.time = parseInt(res.target.currentTime);
      this.audio.currentTime = res.target.currentTime * 1000;
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      // console.log("loadedmetadata");
      // console.log(res);
      this.timeMax = parseInt(res.target.duration);
      this.audio.maxTime = parseInt(res.target.duration) * 1000;
    },
    // 控制音频的播放与暂停
    startPlayOrPause() {
      if (!this.url) return;
      return this.audio.playing ? this.pause() : this.play();
    },
    // 播放音频
    play() {
      console.log("play");
      this.$refs.audioPlay.play();
    },
    // 暂停音频
    pause() {
      console.log("pause");
      this.$refs.audioPlay.pause();
    },
    // 当音频播放
    onPlay() {
      this.audio.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
    },
    // 改变播放音量
    changeVolume(val) {
      let volume = val;
      this.$store.dispatch("musicVolume", volume);
      this.$refs.audioPlay.volume = val / 10;
    },
    // 点击改变
    clickVolume() {
      if (this.volume) {
        this.curVolume = this.volume;
      }
      this.volume = this.volume ? 0 : this.curVolume;
    },
    // 改变播放时间
    changeCurrentTime(val) {
      this.$refs.audioPlay.currentTime = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.audio-player {
  .top {
    height: 2px;
    width: 100%;
    position: relative;
    .el-slider {
      position: absolute;
      height: 100%;
      width: 100%;
    }
  }
  .bottom {
    height: 57px;
    i {
      cursor: pointer;
    }
    .left {
      position: relative;
      width: 33.3%;
      padding: 0 10px;
      height: 100%;
      float: left;
      .el-image {
        width: 40px;
        top: 10px;
        border-radius: 5px;
        float: left;
        &:hover {
          .image-mask {
            display: block;
          }
        }
        .image-slot {
          font-size: 40px;
        }
      }
      .image-mask {
        cursor: pointer;
        width: 40px;
        height: 40px;
        bottom: 7px;
        position: fixed;
        border-radius: 5px;
        div {
          width: 100%;
          height: 100%;
          background: #000;
          opacity: 0.2;
          z-index: -1;
          border-radius: 5px;
        }
        i {
          color: #ffffff;
        }
        .icon-shang {
          position: absolute;
          top: 5px;
          left: 12px;
        }
        .icon-xia {
          position: absolute;
          bottom: 5px;
          left: 12px;
        }
      }
      .title-time {
        position: relative;
        left: 10px;
        top: 10px;
        float: left;
        max-width: calc(100% - 120px);
        p {
          font-size: 14px;
          padding: 1px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:nth-child(1) {
            cursor: pointer;
          }
          &:nth-child(2) {
            color: #919192;
            cursor: default;
          }
        }
      }
      .ar-name {
        position: relative;
        left: 10px;
        top: 10px;
        float: left;
        p {
          cursor: pointer;
          color: #919192;
          font-size: 13px;
          &:hover {
            color: #333;
          }
        }
      }
      p {
        padding: 0;
        margin: 0;
      }
    }
    .center {
      position: relative;
      width: 33.33%;
      height: 100%;
      float: left;
      .like {
        width: 30%;
        height: 100%;
        float: left;
        position: relative;
        .icon-xihuan {
          position: absolute;
          top: 22px;
          right: 30px;
          color: #434343;
        }
      }
      .play {
        width: 40%;
        height: 100%;
        float: left;
        position: relative;
        i {
          color: #d13c37;
          font-size: 20px;
          top: 18px;
        }
        .icon-shangyishou {
          position: absolute;
          font-size: 20px;
        }
        .plays {
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          background: #d13c37;
          top: 10px;
          position: absolute;
          left: calc(50% - 20px);
          .icon-bf {
            color: #fdfdfd;
            top: 9px;
            position: absolute;
            left: 12px;
          }
          .icon-zanting {
            color: #fdfdfd;
            top: 9px;
            position: absolute;
            left: 10px;
          }
        }
        .icon-xiayishou {
          position: absolute;
          right: 0;
        }
      }
      .share {
        width: 30%;
        height: 100%;
        float: left;
        position: relative;
        .icon-fenxiang {
          position: absolute;
          top: 22px;
          left: 30px;
          color: #434343;
        }
      }
    }
    .right {
      position: relative;
      width: 33.33%;
      height: 100%;
      float: left;
      i {
        top: 18px;
        position: absolute;
        font-size: 17px;
        color: #6b6464;
      }
      .tooltip {
        margin-bottom: 0;
      }

      .icon-shuixubofang {
        right: 130px;
      }
      .icon-bofangliebiao {
        right: 92px;
      }
      .icon-geci {
        right: 56px;
      }
      .icon-yinliang {
        right: 24px;
      }
      .icon-hao1 {
        right: 16px;
        font-size: 8px;
        top: 24px;
      }
    }
  }
}
</style>
