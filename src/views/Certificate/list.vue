<template>
  <div class="cert-list-container">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="名称"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="Symbol"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="image"
        label="图片"
        width="100"
      >
        <template slot-scope="scope">
          <img width="32" height="32" :src="scope.image" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="发行人"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="交易地址"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="发行时间"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="修改时间"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="名称"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="操作"
        width="150"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="view(scope.$index, tableData)"
            type="text"
            size="small">
            查看
          </el-button>
          <el-button
            @click.native.prevent="edit(scope.$index, tableData)"
            type="text"
            size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagin-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :hide-on-single-page="pagin.total <= 1"
        @current-change="onCurrentChange"
        :total="pagin.total">
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class CertList extends Vue{
  tableData: any[] = [];
  pagin: any = {
    pageNum: 1,
    pageRow: 10,
    total: 20
  }
  view() {

  }
  edit() {

  }
  onCurrentChange(pageNum: number) {
    console.log(pageNum);
  }
}
</script>
<style lang="less" scoped>
.pagin-container{
  margin-top: 20px;
  text-align: right;
}
</style>
