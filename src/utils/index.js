import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery'

export const modal = {
  show() {
    $('#overlay').show()
    $('#overlay .btn-modal-close').on('click', () => {
      $('#overlay').hide()
    })
  },
  hide() {
    $('#overlay').hide()
  }
}

export function debounce(func, wait, immediate) {
  let timeout
  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }, wait)
    if (immediate && !timeout) func.apply(this, [...args])
  }
}

/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  执行间隔，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“节流”函数
 */

export function throttle(fn, threshhold = 250, ...args) {
  // 记录上次执行的时间
  let last

  // 定时器
  let timer

  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function() {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this
    const now = +new Date()

    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(timer)

      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(() => {
        last = now
        fn.apply(context, args)
      }, threshhold)

      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}
