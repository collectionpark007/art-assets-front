<template>
  <div class="passport-login-container">
    <div class="login-contianer">
      <el-form autocomplete="no" ref="loginForm" :rules="rules" :model="form">
        <div class="title-container">
          <h1>系统登录</h1>
        </div>
        <el-form-item prop="username" class="item-container">
          <div class="inputdiv">
            <i class="el-icon-user"></i>
            <input type="text" placeholder="用户名" v-model="form.username" autofocus />
          </div>
        </el-form-item>
        <el-form-item prop="password" class="item-container">
          <div class="inputdiv">
            <i class="el-icon-lock"></i>
            <input type="password" placeholder="密码" v-model="form.password" />
          </div>
        </el-form-item>
        <el-button class="login-btn" type="primary" @click="submit">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

interface loginModal {
  username: string,
  password: string
}

@Component
export default class PassportLogin extends Vue {
  form: loginModal = {
    username: '',
    password: ''
  }
  rules: any = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 5, max: 20, message: '长度在5-20位', trigger: 'blur' }
    ]
  }
  submit() {
    this.$refs.loginForm.validate((valid: boolean) => {
      console.log(valid);
      if (valid) {
        const userInfo = {
          username: '昌',
          roles: ['guest'],
          token: '123'
        }
        this.$store.commit('SET_USER_INFO', userInfo);
        this.toPage();
      }
    })
  }
  toPage() {
    const redirect = this.$route.query.redirect;
    const url = redirect ? redirect : '/';
    console.log('redirect', redirect);
    this.$router.replace(url.toString());
  }
}
</script>
<style lang="less" scoped>
@bg: #2d3a4b;
.passport-login-container{
  min-height: 100vh;
  background-color: @bg;
  color: #fff;
  .login-contianer{
    padding: 160px 35px 0;
    width: 520px;
    margin: 0 auto;
    .title-container{
      h1{
        font-size: 26px;
        text-align: center;
        color: #eee;
        margin-bottom: 40px;
      }
    }
    .item-container{
      margin-bottom: 22px;
    }
    .inputdiv{
      display: flex;
      align-items: center;
      height: 52px;
      background: rgba(0,0,0,.1);
      border: 1px solid hsla(0,0%,100%,.1);
      border-radius: 5px;
      i{
        padding: 0 5px 0 15px;
        font-size: 18px;
      }
      input{
        width: 380px;
        padding: 12px 5px 12px 10px;
        background: transparent;
        caret-color: #fff;
        color: #fff;
      }
    }
    .login-btn{
      width: 450px;
      height: 40px;
      background-color: #1890ff;
      color: #fff;
      text-align: center;
      border: none;
    }
  }
}
</style>
