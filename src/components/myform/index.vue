<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" :ref="id" label-width="100px" class="demo-ruleForm">
      <el-form-item v-show="!item.hide" v-for="(item, index) in json" :key="index" :label="item.label" :prop="getKey(item)">
        <mybase @change="setValue($event,item)" :item="item">
          <div v-if="item.type == 'solt'">
            <slot :scope="item" :name="item.id" v-if="item.type == 'solt'"></slot>
          </div>
        </mybase>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import base from './base'
import { setValue, getKey } from './basefn'

let prename = 'tdy'
const name = 'tdy'
let id = 0
export default {
  name: name,
  props: {
    value: {
      type: Object
    },
    json: Array
  },
  components: {
    mybase: base
  },
  data() {
    const selfId = prename + id
    id++
    return {
      ruleForm: this.value,
      id: selfId,
      name
    }
  },
  computed: {
    rules() {
      const rules = {}
      this.json.map(item => {
        const rule = item.rule
        if (rule) {
          setValue.call(this, rules, item, rule) // 深层次嵌套key情况处理
        }
      })
      return rules
    }
  },
  created() {
    this.fixData()
  },
  methods: {
    /**
     *
     */
    fixData() {
      this.json.map(item => {
        if (item.value !== undefined || item.path) {
          this.setValue(item.value || '', item)
        }
      })
    },
    getKey(item) {
      return getKey(item)
    },
    setValue(val, item) {
      setValue.call(this, this.ruleForm, item, val)
      this.$emit('input', this.ruleForm)
    },

    validate() {
      let pf = null
      let re = null
      let p = new Promise((resolve, reject) => {
        pf = resolve
        re = reject
      })
      this.$refs[this.id].validate((valid, object) => {
        if (valid) {
          pf(this.ruleForm)
        } else {
          re(object)
        }
      })
      return p
    },
    resetForm() {
      this.$refs[this.id].resetFields()
    }
  }
}
</script>

<style scoped>
</style>
