import { updateToken } from '../axios'
// 时间处理
export function formatDate(date, fmt) {
  fmt = fmt || 'yyyy-MM-dd'
  date = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
      )
    }
  }
  return fmt
}

export function isPhoneNum(str) {
  /* eslint no-useless-escape:0 */
  return /^(\+?0?86\-?)?1[3456789]\d{9}$/.test(str)
}
/**
 *
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
export function isEmptyObject(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false
  return !Object.keys(obj).length
}

/**
 * @desc   函数节流。
 * 适用于限制`resize`和`scroll`等函数的调用频率
 *
 * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}   noTrailing     可选，默认为false。
 *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
 *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
 *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
 * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                    执行去节流功能时，调用`callback`。
 * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
 *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
 *
 * @return {Function}  新的节流函数
 */
export function throttle(delay, noTrailing, callback, debounceMode) {
  // After wrapper has stopped being called, this timeout ensures that
  // `callback` is executed at the proper times in `throttle` and `end`
  // debounce modes.
  var timeoutID

  // Keep track of the last time `callback` was executed.
  var lastExec = 0

  // `noTrailing` defaults to falsy.
  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback
    callback = noTrailing
    noTrailing = undefined
  }

  // The `wrapper` function encapsulates all of the throttling / debouncing
  // functionality and when executed will limit the rate at which `callback`
  // is executed.
  function wrapper() {
    var self = this
    var elapsed = Number(new Date()) - lastExec
    var args = arguments

    // Execute `callback` and update the `lastExec` timestamp.
    function exec() {
      lastExec = Number(new Date())
      callback.apply(self, args)
    }

    // If `debounceMode` is true (at begin) this is used to clear the flag
    // to allow future `callback` executions.
    function clear() {
      timeoutID = undefined
    }

    if (debounceMode && !timeoutID) {
      // Since `wrapper` is being called for the first time and
      // `debounceMode` is true (at begin), execute `callback`.
      exec()
    }

    // Clear any existing timeout.
    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    if (debounceMode === undefined && elapsed > delay) {
      // In throttle mode, if `delay` time has been exceeded, execute
      // `callback`.
      exec()
    } else if (noTrailing !== true) {
      // In trailing throttle mode, since `delay` time has not been
      // exceeded, schedule `callback` to execute `delay` ms after most
      // recent execution.
      //
      // If `debounceMode` is true (at begin), schedule `clear` to execute
      // after `delay` ms.
      //
      // If `debounceMode` is false (at end), schedule `callback` to
      // execute after `delay` ms.
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      )
    }
  }

  // Return the wrapper function.
  return wrapper
}

/**
 * @desc 函数防抖
 * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
 * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
 * @example 适用场景：如在线编辑的自动存储防抖。
 * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}  atBegin       可选，默认为false。
 *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
                                    如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
 * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                  执行去抖动功能时，，调用`callback`。
 *
 * @return {Function} 新的防抖函数。
 */
export function debounce(delay, atBegin, callback) {
  return callback === undefined
    ? throttle(delay, atBegin, false)
    : throttle(delay, callback, atBegin !== false)
}
export function findArrItemByKeyVal(arr = [], key, val) {
  if (!key) {
    return false
  }
  let result = {}
  arr.find(item => {
    if (item[key] == val) {
      result = item
      return true
    }
  })
  if (isEmptyObject(result)) {
    return false
  }
  return result
}
export function mythrottle(delay, fn) {
  var timer = null
  return function() {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}

export function filterObjectNull(obj) {
  let newObj = JSON.parse(JSON.stringify(obj))
  for (let [k, v] of Object.entries(newObj)) {
    if (v === null) {
      newObj[k] = ''
    }
  }
  return newObj
}
export function showPostion(province, city, district, street) {
  let arg = [...arguments]
  let filterV = arg.map(v => v || '')
  return filterV.reduce((a, b) => a + b)
}
export function setToken(token = '') {
  localStorage.setItem('token', token)
  updateToken()
}
export function serialize(url, obj) {
  function strobject(obj) {
    var strg = ''
    for (var a in obj) {
      strg += '&' + a + '=' + obj[a]
    }
    return strg
  }
  var str = ''
  var ifhas = url.indexOf('?') > -1
  if (ifhas) {
    str = strobject(obj)
  } else {
    str = '?' + strobject(obj).slice(1)
  }
  return url + str
}
export function reserialize() {
  var obj = {}
  if (location.href.indexOf('?') > -1) {
    var use = location.href.split('?')[1]
    var keyvalue = use.split('&')
    keyvalue.forEach((a, b) => {
      if (a) {
        obj[a.split('=')[0]] = a.split('=')[1]
      }
    })
  }
  return obj
}
/**
 *  清除本地缓存
 */
export function clearLocal() {
  const keys = ['getDict', 'dictTime', 'areaData']
  Object.keys(window.localStorage || {}).forEach(key => {
    if (!keys.includes(key)) {
      window.localStorage.removeItem(key)
    }
  })
}
/**
 *  获取深度value值
 */
export function findDeepValue(obj, key) {
  let tier = key.split(':')
  let data = obj
  for (let i = 0; i < tier.length; i++) {
    let temp = data[tier[i]]
    if (temp) {
      data = temp
    } else {
      return undefined
    }
  }
  return data
}

// 求最大公约数
export const arrayGcd = arr => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y))
  return arr.reduce((a, b) => gcd(a, b))
}
// 求最小公倍数
export const arrayLcm = arr => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y))
  const lcm = (x, y) => (x * y) / gcd(x, y)
  return arr.reduce((a, b) => lcm(a, b))
}
// 切片数组
export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )
// 摊平数组
export const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))

/**
 *  将字典转换为数组
 */
export function transformMapToArr(originalMap = {}, keyName, valueName) {
  let ret = []
  for (let key in originalMap) {
    let obj = {}
    obj[keyName || 'value'] = key
    obj[valueName || 'name'] = originalMap[key]
    ret.push(obj)
  }
  return ret
}

export function transformObjectTime(obj = {}) {
  let newData = {}
  if (obj) {
    for (let k in obj) {
      newData[+new Date(k)] = obj[k]
    }
  }
  return newData
}

export function transformNumber(num, length = 5) {
  let numStr = num.toLocaleString('zh')
  if (numStr.length > length) {
    let newNum = (num / 10000).toFixed(2)
    let newNumStr = newNum.toLocaleString('zh') + '万'
    if (newNumStr.length < numStr.length) {
      return newNumStr
    }
  }
  return numStr
}
