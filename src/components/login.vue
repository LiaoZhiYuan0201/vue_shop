<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.jpg" alt="" />
      </div>
      <!-- 登录表单 -->
      <el-form
        label-width="0px"
        class="login-form"
        style="width: 60%"
        :model="form"
        :rules="loginRules"
        ref="loginRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            class="psw"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item label="" class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetRef">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  props: {},
  data() {
    return {
      //表单数据
      form: {
        username: "admin",
        password: "123456",
      },
      //表单验证
      loginRules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    resetRef() {
      this.$refs.loginRef.resetFields();
    },
    login() {
      this.$refs.loginRef.validate(async (valid) => {
        if (!valid) return;
        let { data: res } = await this.$http.post("login", this.form);
        console.log(res);
        if(res.meta.status!==200){
          return this.$message.error('登录失败');
        }else{
          this.$message.success('登录成功')
        };
        //将token为会话保存 sessionStorage
        window.sessionStorage.setItem('token',res.data.token);
        //用$router.push 方法 让路由跳转为Home 界面   
        this.$router.push('/home')
      });
    },
  },
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
.login_container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #fff;
  border-radius: 3px;
  .avatar_box {
    height: 130px;
    width: 130px;
    padding: 10px;
    position: absolute;
    bottom: 60%;
    box-shadow: 0 0 10px;
    border: 1px solid #eee;
    border-radius: 50%;
    background-color: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .user,
  .psw {
    width: 100%;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
