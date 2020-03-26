<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img :src="item.pic" @click="playMusic(item)" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  methods: {
    playMusic(val) {
      this.$emit("playMusic", val);
    }
  }
};
</script>

<style lang="scss">
.banner {
  background: #ffffff;
  padding: 0 10px;
  .el-carousel__container {
    .el-carousel__arrow {
      background-color: transparent !important;
      i {
        font-size: 30px !important;
      }
    }
    .el-carousel__item {
      width: 100%;
      border-radius: 10px;
      left: -25%;
      text-align: center;

      img {
        width: 540px;
        height: 200px;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 10px;
      }
    }
  }
  .el-carousel__indicators {
    .is-active {
      .el-carousel__button {
        background: red;
      }
    }
    .el-carousel__indicator {
      .el-carousel__button {
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }
    }
  }
}
</style>

