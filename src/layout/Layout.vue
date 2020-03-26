<!--
 * @Description: 
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 16:20:44
 * @LastEditors: Jasper
 * @LastEditTime: 2020-03-26 09:33:12
 -->
<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside>
                <Aside></Aside>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-footer>
            <Footer></Footer>
        </el-footer>
        <copy-right v-if="coyp_right"></copy-right>
        <home-personality v-if="personalizedShow"></home-personality>
    </el-container>
</template>
<script>
import {
    Header,
    Aside,
    Footer,
    copyRight,
    homePersonality
} from "./components";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            dialog: false
        };
    },
    computed: {
        ...mapGetters(["personalizedShow", "coyp_right"])
    },
    components: {
        Header,
        Aside,
        Footer,
        copyRight,
        homePersonality
    }
};
</script>
<style lang="scss" scoped>
.el-header {
    height: 50px !important;
    width: 100vw;
    -webkit-app-region: drag;
    padding: 0;
}
.el-aside {
    width: 200px !important;
}
.el-footer {
    border-top: 1px solid #f5f5f5;
    padding: 0;
}
.el-main {
    padding: 17px 0 0 0;
    height: calc(100vh - 60px - 50px);
    overflow: hidden;
}
</style>


