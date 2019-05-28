<template>
  <div class="cert-record-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>存证记录</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="Txn Hash"
          min-width="150"
        >
          <template slot-scope="scope">
            <a :href="scope.temp" target="_blank">{{scope.temp}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="Block"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="image"
          label="Image"
          width="100"
        >
          <template slot-scope="scope">
            <a :href="scope.temp" target="_blank">{{scope.temp}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="From"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="To"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="Symbol"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="[Txn Fee]"
          min-width="100"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default class CertRecord extends Vue{
  
}
</script>
<style lang="less" scoped>

</style>
