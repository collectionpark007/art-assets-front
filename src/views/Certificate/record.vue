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
          prop="transactionHash"
          label="Txn Hash"
          min-width="150"
        >
          <template slot-scope="scope">
            <a :href="scope.row.url" class="over-hidden" :title="scope.row.transactionHash" target="_blank">{{scope.row.transactionHash}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="blockNumber"
          label="Block"
          min-width="100"
        >
          <template slot-scope="scope">
            <p class="over-hidden" :title="scope.row.blockNumber">{{scope.row.blockNumber}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="imageUrl"
          label="Image"
          width="80"
        >
          <template slot-scope="scope">
            <a :href="scope.row.imageUrl" target="_blank"><img width="32" height="32" :src="scope.row.imageUrl" /></a>
          </template>
        </el-table-column>
        <el-table-column
          prop="from"
          label="From"
          min-width="150"
        >
          <template slot-scope="scope">
            <p class="over-hidden" :title="scope.row.from">{{scope.row.from}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="to"
          label="To"
          min-width="150"
        >
          <template slot-scope="scope">
            <p class="over-hidden" :title="scope.row.to">{{scope.row.to}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="symbol"
          label="Symbol"
          min-width="100"
        >
          <template slot-scope="scope">
            <p class="over-hidden" :title="scope.row.symbol">{{scope.row.symbol}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="gasUsed"
          label="[Txn Fee]"
          min-width="100"
        >
          <template slot-scope="scope">
            <p class="over-hidden" :title="scope.row.gasUsed">{{scope.row.gasUsed}}</p>
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
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import http from '@/api'
import Component from 'vue-class-component';

@Component
export default class CertRecord extends Vue{

  tableData: any = {};
  pagin: any = {
    pageNum: 1,
    pageRow: 20,
    total: 0
  }
  id: string = '';

  getData(certificateId: string) {
    console.log('certificateId', certificateId);
    http.user.history({
      certificateId
    }).then((res: any) => {
      this.tableData = res.info.list;
    })
  }

  onCurrentChange(pageNum: number) {
    this.pagin.pageNum = pageNum;
    this.getData(this.id);
  }

  created() {
    const certificateId = this.$route.query.id.toString();
    this.id = certificateId;
    this.getData(certificateId);
  }
}
</script>
<style lang="less" scoped>
.pagin-container{
  margin-top: 20px;
  text-align: right;
}
</style>
