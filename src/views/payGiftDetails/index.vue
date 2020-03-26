<template>
    <div class="playlists">
        <div class="top-container">
            <img :src="detail.picUrl" alt />
            <div class="top-right">
                <div class="name">
                    <span>付费精品</span>
                    <span>{{detail.name}}</span>
                </div>
                <div class="originalPrice">
                    <span>￥{{detail.originalPrice/100}}</span>
                    <span
                        v-if="detail.discountPrice"
                        class="discountPrice"
                    >/黑胶VIP:￥{{detail.discountPrice/100}}</span>
                </div>
                <div class="btn">
                    <div class="bf">
                        <i class="iconfont icon-bofangtb"></i>
                        <span>立即购买</span>
                    </div>
                    <div class="dy">
                        <i class="iconfont icon-bofangtb"></i>
                        <span>免费试听</span>
                    </div>
                    <div class="share">
                        <i class="iconfont icon-fenxiang"></i>
                        <span>分享({{detail.shareCount}})</span>
                    </div>
                </div>
                <div class="other">
                    <span>{{detail.rcmdText}}</span>
                </div>
            </div>
        </div>
        <div class="bottom-container">
            <ul>
                <li>
                    <span
                        @click="changeClick('info')"
                        :class="[active==='info'?'current':'']"
                    >详情</span>
                </li>
                <li>
                    <span
                        @click="changeClick('program')"
                        :class="[active==='program'?'current':'']"
                    >节目({{detail.programCount}})</span>
                </li>
            </ul>
        </div>
        <div v-if="active==='info'">
            <img :src="detail.dj.backgroundUrl">
        </div>
        <div v-else>

        </div>
    </div>
</template>
<script>
import { DjDetail } from "@/api/dj";
import songTable from "@/components/songTable";
import comment from "@/components/comment";
import collectors from "@/components/collectors";
export default {
    data() {
        return {
            id: 0,
            detail: {},
            creator: {},
            comments: {},
            songids: [],
            collectorsList: [],
            songs: [],
            filterSongs: [],
            // 歌曲名称
            searchValue: "",
            // 简介默认折叠
            descflag: false,
            active: "info",
            params: {
                page: 1,
                limit: 0
            }
        };
    },
    components: {
        songTable,
        comment,
        collectors
    },
    created() {
        this.$nextTick(() => {
            this.id = this.$route.query.id;
            this.getDetail();
        });
    },
    methods: {
        getDetail() {
            DjDetail({ rid: this.id }).then(res => {
                this.detail = res.djRadio;
            });
        },
        getComment() {
            playlistsComment({ id: this.id }).then(res => {
                this.comments = res;
            });
        },
        // 获取收藏者列表
        getSubscribers() {
            subscribers({ id: this.id }).then(res => {
                this.collectorsList = res.subscribers;
            });
        },
        // 跳转到歌单首页
        tagsClick(cat) {
            this.$store.dispatch("cat", cat);
            this.$router.push(`/playlist`);
        },
        // 简介折叠
        descClick() {
            this.descflag = !this.descflag;
        },
        // 切换
        changeClick(active) {
            this.active = active;
            if (active === "comment") {
                this.getComment();
            } else if (active === "collectors") {
                this.getSubscribers();
            } else {
                this.getDetail();
            }
        },
        // 搜索歌单
        searchSong() {
            this.filterSongs = this.songs.filter(n => {
                return n.name.indexOf(this.searchValue) > -1;
            });
        },
        clearValue() {
            this.searchValue = "";
            this.filterSongs = this.songs;
        },
        clickUser(userid) {
            this.$router.push(`/user?userid=${userid}`);
        }
    }
};
</script>

