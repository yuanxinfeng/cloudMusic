/*
 * @Description:resize  一个监听页面宽度的混入
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-11 09:14:39
 * @LastEditors: Jasper
 * @LastEditTime: 2019-07-23 11:11:13
 */

export default {
  data() {
    return {
      screenWidth: document.body.clientWidth,
      // 计算一行个数 最大 5个
      liWidth: 254,
      s: 3,
      //固定 5个宽段
      fiveWidth: 152.4,
      // 4个宽度
      fourWidth: 190.5,
      // 2个宽度
      twoWidth: 381
    };
  },
  mounted() {
    // 1、挂载 reisze 事件 → 屏幕缩放时监听宽度变化
    const _this = this;
    window.addEventListener("resize", () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        _this.screenWidth = window.screenWidth;
      })();
    });
  },
  watch: {
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let _this = this;
        if (_this.screenWidth < 1180) _this.s = 3;
        if (_this.screenWidth > 1180) _this.s = 4;
        if (_this.screenWidth > 1300) _this.s = 5;
        // 打印screenWidth变化的值
        _this.liWidth = (_this.screenWidth - 40 - 200) / _this.s;
        _this.timer = false;
        _this.fiveWidth = (_this.screenWidth - 40 - 200) / 5;
        _this.fourWidth = (_this.screenWidth - 40 - 200) / 4;
        _this.twoWidth = (_this.screenWidth - 40 - 200) / 2;
        if (_this.screenWidth > 1250)
          _this.twoWidth = (_this.screenWidth - 40 - 200) / 3;
        if (_this.screenWidth < 1250)
          _this.twoWidth = (_this.screenWidth - 40 - 200) / 2;
      }
    }
  }
};
