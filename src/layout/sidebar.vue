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
      <div v-for="item in menuList" :key="item.name">
        <el-menu-item :index="item.path" :route="item.path" v-if="!item.children || item.children.length <= 1">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <el-submenu :index="item.name" v-else>
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.name" :index="child.path" :route="child.path">
            <i :class="child.icon"></i>
            <span>{{child.name}}</span>
          </el-menu-item>
        </el-submenu>
      </div>
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
  menuList: any[] = [];
  created() {
    this.defaultActive = this.$route.path;
    this.menuList = this.$store.state.menuList;
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
<style lang="less">
.sidebar-index-container {
  &.collapse {
    .el-submenu__title{
      span{
        display: none;
      }
    }
  }
}
</style>
