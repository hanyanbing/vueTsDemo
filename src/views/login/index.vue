<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRule"
      label-width="100px"
      class="login-form"
    >
      <el-form-item prop="username">
        <el-input
          type="password"
          v-model="loginForm.username"
          autocomplete="off"
          :placeholder="$t('login.username')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          :placeholder="$t('login.password')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  import { mapActions } from 'vuex';
  // import { validUsername } from '@/utils/validate';
  // import LangSelect from '@/components/LangSelect'
  // import SocialSign from './socialSignin'

  export default {
    name: 'Login',
    components: {},
    data() {
      const validateUsername = (rule, value, callback) => {
        callback();
        // if (!validUsername(value)) {
        //   callback(new Error('Please enter the correct user name'));
        // } else {
        //   callback();
        // }
      };
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'));
        } else {
          callback();
        }
      };

      return {
        loginForm: {
          username: 'admin',
          password: '111111'
        },
        loginRule: {
          username: [
            { required: true, trigger: 'blur', validator: validateUsername }
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePassword }
          ]
        }
      };
    },

    methods: {
      ...mapActions('user', ['login']),
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.login(this.loginForm)
              .then(() => {
                this.$router.push({ path: this.redirect || '/' });
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  body,
  html {
    padding: 0;
    margin: 0;
  }
  .login-container {
    position: fixed;
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      .set-language {
        color: #fff;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0px;
        cursor: pointer;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>