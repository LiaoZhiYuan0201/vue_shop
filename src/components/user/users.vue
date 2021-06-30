<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->

      <el-row :gutter="80">
        <el-col :span="13">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getUserList();
  },
  props: {},
  data() {
    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userlist:[],
      total:0
    };
  },
  methods: {
    async getUserList() {
      let { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      if(res.meta.status!==200) return this.$message.error('获取用户列表失败');
      this.userlist = res.data.users;
      this.total = res.data.total
      console.log(res);
    },
  },
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
</style>
