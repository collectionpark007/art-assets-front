<template>
  <div class="attr-category-new-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>添加分类</span>
      </div>
      <el-form label-position="left" label-width="80px">
        <el-form-item label="名称">
          <el-input placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-button icon="el-icon-plus" @click="openSelectSize">添加规格</el-button>
        </el-form-item>
        <el-form-item label="提示文案">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 10}"
            placeholder=""
          ></el-input>
        </el-form-item>
        <div class="handle-con">
          <el-button type="primary" class="submit" @click="submit">提交</el-button>
        </div>
      </el-form>
    </el-card>
    <el-dialog
      title="添加规格"
      :visible.sync="dialogVisible"
      width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class AttrCategoryNew extends Vue{
  dialogVisible: boolean = false;

  openSelectSize() {
    this.dialogVisible = true;
  }
}
</script>
<style lang="less" scoped>
.handle-con{
  margin-top: 20px;
  text-align: right;
  .submit{
    width: 120px;
  }
}
</style>
