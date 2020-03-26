<template>
    <div>专辑id:{{id}}</div>
</template>

<script>
export default {
    data(){
        return {
            id:""
        }
    },
    created(){
        this.$nextTick(()=>{
            this.id = this.$route.query.id;
        })
    }
}
</script>

