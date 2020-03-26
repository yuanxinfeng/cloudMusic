<template>
  <ul>
    <li v-for="(item,index) in collectorsList" :key="index" @click.stop="collectors(item.userId)">
      <div class="header-img">
        <img :src="item.avatarUrl" />
      </div>
      <div class="title">
        <span class="nickname">{{item.nickname}}</span>
        <i
          :class="['iconfont',item.gender === 1?'icon-xingbienanxianxing':'icon-xingbienvxianxing']"
        ></i>
        <p class="signature">{{item.signature}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    collectorsList: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    collectors(userid) {
      this.$router.push(`/user?userid=${userid}`);
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  padding: 15px 0;
  margin: 0;
  width: 100%;
  li {
    position: relative;
    height: 115px;
    width: 50%;
    float: left;
    border-radius: 5px;
    padding: 0 10px;
    .header-img {
      position: relative;
      cursor: pointer;
      float: left;
      top: 10px;
      img {
        width: 90px;
        border-radius: 45px;
      }
    }
    .title {
      float: left;
      width: calc(100% - 100px);
      padding: 30px 0 0 20px;
      .signature {
        font-size: 12px;
        cursor:default;
        color: #797878;
      }
      .nickname {
        padding: 1px 0;
        margin: 0;
        cursor: pointer;
        padding: 35px 0 5px 0;
        font-size: 15px;
        color: #222121;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      i {
        padding: 5px;
        border-radius: 15px;
        font-size: 11px;
      }
      .icon-xingbienanxianxing {
        background: #c4f3fe;
        color: #4dcfec;
      }
      .icon-xingbienvxianxing {
        background: #fecee8;
        color: #f361af;
      }
    }
  }
}
</style>
