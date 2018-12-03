<template>
  <el-card class="box-card item">
    <h1>插入自定义表单</h1>
    <tdy ref="tdy2" :value="formdata" :json="json">

      <div slot="tdysolt33">这个是另外的一个插槽 我写个按钮进去试试
        <el-button @click="clickEvent">重置吧</el-button>
      </div>

      <div slot-scope="{scope}" slot="tdysolt">
        这个是我插入的自定义内容,slot数据是value: {{scope}}；；</div>

    </tdy>
    <el-button type="primary" @click="submitForm('tdy2')">校验</el-button>
    <el-button @click="resetForm('tdy2')">重置</el-button>
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
          placeholder: 'placeholderTDY',
          rule: [
            { required: true, message: '请输入活动名称tdy', trigger: 'blur' }
          ]
        },
        {
          id: 'tdysolt',
          type: 'solt',
          label: '插槽1',
          value: '唐道远测试的'
        },
        {
          id: 'tdysolt33',
          type: 'solt',
          label: '插槽2'
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
          ]
        }
      ],
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
    clickEvent() {
      alert('click');
    }
  }
}
</script>

<style scoped>
</style>
