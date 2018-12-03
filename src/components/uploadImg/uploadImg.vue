<template lang="html">
  <div class="my-uploadImg">
    <el-upload
      class="upload-img"
      :class="{'upload-max': dataArr.length >= limit}"
      :action="imgLoadUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :on-success="successUpload"
      :headers="headers"
      multiple
      :accept="fileType"
      :disabled="disabled"
      :list-type="listType || 'picture-card'"
      :limit="+limit"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <i class="el-icon-plus"></i>
      <!-- <el-button size="small" type="primary" v-if="!disabled">点击上传</el-button> -->
      <div slot="tip" class="el-upload__tip"></div>
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      >
      <div >
        <img width="100%" :src="currentImg" alt="">
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import api from 'api'
// import { getTokenText } from '../../../axios'
const imgLoadUrl = ''
export default {
  name: 'uploadImg',
  props: {
    limit: {
      type: [Number, String],
      default: 20
    },
    value: {
      type: [Array, String],
      required: true,
      default() {
        return []
      }
    },
    size: {
      type: Number,
      default: 1000
    },
    fileType: {
      type: String,
      default: 'image/*'
    },
    fileSize: {
      type: Number,
      default: 1048570
    },
    listType: {
      type: String
    },
    disabled: Boolean
  },
  data() {
    return {
      imgLoadUrl,
      fileList: [],
      dataArr: [],
      currentImg: '',
      dialogVisible: false,
      deleteFlag: false,
      headers: {
        Authorization: localStorage.getItem('token')
          ? localStorage.getItem('token')
          : ''
        // Authorization: localStorage.getItem('token')
        //   ? getTokenText(localStorage.getItem('token'))
        //   : ''
      }
    }
  },
  created() {
    this.initData(this.value)
  },
  watch: {
    value(data) {
      this.initData(data)
    }
  },
  methods: {
    initData(data = []) {
      let result = []
      if (typeof data === 'string') {
        if (data) {
          result = [
            {
              url: data
            }
          ]
        }
      } else {
        result = data.map(url => {
          return {
            url
          }
        })
      }
      this.fileList = JSON.parse(JSON.stringify(result))
      this.dataArr = JSON.parse(JSON.stringify(result))
    },
    beforeUpload(file) {

      let vm = this
      if (this.fileType == 'image/*' && !this.checkType(file.type)) {
        del('请选择图片类型文件！')
        return false
      }
      if (!this.checkSize(file.size)) {
        del('请选择小于1MB文件！')
        return false
      }

      function del(message) {
        vm.$message.warning(message)
        vm.deleteFlag = true
        setTimeout(() => {
          vm.deleteFlag = false
        })
      }
    },
    checkType(type) {
      const typeKey = ['image/jpeg', 'image/png']
      return typeKey.includes(type)
    },
    checkSize(num) {
      return num < this.fileSize
    },
    handleRemove(file, fileList = []) {
      this.dataArr = fileList.map(imgObj => {
        if (imgObj.status == 'success') {

          if (imgObj.response) {
            return { url: imgObj.response.data }
          } else {
            return { url: imgObj.url }
          }
        }
      })
      this.emitChange()
    },
    successUpload(data, fileList) {
      if (data.errorCode == 0) {
        let url = data.data
        let name = url.substr(url.lastIndexOf('/') + 1)
        this.dataArr.push({ url, name })
      }
      this.emitChange()
    },
    handlePreview(file) {
      this.currentImg = file.url
      this.dialogVisible = true

    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择${this.limit} 个文件`)
    },
    beforeRemove(file, fileList) {
      if (this.deleteFlag) {
        return true
      }
      return this.$confirm(`确定删除？`)
    },
    emitChange() {
      if (this.limit == 1) {
        this.$emit('input', this.dataArr[0].url)
      } else {
        this.$emit('input', this.dataArr.map(o => o.url))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-img {
  display: inline;
}
</style>
<style lang="scss" >
.my-uploadImg {
  height: 74px;
  .el-upload-list__item {
    width: 74px;
    height: 74px;
  }
  .el-upload--picture-card {
    width: 74px;
    height: 74px;
    line-height: 78px;
    // border: none;
    // background-color: transparent;
  }
  .el-upload-list.is-disabled + .el-upload--picture-card {
    display: none;
  }
  .upload-max {
    .el-upload {
      display: none;
    }
  }
}
</style>
