<template>
  <div class="layout-index-container">
    <el-container style="height: 100vh;">
      <el-aside class="aside-container" :class="{'collapse': isCollapse}">
        <Sidebar :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="left">
            <a href="javascript:;" class="fold" @click="toggleMenu">
              <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
            </a>
            <Breadcrumb />
          </div>
          <div class="right">
            <el-dropdown>
              <span><i class="el-icon-setting" style="margin-right: 15px"></i>{{userInfo.username}}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/">首页</router-link>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <a href="javascript:;" @click="logout">退出登录</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="main-container">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import Sidebar from './sidebar.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import http from '@/api'
import { clearToken } from '@/utils/auth';

@Component({
  components: {
    Sidebar,
    Breadcrumb
  }
})
export default class Layout extends Vue{
  isCollapse: boolean = true;
  userInfo: any = {};
  toggleMenu() {
    this.isCollapse = !this.isCollapse;
  }
  logout() {
    http.common.logout().then(() => {
      this.$store.state.userInfo = null;
      clearToken();
      this.$router.replace(`/passport/login?redirect=${this.$route.path}`)
    })
  }
  created() {
    this.userInfo = this.$store.getters.userInfo;
  }
}
</script>
<style lang="less" scoped>
.layout-index-container{
  .aside-container{
    width: 210px !important;
    transition: all 300ms;
    &.collapse{
      width: 64px !important;
    }
  }
  .header{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    .fold{
      font-size: 24px;
      margin-right: 20px;
      &:hover{
        will-change: width;
      }
    }
    .left{
      display: flex;
      align-items: center;
    }
  }
  .main-container{
    min-width: 1000px;
  }
}
</style>
