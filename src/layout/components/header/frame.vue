<template>
    <div class="frame-container" @dblclick="changeWindows(3)">
        <div class="close-container">
            <div class="close">
                <i class="iconfont icon-hao1" @click="changeWindows(0)"></i>
            </div>
            <div class="min">
                <i class="iconfont icon-jianhao" @click="changeWindows(1)"></i>
            </div>
            <div class="max">
                <i class="iconfont icon-hao" @click="changeWindows(2)"></i>
            </div>
        </div>
        <div class="back-container">
            <div :class="['back', back?'current':'']" @click="history('back')">
                <i class="iconfont icon-Back"></i>
            </div>
            <div :class="['go', go?'current':'']" @click="history('go')">
                <i class="iconfont icon-go"></i>
            </div>
        </div>
    </div>
</template>
<script>
const { ipcRenderer } = require("electron");
export default {
    data() {
        return {
            back: false,
            go: false
        };
    },
    methods: {
        changeWindows(index) {
            let item = ["close", "min", "max"];
            ipcRenderer.send(item[index]);
        },
        history(item) {
            //:todo 存在bug 后期解决
            console.log(`Hwader.vue---${item}`);
            if (item === "back") {
                this.back = false;
                this.go = true;
                this.$router.go(-1);
            } else {
                this.go = false;
                this.back = true;
                this.$router.go(1);
            }
        }
    },
    watch: {
        "$route.matched": function(v) {
            this.back = true;
            this.go = true;
            this.$store.dispatch("currentPath", v[0].path ? v[0].path : "/");
        }
    }
};
</script>
<style lang="scss" scoped>
$headerHeright: 50px;
.frame-container {
    position: relative;
    height: $headerHeright;
    float: left;
    width: 200px;
    background: #f7f7f7;
    .close-container {
        position: absolute;
        -webkit-app-region: no-drag;
        height: 18px;
        width: 60px;
        top: 12px;
        left: 7px;
        &:hover {
            i {
                display: inherit;
            }
        }
        & div {
            height: 12px;
            width: 12px;
            border-radius: 6px;
            display: inline-block;
            margin: 0 2px;
            i {
                position: absolute;
                display: none;
                font-size: 12px;
                transform: scale(0.5);
                color: rgb(104, 104, 104);
            }
        }
        .min {
            i {
                left: 18px;
            }
            background: #dfc053;
        }
        .max {
            i {
                top: 2px;
            }
            background: #33c849;
        }
        .close {
            background: #ea675e;
        }
    }
    .back-container {
        position: absolute;
        width: 52px;
        height: 25px;
        top: 15px;
        right: 6px;
        & i {
            height: 13px;
            width: 13px;
            font-size: 15px;
            display: block;
            position: absolute;
            color: #d3d3d3;
        }
        div {
            width: 24px;
            height: 24px;
            border-radius: 12px;
            -webkit-app-region: no-drag;
            // &:hover {
            //   background: #ebebeb;
            // }
        }
        .back {
            float: left;
            i {
                left: 3px;
                top: 3px;
            }
        }
        .go {
            float: right;
            i {
                right: 3px;
                top: 3px;
            }
        }
        .current {
            i {
                color: #000;
            }
            &:hover {
                background: #ebebeb;
            }
        }
    }
}
</style>

