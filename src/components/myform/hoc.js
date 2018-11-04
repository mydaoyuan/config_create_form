/* eslint no-unused-vars:0 */

import base from './base'
import { setValue, getKey } from './basefn'
let prename = 'tdy'
const name = 'tdy'
let id = 0
const hocProps = {
  value: {
    type: Object
  },
  json: Array
}
export default function tdyForm(WrappedComponent) {
  return {
    name: name,
    components: {
      mybase: base
    },
    props: {
      ...WrappedComponent.props,
      ...hocProps
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
      hocRules() {
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
    render(h) {
      const {
        attributes,
        baseComponentAttributes,
        baseComponentslots
      } = this.getRenderData()
      return (
        <WrappedComponent
          ref={this.id}
          label-width="100px"
          class="demo-ruleForm"
          {...attributes}
        >
          {this.json.map(item => {
            return (
              <el-form-item
                v-show={!item.hide}
                label={item.label}
                prop={this.getKey(item)}
              >
                <mybase
                  onChange={event => {
                    this.setDataModal.call(this, event, item)
                  }}
                  item={item}
                  {...baseComponentAttributes}
                >
                  {baseComponentslots}
                </mybase>
              </el-form-item>
            )
          })}
        </WrappedComponent>
      )
    },
    methods: {
      getRenderData() {
        const baseComponentslots = this.getSlots()
        const attributes = {
          attrs: this.$attrs,
          props: this.getProps(),
          listeners: this.$listeners
        }
        const baseComponentAttributes = {
          scopedSlots: this.$scopedSlots
        }
        return {
          attributes,
          baseComponentAttributes,
          baseComponentslots
        }
      },
      getProps() {
        let newProps = {
          ...this.$props,
          model: this.value,
          rules: this.hocRules
        }
        Object.keys(hocProps).map(k => {
          delete newProps[k]
        })
        return newProps
      },
      getSlots() {
        return Object.keys(this.$slots)
          .reduce((arr, key) => arr.concat(this.$slots[key]), [])
          .map(vnode => {
            vnode.context = this._self
            return vnode
          })
      },
      /**
       * 对数据模型进行处理  如设置默认值 或者形成树状数据结构
       */
      fixData() {
        this.json.map(item => {
          if (item.value !== undefined || item.path) {
            this.setDataModal.call(this, item.value || '', item)
          }
        })
      },
      getKey(item) {
        return getKey(item)
      },
      setDataModal(val, item) {
        setValue.call(this, this.ruleForm, item, val)
        this.$emit('input', this.ruleForm)
      },

      validate() {
        const { p, resolve, reject } = getPromise()
        this.$refs[this.id].validate((valid, object) => {
          if (valid) {
            resolve(this.ruleForm)
          } else {
            reject(object)
          }
        })
        return p
      },
      resetForm() {
        this.$refs[this.id].resetFields()
      }
    }
  }
}

function getPromise() {
  let rejectFn = null
  let resolveFn = null
  let p = new Promise((resolve, reject) => {
    resolveFn = resolve
    rejectFn = reject
  })
  return {
    p,
    resolve: resolveFn,
    reject: rejectFn
  }
}
