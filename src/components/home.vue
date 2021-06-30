<template>
    <div>
        home界面
        <el-button type='info' @click='logout'>退出</el-button>
    </div>
</template>

<script>
export default {
    created() {

    },
    props: {

    },
    data() {
        return {

        };
    },
    methods: {
        logout(){
            //清空sessionStorage里的token的值
            window.sessionStorage.clear();
            //跳转到login页面
            this.$router.push('/login')
        }
    },
    components: {

    },
    computed: {

    },
};
</script>

<style scoped lang="less">



</style>
