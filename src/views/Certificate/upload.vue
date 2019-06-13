<template>
  <div class="cert-upload-container">
    <el-card>
      <el-form label-position="top" :model="form">
        <el-form-item label="图片">
          <div class="upload-container">
            <div class="image-con" v-for="item in images" :key="item.id" v-loading="item.loading">
              <img :src="item.src" class="image" alt="" />
              <i class="el-icon-error" @click="deleteImageItem(item.id)"></i>
            </div>
            <div class="upload-item" v-show="images.length < 4">
              <input type="file" ref="uploader" class="uploader">
              <i class="el-icon-upload"></i>
            </div>
            <!-- <img class="image" :style="`width: ${imageSize.w}px;height: ${imageSize.h}px;`" v-else-if="imgFile" :src="imgFile" alt="">
            <img class="image" :style="`width: ${imageSize.w}px;height: ${imageSize.h}px;`" v-else-if="form.imageUrl" :src="form.imageUrl" alt=""> -->
          </div>
        </el-form-item>
        <el-form-item label="基本信息" style="margin-bottom: 0;">
          <div class="item">
            <span class="label">艺术品名称：</span>
            <div class="inputdiv"><el-input :disabled="!isNew" v-model="form.name" style="width: 320px;" placeholder="请输入艺术品名称/SPU"></el-input></div>
          </div>
          <div class="item">
            <span class="label">艺术品作者：</span>
            <div class="inputdiv"><el-input v-model="form.author" style="width: 320px;" placeholder="请输入艺术品作者"></el-input></div>
          </div>
          <div class="item">
            <span class="label">创作时间：</span>
            <div class="inputdiv">
              <el-date-picker
                v-model="form.issuedTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择创作时间">
              </el-date-picker>
            </div>
          </div>
          <div class="item" v-for="(item, index) in specificationList" :key="item.id">
            <span class="label">艺术品{{item.specificationName}}：</span>
            <div class="inputdiv">
              <el-select
                v-if="refreshSelect"
                v-model="selectData[item.specificationId][0]"
                @change="onChangeParentId(item.specificationId, index)"
              >
                <el-option
                  v-for="item in options[index][item.specificationId].option"
                  :key="item.id"
                  :label="item.specificationValue"
                  :value="item.id"
                ></el-option>
              </el-select>
              <div v-if="selectData[item.specificationId][0]" class="inline-container">
                <el-select
                  class="selectItem"
                  v-for="(child, x, i) in options[index][item.specificationId].children"
                  :key="child.specificationId"
                  v-model="selectData[item.specificationId][i + 1]"
                  @change="onChangeChildId(selectData[item.specificationId][0], selectData[item.specificationId][i + 1], index)"
                >
                  <el-option
                    v-for="childItem in child.option"
                    :key="childItem.id"
                    :label="childItem.specificationValue"
                    :value="childItem.id"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="group">
            <div class="item mult">
              <span class="label">作品规格：</span>
              <div class="inputdiv">
                <el-input placeholder="长" class="input" v-model="physical[0]">
                  <span slot="suffix">cm</span>
                </el-input>
              </div>
              <span>*</span>
              <div class="inputdiv">
                <el-input placeholder="宽" class="input" v-model="physical[1]">
                  <span slot="suffix">cm</span>
                </el-input>
              </div>
              <span>*</span>
              <div class="inputdiv">
                <el-input placeholder="高" class="input" v-model="physical[2]">
                  <span slot="suffix">cm</span>
                </el-input>
              </div>
              <span>*</span>
              <div class="inputdiv">
                <el-input placeholder="重量" class="input" v-model="physical[3]">
                  <span slot="suffix">g</span>
                </el-input>
              </div>
            </div>
          </div>
          <div class="item">
            <span class="label">Symbol：</span>
            <div class="inputdiv"><el-input :disabled="!isNew" v-model="form.certificateSymbol" style="width: 320px;" placeholder="请输入Symbol"></el-input></div>
          </div>
          <div class="item">
            <span class="label">是否公开：</span>
            <div class="radiodiv">
              <el-radio-group v-model="form.isPrivate">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="item">
            <span class="label">是否上链：</span>
            <div class="radiodiv">
              <el-radio-group v-model="form.uploadBlockChain">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="相关描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 10}"
            placeholder="请输入相关描述"
            v-model="form.desc">
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="circulation-record">
            <p>流转记录 <i class="el-icon-circle-plus" @click="newCirculationRecord"></i></p>
            <div
              v-for="item in circulationRecord"
              :key="item.id"
            >
              <el-button class="delete-button" @click="deleteCirculationRecord(item.id)">删除</el-button>
              <div class="record-input-con">
                <el-input
                  class="record-input"
                  placeholder="请输入流转记录"
                  v-model="item.value">
                </el-input>
              </div>
            </div>
          </div>
        </el-form-item>
        <div class="handle-container">
          <el-button type="primary" class="submit" @click="submit" :loading="loading">提交</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import http from '@/api'
