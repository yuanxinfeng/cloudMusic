<!--
 * @Description: 电台首页
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 16:21:45
 * @LastEditors: Jasper
 * @LastEditTime: 2020-03-23 15:14:58
 -->
<template>
    <div class="dj">
        <div v-if="banners.length>0">
            <banner :banners="banners" @playMusic="playMusic"></banner>
        </div>
        <div class="categories">
            <HScrollMenu class="platform-menus" :menus="categories" @select="onSelectMenu">
                <template slot="gird" slot-scope="scope">
                    <div class="dj-categories">
                        <div
                            class="dj-pic"
                            :style="`background-image: url(${scope.row.pic56x56Url})`"
                        ></div>
                        <div class="dj-name">{{scope.row.name}}</div>
                    </div>
                </template>
            </HScrollMenu>
        </div>
        <div class="category">
            <template v-for="item in personalizedList">
                <component :is="item.component" :key="item.id"></component>
            </template>
        </div>
    </div>
</template>
<script>
import banner from "@/components/banner";
import HScrollMenu from "@/components/HScrollMenu";
import { DjBanners, DjCatelist } from "@/api/dj";
import paygift from "./paygift";
export default {
    data() {
        return {
            banners: [],
            categories: [],
            personalizedList: [{ component: "paygift", id: "1" }]
        };
    },
    components: {
        banner,
        HScrollMenu,
        paygift
    },
    created() {
        this.getDjBanner();
        this.getDjCatelist();
    },
    methods: {
        getDjBanner() {
            DjBanners().then(res => {
                console.log(res);
                this.banners = res.data;
            });
        },
        getDjCatelist() {
            DjCatelist().then(res => {
                this.categories = res.categories;
            });
        },
        playMusic() {},
        onSelectMenu(item, index) {
            console.log("click menu:", item, index);
        }
    }
};
</script>
<style lang="scss">
.dj {
    padding: 10px 15px;
    overflow: auto;
    height: 100%;
    .categories {
        padding: 30px 12px;
        .dj-categories {
            width: 80px;
            text-align: center;
            .dj-pic {
                width: 50px;
                height: 50px;
                padding: 5px;
                border-radius: 50%;
                display: inline-block;
                background-color: rgba(247, 195, 171, 0.3);
                background-repeat: no-repeat;
                background-size: 25px 25px;
                background-position: center;
            }
            .dj-name {
                font-size: 14px;
            }
        }
    }
}
</style>