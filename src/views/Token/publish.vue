<template>
  <div class="token-publish-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>发行</span>
      </div>
      <el-form label-width="80px" :rules="rules" :model="form" ref="formModal">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Symbol" prop="symbol">
          <el-input type="text" v-model="form.symbol"></el-input>
        </el-form-item>
        <el-form-item label="小数位数" prop="decimals">
          <el-input-number v-model="form.decimals" controls-position="right" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="总量" prop="totalSupply">
          <el-input type="number" v-model="form.totalSupply"></el-input>
        </el-form-item>
        <el-form-item class="handle-container" style="text-align: right;">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
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
  rules: any = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    symbol: [
      { required: true, message: '请输入Symbol', trigger: 'blur' },
      { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
    ],
    decimals: [
      { required: true, message: '请输入小数位数', trigger: 'blur' },
    ],
    totalSupply: [
      { required: true, message: '请输入总量', trigger: 'blur' },
    ],
  }
  dialogVisible: boolean = false;
  successMsg: any = {
    address: '',
    totalSupply: ''
  }
  
  submit() {
    this.$refs.formModal.validate((valid: boolean) => {
      console.log(valid);
      if (!valid) {
        return;
      }
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
    });
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
