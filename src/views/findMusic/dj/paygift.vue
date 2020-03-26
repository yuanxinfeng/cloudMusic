<template>
    <div class="dj-music">
        <div class="title-c" @click="clickToDo">
            <span>付费精品</span>
            <i class="iconfont icon-icon-go"></i>
        </div>
        <ul>
            <li v-for="(item,index) in payGiftList" :key="index" @click.stop="clickPayGift(item.id)">
                <div class="body-c">
                    <div class="header-img">
                        <img :src="item.picUrl" />
                        <!-- <div class="price" v-if="item.price !== 0">付费精品</div> -->
                    </div>
                    <div class="title">
                        <p class="name">{{item.name}}</p>
                        <p class="rcmdText">{{item.rcmdText}}</p>
                        <p class="lastProgramName">
                            <i class="iconfont icon-bofang"></i>
                            <span>{{item.lastProgramName}}</span>
                        </p>
                        <p class="originalPrice">
                            <span>￥{{item.originalPrice/100}}</span>
                            <!--   -->
                            <span v-if="item.discountPrice" class="discountPrice">/黑胶VIP:￥{{item.discountPrice/100}}</span>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { DjPaygift } from "@/api/dj";
export default {
    name: "ffjp",
    data() {
        return {
            payGiftList: []
        };
    },
    created() {
        DjPaygift({ limit: 4, offset: 0 }).then(res => {
            console.log(res);
            this.payGiftList = res.data.list;
        });
    },
    methods: {
        // 点击
        clickToDo() {
            // this.$store.dispatch("currentView", "dj");
            this.$router.push(`/payGiftLists`);
        },
        clickPayGift(id) {
            console.log(id);
            this.$router.push(`/payGiftDetails?id=${id}`);
        }
    }
};
</script>

<style lang="scss" scoped>
.dj-music {
    width: 100%;
    clear: left;
    .title-c {
        cursor: pointer;
        padding: 0 10px;
        span {
            font-weight: 500;
            &:hover {
                font-weight: bold;
            }
        }
    }
    ul {
        padding: 15px 0;
        margin: 0;
        width: 100%;
        li {
            position: relative;
            height: 155px;
            width: 50%;
            float: left;
            border-radius: 5px;
            padding: 0 10px;
            border-top: 1px solid #f2f2f3;
            border-bottom: 1px solid #f2f2f3;
            &:nth-child(2n) {
                background: #fafafa;
            }
            &:nth-child(3) {
                border-top: none;
            }
            &:nth-child(4) {
                border-top: none;
            }
            &:hover {
                background: #f5f5f5;
            }
            .body-c {
                position: absolute;
                cursor: default;
                width: 95%;
                height: 155px;
                .icon-icon-shiping {
                    color: #d13c37;
                    position: relative;
                    top: 30px;
                    right: 0px;
                    cursor: pointer;
                }
                .header-img {
                    position: relative;
                    cursor: pointer;
                    float: left;
                    top: 10px;
                    img {
                        width: 135px;
                        border-radius: 5px;
                    }
                    .price {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 61%;
                        font-size: 12px;
                        font-weight: 500;
                        height: auto;
                        border-bottom-right-radius: 8px;
                        color: #ffffff;
                        background: #d13c37;
                        border-top-left-radius: 5px;
                        height: 20px;
                        padding: 1px 3px;
                    }
                }
                .title {
                    float: left;
                    width: calc(100% - 135px);
                    padding: 0 0 0 20px;
                    span {
                        font-size: 12px;
                        cursor: pointer;
                        color: #797878;
                    }
                    p {
                        font-size: 15px;
                        margin: 0;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .name {
                        font-weight: bold;
                        padding: 25px 0 5px 0;
                        color: #0a0a0a;
                    }
                    .rcmdText {
                        font-size: 12px;
                        padding: 10px 0 5px 0;
                        color: #797878;
                    }
                    .lastProgramName {
                        .icon-bofang {
                            font-size: 12px;
                            color: #797878;
                        }
                    }
                    .originalPrice {
                        padding: 15px 0 0 0;
                        span {
                            font-size: 16px;
                            font-weight: bold;
                            color: rgb(252, 32, 32);
                        }
                        .discountPrice {
                            margin-left: -5px;
                            display: inline-block;
                            font-size: 12px;
                            transform: scale(0.8);
                            font-weight: normal;
                            color: #797878;
                        }
                    }
                }
            }
        }
    }
}
</style>
