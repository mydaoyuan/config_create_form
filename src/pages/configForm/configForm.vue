<template>
  <div class="warp">
    <el-row :gutter="44">
      <el-col :span="12">
        <baseform></baseform>
      </el-col>
      <el-col :span="12">
        <deepform></deepform>
        <customform></customform>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import baseform from './baseform'
import customform from './customform'
import deepform from './deepform'
export default {
  name: 'formIndex',
  components: {
    baseform,
    customform,
    deepform
  },
}
</script>

<style scoped >
.warp {
  padding: 30px;
  text-align: left;
}
.item {
  margin-bottom: 40px;
}
h1 {
  font-size: 24px;
}
</style>
