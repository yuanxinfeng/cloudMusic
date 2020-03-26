<template>
  <div class="cat" v-if="all">
    <div class="all">
      <div @click="clickCat('')" :class="[cat === ''?'current':'']">
        <span>{{catList.all.name}}</span>
      </div>
    </div>
    <div class="categroy">
      <ul class="categories">
        <li v-for="(item,index) in catList.categories" :key="item">
          <i :class="['iconfont',iconfont[index]]"></i>
          <span>{{item}}</span>
          <ul class="sub">
            <li v-for="(items,i) in currentdata[index]" :key="i">
              <div @click="clickCat(items.name)" :class="[cat === items.name?'current':'']">
                <span>
                  {{items.name}}
                  <i class="iconfont icon-HOT" v-if="items.hot"></i>
                </span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    catList: {
      type: Object,
      default: () => {}
    },
    cat: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      all: false,
      currentdata: {},
      iconfont: [
        "icon-yuzhong",
        "icon-fengge",
        "icon-changjing",
        "icon-qinggan",
        "icon-zhuti"
      ]
    };
  },
  watch: {
    catList(v) {
      if (v.sub.length > 0) {
        for (const key in v.categories) {
          if (v.categories.hasOwnProperty(key)) {
            this.currentdata[key] = [];
            v.sub.map(s => {
              if (s.category == key) this.currentdata[key].push(s);
            });
          }
        }
      }
    }
  },
  methods: {
    clickCat(cat) {
      this.all = false;
      this.$emit("allcatclick", cat);
    }
  }
};
</script>


<style lang="scss" scoped>
.cat {
  outline: 0;
  background: #ffffff;
  box-shadow: 0 0 4px #ddd;
  width: 745px;
  height: 630px;
  position: relative;
  z-index: 9;
  top: 5px;
  left: -2px;
  .all {
    border-bottom: 1px solid #d4d2d2;
    height: 55px;
    div {
      width: 85px;
      border-radius: 15px;
      top: 10px;
      left: 20px;
      position: relative;
      height: 30px;
      text-align: center;
      span {
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
  .current {
    color: #d13c37;
    background: #faf0f0;
  }
  .categroy {
    .categories {
      padding: 0 22px;
      & > li {
        clear: left;
        color: #797979;
        i {
          font-size: 35px;
        }
        span {
          position: relative;
          top: -7px;
          left: -5px;
          font-size: 16px;
        }
        .sub {
          position: relative;
          top: -34px;
          left: 60px;
          width: 560px;
          & > li {
            float: left;
            div {
              width: 85px;
              border-radius: 15px;
              left: 20px;
              position: relative;
              height: 30px;
              text-align: center;
              span {
                top: 0;
                font-size: 14px;
                line-height: 30px;
                position: relative;

                i {
                  font-size: 12px;
                  position: absolute;
                  right: -20px;
                  top: -10px;
                  color: #d13c37;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
