<!--
 * @Description: 排行榜
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 16:21:45
 * @LastEditors: Jasper
 * @LastEditTime: 2020-03-26 15:23:39
 -->
<template>
    <div class="__top__" v-loading="loading">
        <div class="gf__top">
            <p>官方榜</p>
            <div class="gf_top_list" v-for="(item, index) in gf_TopList" :key="index">
                <div class="gf_left">
                    <img :src="item.coverImgUrl || item.coverUrl" alt />
                    <div class="play">
                        <i class="iconfont icon-bf"></i>
                    </div>
                    <span>{{item.updateTime | foramt('MM月dd日')}}更新</span>
                </div>
                <div class="gf_right">
                    <div
                        v-for="(items, i) in item.el"
                        :key="i"
                        :class="['item',{'script':i%2===0}]"
                        @dblclick="dblClick(items.id)"
                    >
                        <span :class="['index',{'red':i<3}]">{{i+1}}</span>
                        <span class="name">{{items.name}}</span>
                        <div class="alia">
                            <span v-for="alia in items.alia" :key="alia">({{alia}})</span>
                        </div>
                        <div class="ar">
                            <span v-for="(it, is) in items.ar" :key="is">
                                {{it.name}}
                                <span v-if="is<items.ar.length-1">/</span>
                            </span>
                        </div>
                    </div>
                    <div class="see_all" @click="doClick(item.id)">
                        <span>查看全部</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p>全球榜</p>
            <div v-for="(item, index) in qq_TopList" :key="index">
                {{item.name}}
            </div>
        </div>
    </div>
</template>
<script>
import { topList, topListDetail, top_list } from "@/api/top";
export default {
    data() {
        return {
            gf_TopList: [],
            qq_TopList: [],
            ListDetail: [],
            loading: true,
            index: 0
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            // 先查询内容摘要
            topListDetail()
                .then(res => {
                    this.ListDetail = res.list;
                })
                .then(() => {
                    topList().then(res => {
                        let result = res;
                        this.qq_TopList = res.list.slice(5, res.list.length)
                        this.get_GFList(result);
                    });
                });
        },
        // 整理官方榜数据
        get_GFList(res) {
            // let top = [];
            let t = ["3", "0", "2", "1"];
            const item = res.list[this.index];
            if (item.ToplistType) {
                top_list({ idx: t[this.index] }).then(r => {
                    let tracks = r.playlist.tracks;
                    item["el"] = tracks.slice(0, 5);
                    this.gf_TopList.push(item);
                    this.index += 1;
                    if (this.index < 4) {
                        this.get_GFList(res);
                    }else{
                        this.loading = false;
                    }
                });
            }
        },
        //双击进行播放 或者点击pic
        dblClick(id) {
            this.$store.dispatch("currentSongID", id);
        },
        doClick(id) {
            console.log(id);
            this.$router.push({ path: "playlists", query: { id: id } });
        }
    }
};
</script>
<style lang="scss" scoped>
.__top__ {
    overflow: auto;
    height: 100%;
    padding: 0 35px;
    .gf__top {
        p {
            margin: 0;
        }
        .gf_top_list {
            display: flex;
            flex-direction: row;
            padding: 10px 0;
            width: 100%;
            .gf_left {
                position: relative;
                text-align: center;
                width: 170px;
                height: 170px;
                cursor: pointer;
                &:hover {
                    .play {
                        display: block;
                    }
                }
                img {
                    width: 100%;
                    border-radius: 5px;
                }
                .play {
                    position: absolute;
                    display: none;
                    top: 50%;
                    left: 50%;
                    margin: -20px 0 0 -20px;
                    font-size: 13px;
                    color: #ffffff;
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    background-color: rgba(255, 255, 255, 0.7);
                    i {
                        font-size: 15px;
                        color: #d13c37;
                        position: relative;
                        top: 13px;
                        left: 3px;
                    }
                }
                span {
                    position: absolute;
                    top: 105px;
                    left: 41px;
                    font-size: 14px;
                    color: #ffffff;
                }
            }
            .gf_right {
                width: calc(100% - 200px);
                margin-left: 30px;
                height: 200px;
                .see_all {
                    font-size: 13px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    margin-left: 10px;
                    width: 100px;
                    span {
                        cursor: pointer;
                        color: rgb(100, 100, 100);
                        &:hover {
                            color: rgb(50, 50, 50);
                        }
                    }
                }
                .script {
                    background-color: rgb(250, 250, 250);
                }
                .item {
                    display: flex;
                    height: 34px;
                    width: 100%;
                    align-items: center;
                    flex-direction: row;
                    font-size: 13px;
                    text-align: center;
                    position: relative;
                    border-radius: 3px;
                    &:hover {
                        background-color: rgb(245, 245, 245);
                    }
                    .index {
                        width: 30px;
                        font-weight: bold;
                        color: rgb(177, 177, 177);
                    }
                    .red {
                        color: rgb(177, 54, 54);
                    }
                    .alia {
                        padding: 0 5px;
                        color: rgb(100, 100, 100);
                    }
                    .ar {
                        position: absolute;
                        right: 10px;
                        color: rgb(120, 120, 120);
                    }
                }
            }
        }
    }
}
</style>