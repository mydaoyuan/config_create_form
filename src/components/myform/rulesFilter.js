import { setValue } from './basefn'
export default function rulesFilter(json) {
  const rules = {}
  json.map(item => {
    const rule = item.rule
    if (rule) {
      setValue.call(this, rules, item, rule) // 深层次嵌套key情况处理
    }
  })
  return rules
}
