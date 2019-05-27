<template>
  <div class="about-index-container">
    <router-link to="/about/a">a</router-link>
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class About extends Vue{
  
}
</script>
<style lang="less" scoped>

</style>
