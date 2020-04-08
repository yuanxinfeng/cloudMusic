<!--
 * @Description: mv详情页面
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2019-07-11 15:34:24
 * @LastEditors: Jasper
 * @LastEditTime: 2020-04-08 16:38:05
 -->
 <template>
    <div class="mv">
        <video
            :src="mvDetail.url"
            controls
        ></video>
    </div>
</template>
 
 <script>
import { mvUrl } from "@/api/video";
export default {
    data() {
        return {
            mvid: 0,
            mvDetail: {}
        };
    },
    created() {
        this.mvid = this.$route.query.mvid;
        this.init();
    },
    methods: {
        init() {
            this.mv();
        },
        mv() {
            mvUrl({ mvid: this.mvid }).then(res => {
                this.mvDetail = res.data;
            });
        }
    }
};
</script>
 

<style lang="scss" scoped>
.mv {
    video {
        width: 620px;
        height: 350px;
    }
}
</style>