<template>
  <el-card class="box-card item">
    <h1>基础展示</h1>
    <tdy ref="tdy" :value="formdata" :json="json"></tdy>
    <el-button type="primary" @click="submitForm('tdy')">校验</el-button>
    <el-button @click="resetForm('tdy')">重置</el-button>
    <el-collapse :value="''">
      <el-collapse-item title="数据模型" name="1">
        <el-row :gutter="44">
          <el-col :span="12">
            <pre class=" language-javascript">{{json}}</pre>
          </el-col>
          <el-col :span="12">
            <pre class=" language-javascript">{{formdata}}</pre>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      formdata: {},
      json: [
        {
          id: 'name',
          type: 'input',
          label: '活动名称',
          value: '唐道远测试的',
          class: '',
          formItemClass: '',
          disabled: true,
          placeholder: 'placeholderTDY',
          rule: [
            { required: true, message: '请输入活动名称tdy', trigger: 'blur' }
          ],
          change(v) {
            console.log(v)
          }
        },
        {
          id: 'region',
          type: 'select',
          label: '活动区域',
          rule: [
            { required: true, message: '请选择活动区域tdy', trigger: 'change' }
          ],
          optionList: [
            { value: '5', label: '全新' },
            { value: '6', label: '二手' }
          ],
          change(v) {
            console.log(v, 'listren')
          }
        },
        {
          id: 'delivery',
          label: '即时配送',
          type: 'switch'
        },
        {
          id: 'type',
          label: '活动性质',
          type: 'checkbox',
          optionList: [
            { value: '5', label: '全新' },
            { value: '6', label: '二手' }
          ]
        },
        {
          id: 'resource',
          label: '特殊资源',
          type: 'radio',
          optionList: [
            { value: '5', label: '全新' },
            { value: '6', label: '二手' }
          ]
        },
        {
          id: 'desc',
          label: '特殊资源',
          type: 'textarea'
        }
      ]
    }
  },
  methods: {
    submitForm(name) {
      this.$refs[name].validate().then(
        data => {
          console.log(JSON.stringify(data, null, 2), 'ok')
        },
        object => {
          console.log(object, 'error')
        }
      )
    },
    resetForm(name) {
      this.$refs[name].resetForm()
    },
  }
}
</script>

<style scoped>
</style>
