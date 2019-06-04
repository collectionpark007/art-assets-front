<template>
  <div class="cert-view-container">
    <el-card>
      <div class="image-container">
        <h1>图片</h1>
        <img :style="`width: ${imageSize.w}px; height: ${imageSize.h}px;`" :src="data.imageUrl" alt="">
      </div>
      <div class="info-container">
        <h1>基本信息</h1>
        <div class="line">
          <span class="title">艺术品名称：</span>
          <p class="value">{{data.certificateName}}</p>
        </div>
        <div class="line" v-for="(item, index) in specificationTitle" :key="item">
          <span class="title">艺术品{{item}}：</span>
          <p class="value">{{specificationValue[index]}}</p>
        </div>
        <div class="line">
          <span class="title">物理属性：</span>
          <p class="value">{{physical}}</p>
        </div>
        <div class="line">
          <span class="title">Symbol：</span>
          <p class="value">{{data.certificateSymbol}}</p>
        </div>
        <div class="line">
          <span class="title">是否私有：</span>
          <p class="value">{{data.isPrivate === 0 ? '否' : '是'}}</p>
        </div>
        <div class="line">
          <span class="title">是否上链：</span>
          <p class="value">{{data.uploadBlockChain === 0 ? '否' : '是'}}</p>
        </div>
        <div class="line">
          <span class="title">相关描述：</span>
          <p class="value">{{data.description}}</p>
        </div>
      </div>
      <div class="handle-container">
        <el-button type="primary" class="submit" @click="openRecordPage">存证记录</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import http from '@/api'

@Component
export default class CertView extends Vue{
  id: string = '';
  data: any = {};
  specificationTitle: string[] = [];
  specificationValue: string[] = [];
  physical: string = '';
  imageSize: any = {w: 0, h: 0}

  getDetail(id: string) {
    http.home.detail({
      id
    }).then((res: any) => {
      const data = res.info;
      this.specificationTitle = this.getSpecificationTitle(data.specificationData);
      this.specificationValue = this.getSpecificationValue(data.specificationData);
      this.physical = this.getPhysical(data.physicalProperty);
      this.data = data;
      this.getImageOriginSize(data.imageUrl).then((size) => {
        let fitSize = this.fitImageSize(size);
        this.imageSize = fitSize;
      });
    })
  }
  getSpecificationTitle(specificationData: string): string[] {
    const specificationArray: string[] = JSON.parse(specificationData);
    return specificationArray.map((item: string) => item.split(',')[0].split('_')[1]);
  }
  getSpecificationValue(specificationData: string): string[] {
    const specificationArray: string[] = JSON.parse(specificationData);
    let valuesArray: any = [];
    specificationArray.forEach((item: string) => {
      valuesArray.push(item.split(',').slice(1));
    });
    return valuesArray.map((item: any) => {
      return item.map((value: string) => value.split('_')[1]).join(' - ');
    })
  }

  getPhysical(physicalProperty: string) {
    const physicalArray = physicalProperty.split(',');
    return `长：${physicalArray[0]} cm 宽：${physicalArray[1]} cm 高：${physicalArray[2]} cm 重量：${physicalArray[3]} g`
  }
  getImageOriginSize(url: string) {
    const img = new Image();
    let size = { w: 0, h: 0 }
    return new Promise((resolve, reject) => {
      img.onload = () => {
      size.w = img.width;
      size.h = img.height;
      resolve(size);
    }
    img.src = url;
    })
  }
  fitImageSize(size: any) {
    const MAX_WIDTH = 400;
    const MAX_HEIGHT = 400;
    const originSize = { ...size };
    let scale = 0;

    if (originSize.w > originSize.h) {
      if (originSize.w > MAX_WIDTH) {
        scale = originSize.w / MAX_WIDTH;
        originSize.w = MAX_WIDTH;
        originSize.h /= scale;
      }
    } else {
      if (originSize.h > MAX_HEIGHT) {
        scale = originSize.h / MAX_HEIGHT;
        originSize.h = MAX_HEIGHT;
        originSize.w /= scale;
      }
    }
    console.log(originSize);
    return originSize;
  }

  openRecordPage() {
    this.$router.push(`/certificate/upload/record?id=${this.id}`);
  }

  created() {
    const id = this.$route.query.id.toString();
    this.id = id;
    this.getDetail(id);
  }
}
</script>
<style lang="less" scoped>
.cert-view-container{
  h1{
    font-size: 16px;
    margin-bottom: 10px;
    color: #333;
    line-height: 40px;
  }
  .image-container{
    margin-bottom: 22px;
  }
  .line{
    line-height: 40px;
    margin-bottom: 20px;
    display: flex;
    .title{
      min-width: 100px;
    }
  }
}
.handle-container{
  text-align: right;
}
</style>
