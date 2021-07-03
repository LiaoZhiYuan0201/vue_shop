<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRoleVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="roleList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', index1 == 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 展现一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1.id)">
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 展现二级和三级权限 -->
              <el-col :span="19">
                <el-row
                  :class="[index2 == 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                >
                  <!-- 二级权限 -->
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                    >
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                </el-row>
              </el-col>
            </el-row> </template
          >]
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" width="300px">
            <!-- 编辑 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
              >编辑</el-button
            >
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeRoleById(scope.row.id)"
              >删除</el-button
            >
            <!-- 设置 -->

            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="addRoleVisible" width="50%">
      <!-- 内容主题区域 -->
      <el-form
        :model="roleForm"
        ref="roleFormRef"
        label-width="100px"
        :rules="roleFromRules"
        @click="addroleClose"
      >
        <el-form-item label="角色ID" prop="roleId">
          <el-input v-model="roleForm.roleId"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="roleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改角色 -->
    <el-dialog title="修改角色" :visible.sync="editRoleVisible" width="50%">
      <!-- 内容主题区域 -->
      <el-form
        :model="editForm"
        ref="roleFormRef"
        label-width="100px"
        :rules="editFromRules"
        @click="editroleClose"
      >
        <el-form-item label="角色ID">
          <el-input v-model="editForm.roleId" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="serRightDialogClosed()"
    >
      <!-- 树形控件 -->
      <el-tree
        :data="rightList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getRoleList();
  },
  props: {},
  data() {
    return {
      roleList: [],
      roleForm: {
        roleId: "",
        roleName: "",
        roleDesc: "",
      },
      addRoleVisible: false,
      editRoleVisible: false,
      //控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      editForm: {},
      rightList: {},
      treeProps: {
        children: "children",
        label: "authName",
      },
      //默认选中的节点数组
      defKeys: [],
      //当前即将分配角色权限的ID
      roleId: "",
      //添加角色表单验证
      roleFromRules: {
        roleId: [{ message: "请输入角色ID", trigger: "blur" }],
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在3-10个字符之间",
            trigger: "blur",
          },
        ],
        roleDesc: [{ message: "请输入角色描述", trigger: "blur" }],
      },
      //修改角色表单验证
      editFromRules: {
        roleId: [{ required: true, message: "请输入角色ID", trigger: "blur" }],
      },
    };
  },
  methods: {
    async getRoleList() {
      let { data: res } = await this.$http.get("/roles");
      if (res.meta.status !== 200)
        return this.$message.error("获取角色列表失败");
      this.roleList = res.data;
    },
    //添加角色
    addRole() {
      this.$refs.roleFormRef.validate(async (valid) => {
        if (!valid) return;
        let { data: res } = await this.$http.post("roles", this.roleForm);
        console.log(res);
        if (res.meta.status !== 201) return this.$message.error("添加角色失败");
        this.$message.success("添加用户成功");
        this.addRoleVisible = false;
        this.getRoleList();
      });
    },
    addroleClose() {
      this.$refs.roleFormRef.resetFields();
    },
    async showEditDialog(id) {
      let { data: res } = await this.$http.get(`roles/${id}`);
      if (res.meta.status !== 200)
        return this.$message.error("获取角色信息失败");
      this.editForm = res.data;
      this.editRoleVisible = true;
    },
    editroleClose() {
      this.$refs.roleFormRef.resetFields();
    },
    //提交修改的数据
    editRoleInfo() {
      this.$refs.roleFormRef.validate(async (valid) => {
        if (!valid) return;
        let { data: res } = await this.$http.put(
          `roles/${this.editForm.roleId}`,
          {
            roleName: this.editForm.roleName,
            roleDesc: this.editForm.roleDesc,
          }
        );
        if (res.meta.status !== 200)
          return this.$message.error("更改角色信息失败");
        this.$message.success("更改角色信息成功");
        this.editRoleVisible = false;
        this.getRoleList();
      });
    },
    //删除角色
    async removeRoleById(id) {
      let confirmResult = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      let { data: res } = await this.$http.delete(`roles/${id}`);
      if (res.meta.status !== 200) return this.$message.error("删除用户失败");
      this.$message.success("删除用户成功");
      this.getRoleList();
    },
    //根据ID删除对应权限
    async removeRightById(role, rightId) {
      let confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      let { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      );
      if (res.meta.status !== 200) return this.$message.error("删除权限失败");
      this.$message.success("删除权限成功");
      //返回新的权限重新赋值，使页面不折叠
      role.children = res.data;
    },
    //展示分配权限对话框
    async showSetRightDialog(role) {
      this.roleId = role.id;
      //获取权限的所有数据
      let { data: res } = await this.$http.get("rights/tree");
      if (res.meta.status !== 200)
        return this.$message.error("获取权限列表失败");
      this.rightList = res.data;
      //   获取三级节点的ID
      this.getLeafKeys(role, this.defKeys);
      this.setRightDialogVisible = true;
    },
    //通过递归的形式，获取角色下所有三级权限的ID并保存到数组中
    getLeafKeys(node, arr) {
      //如果node 节点不包含children属性则是三级权限
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr);
      });
    },
    // 监听分配权限对话框的关闭事件 把数组清空
    serRightDialogClosed() {
      this.defKeys = [];
    },
    //为角色分配权限
    async allotRights() {
      let keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      let idStr = keys.join(",");
      let { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, {
        rids: idStr,
      });
      if (res.meta.status !== 200)
        return this.$message.error("角色分配权限失败");
      this.$message.success("角色分配角色成功");
      this.getRoleList();
      this.setRightDialogVisible = false;
    },
  },
  components: {},
  computed: {},
};
</script>

<style scoped lang="less">
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
