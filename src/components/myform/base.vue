<template>
  <span>
    <el-input :disabled="isDisabled" v-if="type=='input'" @change="valueChange" v-model="formValue" :placeholder="item.placeholder || '请输入'"></el-input>

    <el-select :disabled="isDisabled" @change="valueChange" v-if="type=='select'" v-model="formValue" :placeholder="item.placeholder || '请选择'">
      <el-option v-for="option in item.optionList" :key="option.value" :label="option.label" :value="option.value"></el-option>
    </el-select>

    <el-switch :disabled="isDisabled" v-if="type=='switch'" v-model="formValue" @change="valueChange"></el-switch>

    <el-checkbox-group :disabled="isDisabled" @change="valueChange" v-if="type=='checkbox'" v-model="formValue">
      <el-checkbox v-for="(option,index) in item.optionList" :key="index" :label="option.label"></el-checkbox>
    </el-checkbox-group>

    <el-radio-group :disabled="isDisabled" @change="valueChange" v-if="type=='radio'" v-model="formValue">
      <el-radio v-for="(option,index) in item.optionList" :label="option.value" :key="index">{{option.label}}</el-radio>
    </el-radio-group>

    <el-input @change="valueChange" :disabled="isDisabled" type="textarea" v-if="type=='textarea'" v-model="formValue" :placeholder="item.placeholder || '请输入'"></el-input>

    <div v-if="item.type == 'solt'">
      <slot></slot>
    </div>
  </span>
</template>

<script>
function noop() {}
export default {
  name: 'mybase',
  props: {
    item: Object, // 单个元素
    change: {
      type: Function,
      default: noop
    },
    // 是否要禁用部分时间
    timeF: {
      type: Boolean,
      default: true
    },
    // 都是时间的配置
    disableTime: [String, Number],
    timeDisable: {
      type: Boolean,
      default: false
    },
    reverse: {
      type: Boolean,
      default: false
    },
    // 下拉开是否显示请输入
    mustSelect: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isDisabled() {
      return this.item.disabled === true ? true : false
    },
    solts() {
      const vm = this
      let parent = vm.$parent
      let cur = {}
      if (parent) {
        while (parent.$parent) {
          if (parent.name == 'tdy') {
            console.log('find father')
            break
          } else {
            parent = parent.$parent
          }
        }
      }
      console.log(parent.$slots)
      return parent.$slots
    }
  },
  watch: {
    value(val) {
      this.formValue = val
    }
  },
  data() {
    return {
      id: this.item.id,
      type: this.item.type,
      formValue: checkValue(this.item.type, this.item.value)
    }
  },
  created() {
    if (this.item.type == 'solt') {
      console.log(this)
    }
  },
  methods: {
    /**
     * 不可用时间配置
     * @param  {[type]} date [description]
     * @return {[type]}      [description]
     */
    disabledDate(date) {
      if (this.timeDisable) {
        let dis = this.disableTime
        if (this.reverse && dis) {
          return date && date.valueOf() > dis ? dis - 86400000 : 0
        }
        return date && date.valueOf() < dis ? dis - 86400000 : 0
      } else {
        return date && date.valueOf() < Date.now() - 86400000
      }
    },
    /**
     * 普通的数据发生变化
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    valueChange(val) {
      let data = this.formValue
      if (this.type == 'INPUTTIME') {
        data = +new Date(val)
      }
      this.$emit('change', data)
      if (this.item.change) {
        this.item.change(data)
      }
    }
  }
}

function checkValue(type, value) {
  if (type == 'checkbox' && !value) {
    return []
  } else {
    return value
  }
}
</script>

