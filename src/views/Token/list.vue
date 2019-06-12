<template>
  <div class="token-list-container">
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        prop="contractName"
        label="名称"
        min-width="100"
      >
        <template slot-scope="scope">
          <p class="over-hidden" :title="scope.row.contractName">{{scope.row.contractName}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="contractSymbol"
        label="简介"
        min-width="100"
      >
        <template slot-scope="scope">
          <p class="over-hidden" :title="scope.row.contractSymbol">{{scope.row.contractSymbol}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="decimals"
        label="小数位数"
        min-width="80"
      >
      </el-table-column>
      <el-table-column
        prop="totalSupply"
        label="发行总量"
        min-width="100"
      >
        <template slot-scope="scope">
          <p class="over-hidden" :title="scope.row.totalSupply">{{scope.row.totalSupply}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="发行人"
        min-width="200"
      >
        <template slot-scope="scope">
          <a class="over-hidden" target="_blank" :href="scope.row.userAddressUrl" :title="scope.row.address">{{scope.row.address}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="contractAddress"
        label="合约地址"
        min-width="200"
      >
        <template slot-scope="scope">
          <a :href="scope.row.contractAddressUrl" target="_blank" :title="scope.row.contractAddress" class="over-hidden">{{scope.row.contractAddress}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="contractType"
        label="合约类型"
        min-width="80"
      >
        <template slot-scope="scope">
          <p >{{scope.row.contractType === 1 ? 'Token20' : 'Token721'}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发行时间"
        min-width="160"
      ></el-table-column>
      <!-- <el-table-column
        prop="date"
        label="操作"
        width="120"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="view(scope.row.id)"
            type="text"
            size="small">
            查看
          </el-button>
          <el-button
            @click.native.prevent="edit(scope.row.id)"
            type="text"
            size="small">
            编辑
          </el-button>
        </template>
      </el-table-column> -->
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
import http from '@/api'
import dayjs from 'dayjs';

@Component
export default class CertList extends Vue{
  loading: boolean = false;
  tableData: any[] = [];
  pagin: any = {
    pageNum: 1,
    pageRow: 10,
    total: 0
  }
  getList() {
    this.loading = true;
    const { pagin } = this;
    http.token.list({
      contractType: 1,
      ...pagin
    }).then((res: any) => {
      this.pagin.total = res.info.totalCount;
      this.tableData = res.info.list.map((item: any) => {
        item.createTime = dayjs(item.createTime).format('YYYY-MM-DD hh:mm:ss');
        return item;
      });
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    })
  }
  view(id: string) {
    this.$router.push(`/certificate/view?id=${id}`);
  }
  edit(id: string) {
    this.$router.push(`/certificate/upload?id=${id}`);
  }
  onCurrentChange(pageNum: number) {
    this.pagin.pageNum = pageNum;
    this.getList();
  }
  created() {
    this.getList();
  }
}
</script>
<style lang="less" scoped>
.pagin-container{
  margin-top: 20px;
  text-align: right;
}
.img-container{
  display: flex;
  align-items: center;
}
.token-list-container{
  a{
    text-decoration: underline;
    color: rgb(64, 158, 255);
  }
}
</style>
