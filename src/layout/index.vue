<template>
  <div class="layout-index-container">
    <el-container>
      <el-aside>
        <Sidebar />
      </el-aside>
      <router-view/>
    </el-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import Sidebar from './sidebar.vue'

@Component({
  components: {
    Sidebar
  }
})
export default class Layout extends Vue{
  
}
</script>
<style lang="less" scoped>

</style>
