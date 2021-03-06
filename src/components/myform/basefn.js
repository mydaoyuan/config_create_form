export function getKey(item) {
  const id = item.id
  const path = item.path
  if (!path) {
    return id
  } else {
    return path + '.' + id
  }
}

export function setValue(model, item, value) {
  let path = getKey(item)
  if (path.indexOf('.') > -1) {
    path = path.replace(/\[(\w+)\]/g, '.$1')
    path = path.replace(/^\./, '')
    let pathArr = path.split('.')
    while (pathArr.length) {
      let key = pathArr.shift()
      if (!pathArr.length) {
        this.$set(model, key, value)
        break
      } else if (!model[key]) {
        this.$set(model, key, {})
      }
      model = model[key]
    }
  } else {
    this.$set(model, path, value)
  }
}
