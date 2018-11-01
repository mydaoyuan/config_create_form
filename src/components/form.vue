<template>
  <div class="warp">
    <el-row :gutter="44">
      <el-col :span="12">
        <el-card class="box-card item">
          <h1>基础展示</h1>
          <tdy ref="tdy" :value="formdata" :json="json"></tdy>
          <el-button type="primary" @click="submitForm('tdy')">校验</el-button>
          <el-button @click="resetForm('tdy')">重置</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card item">
          <h1>数据结构嵌套验证</h1>
          <tdy ref="tdy1" :value="formdata1" :json="json1">
          </tdy>
          <el-button type="primary" @click="submitForm('tdy1')">校验</el-button>
          <el-button @click="resetForm('tdy1')">重置</el-button>
        </el-card>
        <el-card class="box-card item">
          <h1>插入自定义表单</h1>
          <tdy ref="tdy2" :value="formdata2" :json="json2">
            <div slot="tdysolt33">这个是另外的一个插槽 我写个按钮进去试试
              <el-button>重置吧</el-button>
            </div>
            <div slot-scope="{scope}" slot="tdysolt">
              这个是我插入的自定义内容,数据是value: {{scope}}；；</div>
          </tdy>
          <el-button type="primary" @click="submitForm('tdy2')">校验</el-button>
          <el-button @click="resetForm('tdy2')">重置</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tdy from '@/components/myform'
export default {
  name: 'formIndex',
  components: {
    tdy
  },
  data() {
    return {
      formdata: {},
      formdata1: {},
      formdata2: {},
      formdata3: {},
      json2: [
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
      json1: [
        {
          id: 'name',
          path: 'baseInfo.heihei',
          type: 'input',
          label: '活动名称',
          class: '',
          formItemClass: '',
          rule: [
            { required: true, message: '请输入活动名称tdy', trigger: 'blur' }
          ]
        }
      ],
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
    }
  }
}
</script>

<style scoped >
.warp {
  padding: 30px;
}
.item {
  margin-bottom: 40px;
}
h1 {
  font-size: 24px;
}
</style>
