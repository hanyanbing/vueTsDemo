<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">在线注册后台管理系统</span>
      </div>
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="registerUser.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="registerUser.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerUser.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input
            v-model="registerUser.password2"
            placeholder="请确认密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择身份" prop="identity">
          <el-select v-model="registerUser.identity" placeholder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit_btn"
            @click="submitForm('registerForm')"
            >注 册</el-button
          >
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { toggleClass } from '@/utils';
import '@/assets/custom-theme/index.css'; // the theme changed version element-ui css

@Component({
  name: 'Form'
})
export default class extends Vue {
  private registerUser = {
    name: '',
    email: '',
    password: '',
    password2: '',
    identity: ''
  };

  // 在return 后面
  private rules = {
    // 要以数组形式展示
    name: [
      { required: true, message: '用户名不能为空', trigger: 'change' },
      { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
    ],
    email: [
      {
        type: 'email',
        required: true,
        message: '邮箱格式不正确',
        trigger: 'blur'
      }
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
    ],
    password2: [
      { required: true, message: '确认密码不能为空', trigger: 'blur' },
      {
        min: 6,
        max: 30,
        message: '长度在 6 到 30 个字符',
        trigger: 'blur'
      },
      { validator: this.validatePass2, trigger: 'blur' }
    ],
    identity: [
      { required: true, message: '请选择类型', trigger: ['blur', 'change'] }
    ]
  };

  private validatePass2(rule, value, callback) {
    if (value !== this.registerUser.password) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  }

  private submitForm(formName) {
    (this.$refs[formName] as any).validate(valid => {
      if (valid) {
        this.$message({
          message: '注册成功！',
          type: 'success'
        });
        (this.$refs[formName] as any).resetFields();
        // resetFields方法：可移除校验结果并重置字段值（注：清除表单项name的校验及数值）
        // clearValidate方法：只能移除校验结果，不能重置字段值（注：只清除表单项name的校验，不清除表单项name的数值）

        // this.$axios
        //   .post("/api/users/register", this.registerUser)
        //   .then(res => {
        //     // 注册成功
        //     this.$message({
        //       message: "注册成功！",
        //       type: "success"
        //     });
        //     // this.$router.push("/login");
        //   });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
}
</script>

<style lang="scss" scoped></style>
