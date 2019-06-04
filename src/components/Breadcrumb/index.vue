<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in matchList" :key="item.path">
        <router-link :to="item.q ? `${item.path}${item.q}` : item.path" v-if="matchList.length !== index + 1 && index !== 0">{{item.name}}</router-link>
        <span v-else>{{item.name}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

@Component({})
export default class Breadcrumb extends Vue{
  matchList: any[] = [];

  @Watch('$route', { immediate: true })
  getBreadcrumb() {
    const result: any[] = []
    this.$route.matched.forEach(item => {
      if (item.name) {
        if (!item.meta.parent) {
          result.push(item);
        } else {
          console.log(this.$route.query.id);
          if (this.$route.query.id) {
            item.meta.parent.q = '?id=' + this.$route.query.id;
          }
          result.push(item.meta.parent);
          result.push(item);
        }
      }
    })
    this.matchList = result;
  }


  created() {
    this.getBreadcrumb();
  }
}
</script>
<style lang="less" scoped>

</style>
