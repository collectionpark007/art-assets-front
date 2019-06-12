<template>
  <div class="cert-list-container">
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        prop="certificateName"
        label="名称"
        min-width="150"
      >
        <template slot-scope="scope">
          <p class="over-hidden" :title="scope.row.certificateName">{{scope.row.certificateName}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="certificateSymbol"
        label="Symbol"
        min-width="150"
      >
        <template slot-scope="scope">
          <p class="over-hidden" :title="scope.row.certificateSymbol">{{scope.row.certificateSymbol}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="image"
        label="图片"
        width="60"
      >
        <template slot-scope="scope">
          <div class="img-container">
            <img width="32" height="32" :src="scope.row.imageUrl" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="author"
        label="发行人"
        min-width="90"
      >
        <template slot-scope="scope">
          <p class="over-hidden" :title="scope.row.author">{{scope.row.author}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="contractAddress"
        label="合约地址"
        min-width="320"
      >
        <template slot-scope="scope">
          <a :href="scope.row.url" :title="scope.row.contractAddress" class="over-hidden">{{scope.row.contractAddress}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发行时间"
        min-width="160"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间"
        min-width="160"
      ></el-table-column>
      <el-table-column
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
    http.user.list({
      ...pagin
    }).then((res: any) => {
      this.pagin.total = res.info.totalCount;
      this.tableData = res.info.list.map((item: any) => {
        item.createTime = dayjs(item.createTime).format('YYYY-MM-DD hh:mm:ss');
        item.updateTime = dayjs(item.updateTime).format('YYYY-MM-DD hh:mm:ss');
        item.imageUrl = item.imageUrl.split(',')[0];
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
.cert-list-container{
  .pagin-container{
    margin-top: 20px;
    text-align: right;
  }
  .img-container{
    display: flex;
    align-items: center;
  }
  a.over-hidden {
    text-decoration: underline;
  }
}
</style>
