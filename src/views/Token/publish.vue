<template>
  <div class="token-publish-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>发行</span>
      </div>
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="form.symbol"></el-input>
        </el-form-item>
        <el-form-item label="小数位数">
          <el-input-number v-model="form.decimals" controls-position="right" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="总量">
          <el-input type="number" v-model="form.totalSupply"></el-input>
        </el-form-item>
        <div class="handle-container" style="text-align: right;">
          <el-button type="primary" @click="submit">提交</el-button>
        </div>
      </el-form>
    </el-card>
    <el-dialog
      :title="`${form.name}发行成功`"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="finish"
    >
      <div class="finished-container">
        <div class="list">
          <p>地址：{{successMsg.address}}</p>
          <p>总量：{{successMsg.totalSupply}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="finish">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import http from '@/api'

@Component
export default class TokenPublish extends Vue{
  form: any = {
    name: '',
    symbol: '',
    decimals: 2,
    totalSupply: ''
  };
  dialogVisible: boolean = false;
  successMsg: any = {
    address: '',
    totalSupply: ''
  }
  
  submit() {
    const { form } = this;
    const loading = this.$loading({
      lock: true,
      text: 'ArtShare发行中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    http.token.publish({
      ...form
    }).then((res: any) => {
      const info = res.info;
      loading.close();
      this.$notify.success('提交成功');
      this.successMsg.address = info.contractAddress;
      this.successMsg.totalSupply = info.totalSupply;
      this.dialogVisible = true;
    }).catch(() => {
      loading.close();
    })
  }

  finish() {
    this.$router.replace('/token/list');
  }
}
</script>
<style lang="less" scoped>
.finished-container{
  .list{
    padding-left: 100px;
    p{
      &:not(:last-child) {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
