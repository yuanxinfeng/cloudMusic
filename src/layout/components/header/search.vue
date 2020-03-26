<template>
    <div class="search-container">
        <i class="iconfont icon-fangdajing"></i>
        <input
            class="search-input"
            ref="input"
            @focus="inputFocus"
            :focus="showContent"
            v-model="searchValue"
            type="text"
            @keyup.enter="searchPage"
            @input="search"
            placeholder="搜索"
        />
        <i class="iconfont icon-hao1" v-if="searchValue" @click="clearValue"></i>
        <search-hot :showContent="showContent" :hots="hots" @hotsValue="getClickHots"></search-hot>
        <search-suggest
            :showSuggest="showSuggest"
            :suggest="suggest"
            @suggestValue="getClickSuggest"
        ></search-suggest>
    </div>
</template>

<script>
import searchHot from "./search/searchHot";
import searchSuggest from "./search/searchSuggest";
import { searchHots, searchSuggests, searchMultimatch } from "@/api/search";
export default {
    data() {
        return {
            searchValue: "",
            showContent: false,
            showSuggest: false,
            inputBlur: false, //失去焦点是否关闭热门或者检索列表
            hots: [],
            suggest: {}
        };
    },
    components: {
        searchHot,
        searchSuggest
    },
    created() {
        this.$nextTick(() => {});
    },
    mounted() {
        const _this = this;
        document.addEventListener("keyup", function(e) {
            if (e.keyCode == 27) {
                _this.closeContent();
                _this.$refs.input.blur();
            }
        });
    },
    methods: {
        // 搜索
        search() {
            // 当搜索内容不为 展示搜索建议页面 否则展示热门搜索和搜索历史页面
            this.compedShow();
        },
        // 跳转到搜索页面搜索页面
        searchPage() {
            // 只有按下回车键 才会保存搜索内容到搜索历史
            this.inputBlur = true;
            this.showContent = false;
            this.$store.dispatch("history", this.searchValue);
            this.$router.push({
                path: "/search",
                query: { value: this.searchValue }
            });
        },
        inputFocus() {
            this.compedShow();
        },
        // 是显示热门搜索 还是 搜索检索
        compedShow() {
            if (this.searchValue) {
                this.getSuggest();
            } else {
                this.getHots();
            }
        },
        getHots() {
            searchHots().then(res => {
                this.hots = res.result.hots;
                this.showContent = true;
                this.showSuggest = false;
            });
        },
        getSuggest() {
            searchSuggests(this.searchValue).then(res => {
                this.suggest = res.result;
                this.showContent = false;
                this.showSuggest = true;
            });
        },
        clearValue() {
            this.searchValue = "";
            this.closeContent();
        },
        closeContent() {
            this.showContent = false;
            this.showSuggest = false;
        },
        //获取选择的热门搜索
        getClickHots(value) {
            this.searchValue = value;
            this.showContent = false;
            this.$router.push({ path: "/search", query: { value: value } });
        },
        // 获取搜索建议
        getClickSuggest(item) {}
    }
};
</script>

<style lang="scss" scoped>
$background: #f2f2f2;
.search-container {
    -webkit-app-region: no-drag;
    position: absolute;
    top: 17px;
    background: $background;
    width: 150px;
    height: 22px;
    border-radius: 11px;
    i {
        position: absolute;
        &:nth-child(1) {
            top: 2px;
            left: 3px;
            font-size: 17px;
        }
        &:nth-child(3) {
            top: 5px;
            right: 8px;
            color: #646464;
            font-size: 13px;
        }
    }
    .search-input {
        border: none;
        outline: none;
        height: 22px;
        width: 103px;
        line-height: 22px;
        position: absolute;
        background: $background;
        left: 20px;
        &:focus::placeholder {
            color: transparent;
        }
    }
}
</style>