<style lang="scss" scoped>
$background: #f2f2f2;
.playlists {
    height: 100%;
    overflow: auto;
    padding: 10px 30px;
    .top-container {
        img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
            float: left;
        }
        .top-right {
            width: calc(100% - 200px);
            float: left;
            padding: 0 0 0 30px;
            .name {
                cursor: default;
                padding: 0 0 20px 0;
                span:nth-child(1) {
                    padding: 2px 8px;
                    border-radius: 5px;
                    border: 1px solid #d13c37;
                    color: #d13c37;
                    font-size: 13px;
                    position: relative;
                    top: -2px;
                    margin-right: 10px;
                }
                span:nth-child(2) {
                    font-weight: 500;
                    font-size: 20px;
                }
            }
            .originalPrice {
                padding: 0 0 15px 0;
                span {
                    font-size: 18px;
                    font-weight: bold;
                    color: rgb(252, 32, 32);
                }
                .discountPrice {
                    margin-left: -5px;
                    display: inline-block;
                    font-size: 13px;
                    transform: scale(0.8);
                    font-weight: normal;
                    color: #797878;
                }
            }
            .btn {
                padding: 0 0 20px 0;
                display: inline-block;
                .bf {
                    position: relative;
                    cursor: default;
                    float: left;
                    height: 30px;
                    border-radius: 15px;
                    width: 105px;
                    background: linear-gradient(to right, #f8534a, #d33d38);
                    i {
                        color: #ffffff;
                        position: relative;
                        font-size: 20px;
                        top: 3px;
                    }
                    display: inline-block;
                    height: 30px;
                    border-top-left-radius: 15px;
                    border-bottom-left-radius: 15px;
                    padding: 0 3px 0 10px;
                    border-right: 1px solid #c77a7a;
                    &:hover {
                        background: #bf3633;
                    }
                    span {
                        font-size: 14px;
                        padding: 0 5px 0 5px;
                        color: #ffffff;
                    }
                }
                .dy {
                    cursor: default;
                    margin-left: 10px;
                    width: 105px;
                    height: 30px;
                    float: left;
                    padding: 5px 5px;
                    border-radius: 15px;
                    border: 1px solid #c77a7a;
                    &:hover {
                        background-color: #f7e5e5;
                    }
                    i {
                        color: #bf3633;
                        position: relative;
                        font-size: 16px;
                        left: 8px;
                    }
                    span {
                        font-size: 14px;
                        padding: 0 5px 0 0;
                        color: #bf3633;
                        position: relative;
                        left: 10px;
                        top: -1px;
                    }
                }
                .share {
                    cursor: default;
                    margin-left: 10px;
                    width: 105px;
                    height: 30px;
                    float: left;
                    padding: 5px 5px;
                    border-radius: 15px;
                    border: 1px solid #ddd;
                    &:hover {
                        background: #f3f3f3;
                    }
                    i {
                        color: #333;
                        position: relative;
                        font-size: 16px;
                        left: 8px;
                    }
                    span {
                        font-size: 14px;
                        padding: 0 5px 0 0;
                        color: #333;
                        position: relative;
                        left: 8px;
                    }
                }
                .down {
                    cursor: default;
                    margin-left: 10px;
                    width: 105px;
                    height: 30px;
                    float: left;
                    padding: 5px 5px;
                    border-radius: 15px;
                    border: 1px solid #ddd;
                    &:hover {
                        background: #f3f3f3;
                    }
                    i {
                        color: #333;
                        position: relative;
                        font-size: 16px;
                        left: 8px;
                    }
                    span {
                        font-size: 14px;
                        padding: 0 5px 0 0;
                        color: #333;
                        position: relative;
                        left: 8px;
                    }
                }
            }
            .other {
                cursor: default;
                clear: left;
                div {
                    padding: 0 0 2px 0;
                }
                span {
                    font-size: 12px;
                }
                .tags-name {
                    cursor: pointer;
                    color: #206ba5;
                    &:hover {
                        color: #2b4e6d;
                    }
                }
                .desc {
                    position: relative;
                    .folding {
                        white-space: pre-line;
                    }
                    i {
                        position: absolute;
                        right: 0;
                        top: 0;
                        font-size: 14px;
                        color: #9a9999;
                    }
                }
            }
        }
    }
    .bottom-container {
        display: inline-block;
        ul {
            cursor: default;
            padding: 0;
            width: calc(100vw - 260px);
            height: 27px;
            border-bottom: 1px solid #ddd;
            li {
                float: left;
                width: 85px;
                span {
                    padding: 7px 0;
                    font-size: 14px;
                    font-weight: 500;
                    &:hover {
                        font-weight: bold;
                    }
                }
            }
            .search {
                float: right;
                position: relative;
                background: $background;
                width: 130px;
                height: 22px;
                border-radius: 11px;
                i {
                    position: absolute;
                }
                .icon-fangdajing {
                    top: 5px;
                    left: 5px;
                    font-size: 13px;
                }
                .icon-hao1 {
                    top: 6px;
                    left: 5px;
                    font-size: 10px;
                }
                .search-input {
                    border: none;
                    outline: none;
                    height: 22px;
                    width: 93px;
                    line-height: 22px;
                    position: absolute;
                    background: $background;
                    left: 20px;
                    &:focus::placeholder {
                        color: transparent;
                    }
                }
            }
            .current {
                color: #d13c37;
                border-bottom: 2px solid #d13c37;
            }
        }
    }
}
</style>
