<template>
  <div class="attr-category-container">
    <div class="handle-con">
      <el-button class="new" type="primary" @click="newCategory">添加分类</el-button>
    </div>
    <el-table
      :data="tableData"
    >
      <el-table-column
        prop="name"
        label="名称"
        min-width="200"
      ></el-table-column>
      <el-table-column
        prop="tip"
        label="提示文案"
        min-width="200"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="edit(scope.$index, tableData)"
            type="text"
            size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
@Component
export default class AttrCategory extends Vue{
  tableData: any[] = [];
  edit() {

  }
  newCategory() {
    this.$router.push('/attribute/category/new')
  }
}
</script>
<style lang="less" scoped>
.handle-con{
  margin-bottom: 20px;
}
</style>
