<!--
 * @Description: 
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 16:20:44
 * @LastEditors: Jasper
 * @LastEditTime: 2020-04-08 16:05:09
 -->
<template>
    <div class="header-container" @dblclick="changeWindows(2)">
        <frame />
        <div class="category-container">
            <component :is="currentNav" v-if="(currentNav!=='notitle')"></component>
        </div>
        <div class="right-container">
            <search></search>
        </div>
    </div>
</template>

<script>
const { ipcRenderer } = require("electron");
import { mapGetters } from "vuex";
import { findMusic } from "./categoryNav";
import frame from "./frame";
import search from "./search";
export default {
    computed: {
        ...mapGetters(["currentNav"])
    },
    components: {
        frame,
        findMusic,
        search
    },
    methods: {
        changeWindows(index) {
            let item = ["close", "min", "max"];
            ipcRenderer.send(item[index]);
        }
    }
};
</script>

<style lang="scss" scoped>
$headerHeright: 50px;
.header-container {
    background: #f9f9f9;
    width: 100%;
    height: $headerHeright;
    .category-container {
        height: $headerHeright;
        width: 470px;
        float: left;
        position: relative;
    }
    .right-container {
        position: relative;
        float: right;
        height: $headerHeright;
        width: 310px;
    }
}
</style>