import { Watch } from 'vue-property-decorator';
import lrz from 'lrz';
import { url2Blob, object2formData } from '@/utils';

interface optionModal {
  index: number,
  parentId: number,
  childId?: number,
  data: any
}

@Component({})
export default class CertUpload extends Vue{
  options: any[] = [
    {},
    {},
    {}
  ]
  physical: string[] = ['', '', '', ''];
  refreshSelect: boolean = false;
  selectData: any = {};
  specificationList: any[] = [];
  loading: boolean = false;
  form: any = {
    name: '',
    physical: '',
    isPrivate: 0,
    uploadBlockChain: 1,
    desc: '',
    certificateSymbol: ''
  }
  files: any[] = [];
  images: any[] = [];
  id: string = '';
  isNew: boolean = false;
  imageSize: any = {w: 83, h: 83};
  circulationRecord: any[] = [{
    value: '',
    id: new Date().getTime()
  }];

  deleteCirculationRecord(id: number) {
    const index = this.circulationRecord.findIndex(item => item.id === id);
    console.log(id, index);
    if (index > -1) {
      this.circulationRecord.splice(index, 1);
    }
  }

  newCirculationRecord() {
    this.circulationRecord.push({
      value: '',
      id: new Date().getTime()
    })
  }

  getDetail(cb?: Function) {
    const { id } = this;
    http.home.detail({
      id
    }).then((res: any) => {
      const data = res.info;
      this.form.name = data.certificateName;
      this.form.isPrivate = data.isPrivate
      this.form.uploadBlockChain = data.uploadBlockChain;
      this.form.certificateSymbol = data.certificateSymbol;
      this.form.author = data.author;
      this.form.issuedTime = data.issuedTime;
      this.form.desc = data.description;
      this.circulationRecord = data.circulationRecord ? 
        data.circulationRecord.split(',').map((item: any) => ({value: item, id: new Date().getTime()}))
        : [{value: '', id: new Date().getTime()}]
      this.images = data.imageUrl.split(',').map((item: any) => {
        return {
          id: new Date().getTime(),
          src: item,
          loading: false,
        }
      })
      this.physical = data.physicalProperty.split(',');
      this.getSelectDataByPost(data.specificationData);
      // this.getImageOriginSize(data.imageUrl).then((size) => {
      //   let fitSize = this.fitImageSize(size);
      //   this.imageSize = fitSize;
      // });
      cb && cb();
    })
  }

  deleteImageItem(id: number) {
    const index = this.images.findIndex(item => item.id === id);
    if (index === -1) {
      return;
    }
    this.images.splice(index, 1);
  }

  getSelectDataByPost(specificationData: string) {
    const array: any[] = JSON.parse(specificationData);
    let parentIds: number[] = [];
    array.forEach((item: string) => {
      const ids: number[] = item.split(',').map((item: string) => Number(item.split('_')[0]));
      const index = ids[0];
      parentIds.push(index);
      this.selectData[index] = ids.slice(1);
      console.log('selectData', index, this.selectData);
    })
  }

  renderSelectElem() {
    const { selectData } = this;
    Object.keys(selectData).map((key: string, index: number) => {
      const parentId = Number(key);
      console.log(parentId);
      this.onChangeParentId(parentId, index);
    })
    // Object.keys(selectData).map((key: string, index: number) => {
    //   const parentId = Number(key);
    //   if (selectData[key].length > 1) {
    //     const children = selectData[key].slice(1);
    //     children.map((childId: number, x: number) => {
    //       setTimeout(() => {
    //         this.onChangeChildId(parentId, childId, x + 1);
    //       }, x * 200);
    //     })
    //   } else {
    //     return;
    //   }
    // })
  }

