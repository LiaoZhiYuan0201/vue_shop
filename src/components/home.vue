<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.jpg" alt="" />
        <span>后台管理系统</span>
      </div>

      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '65px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#21e6c1"
          text-color="#3b5441"
          active-text-color="#0033c7"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单 -->
            <template slot="title" class="icons-color">
              <!-- 一级菜单模板区域 -->
              <i :class="iconsObj[item.id]" style="color: black"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <!-- 点击时获取相应的地址 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <!-- 二级菜单模板区域 -->
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  props: {},
  data() {
    return {
      menulist: [],
      iconsObj: {
        125: "el-icon-s-custom",
        103: "el-icon-s-finance",
        101: "el-icon-shopping-bag-2",
        102: "el-icon-tickets",
        145: "el-icon-s-platform",
      },
      isCollapse: false,
      //被激活的链接地址
      activePath: "",
    };
  },
  methods: {
    logout() {
      //清空sessionStorage里的token的值
      window.sessionStorage.clear();
      //跳转到login页面
      this.$router.push("/login");
    },
    //获取所有的菜单
    async getMenuList() {
      let { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
    },
    //点击按钮切换侧边栏折叠展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
.el-header {
  padding-left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #086972;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
      width: 65px;
      border-radius: 100%;
    }
    span {
      margin-left: 10px;
    }
  }
}
.el-aside {
  background-color: #21e6c1;
  .el-menu {
    border-right: none;
  }
}
.home_container {
  height: 100%;
}
.toggle-button {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 12px;
  background-color: #009f9d;
  cursor: pointer;
}
</style>
