<template>
  <div class="attr-size-container">
    <div class="handle-con">
      <el-button class="new" type="primary" @click="newSize">新增规格</el-button>
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
        label="规格值"
        min-width="200"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteItem(scope.$index, tableData)"
            type="text"
            size="small">
            删除
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
export default class AttrSize extends Vue{
  tableData: any[] = [];
  deleteItem() {

  }
  newSize() {
    this.$router.push('/attribute/size/new')
  }
}
</script>
<style lang="less" scoped>
.handle-con{
  margin-bottom: 20px;
}
</style>
