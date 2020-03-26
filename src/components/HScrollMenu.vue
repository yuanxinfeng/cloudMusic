<template>
    <div ref="menuWrapper" class="HScrollMenu">
        <i
            v-if="currPage>0"
            class="el-icon-arrow-left left-arrow"
            :class="{disabled:currPage===0}"
            @click="onClickPre"
        ></i>
        <div class="menu-item-scroll">
            <div class="menu-item-scroll-inner" :style="innerStyle">
                <template v-for="(item,index) in menus">
                    <i v-if="index>0" class="nav-v-line float-left"></i>
                    <span class="menu-text float-left"  @click="onClickSubMenu(item,index)">
                        <slot name="gird" :row="item">{{item}}</slot>
                    </span>
                </template>
            </div>
        </div>
        <i
            v-if="currPage!==sumPages-1"
            class="el-icon-arrow-right right-arrow"
            :class="{disabled:currPage===sumPages-1}"
            @click="onClickNext"
        ></i>
    </div>
</template>

<script>
export default {
    name: "HScrollMenu",
    props: {
        menus: {
            default: () => []
        }
    },
    data() {
        return {
            prepared: false,
            menuWidth: 80,
            currPage: 0,
            pageSize: 1,
            sumPages: 1,
            pageWidth: 0,
            innerStyle: {}
        };
    },
    created() {},
    mounted() {
        requestAnimationFrame(this.computeParams);
        window.addEventListener("resize", this.computeParams);
    },
    watch: {
        menus() {
            if (this.prepared) {
                this.computeParams();
            }
        }
    },
    methods: {
        computeParams() {
            if (!this.$refs.menuWrapper) return;
            this.prepared = true;
            let width = this.$refs.menuWrapper.offsetWidth;
            let maxSize = Math.floor((width - 32) / (this.menuWidth + 1));
            this.currPage = 0;
            this.pageSize = maxSize;
            this.pageWidth = maxSize * (this.menuWidth + 1);
            let pages = this.menus.length / this.pageSize;
            if (Math.floor(pages) === pages) {
                this.sumPages = pages;
            } else {
                this.sumPages = Math.ceil(pages);
            }
            this.innerStyle = {
                width: this.sumPages * maxSize * (this.menuWidth + 1) + "px"
            };
            this.setCurrMenus();
        },
        setCurrMenus() {
            this.innerStyle = {
                ...this.innerStyle,
                left: -1 * this.currPage * this.pageWidth + "px"
            };
        },
        onClickPre() {
            if (this.currPage > 0) {
                this.currPage--;
                this.setCurrMenus();
            } else {
                console.log("end page!");
            }
        },
        onClickNext() {
                console.log("end sumPages!"+this.sumPages);
                console.log("end pageSize!"+this.pageSize);
                console.log("end currPage!"+this.currPage);
            if (this.currPage < this.sumPages - 1) {
                this.currPage++;
                this.setCurrMenus();
            } else {
                console.log("end page!");
            }
        },
        onClickSubMenu(item, index) {
            this.$emit("select", item, index);
        }
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.computeParams);
    }
};
</script>

<style lang="scss" scoped>
.HScrollMenu {
    position: relative;
    overflow: hidden;

    .float-left {
        float: left;
    }

    .left-arrow {
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -8px;
        cursor: pointer;
    }

    .right-arrow {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -8px;
        cursor: pointer;
    }

    .nav-v-line {
        position: relative;
        top: 4px;
    }

    .menu-item-scroll {
        box-sizing: border-box;
        margin: 0px 16px;
        overflow: hidden;
    }

    .menu-item-scroll-inner {
        position: relative;
        left: 0;
        transition: all 0.5s ease;
    }

    .menu-item-scroll-inner:after {
        content: "";
        display: block;
        clear: both;
    }

    .menu-text {
        text-align: center;
        cursor: pointer;
    }
}
</style>