  setOptionData(params: optionModal) {
    if (typeof params.parentId !== 'number') {
      throw new Error('setOptionData parentId 不能为空');
      return;
    }
    if (typeof params.childId === 'number') {
      if (typeof this.options[params.index][params.parentId].children === 'undefined') {
        this.options[params.index][params.parentId].children = {}
      }
      if (typeof this.options[params.index][params.parentId].children[params.childId] === 'undefined') {
        this.options[params.index][params.parentId].children[params.childId] = {};
      }
      this.options[params.index][params.parentId].children[params.childId].option = params.data;
    } else {
      if (typeof this.options[params.index][params.parentId] === 'undefined') {
        this.options[params.index][params.parentId] = {};
      }
      this.options[params.index][params.parentId].option = params.data;
    }
  }

  getCategoryOption(array: number[]): Promise<any[]> {
    const promiseArray = array.map(item => {
      return this.findBySpecificationId(item);
    })
    return new Promise((resolve, reject) => {
      Promise.all(promiseArray).then((values: any[]) => {
        const result = values.map(item => {
          return item.info[0]
        })
        resolve(result);
      })
    })
  }

  createBodyFormData(): FormData {
    const formData = new FormData();
    const selectData = this.selectData;
    const specArray = this.specificationList.map(item => `${item.specificationId}_${item.specificationName}`)
    Object.keys(selectData).forEach((key, index) => {
      const ids = selectData[key].filter((item: number) => !!item);
      const body = `${specArray[index]},${this.createBody(ids, index)}`;
      formData.append('body', body);
    })
    return formData;
  }

  createBody(ids: any[], index: number) {
    let result: string[] = [];
    ids.forEach(id => {
      const name = this.findSpecNameById(id);
      result.push(`${id}_${name}`);
    })
    return result.join(',');
  }

  sear(obj: any, deep: any, arr: any) {
    !arr[deep] ? (arr[deep] = Object.keys(obj) ) : (arr[deep] = arr[deep].concat(Object.keys(obj)));
    for(let key in obj) {
      if(typeof obj[key] === 'object') {
        this.sear(obj[key], deep+1,arr);
      }
    }
    return arr;
  }

  object2array(obj: any) {
    let result: any[] = [];
    Object.keys(obj).forEach(x => {
      if (obj[x].children && Object.keys(obj[x].children).length > 0) {
        Object.keys(obj[x].children).forEach(y => {
          result = result.concat(obj[x].children[y].option);
        })
      }
      result = result.concat(obj[x].option)
    })
    return result;
  }

  findSpecNameById(id: number): string {
    const options = this.options;
    let array: any[] = []
    options.forEach(obj => {
      array = array.concat(this.object2array(obj))
    })
    const index = array.findIndex(item => item.id === id);
    if (index > -1) {
      return array[index].specificationValue;
    }
    return '';
  }

  refreshSelectFn() {
    this.refreshSelect = false;
    setTimeout(() => {
      this.refreshSelect = true;
    }, 0);
  }

  findBySpecificationId(specificationId: number) {
    return http.category.findBySpecificationId({
      specificationId
    })
  }
  getCategoryDetail(id: number) {
    http.category.detail({
      id
    }).then((res: any) => {
      const list: any[] = res.info.specification;
      const specificationIds = list.map(item => item.specificationId);
      if (this.isNew) {
        let selectData: any = {};
        specificationIds.forEach(id => {
          selectData[id] = [''];
        })
        // 深拷贝
        this.selectData = JSON.parse(JSON.stringify(selectData));
      }
      this.specificationList = list;
      this.getCategoryOption(specificationIds).then((values: any[]) => {
        values.forEach((item, index) => {
          this.setOptionData({
            index,
            parentId: item.specificationId,
            data: item.specification
          });
        })
        this.refreshSelectFn();
        if (!this.isNew) {
          setTimeout(() => {
            this.renderSelectElem();
          }, 0);
        }
      })
    })
  }

  onChangeParentId(parentId: number, index: number) {
    const specificationId = this.selectData[parentId][0];
    this.options[index][parentId].children = {};
    this.findBySpecificationId(specificationId).then((res: any) => {
      if (res.info.length === 0) {
        return;
      }
      const data = res.info[0];
      this.setOptionData({
        index,
        parentId,
        childId: data.specificationId,
        data: data.specification
      });
      this.refreshSelectFn();
    })
  }
  onChangeChildId(parentId: number, childId: number, index: number) {
    const specificationId = childId;
    // this.options[index][parentId].children = {};
    this.findBySpecificationId(specificationId).then((res: any) => {
      if (res.info.length === 0) {
        return;
      }
      const data = res.info[0];
      this.setOptionData({
        index,
        parentId,
        childId,
        data: data.specification
      });
      this.refreshSelectFn();
    })
  }

