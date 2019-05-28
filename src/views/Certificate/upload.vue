<template>
  <div class="cert-upload-container">
    <el-form label-position="top">
      <el-form-item label="图片">
        <div class="upload-container">
          <input type="file" ref="uploader" class="uploader">
          <i class="el-icon-upload"></i>
          <img class="image" src="" alt="">
        </div>
      </el-form-item>
      <el-form-item label="基本信息" style="margin-bottom: 0;">
        <div class="item">
          <span class="label">艺术品名称：</span>
          <div class="inputdiv"><el-input style="width: 320px;" placeholder="请输入商品名称/SPU"></el-input></div>
        </div>
        <div class="group">
          <div class="item">
            <span class="label">艺术品类别：</span>
            <div class="inputdiv">
              <el-select v-model="form.category">
                <el-option
                  v-for="item in categoryOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <span class="label">艺术品年代：</span>
            <div class="inputdiv">
              <el-select v-model="form.year">
                <el-option
                  v-for="item in yearsOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <span class="label">艺术品材质：</span>
            <div class="inputdiv">
              <el-select v-model="form.material">
                <el-option
                  v-for="item in materialOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="group">
          <div class="item mult">
            <span class="label">物理属性：</span>
            <div class="inputdiv">
              <el-input placeholder="长" class="input">
                <span slot="suffix">cm</span>
              </el-input>
            </div>
            <span>*</span>
            <div class="inputdiv">
              <el-input placeholder="宽" class="input">
                <span slot="suffix">cm</span>
              </el-input>
            </div>
            <span>*</span>
            <div class="inputdiv">
              <el-input placeholder="高" class="input">
                <span slot="suffix">cm</span>
              </el-input>
            </div>
            <span>*</span>
            <div class="inputdiv">
              <el-input placeholder="重量" class="input">
                <span slot="suffix">g</span>
              </el-input>
            </div>
          </div>
        </div>
        <div class="item">
          <span class="label">Symbol：</span>
          <div class="inputdiv"><el-input style="width: 320px;" placeholder="请输入Symbol"></el-input></div>
        </div>
        <div class="item">
          <span class="label">是否私有：</span>
          <div class="radiodiv">
            <el-radio-group v-model="form.resource">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <span class="label">是否上链：</span>
          <div class="radiodiv">
            <el-radio-group v-model="form.resource">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="相关描述">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10}"
          placeholder="请输入相关描述"
          v-model="form.content">
        </el-input>
      </el-form-item>
      <div class="handle-container">
        <el-button type="primary" class="submit" @click="submit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component({})
export default class CertUpload extends Vue{
  categoryOption: any[] = []
  form: any = {}

  submit() {

  }
}
</script>
<style lang="less" scoped>
.cert-upload-container{
  padding-bottom: 50px;
  .upload-container{
    position: relative;
    width: 85px;
    height: 85px;
    border: 1px solid #D8D8D8;
    .el-icon-upload{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      font-size: 22px;
      color: #D8D8D8;
      z-index: 1;
    }
    .uploader{
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      opacity: 0.01;
      z-index: 2;
    }
    .image{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .item{
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .label{
      width: 100px;
    }
    &.mult{
      .inputdiv {
        .input{
          width: 100px;
        }
        & + span {
          margin: 0 10px;
          font-size: 18px;
        }
      }
    }
  }
  .group{
    display: flex;
    .item{
      margin-right: 20px;
    }
  }
  .handle-container{
    text-align: right;
    .submit{
      width: 120px;
    }
  }
}
</style>
