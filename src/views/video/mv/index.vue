<!--
 * @Description: MV
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 16:21:45
 * @LastEditors: Jasper
 * @LastEditTime: 2020-04-08 16:13:07
 -->
<template>
    <div class="mv">
        <video
            src="http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/2076564302/657ed4e85de0ee0e96239168b889751e.mp4?wsSecret=d4cec11751f0f1e77e62794d901277ab&wsTime=1586333513"
        ></video>
    </div>
</template>
<script>
export default {
    name: "mv",
    data() {
        return {
            id: this.$route.query.id
        };
    }
};
</script>

<style lang="scss" scoped>
.mv {
    video {
        width: 260px;
        height: 100px;
    }
}
</style>