  openRecordPage() {
    this.$router.push(`/certificate/upload/record?id=${this.id}`);
  }

  submit() {
    const { form, images } = this;
    const formData: FormData = this.createBodyFormData();
    const physical = this.physical.join(',');
    if (images.findIndex(item => item.loading) > -1) {
      this.$message.warning('请等待所有图片上传完成');
      return;
    }
    if (images.length > 0) {
      const imageUrls = images.map(item => item.src).join(',');
      formData.append('imageUrls', imageUrls)
    } else {
      this.$message.warning('请上传图片');
      return;
    }
    if (this.isNew) {
      formData.append('name', form.name);
      formData.append('symbol', form.certificateSymbol);
    }
    // formData.append('blockChainType', form.blockChainType);
    formData.append('author', form.author);
    formData.append('issuedTime', form.issuedTime);
    formData.append('desc', form.desc);
    formData.append('physical', physical);
    formData.append('uploadBlockChain', form.uploadBlockChain);
    formData.append('isPrivate', form.isPrivate);
    const circulationRecord = this.circulationRecord.map(item => item.value).join(',');
    formData.append('circulationRecord', circulationRecord);

    if (this.id !== '0') {
      formData.append('id', this.id);
    }
    const postName = this.id === '0' ? 'upload' : 'update';
    this.loading = true;
    http.user[postName](formData).then((res) => {
      this.loading = false;
      this.$notify.success('保存成功');
      this.$router.replace('/certificate/list');
    }).catch(() => {
      this.loading = false;
    })
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

  getImageItemById(id: number) {
    return this.images.findIndex(item => item.id === id);
  }

  created() {
    const id = this.$route.query.id;
    if (id) {
      this.id = id.toString();
      this.getDetail(() => {
        this.getCategoryDetail(1);
      });
    } else {
      this.id = '0';
      this.isNew = true;
      this.getCategoryDetail(1);
    }
  }
  mounted() {
    this.$refs.uploader.addEventListener('change', () => {
      const file = this.$refs.uploader.files[0];
      lrz(file, {
        width: 1024,
        height: 1024
      }).then((ret: any) => {
        const id = new Date().getTime();
        this.images.push({
          id,
          src: ret.base64,
          loading: true,
        });
        http.common.uploadImage(ret.file).then((res: any) => {
          const src = res.info;
          const index = this.getImageItemById(id);
          this.images[index].loading = false;
          this.images[index].src = src;
        })
      })
    })
  }
}
</script>
<style lang="less" scoped>
.cert-upload-container{
  padding-bottom: 50px;
  .upload-container{
    display: flex;
    height: 83px;
    align-items: center;
    justify-content: flex-start;
    .upload-item{
      height: 100%;
      width: 83px;
      position: relative;
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
    }
    .image-con{
      width: 83px;
      height: 100%;
      margin-right: 10px;
      position: relative;
      .el-icon-error{
        position: absolute;
        top: 3px;
        right: 3px;
        font-size: 18px;
        color: #fff;
        z-index: 3000;
      }
    }
    .image{
      width: 100%;
      height: 100%;
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
.selectItem{
  margin-left: 20px;
}
.inline-container{
  display: inline-block;
}
.circulation-record{
  p{
    display: flex;
    align-items: center;
    i{
      margin-left: 10px;
      color: #409EFF;
      cursor: pointer;
      font-size: 16px;
    }
  }
  .record-input-con{
    margin: 0 90px 15px 0;
    .record-input{
      width: 100%;
    }
  }
  .delete-button{
    float: right;
  }
}
</style>
<style lang="less">
.cert-upload-container {
  .el-input.is-disabled .el-input__inner,
  .el-radio__input.is-disabled+span.el-radio__label,
  .el-textarea.is-disabled .el-textarea__inner{
    color: #333;
  }
  .el-radio__input.is-disabled.is-checked .el-radio__inner{
    border-color: #409EFF;
    background: #409EFF;
  }
  .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
    background-color: #F5F7FA;
  }
}
</style>
