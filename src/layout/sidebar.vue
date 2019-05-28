<template>
  <div class="sidebar-index-container" :class="{'collapse': isCollapse}">
    <el-menu
      class="el-menu-vertical"
      :router="true"
      :unique-opened="true"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
      :default-active="defaultActive">
      <el-menu-item index="/dashboard/index" route="/dashboard/index">
        <i class="el-icon-house"></i>
        <span slot="title">仪表盘</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>about</span>
        </template>
        <el-menu-item index="/about/a" route="/about/a">a</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Sidebar extends Vue{
  @Prop({default: true}) readonly isCollapse!: boolean;

  defaultActive: string = '';
  created() {
    this.defaultActive = this.$route.path;
    console.log(this.$route.path);
  }
}
</script>
<style lang="less" scoped>
.sidebar-index-container{
  height: 100%;
  transition: all 300ms;
  .el-menu-vertical{
    height: 100%;
    width: 210px;
  }
  &.collapse{
    .el-menu-vertical {
      width: 64px;
      transition: all 300ms;
    }
  }
}
</style>
