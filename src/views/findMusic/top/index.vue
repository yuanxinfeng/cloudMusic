<!--
 * @Description: 排行榜
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 16:21:45
 * @LastEditors: Jasper
 * @LastEditTime: 2020-04-08 09:33:48
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
        <div class="gf__d">
            <p>全球榜</p>
            <div class="gf_c">
                <div v-for="(item, index) in qq_TopList" class="item" :key="index">
                    <div class="gf_c_" :style="{width:(fourWidth-20)+'px'}">
                        <img :src="item.coverImgUrl || item.coverUrl" alt />
                        <div class="img_b" @click.stop="doClick(item.id)"></div>
                        <div class="playTime">
                            <i class="iconfont icon-bofang"></i>
                            <span>{{ item.playCount | conversionCount}}</span>
                        </div>
                        <div class="play" @dblclick.stop="dblClick(items.id)">
                            <i class="iconfont icon-bf"></i>
                        </div>
                    </div>
                    <div class="gf_name" @click.stop="doClick(item.id)">{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import resize from "@/mixins/resize";
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
    mixins: [resize],
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
                        this.qq_TopList = res.list.slice(4, res.list.length);
                        this.get_GFList(result);
                    });
                });
        },
        // 整理官方榜数据
        get_GFList(res) {
            // let top = [];
            let t = ["3", "0", "2", "1"];
            // const item = res.list[this.index];
            // if (item.ToplistType) {
            //     top_list({ idx: t[this.index] }).then(r => {
            //         let tracks = r.playlist.tracks;
            //         item["el"] = tracks.slice(0, 5);
            //         this.gf_TopList.push(item);
            //         this.index += 1;
            //         if (this.index < 4) {
            //             this.get_GFList(res);
            //         } else {
            //             this.loading = false;
            //         }
            //     });
            // }
            Promise.all([
                top_list({ idx: 3 }),
                top_list({ idx: 0 }),
                top_list({ idx: 2 }),
                top_list({ idx: 1 })
            ]).then(res => {
                console.log(res);

                res.forEach(n => {
                    let item = n.playlist;
                    item["el"] = item.tracks.slice(0, 5);
                    this.gf_TopList.push(item);
                });
                this.loading = false;
            });
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
    width: 100%;
    padding: 0 30px;
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
    .gf__d {
        width: 100%;

        .gf_c {
            width: 100%;
            .item {
                float: left;
                padding-right: 15px;
                padding-bottom: 70px;
                .gf_c_ {
                    position: relative;
                    text-align: center;
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
                    .img_b {
                        position: absolute;
                        width: 100%;
                        border-radius: 5px;
                        bottom: 0;
                        top: 0;
                        background-image: linear-gradient(rgba(0, 0, 0, 0.192), rgba(0, 0, 0, 0.034), rgba(245, 255, 245, 0), rgba(245, 255, 245, 0), rgba(245, 255, 245, 0));
                    }
                    .playTime {
                        position: absolute;
                        top: 5px;
                        right: 10px;
                        font-size: 13px;
                        color: #ffffff;
                        i {
                            font-size: 13px;
                        }
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
                }
                .gf_name {
                    cursor: pointer;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>