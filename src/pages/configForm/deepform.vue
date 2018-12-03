<template>
  <el-card class="box-card item">
    <h1>数据结构嵌套验证</h1>
    <tdy label-position="left" ref="tdy1" :value="formdata" :json="json">
    </tdy>
    <el-button type="primary" @click="submitForm('tdy1')">校验</el-button>
    <el-button @click="resetForm('tdy1')">重置</el-button>
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
          id: 'namepre',
          type: 'input',
          label: '最外层前面',
          value: 'test'
        },
        {
          id: 'name',
          children: [
            {
              id: 'baseInfo',
              children: [
                {
                  id: 'heihei',
                  type: 'input',
                  label: '活动名称内部',
                  value: '23333',
                  rule: [
                    {
                      required: true,
                      message: '请输入活动名称tdy',
                      trigger: 'blur'
                    }
                  ]
                }
              ]
            },
            {
              id: 'nameaftercen',
              type: 'input',
              label: '嵌套同级',
              value: 'test'
            }
          ]
        },
        {
          id: 'nameafter',
          type: 'input',
          label: '最外层后面',
          value: 'test'
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
    }
  }
}
</script>

<style scoped>
</style>
